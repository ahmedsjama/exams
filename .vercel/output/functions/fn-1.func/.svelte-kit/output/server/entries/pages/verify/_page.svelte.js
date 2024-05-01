import { c as create_ssr_component, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import "devalue";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<section class="flex-1 flex flex-col justify-center items-center"><div class="w-full max-w-[400px] p-4 border-2 rounded-md flex flex-col gap-4"><h3 class="font-semibold text-lg" data-svelte-h="svelte-xclxhj">Verify it&#39;s you</h3> <form method="POST" action="?/verify" class="space-y-2"><label class="text-sm font-medium text-gray-500" for="PIN" data-svelte-h="svelte-mw6j50">PIN No.</label> <input class="w-full p-2 px-4 border-2 rounded-sm" placeholder="PIN No." type="number" id="PIN" name="PIN"> <input type="hidden" name="ID"${add_attribute("value", data.id, 0)}> ${form?.error ? `<p>${escape(form?.error)}</p>` : ``} <button${add_attribute("class", `w-full h-10 ${"bg-blue-700"} font-medium text-white rounded-sm`, 0)} ${""}>${escape("Verify")}</button></form></div></section>`;
});
export {
  Page as default
};
