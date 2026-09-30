// Geo's source files come straight off a camera or out of Photoshop, so a
// poster can easily be 17MB. Everything is resized in the browser before it is
// committed, which keeps the repo and the live site fast.

export const STILL_WIDTH = 1600;
export const POSTER_WIDTH = 1000;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`${file.name} could not be read as an image.`));
    };
    img.src = url;
  });
}

/**
 * Resize and return base64 JPEG, no data URL prefix. Capped by width for
 * stills and logos, by height for portraits, which otherwise come out tiny
 * when they are tall and narrow. Images already smaller than the cap keep
 * their own size rather than being upscaled into mush.
 */
export async function processImage(file, target, by = "width") {
  const img = await loadImage(file);
  let width;
  let height;
  if (by === "height") {
    height = Math.min(target, img.naturalHeight);
    width = Math.round((img.naturalWidth * height) / img.naturalHeight);
  } else {
    width = Math.min(target, img.naturalWidth);
    height = Math.round((img.naturalHeight * width) / img.naturalWidth);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
  return {
    base64: dataUrl.split(",")[1],
    preview: dataUrl,
    width,
    height,
  };
}

export function stillPath(slug, index) {
  return `/images/projects/${slug}/${String(index + 1).padStart(2, "0")}.jpg`;
}

export function posterPath(slug) {
  return `/images/projects/${slug}/poster.jpg`;
}

// "Patay Gutom" -> "patay-gutom", which is both the URL and the image folder.
// The escapes are the combining-accent range and curly apostrophes, written
// as codepoints so no editor or toolchain can mangle them.
export function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
