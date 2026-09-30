import { useState } from "react";
import { Button, Field, Input, Panel, Textarea } from "./ui";
import { slugify } from "./images";
import PhotoPicker from "./PhotoPicker";

const BLANK = { slug: "", name: "", role: "", photos: [], bio: [] };

// Team and collaborators are the same shape and the same card on the site, so
// they share one editor and differ only by which list they live in.
export default function PeopleEditor({ doc, onChange, onStageFile }) {
  const [editing, setEditing] = useState(null); // { group, index } | { group, index: "new" }
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");

  function startEdit(group, index) {
    setEditing({ group, index });
    setDraft(JSON.parse(JSON.stringify(doc[group][index])));
    setError("");
  }

  function startNew(group) {
    setEditing({ group, index: "new" });
    setDraft({ ...BLANK });
    setError("");
  }

  function cancel() {
    setEditing(null);
    setDraft(null);
    setError("");
  }

  function save() {
    const name = draft.name.trim();
    if (!name) return setError("Give the person a name first.");

    const cleaned = {
      ...draft,
      name,
      slug: draft.slug || slugify(name),
      role: draft.role.trim(),
      // The bio is typed as one box with blank lines between paragraphs.
      bio: draft.bio.filter((para) => para.trim()),
    };

    const list = doc[editing.group];
    const next =
      editing.index === "new" ? [...list, cleaned] : list.map((p, i) => (i === editing.index ? cleaned : p));

    onChange({ ...doc, [editing.group]: next });
    cancel();
  }

  function remove(group, index) {
    const person = doc[group][index];
    if (!confirm(`Remove ${person.name}? Their photos stay saved, only the card goes.`)) return;
    onChange({ ...doc, [group]: doc[group].filter((_, i) => i !== index) });
  }

  function move(group, index, delta) {
    const next = [...doc[group]];
    const to = index + delta;
    if (to < 0 || to >= next.length) return;
    [next[index], next[to]] = [next[to], next[index]];
    onChange({ ...doc, [group]: next });
  }

  if (draft) {
    const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });

    return (
      <Panel
        title={editing.index === "new" ? "New person" : `Editing ${draft.name || "person"}`}
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
          <Field label="Name">
            <Input value={draft.name} onChange={set("name")} placeholder="Geo Lomuntad" />
          </Field>
          <Field label="Role">
            <Input value={draft.role} onChange={set("role")} placeholder="Director / Producer" />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Bio" hint="Leave a blank line between paragraphs.">
            <Textarea
              rows={9}
              value={draft.bio.join("\n\n")}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value.split(/\n\s*\n/) })}
            />
          </Field>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/60">Photos</p>
          <p className="mb-2 mt-0.5 text-xs text-ink/40">
            More than one will fade from one to the next on the card. Big files are fine.
          </p>
          <PhotoPicker
            paths={draft.photos}
            folder="company"
            prefix={draft.slug || slugify(draft.name) || "person"}
            onStageFile={onStageFile}
            onChange={(photos) => setDraft({ ...draft, photos })}
            width={1400}
            by="height"
          />
        </div>
      </Panel>
    );
  }

  const group = (key, title, blurb) => (
    <Panel
      key={key}
      title={`${title} (${doc[key].length})`}
      action={
        <Button variant="primary" onClick={() => startNew(key)}>
          + Add person
        </Button>
      }
    >
      {blurb && <p className="mb-3 text-xs text-ink/50">{blurb}</p>}
      <ul className="divide-y divide-ink/10">
        {doc[key].map((person, i) => (
          <li key={person.slug} className="flex items-center gap-3 py-3">
            <div className="h-14 w-11 shrink-0 overflow-hidden bg-ink/5">
              {person.photos?.[0] && (
                <img src={person.photos[0]} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{person.name}</p>
              <p className="truncate text-xs text-ink/50">
                {person.role || "No role yet"}
                {!person.photos?.length && <span className="ml-2 text-super-red">No photo</span>}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button variant="ghost" className="!px-2" onClick={() => move(key, i, -1)} disabled={i === 0}>
                ↑
              </Button>
              <Button
                variant="ghost"
                className="!px-2"
                onClick={() => move(key, i, 1)}
                disabled={i === doc[key].length - 1}
              >
                ↓
              </Button>
              <Button onClick={() => startEdit(key, i)}>Edit</Button>
              <Button variant="danger" onClick={() => remove(key, i)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );

  return (
    <div className="space-y-6">
      {group("team", "Our Team", "The people who are Super! itself.")}
      {group("collaborators", "Collaborators", "Directors and writers you have worked with.")}

      <Panel title="Company page">
        <Field label="Headline" hint="The big red line under the photos on the Company page.">
          <Textarea
            rows={2}
            value={doc.companyIntro}
            onChange={(e) => onChange({ ...doc, companyIntro: e.target.value })}
          />
        </Field>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/60">On set photos</p>
          <p className="mb-2 mt-0.5 text-xs text-ink/40">The grid at the very top of the Company page.</p>
          <PhotoPicker
            paths={doc.btsPhotos}
            folder="company"
            prefix="bts"
            onStageFile={onStageFile}
            onChange={(btsPhotos) => onChange({ ...doc, btsPhotos })}
            width={1600}
            aspect="aspect-[4/3]"
            label="Add on set photos"
          />
        </div>
      </Panel>
    </div>
  );
}
