/**
 * Runs in <head> before first paint: applies the saved theme and mode from localStorage
 * (keys "cm-theme", "cm-mode" in src/lib/store/prefs.ts). Kept out of the client module so the
 * server layout can inline it.
 */
export const PREPAINT_SCRIPT = `(function(){var d=document.documentElement,t="system",m=null;try{t=localStorage.getItem("cm-theme")||"system";m=localStorage.getItem("cm-mode")}catch(e){}var k=t==="dark"||(t!=="light"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);d.setAttribute("data-theme",k?"dark":"light");d.setAttribute("data-theme-pref",t);if(m==="learn"||m==="revise"||m==="quiz")d.setAttribute("data-mode",m)})();`;
