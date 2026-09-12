import { useState } from "react";
import { Button, Field, Input, Panel, Select, Textarea } from "./ui";

const BLANK = {
  title: "",
  publication: "",
  date: "",
  summary: "",
  url: "",
  project: "",
};

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewsEditor({ doc, onChange, projects }) {
  const [index, setIndex] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");

  // Shown newest first here too, so this list matches what the website shows.
  const sorted = [...doc.articles]
    .map((a, i) => ({ ...a, _i: i }))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  function startEdit(article) {
    setIndex(article._i);
    setDraft({ ...BLANK, ...article });
    setError("");
  }

  function startNew() {
    setIndex("__new__");
    setDraft({ ...BLANK, date: new Date().toISOString().slice(0, 10) });
    setError("");
  }

  function cancel() {
    setIndex(null);
    setDraft(null);
    setError("");
  }

  function save() {
    if (!draft.title.trim()) return setError("Add the headline first.");
    if (!draft.url.trim()) return setError("Add the link to the article.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) return setError("Pick a date for the article.");

    const cleaned = {
      title: draft.title.trim(),
      publication: draft.publication.trim(),
      date: draft.date,
      summary: draft.summary.trim(),
      url: draft.url.trim(),
    };
    if (draft.project) cleaned.project = draft.project;

    const next =
      index === "__new__"
        ? [...doc.articles, cleaned]
        : doc.articles.map((a, i) => (i === index ? cleaned : a));

    onChange({ ...doc, articles: next });
    cancel();
  }

  function remove(article) {
    if (!confirm(`Remove "${article.title}" from the News page?`)) return;
    onChange({ ...doc, articles: doc.articles.filter((_, i) => i !== article._i) });
  }

  if (draft) {
    const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });

    return (
      <Panel
        title={index === "__new__" ? "New article" : "Editing article"}
        action={
          <div className="flex gap-2">
            <Button onClick={cancel}>Cancel</Button>
            <Button variant="primary" onClick={save}>
              Done
            </Button>
          </div>
        }
      >
        {error && <p className="mb-4 border-2 border-super-red bg-super-red/5 p-3 text-sm text-super-red">{error}</p>}

        <div className="space-y-4">
          <Field label="Headline">
            <Input value={draft.title} onChange={set("title")} placeholder="How 'Runo!' Makes an Aspin the Heroine" />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Publication">
              <Input value={draft.publication} onChange={set("publication")} placeholder="Vogue Philippines" />
            </Field>
            <Field label="Date published">
              <Input type="date" value={draft.date} onChange={set("date")} />
            </Field>
          </div>

          <Field label="Link">
            <Input value={draft.url} onChange={set("url")} placeholder="https://" />
          </Field>

          <Field label="Summary" hint="One or two sentences, shown on the card">
            <Textarea value={draft.summary} onChange={set("summary")} rows={3} />
          </Field>

          <Field label="Which film is this about?" hint="It will also show at the bottom of that film's page">
            <Select value={draft.project} onChange={set("project")}>
              <option value="">Not about a specific film</option>
              {projects.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title={`News (${doc.articles.length})`}
      action={<Button variant="primary" onClick={startNew}>+ New article</Button>}
    >
      <ul className="divide-y divide-ink/10">
        {sorted.map((article) => {
          const film = projects.find((p) => p.slug === article.project);
          return (
            <li key={article._i} className="flex items-start gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{article.title}</p>
                <p className="mt-0.5 text-xs text-ink/50">
                  {[article.publication, formatDate(article.date)].filter(Boolean).join(" / ")}
                  {film && <span className="ml-2 text-super-red">{film.title}</span>}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button onClick={() => startEdit(article)}>Edit</Button>
                <Button variant="danger" onClick={() => remove(article)}>
                  Delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
