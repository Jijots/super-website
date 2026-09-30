import { Button, Field, Input, Panel } from "./ui";
import PhotoPicker from "./PhotoPicker";

// Contact details, socials, and the As Featured On logos.
export default function SiteEditor({ doc, onChange, onStageFile }) {
  const set = (key) => (e) => onChange({ ...doc, [key]: e.target.value });

  const setSocial = (i, key, value) =>
    onChange({
      ...doc,
      socials: doc.socials.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
    });

  // Logos are added as a batch of images, then named one by one. The name is
  // what a screen reader reads out, so it is not optional.
  function onLogos(paths) {
    const byPath = Object.fromEntries(doc.publications.map((p) => [p.logo, p.name]));
    onChange({
      ...doc,
      publications: paths.map((logo) => ({ logo, name: byPath[logo] ?? "" })),
    });
  }

  return (
    <div className="space-y-6">
      <Panel title="Contact">
        <p className="mb-4 text-xs text-ink/50">
          This is the big link at the bottom of every page, so it is how most people will get in touch.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email address">
            <Input value={doc.contactEmail} onChange={set("contactEmail")} placeholder="hello@yourdomain" />
          </Field>
          <Field label="Line above it">
            <Input value={doc.contactLabel} onChange={set("contactLabel")} placeholder="Let's work together" />
          </Field>
        </div>
      </Panel>

      <Panel
        title={`Social links (${doc.socials.length})`}
        action={
          <Button onClick={() => onChange({ ...doc, socials: [...doc.socials, { label: "", href: "" }] })}>
            + Add link
          </Button>
        }
      >
        <div className="space-y-2">
          {doc.socials.map((s, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={s.label}
                placeholder="Instagram"
                onChange={(e) => setSocial(i, "label", e.target.value)}
                className="sm:w-48"
              />
              <Input value={s.href} placeholder="https://" onChange={(e) => setSocial(i, "href", e.target.value)} />
              <Button
                variant="ghost"
                onClick={() => onChange({ ...doc, socials: doc.socials.filter((_, idx) => idx !== i) })}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={`As Featured On (${doc.publications.length})`}>
        <p className="mb-3 text-xs text-ink/50">
          Publication logos for the bottom of the News page. Use logos with a transparent or white background. The
          section stays hidden until you add at least one, so the page never looks unfinished.
        </p>

        <PhotoPicker
          paths={doc.publications.map((p) => p.logo)}
          folder="publications"
          prefix="logo"
          onStageFile={onStageFile}
          onChange={onLogos}
          width={600}
          aspect="aspect-[3/2]"
          label="Add logos"
        />

        {doc.publications.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-ink/60">Name each one</p>
            {doc.publications.map((p, i) => (
              <div key={p.logo} className="flex items-center gap-3">
                <img src={p.logo} alt="" className="h-8 w-14 shrink-0 border border-ink/10 object-contain" />
                <Input
                  value={p.name}
                  placeholder="Rappler"
                  onChange={(e) =>
                    onChange({
                      ...doc,
                      publications: doc.publications.map((q, idx) =>
                        idx === i ? { ...q, name: e.target.value } : q,
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
