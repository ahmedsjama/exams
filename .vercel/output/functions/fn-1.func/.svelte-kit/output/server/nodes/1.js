

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2fb80eaf.js","_app/immutable/chunks/scheduler.56f0b95c.js","_app/immutable/chunks/index.231d6169.js","_app/immutable/chunks/singletons.dcb18b4e.js"];
export const stylesheets = [];
export const fonts = [];
