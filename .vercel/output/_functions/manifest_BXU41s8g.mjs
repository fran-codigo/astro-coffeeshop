import { B as decodeKey } from './chunks/astro/server_Bz_JKUht.mjs';
import './chunks/astro-designed-error-pages_CLaiI4co.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_8j_7eNlc.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/","cacheDir":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/node_modules/.astro/","outDir":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/dist/","srcDir":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/","publicDir":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/public/","buildClientDir":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/dist/client/","buildServerDir":"file:///home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contacto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"galeria/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/galeria","isIndex":false,"type":"page","pattern":"^\\/galeria\\/?$","segments":[[{"content":"galeria","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/galeria.astro","pathname":"/galeria","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"menu/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/menu","isIndex":false,"type":"page","pattern":"^\\/menu\\/?$","segments":[[{"content":"menu","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/menu.astro","pathname":"/menu","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"nosotros/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"proceso/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proceso","isIndex":false,"type":"page","pattern":"^\\/proceso\\/?$","segments":[[{"content":"proceso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proceso.astro","pathname":"/proceso","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"testimoniales/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/testimoniales","isIndex":false,"type":"page","pattern":"^\\/testimoniales\\/?$","segments":[[{"content":"testimoniales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/testimoniales.astro","pathname":"/testimoniales","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?\\/?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blog.Co73PeX8.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/types/index.ts",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/blog/BlogPosts.astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/blog.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/gallery/HomeGallery.astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/menu/CoffeeMenu.astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/menu/ProductsMenu.astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/menu.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/menu@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/menu/FoodMenu.astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/testimonials/TestimonialsGrid.astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/testimoniales.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/testimoniales@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/blog/categoria/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/categoria/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/contacto.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/contacto@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/galeria.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/galeria@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/nosotros.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/nosotros@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/proceso.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/proceso@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/entrypoint":"entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/blog/categoria/[slug]@_@astro":"pages/blog/categoria/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/galeria@_@astro":"pages/galeria.astro.mjs","\u0000@astro-page:src/pages/menu@_@astro":"pages/menu.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/proceso@_@astro":"pages/proceso.astro.mjs","\u0000@astro-page:src/pages/testimoniales@_@astro":"pages/testimoniales.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BXU41s8g.mjs","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CrxFajnu.mjs","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/contact/LocationMap.astro?astro&type=script&index=0&lang.ts":"_astro/LocationMap.astro_astro_type_script_index_0_lang.DRD-B78Z.js","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/contact/ContactForm.astro?astro&type=script&index=0&lang.ts":"_astro/ContactForm.astro_astro_type_script_index_0_lang.CuRdGBTX.js","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/gallery/GalleryGrid.astro?astro&type=script&index=0&lang.ts":"_astro/GalleryGrid.astro_astro_type_script_index_0_lang.Bxe58n7Z.js","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/node_modules/.pnpm/astro@5.16.0_@types+node@24.10.1_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_rollup@4.53.3_typescript@5.9.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CwlK1e6z.js","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/menu/CoffeeMenu.astro?astro&type=script&index=0&lang.ts":"_astro/CoffeeMenu.astro_astro_type_script_index_0_lang.9roE87bX.js","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/src/components/menu/FoodMenu.astro?astro&type=script&index=0&lang.ts":"_astro/FoodMenu.astro_astro_type_script_index_0_lang.Cu4Schee.js","/home/fran/Documentos/cursos/4a-astro-cafeteria/astro-coffeeshop/node_modules/.pnpm/photoswipe@5.4.4/node_modules/photoswipe/dist/photoswipe.esm.js":"_astro/photoswipe.esm.CKV1Bsxh.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/bg_404.CD52rWbJ.jpg","/_astro/bg_home.CiaRDCtN.jpg","/_astro/logo.LA969ldy.svg","/_astro/menu_artwork.ByIYq0Ps.svg","/_astro/blog.Co73PeX8.css","/favicon.svg","/icon_coffee.svg","/icon_dessert.svg","/icon_tea.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CwlK1e6z.js","/_astro/CoffeeMenu.astro_astro_type_script_index_0_lang.9roE87bX.js","/_astro/ContactForm.KOmfmGu7.css","/_astro/ContactForm.astro_astro_type_script_index_0_lang.CuRdGBTX.js","/_astro/FoodMenu.astro_astro_type_script_index_0_lang.Cu4Schee.js","/_astro/GalleryGrid.astro_astro_type_script_index_0_lang.Bxe58n7Z.js","/_astro/LocationMap.CIGW-MKW.css","/_astro/LocationMap.astro_astro_type_script_index_0_lang.DRD-B78Z.js","/_astro/client.B9YBqyHK.js","/_astro/photoswipe.DYEyfI4O.js","/_astro/photoswipe.cPPnkASS.css","/_astro/photoswipe.esm.CKV1Bsxh.js","/404.html","/blog/index.html","/contacto/index.html","/galeria/index.html","/menu/index.html","/nosotros/index.html","/proceso/index.html","/testimoniales/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"xNUWdeIi8DW7qDeFh3ly6JT0gXpzV4gW/DB/Xp8EtaA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
