import { useRef, useState } from "react";
import { Button } from "./ui";
import { processImage } from "./images";

/**
 * Add and remove images for anything that is just a list of pictures: a
 * person's portraits, the on set photos, publication logos. Projects keep
 * their own picker because they also choose a cover.
 *
 * @param {string[]} paths        current image paths, as the site sees them
 * @param {string} folder         public folder to write into, no slashes
 * @param {string} prefix         file name prefix, numbered from 01
 * @param {(f:{path,content,encoding}) => void} onStageFile
 * @param {(paths:string[]) => void} onChange
 */
export default function PhotoPicker({
  paths,
  folder,
  prefix,
  onStageFile,
  onChange,
  width = 1400,
  by = "height",
  label = "Add photos",
  multiple = true,
  aspect = "aspect-[3/4]",
}) {
  const input = useRef(null);
  const [previews, setPreviews] = useState({});
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function add(files) {
    setBusy(`Preparing ${files.length} photo${files.length > 1 ? "s" : ""}...`);
    setError("");
    try {
      const next = [...paths];
      const shots = { ...previews };
      for (const file of files) {
        // Portraits are capped by height, logos and stills by width.
        const { base64, preview } = await processImage(file, width, by);
        // Keep numbering past whatever is already there so nothing is
        // overwritten when photos are added in more than one sitting.
        const n = next.length + 1;
        const path = `/images/${folder}/${prefix}-${String(n).padStart(2, "0")}.jpg`;
        onStageFile({ path: `public${path}`, content: base64, encoding: "base64" });
        next.push(path);
        shots[path] = preview;
      }
      setPreviews(shots);
      onChange(next);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <div>
      {paths.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {paths.map((path) => (
            <div key={path} className="relative">
              <img
                src={previews[path] || path}
                alt=""
                className={`${aspect} w-full border-2 border-ink/10 object-cover`}
              />
              <Button
                variant="ghost"
                className="!px-1 !py-0.5 absolute right-1 top-1 bg-cream/90"
                onClick={() => onChange(paths.filter((p) => p !== path))}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={input}
          type="file"
          accept="image/*"
          multiple={multiple}
          hidden
          onChange={(e) => {
            const files = [...e.target.files];
            e.target.value = "";
            if (files.length) add(files);
          }}
        />
        <Button onClick={() => input.current?.click()} disabled={Boolean(busy)}>
          + {label}
        </Button>
        {busy && <span className="text-xs text-ink/50">{busy}</span>}
      </div>

      {error && <p className="mt-2 text-xs text-super-red">{error}</p>}
    </div>
  );
}
