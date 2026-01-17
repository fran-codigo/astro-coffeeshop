import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_JYmmoa5c.mjs';
import { manifest } from './manifest_BXU41s8g.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/404.astro.mjs');
const _page3 = () => import('./pages/blog/categoria/_slug_.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blog.astro.mjs');
const _page6 = () => import('./pages/contacto.astro.mjs');
const _page7 = () => import('./pages/galeria.astro.mjs');
const _page8 = () => import('./pages/menu.astro.mjs');
const _page9 = () => import('./pages/nosotros.astro.mjs');
const _page10 = () => import('./pages/proceso.astro.mjs');
const _page11 = () => import('./pages/testimoniales.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/blog/categoria/[slug].astro", _page3],
    ["src/pages/blog/[slug].astro", _page4],
    ["src/pages/blog.astro", _page5],
    ["src/pages/contacto.astro", _page6],
    ["src/pages/galeria.astro", _page7],
    ["src/pages/menu.astro", _page8],
    ["src/pages/nosotros.astro", _page9],
    ["src/pages/proceso.astro", _page10],
    ["src/pages/testimoniales.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f086dd66-1ea0-423f-bcd5-244bf6eebaf3",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
