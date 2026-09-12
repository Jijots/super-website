import { useState } from "react";

// YouTube hands out thumbnails for free, so those trailers show their real
// frame and play in place. Anything else (Geo's Facebook reels) has no public
// thumbnail, so we fall back to a still from the film and open the link.
function youTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

function PlayBadge() {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-super-red transition-transform duration-300 group-hover:scale-110">
      {/* Nudged right so the triangle looks centred to the eye. */}
      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-paper" aria-hidden="true">
        <path d="M5 3l16 9-16 9V3z" />
      </svg>
    </span>
  );
}

export default function TrailerCard({ url, title, fallbackImage }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(null);

  const id = youTubeId(url);

  // maxres does not exist for every upload, so drop to hq if it 404s.
  const initialThumb = id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : fallbackImage;
  const src = thumb ?? initialThumb;

  if (playing && id) {
    return (
      <div className="aspect-video overflow-hidden ring-2 ring-super-red">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`${title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  const content = (
    <>
      {src ? (
        <img
          src={src}
          alt={`${title} trailer`}
          onError={() => {
            if (id && !thumb) setThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 bg-super-red" />
      )}

      {/* Keeps the label readable whatever the frame underneath is doing. */}
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <span className="relative flex h-full flex-col items-center justify-center gap-4">
        <PlayBadge />
        <span className="text-sm font-bold uppercase tracking-wide text-paper">
          Watch the trailer {!id && "→"}
        </span>
      </span>
    </>
  );

  const className =
    "group relative block aspect-video w-full overflow-hidden ring-2 ring-super-red";

  // A YouTube trailer plays here; anything else has to open where it lives.
  return id ? (
    <button type="button" onClick={() => setPlaying(true)} className={className}>
      {content}
    </button>
  ) : (
    <a href={url} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  );
}
