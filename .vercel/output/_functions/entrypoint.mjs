import { n as nullToEmptyString } from './chunks/index_Dg9bEqM9.mjs';
import { g as getActionQueryString, a as astroCalledServerError, A as ActionError, d as deserializeActionResult, b as ACTION_QUERY_PARAMS, c as appendForwardSlash } from './chunks/astro-designed-error-pages_CLaiI4co.mjs';
import { o as objectType, p as preprocessType, s as stringType } from './chunks/astro/server_Bz_JKUht.mjs';
import { d as defineAction } from './chunks/server_C9rh73um.mjs';

const internalFetchHeaders = {};

const apiContextRoutesSymbol = Symbol.for("context.routes");
const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (target.hasOwnProperty(objKey) || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // redefine prototype methods as the object's own property, not the prototype's
        bind: action.bind,
        valueOf: () => action.valueOf,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
function _getActionPath(toString) {
  let path = `${"/".replace(/\/$/, "")}/_actions/${new URLSearchParams(toString()).get(ACTION_QUERY_PARAMS.actionName)}`;
  {
    path = appendForwardSlash(path);
  }
  return path;
}
async function handleAction(param, path, context) {
  if (context) {
    const pipeline = Reflect.get(context, apiContextRoutesSymbol);
    if (!pipeline) {
      throw astroCalledServerError();
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
  const headers = new Headers();
  headers.set("Accept", "application/json");
  for (const [key, value] of Object.entries(internalFetchHeaders)) {
    headers.set(key, value);
  }
  let body = param;
  if (!(body instanceof FormData)) {
    try {
      body = JSON.stringify(param);
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Failed to serialize request body to JSON. Full error: ${e.message}`
      });
    }
    if (body) {
      headers.set("Content-Type", "application/json");
    } else {
      headers.set("Content-Length", "0");
    }
  }
  const rawResult = await fetch(
    _getActionPath(() => getActionQueryString(path)),
    {
      method: "POST",
      body,
      headers
    }
  );
  if (rawResult.status === 204) {
    return deserializeActionResult({ type: "empty", status: 204 });
  }
  const bodyText = await rawResult.text();
  if (rawResult.ok) {
    return deserializeActionResult({
      type: "data",
      body: bodyText,
      status: 200,
      contentType: "application/json+devalue"
    });
  }
  return deserializeActionResult({
    type: "error",
    body: bodyText,
    status: rawResult.status,
    contentType: "application/json"
  });
}
toActionProxy();

const contact = {
  sendEmail: defineAction({
    accept: "form",
    input: objectType({
      name: preprocessType(
        nullToEmptyString,
        stringType().min(1, { message: "El nombre es obligatorio" })
      ),
      email: preprocessType(
        nullToEmptyString,
        stringType().min(1, { message: "El correo es obligatorio" }).email({ message: "El correo no es válido" })
      ),
      subject: preprocessType(
        nullToEmptyString,
        stringType().min(1, { message: "El asunt es obligatorio" })
      ),
      message: preprocessType(
        nullToEmptyString,
        stringType().min(15, { message: "El mensaje es obligatorio o es muy corto" })
      )
    }),
    handler: async (input) => {
      const url = `${"http://localhost:3000"}/wp-json/contact-form-7/v1/contact-forms/142/feedback`;
      const formData = new FormData();
      formData.append("your-name", input.name);
      formData.append("your-email", input.email);
      formData.append("your-subject", input.subject);
      formData.append("your-message", input.message);
      formData.append("_wpcf7_unit_tag", "wpcf709");
      const res = await fetch(url, {
        method: "POST",
        body: formData
      });
      await res.json();
      return {
        error: false,
        message: "Tu mensaje se ha enviado correctamente."
      };
    }
  })
};

const server = {
  contact
};

export { server };
