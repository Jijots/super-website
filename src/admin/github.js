// Talks to GitHub on the client's behalf using a token they paste in once.
// Everything is written in a single commit through the Git Data API, so one
// save is one Vercel deploy no matter how many stills came with it.

const OWNER = "Jijots";
const REPO = "super-website";
const BRANCH = "main";
const API = "https://api.github.com";

const TOKEN_KEY = "super-admin-token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Private windows can refuse storage. The session still works, it just
    // will not be remembered next time.
  }
}

async function gh(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${getToken()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.json()).message || "";
    } catch {
      detail = res.statusText;
    }
    if (res.status === 401) throw new Error("That access key was rejected. It may be wrong or expired.");
    if (res.status === 403) throw new Error("That key does not have permission to edit the site.");
    if (res.status === 404) throw new Error("Could not find the site's files. Check that the key covers the super-website repository.");
    throw new Error(detail || `GitHub error ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

// UTF-8 safe, and chunked so a multi-megabyte image does not blow the call
// stack the way String.fromCharCode(...bytes) would.
export function bytesToBase64(bytes) {
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

export function textToBase64(text) {
  return bytesToBase64(new TextEncoder().encode(text));
}

export function base64ToText(b64) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export async function verifyAccess() {
  const repo = await gh(`/repos/${OWNER}/${REPO}`);
  if (!repo.permissions?.push) {
    throw new Error("That key can read the site but not save changes to it.");
  }
  return repo.full_name;
}

// Always read straight from GitHub rather than trusting the copy bundled into
// this page, which goes stale the moment anything is published.
export async function readJson(path) {
  const file = await gh(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  return JSON.parse(base64ToText(file.content));
}

/**
 * Commit a set of files at once.
 * @param {{path: string, content: string, encoding?: "utf-8"|"base64"}[]} files
 */
export async function commitFiles(files, message) {
  if (!files.length) return null;

  const ref = await gh(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
  const baseSha = ref.object.sha;
  const baseCommit = await gh(`/repos/${OWNER}/${REPO}/git/commits/${baseSha}`);

  const tree = [];
  for (const file of files) {
    const blob = await gh(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({
        content: file.content,
        encoding: file.encoding === "base64" ? "base64" : "utf-8",
      }),
    });
    tree.push({ path: file.path, mode: "100644", type: "blob", sha: blob.sha });
  }

  const newTree = await gh(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree }),
  });

  const commit = await gh(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: newTree.sha,
      parents: [baseSha],
    }),
  });

  await gh(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });

  return commit.sha;
}
