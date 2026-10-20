import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { T as subscribeToDataMode, m as isDataModeResolved, p as getDataMode } from "./store-BQzU-IjM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-data-mode-Dv-JVxm1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Which data path the app is running on.
*
* `browser` — the demo: records stay in this browser. `server` — the
* production path: records live in the database and are shared between
* devices.
*/
function useDataMode() {
	return (0, import_react.useSyncExternalStore)(subscribeToDataMode, getDataMode, getDataMode);
}
/**
* True once the server has said which path is live.
*
* Sign-in screens wait for this before offering a method, so nobody is shown
* a button that cannot work.
*
* The server snapshot is `false`: the server has not asked itself, and the
* first client render must match the server-rendered markup exactly — a
* mismatch here is a hydration error, not a cosmetic one.
*/
function useDataModeResolved() {
	return (0, import_react.useSyncExternalStore)(subscribeToDataMode, isDataModeResolved, () => false);
}
//#endregion
export { useDataModeResolved as n, useDataMode as t };
