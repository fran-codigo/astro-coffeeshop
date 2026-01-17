import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_Bz_JKUht.mjs';
import { $ as $$PostMeta, a as $$PostCategories } from '../../chunks/PostCategories_Gbrel0z8.mjs';
import { $ as $$Layout } from '../../chunks/Layout_D1uGzJ-K.mjs';
import { b as PostSchema } from '../../chunks/index_COEIsdxr.mjs';
import { $ as $$Picture } from '../../chunks/_astro_assets_vu656TRa.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const url = `${"http://localhost:3000/wp-json/wp/v2"}/posts?slug=${slug}`;
  const res = await fetch(url);
  const json = await res.json();
  const post = PostSchema.safeParse(json[0]);
  if (!post.success) return Astro2.redirect("/404");
  const { title, featured_images, date, category_details, content } = post.data;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title.rendered, "subtitle": title.rendered, "bgImage": featured_images.full.url }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="space-y-5 max-w-4xl mx-auto"> ${renderComponent($$result2, "PostMeta", $$PostMeta, { "date": date })} ${category_details.map((cat) => renderTemplate`${renderComponent($$result2, "PostCategories", $$PostCategories, { "name": cat.name, "slug": cat.slug })}`)} ${renderComponent($$result2, "Picture", $$Picture, { "src": featured_images.full.url, "alt": `Imagen del Post ${title.rendered}`, "width": featured_images.full.width, "height": featured_images.full.height, "formats": ["avif", "webp", "jpeg"], "class": "w-full" })} <div class="mt-5 text-lg space-y-3">${unescapeHTML(content.rendered)}</div> </article> ` })}`;
}, "/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/blog/[slug].astro", void 0);
const $$file = "/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
