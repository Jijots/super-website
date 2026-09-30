import { Button, Field, Input, Panel, Textarea } from "./ui";
import { slugify } from "./images";

// Short enough that everything is editable in place; no separate edit screen.
export default function ServicesEditor({ doc, onChange }) {
  const services = doc.services;

  const update = (i, key, value) =>
    onChange({
      ...doc,
      services: services.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
    });

  return (
    <Panel
      title={`Services (${services.length})`}
      action={
        <Button
          onClick={() =>
            onChange({ ...doc, services: [...services, { id: `service-${Date.now()}`, title: "", blurb: null }] })
          }
        >
          + Add service
        </Button>
      }
    >
      <p className="mb-5 text-xs text-ink/50">
        These are the three columns on the Services page. If you leave the description empty the heading still
        shows on its own, which looks fine, so there is no rush to fill them all at once.
      </p>

      <div className="space-y-6">
        {services.map((service, i) => (
          <div key={service.id} className="border-2 border-ink/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <Field label="Name">
                  <Input
                    value={service.title}
                    placeholder="Creative Development"
                    onChange={(e) => {
                      const title = e.target.value;
                      onChange({
                        ...doc,
                        services: services.map((s, idx) =>
                          idx === i ? { ...s, title, id: slugify(title) || s.id } : s,
                        ),
                      });
                    }}
                  />
                </Field>
                <Field label="Description" hint="A couple of sentences. Leave empty if you are not ready.">
                  <Textarea
                    rows={3}
                    value={service.blurb ?? ""}
                    onChange={(e) => update(i, "blurb", e.target.value.trim() ? e.target.value : null)}
                  />
                </Field>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  if (!confirm(`Remove "${service.title || "this service"}" from the Services page?`)) return;
                  onChange({ ...doc, services: services.filter((_, idx) => idx !== i) });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
