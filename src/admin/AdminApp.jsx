import { useEffect, useState } from "react";
import { commitFiles, getToken, readJson, setToken, textToBase64, verifyAccess } from "./github";
import ProjectEditor from "./ProjectEditor";
import NewsEditor from "./NewsEditor";
import ServicesEditor from "./ServicesEditor";
import PeopleEditor from "./PeopleEditor";
import SiteEditor from "./SiteEditor";
import { Button } from "./ui";

// Everything Geo can edit. Adding a section here and a case in the switch
// below is all it takes to put another part of the site under his control.
const DOCS = [
  { key: "projects", label: "Projects", path: "src/data/projects.json" },
  { key: "news", label: "News", path: "src/data/news.json" },
  { key: "services", label: "Services", path: "src/data/services.json" },
  { key: "people", label: "People", path: "src/data/team.json" },
  { key: "site", label: "Contact & Logos", path: "src/data/site.json" },
];

const KEY_URL =
  "https://github.com/settings/personal-access-tokens/new";

function TokenGate({ onReady }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function submit() {
    setChecking(true);
    setError("");
    setToken(value.trim());
    try {
      await verifyAccess();
      onReady();
    } catch (e) {
      setToken("");
      setError(e.message);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-bold uppercase tracking-tight text-super-red">Super! site manager</h1>
      <p className="mt-3 text-sm text-ink/70">
        Paste your access key to start. You only need to do this once on this computer.
      </p>

      <div className="mt-6">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="github_pat_..."
          className="w-full border-2 border-ink/15 bg-cream px-3 py-2 text-sm outline-none focus:border-super-red"
        />
        {error && <p className="mt-3 border-2 border-super-red bg-super-red/5 p-3 text-sm text-super-red">{error}</p>}
        <Button variant="primary" className="mt-4 w-full" onClick={submit} disabled={!value.trim() || checking}>
          {checking ? "Checking..." : "Continue"}
        </Button>
      </div>

      <details className="mt-8 border-2 border-ink/10 p-4 text-sm">
        <summary className="cursor-pointer font-bold uppercase tracking-wide text-ink/60">
          I don't have a key yet
        </summary>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink/70">
          <li>
            Go to{" "}
            <a href={KEY_URL} target="_blank" rel="noreferrer" className="text-super-red underline">
              this page on GitHub
            </a>{" "}
            and sign in.
          </li>
          <li>Under Repository access, choose "Only select repositories" and pick super-website.</li>
          <li>Under Permissions, set Contents to "Read and write".</li>
          <li>Click Generate token, then copy the key and paste it above.</li>
        </ol>
        <p className="mt-3 text-xs text-ink/50">
          The key is stored only in this browser. It is never part of the website itself, and anyone visiting the site
          cannot see or use it.
        </p>
      </details>
    </div>
  );
}

export default function AdminApp() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [tab, setTab] = useState(DOCS[0].key);

  const [docs, setDocs] = useState({});
  const [dirty, setDirty] = useState({});
  const [staged, setStaged] = useState([]);

  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    verifyAccess()
      .then(() => setReady(true))
      .catch(() => setToken(""))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    Promise.all(DOCS.map((d) => readJson(d.path)))
      .then((loaded) => {
        setDocs(Object.fromEntries(DOCS.map((d, i) => [d.key, loaded[i]])));
        setLoadError("");
      })
      .catch((e) => setLoadError(e.message))
      .finally(() => setLoading(false));
  }, [ready]);

  const hasChanges = Object.values(dirty).some(Boolean) || staged.length > 0;

  // Leaving with unsaved work would silently lose it, and this tool is used by
  // someone who has no other copy of what they just typed.
  useEffect(() => {
    if (!hasChanges) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasChanges]);

  function stageFile(file) {
    // A photo replaced twice before publishing should only commit once.
    setStaged((prev) => [...prev.filter((f) => f.path !== file.path), file]);
  }

  async function publish() {
    setPublishing(true);
    setStatus("Saving...");
    try {
      const files = [...staged];
      const changed = DOCS.filter((d) => dirty[d.key]);
      for (const d of changed) {
        files.push({
          path: d.path,
          content: textToBase64(`${JSON.stringify(docs[d.key], null, 2)}
`),
          encoding: "base64",
        });
      }

      const parts = changed.map((d) => d.label.toLowerCase());
      if (staged.length) parts.push(`${staged.length} image${staged.length > 1 ? "s" : ""}`);

      await commitFiles(files, `Update ${parts.join(", ")} from the site manager`);

      setStaged([]);
      setDirty({});
      setStatus("Saved. The website updates in about a minute.");
    } catch (e) {
      setStatus(`Could not save: ${e.message}`);
    } finally {
      setPublishing(false);
    }
  }

  function signOut() {
    if (hasChanges && !confirm("You have unsaved changes. Sign out anyway?")) return;
    setToken("");
    window.location.reload();
  }

  if (loading) {
    return <p className="px-6 py-16 text-sm uppercase tracking-wide text-ink/40">Loading...</p>;
  }

  if (!ready) {
    return <TokenGate onReady={() => setReady(true)} />;
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <p className="border-2 border-super-red bg-super-red/5 p-4 text-sm text-super-red">{loadError}</p>
        <Button className="mt-4" onClick={signOut}>
          Use a different key
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-super-red pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-super-red">Super! site manager</h1>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-ink/40">
            Add films, photos and news. Changes go live when you press Save.
          </p>
        </div>
        <Button variant="ghost" onClick={signOut}>
          Sign out
        </Button>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2">
        {DOCS.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setTab(d.key)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              tab === d.key ? "bg-super-red text-paper" : "border-2 border-ink/15 text-ink/60 hover:border-ink/40"
            }`}
          >
            {d.label}
            {dirty[d.key] ? " *" : ""}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {(() => {
          const doc = docs[tab];
          if (!doc) return null;
          const onChange = (next) => {
            setDocs((all) => ({ ...all, [tab]: next }));
            setDirty((d) => ({ ...d, [tab]: true }));
          };
          switch (tab) {
            case "projects":
              return (
                <ProjectEditor doc={doc} categories={doc.categories} onChange={onChange} onStageFile={stageFile} />
              );
            case "news":
              return <NewsEditor doc={doc} projects={docs.projects?.projects ?? []} onChange={onChange} />;
            case "services":
              return <ServicesEditor doc={doc} onChange={onChange} />;
            case "people":
              return <PeopleEditor doc={doc} onChange={onChange} onStageFile={stageFile} />;
            case "site":
              return <SiteEditor doc={doc} onChange={onChange} onStageFile={stageFile} />;
            default:
              return null;
          }
        })()}
      </div>

      {/* Sticky so the way to save is always visible, however far down the
          page a long credits list has pushed things. */}
      <div className="sticky bottom-0 mt-8 border-t-2 border-ink/10 bg-cream py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink/50">
            {status ||
              (hasChanges
                ? `Unsaved changes${staged.length ? `, including ${staged.length} new photo${staged.length > 1 ? "s" : ""}` : ""}`
                : "Everything is saved")}
          </p>
          <Button variant="primary" onClick={publish} disabled={!hasChanges || publishing}>
            {publishing ? "Saving..." : "Save and publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
