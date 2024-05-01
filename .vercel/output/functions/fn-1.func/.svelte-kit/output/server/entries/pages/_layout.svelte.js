import { c as create_ssr_component } from "../../chunks/ssr.js";
/* empty css                */const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex flex-col gap-1"><header></header> <main class="flex-1 flex">${slots.default ? slots.default({}) : ``}</main> <footer class="flex flex-col gap-2 py-4 text-center text-sm" data-svelte-h="svelte-1995uie"><p>Developed by <a href="https://wa.link/l9lp65" class="text-blue-400">Mohamed D. Nour</a></p> <p>Tisqaad © 2023. All rights reserved.</p></footer></div>`;
});
export {
  Layout as default
};
