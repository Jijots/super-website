// Data lives in projects.json so the /admin tool can read and rewrite it
// safely. Edit through the tool rather than by hand where you can, otherwise
// the two can drift.
import data from "./projects.json";

export const CATEGORIES = data.categories;
export const projects = data.projects;
