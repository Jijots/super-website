// Data lives in news.json so the /admin tool can read and rewrite it.
import data from "./news.json";

// Newest first, so the carousel always opens on the most recent coverage.
export const news = [...data.articles].sort((a, b) => b.date.localeCompare(a.date));
