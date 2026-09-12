// Plain, chunky form controls. The people using this are film producers, not
// developers, so everything is labelled in normal language and nothing is
// hidden behind an icon.

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wide text-ink/60">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink/40">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full border-2 border-ink/15 bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-super-red";

export function Input(props) {
  return <input {...props} className={inputClass} />;
}

export function Textarea({ rows = 3, ...props }) {
  return <textarea rows={rows} {...props} className={`${inputClass} resize-y`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={inputClass}>
      {children}
    </select>
  );
}

export function Button({ variant = "default", className = "", ...props }) {
  const styles = {
    default: "border-2 border-ink/20 text-ink hover:border-ink/50",
    primary: "bg-super-red text-paper hover:opacity-90 disabled:opacity-40",
    danger: "border-2 border-super-red/40 text-super-red hover:bg-super-red/5",
    ghost: "text-ink/50 hover:text-super-red",
  };
  return (
    <button
      type="button"
      {...props}
      className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    />
  );
}

export function Panel({ title, action, children }) {
  return (
    <section className="border-2 border-ink/10 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-super-red">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

// Repeating rows of {label, value}, used for credits.
export function PairList({ pairs, onChange, labelPlaceholder, valuePlaceholder }) {
  const update = (i, key, val) => {
    const next = pairs.map((p, idx) => (idx === i ? { ...p, [key]: val } : p));
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {pairs.map((pair, i) => (
        <div key={i} className="flex flex-col gap-2 sm:flex-row">
          <input
            value={pair.label ?? ""}
            placeholder={labelPlaceholder}
            onChange={(e) => update(i, "label", e.target.value)}
            className={`${inputClass} sm:w-56 sm:shrink-0`}
          />
          <input
            value={pair.value ?? ""}
            placeholder={valuePlaceholder}
            onChange={(e) => update(i, "value", e.target.value)}
            className={inputClass}
          />
          <Button variant="ghost" onClick={() => onChange(pairs.filter((_, idx) => idx !== i))}>
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={() => onChange([...pairs, { label: "", value: "" }])}>+ Add row</Button>
    </div>
  );
}

// A plain list of strings, used for awards.
export function StringList({ items, onChange, placeholder }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            placeholder={placeholder}
            onChange={(e) => onChange(items.map((v, idx) => (idx === i ? e.target.value : v)))}
            className={inputClass}
          />
          <Button variant="ghost" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={() => onChange([...items, ""])}>+ Add line</Button>
    </div>
  );
}
