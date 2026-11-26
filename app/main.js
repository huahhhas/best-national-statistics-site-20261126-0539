// Atlas bootstrap — renders the current hash route and re-renders on change.
// The site is a single page: every view comes from views.js, every figure
// from the embedded dataset in data.js. No network requests are made.
import { route } from "./views.js";

window.addEventListener("hashchange", route);
route();
