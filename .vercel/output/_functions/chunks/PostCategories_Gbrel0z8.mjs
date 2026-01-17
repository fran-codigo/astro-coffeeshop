import { c as createComponent, b as createAstro, m as maybeRenderHead, a as renderTemplate, d as addAttribute } from './astro/server_Bz_JKUht.mjs';
import { f as formatDate } from './index_Dg9bEqM9.mjs';

const $$Astro$1 = createAstro();
const $$PostMeta = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostMeta;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p class="text-sm">
Escrito el: <span class="text-coffee-600">${formatDate(date)}</span> </p>`;
}, "/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/blog/PostMeta.astro", void 0);

const $$Astro = createAstro();
const $$PostCategories = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCategories;
  const { name, slug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/blog/categoria/${slug}`, "href")} class="inline-block py-1 px-5 bg-coffee-600 text-sm text-white mr-2 rounded"> ${name} </a>`;
}, "/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/blog/PostCategories.astro", void 0);

export { $$PostMeta as $, $$PostCategories as a };
