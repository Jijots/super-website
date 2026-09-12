import { useRef, useState } from "react";
import { Button, Field, Input, PairList, Panel, Select, StringList, Textarea } from "./ui";
import { POSTER_WIDTH, STILL_WIDTH, posterPath, processImage, slugify, stillPath } from "./images";

const BLANK = {
  slug: "",
  category: "films",
  title: "",
  year: "",
  tag: "",
  genre: "",
  runtime: "",
  country: "Philippines",
  logline: "",
  cover: null,
  stills: [],
  director: "",
  credits: [],
  awards: [],
  pending: true,
};

export default function ProjectEditor({ doc, onChange, onStageFile, categories }) {
  const [editingSlug, setEditingSlug] = useState(null);
  const [draft, setDraft] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const stillInput = useRef(null);
  const posterInput = useRef(null);

  // Previews for images staged in this session, since they are not on the live
  // site yet and so cannot be loaded by their eventual path.
  const [previews, setPreviews] = useState({});

  const projects = doc.projects;

  function startEdit(project) {
    setEditingSlug(project.slug);
    setDraft(JSON.parse(JSON.stringify(project)));
    setError("");
  }

  function startNew() {
    setEditingSlug("__new__");
    setDraft({ ...BLANK });
    setError("");
  }

  function cancel() {
    setEditingSlug(null);
    setDraft(null);
    setError("");
  }

  function save() {
    const title = draft.title.trim();
    if (!title) {
      setError("Give the project a title first.");
      return;
    }
    const slug = draft.slug || slugify(title);
    if (
      editingSlug === "__new__" &&
      projects.some((p) => p.slug === slug)
    ) {
      setError(`There is already a project using the web address "${slug}".`);
      return;
    }

    const cleaned = {
      ...draft,
      slug,
      title,
      credits: draft.credits.filter((c) => c.label.trim() && c.value.trim()),
      awards: draft.awards.filter((a) => a.trim()),
    };
    // Empty strings would render as blank lines on the page, so drop them.
    for (const key of ["year", "tag", "genre", "runtime", "country", "logline", "director", "trailer"]) {
      if (typeof cleaned[key] === "string" && !cleaned[key].trim()) delete cleaned[key];
    }
    if (!cleaned.poster) delete cleaned.poster;
    if (!cleaned.pending) delete cleaned.pending;

    const next =
      editingSlug === "__new__"
        ? [...projects, cleaned]
        : projects.map((p) => (p.slug === editingSlug ? cleaned : p));

    onChange({ ...doc, projects: next });
    cancel();
  }

  function remove(project) {
    if (!confirm(`Remove "${project.title}" from the website? The photos stay saved, only the listing goes.`)) return;
    onChange({ ...doc, projects: projects.filter((p) => p.slug !== project.slug) });
  }

  function move(index, delta) {
    const next = [...projects];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...doc, projects: next });
  }

  async function addStills(files) {
    const slug = draft.slug || slugify(draft.title);
    if (!slug) {
      setError("Add the title first, so the photos know which folder to go in.");
      return;
    }
    setBusy(`Preparing ${files.length} photo${files.length > 1 ? "s" : ""}...`);
    setError("");
    try {
      const stills = [...draft.stills];
      const nextPreviews = { ...previews };
      for (const file of files) {
        const { base64, preview } = await processImage(file, STILL_WIDTH);
        const path = stillPath(slug, stills.length);
        onStageFile({ path: `public${path}`, content: base64, encoding: "base64" });
        stills.push(path);
        nextPreviews[path] = preview;
      }
      setPreviews(nextPreviews);
      setDraft({ ...draft, slug, stills, cover: draft.cover || stills[0] });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }

  async function addPoster(file) {
    const slug = draft.slug || slugify(draft.title);
    if (!slug) {
      setError("Add the title first, so the poster knows which folder to go in.");
      return;
    }
    setBusy("Preparing the poster...");
    setError("");
    try {
      const { base64, preview } = await processImage(file, POSTER_WIDTH);
      const path = posterPath(slug);
      onStageFile({ path: `public${path}`, content: base64, encoding: "base64" });
      setPreviews({ ...previews, [path]: preview });
      setDraft({ ...draft, slug, poster: path });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }

  function removeStill(path) {
    const stills = draft.stills.filter((s) => s !== path);
    setDraft({
      ...draft,
      stills,
      cover: draft.cover === path ? stills[0] || null : draft.cover,
    });
  }

  if (draft) {
    const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });

    return (
      <Panel
        title={editingSlug === "__new__" ? "New project" : `Editing ${draft.title || "project"}`}
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

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title">
            <Input value={draft.title} onChange={set("title")} placeholder="Patay Gutom" />
          </Field>
          <Field label="Section">
            <Select value={draft.category} onChange={set("category")}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label.join(" ")}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Director">
            <Input value={draft.director ?? ""} onChange={set("director")} />
          </Field>
          <Field label="Year">
            <Input value={draft.year ?? ""} onChange={set("year")} placeholder="2026" />
          </Field>
          <Field label="Label" hint="The small line under the title">
            <Input value={draft.tag ?? ""} onChange={set("tag")} placeholder="Cinemalaya 2026 Official Entry" />
          </Field>
          <Field label="Genre">
            <Input value={draft.genre ?? ""} onChange={set("genre")} />
          </Field>
          <Field label="Runtime">
            <Input value={draft.runtime ?? ""} onChange={set("runtime")} placeholder="85 mins" />
          </Field>
          <Field label="Country">
            <Input value={draft.country ?? ""} onChange={set("country")} />
          </Field>
        </div>

        <div className="mt-4 space-y-4">
          <Field label="Logline" hint="The short description on the film's page">
            <Textarea value={draft.logline ?? ""} onChange={set("logline")} rows={3} />
          </Field>

          <Field label="Trailer link" hint="YouTube, Facebook or Vimeo. Leave empty if there isn't one yet.">
            <Input value={draft.trailer ?? ""} onChange={set("trailer")} placeholder="https://youtube.com/watch?v=..." />
          </Field>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/60">Photos</p>
          <p className="mt-0.5 text-xs text-ink/40">
            Click a photo to make it the cover. Big files are fine, they get resized automatically.
          </p>

          {draft.stills.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {draft.stills.map((path) => (
                <div key={path} className="group relative">
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, cover: path })}
                    className={`block w-full overflow-hidden border-4 transition-colors ${
                      draft.cover === path ? "border-super-red" : "border-transparent hover:border-ink/20"
                    }`}
                  >
                    <img
                      src={previews[path] || path}
                      alt=""
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </button>
                  {draft.cover === path && (
                    <span className="absolute left-1 top-1 bg-super-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-paper">
                      Cover
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    className="!px-1 !py-0.5 absolute right-1 top-1 bg-cream/90"
                    onClick={() => removeStill(path)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              ref={stillInput}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = [...e.target.files];
                e.target.value = "";
                if (files.length) addStills(files);
              }}
            />
            <Button onClick={() => stillInput.current?.click()} disabled={Boolean(busy)}>
              + Add photos
            </Button>

            <input
              ref={posterInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                e.target.value = "";
                if (file) addPoster(file);
              }}
            />
            <Button onClick={() => posterInput.current?.click()} disabled={Boolean(busy)}>
              {draft.poster ? "Replace poster" : "+ Add poster"}
            </Button>

            {draft.poster && (
              <img
                src={previews[draft.poster] || draft.poster}
                alt="Poster"
                className="h-16 w-auto border-2 border-ink/15"
              />
            )}

            {busy && <span className="text-xs text-ink/50">{busy}</span>}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Credits">
            <PairList
              pairs={draft.credits}
              onChange={(credits) => setDraft({ ...draft, credits })}
              labelPlaceholder="Director"
              valuePlaceholder="Carl Joseph E. Papa"
            />
          </Field>

          <Field label="Awards and selections">
            <StringList
              items={draft.awards}
              onChange={(awards) => setDraft({ ...draft, awards })}
              placeholder="Best Short Film, QCinema 2025"
            />
          </Field>

          <label className="flex items-start gap-3 border-2 border-ink/10 p-3">
            <input
              type="checkbox"
              checked={Boolean(draft.pending)}
              onChange={(e) => setDraft({ ...draft, pending: e.target.checked })}
              className="mt-0.5 h-4 w-4 accent-[#F43837]"
            />
            <span className="text-sm">
              <span className="font-bold">Hide this project's page</span>
              <span className="block text-xs text-ink/50">
                It still shows in the list, but visitors cannot click into it. Use this while you are still waiting on
                photos or credits.
              </span>
            </span>
          </label>
        </div>
      </Panel>
    );
  }

  return (
    <Panel title={`Projects (${projects.length})`} action={<Button variant="primary" onClick={startNew}>+ New project</Button>}>
      <ul className="divide-y divide-ink/10">
        {projects.map((project, i) => (
          <li key={project.slug} className="flex items-center gap-3 py-3">
            <div className="h-12 w-16 shrink-0 overflow-hidden bg-ink/5">
              {project.cover && <img src={project.cover} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{project.title}</p>
              <p className="truncate text-xs text-ink/50">
                {[project.year, project.director].filter(Boolean).join(" / ") || "No details yet"}
                {project.pending && <span className="ml-2 text-super-red">Hidden</span>}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button variant="ghost" className="!px-2" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </Button>
              <Button variant="ghost" className="!px-2" onClick={() => move(i, 1)} disabled={i === projects.length - 1}>
                ↓
              </Button>
              <Button onClick={() => startEdit(project)}>Edit</Button>
              <Button variant="danger" onClick={() => remove(project)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
