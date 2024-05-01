

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.085d23b2.js","_app/immutable/chunks/scheduler.56f0b95c.js","_app/immutable/chunks/index.231d6169.js"];
export const stylesheets = ["_app/immutable/assets/app.fba3abf4.css"];
export const fonts = [];
