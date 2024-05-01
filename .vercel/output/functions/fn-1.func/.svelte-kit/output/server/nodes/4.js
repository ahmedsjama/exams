import * as server from '../entries/pages/_id_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.3eccc231.js","_app/immutable/chunks/scheduler.56f0b95c.js","_app/immutable/chunks/index.231d6169.js"];
export const stylesheets = [];
export const fonts = [];
