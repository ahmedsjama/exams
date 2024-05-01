globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb2, mod) => function __require() {
  return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b2) {
  return a != a ? b2 == b2 : a !== b2 || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function validate_component(component4, name3) {
  if (!component4 || !component4.$$render) {
    if (name3 === "svelte:component")
      name3 += " this={...}";
    throw new Error(
      `<${name3}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name3}>.`
    );
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name3, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name3}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/@firebase/util/dist/index.esm2017.js
function getGlobal() {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("Unable to locate global object.");
}
function createMockUserToken(token2, projectId) {
  if (token2.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  const header = {
    alg: "none",
    type: "JWT"
  };
  const project = projectId || "demo-project";
  const iat = token2.iat || 0;
  const sub = token2.sub || token2.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    }
  }, token2);
  const signature = "";
  return [
    base64urlEncodeWithoutPadding(JSON.stringify(header)),
    base64urlEncodeWithoutPadding(JSON.stringify(payload)),
    signature
  ].join(".");
}
function isIndexedDBAvailable() {
  try {
    return typeof indexedDB === "object";
  } catch (e) {
    return false;
  }
}
function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };
      request.onerror = () => {
        var _a;
        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || "");
      };
    } catch (error2) {
      reject(error2);
    }
  });
}
function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key2) => {
    const value = data[key2];
    return value != null ? String(value) : `<${key2}?>`;
  });
}
function deepEqual(a, b2) {
  if (a === b2) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b2);
  for (const k2 of aKeys) {
    if (!bKeys.includes(k2)) {
      return false;
    }
    const aProp = a[k2];
    const bProp = b2[k2];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (const k2 of bKeys) {
    if (!aKeys.includes(k2)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && typeof thing === "object";
}
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
var stringToByteArray$1, byteArrayToString, base64, DecodeBase64StringError, base64Encode, base64urlEncodeWithoutPadding, base64Decode, getDefaultsFromGlobal, getDefaultsFromEnvVariable, getDefaultsFromCookie, getDefaults, getDefaultEmulatorHost, getDefaultEmulatorHostnameAndPort, getDefaultAppConfig, Deferred, ERROR_NAME, FirebaseError, ErrorFactory, PATTERN, MAX_VALUE_MILLIS;
var init_index_esm2017 = __esm({
  "node_modules/@firebase/util/dist/index.esm2017.js"() {
    stringToByteArray$1 = function(str) {
      const out = [];
      let p2 = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 128) {
          out[p2++] = c;
        } else if (c < 2048) {
          out[p2++] = c >> 6 | 192;
          out[p2++] = c & 63 | 128;
        } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
          c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
          out[p2++] = c >> 18 | 240;
          out[p2++] = c >> 12 & 63 | 128;
          out[p2++] = c >> 6 & 63 | 128;
          out[p2++] = c & 63 | 128;
        } else {
          out[p2++] = c >> 12 | 224;
          out[p2++] = c >> 6 & 63 | 128;
          out[p2++] = c & 63 | 128;
        }
      }
      return out;
    };
    byteArrayToString = function(bytes) {
      const out = [];
      let pos = 0, c = 0;
      while (pos < bytes.length) {
        const c1 = bytes[pos++];
        if (c1 < 128) {
          out[c++] = String.fromCharCode(c1);
        } else if (c1 > 191 && c1 < 224) {
          const c2 = bytes[pos++];
          out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if (c1 > 239 && c1 < 365) {
          const c2 = bytes[pos++];
          const c3 = bytes[pos++];
          const c4 = bytes[pos++];
          const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
          out[c++] = String.fromCharCode(55296 + (u >> 10));
          out[c++] = String.fromCharCode(56320 + (u & 1023));
        } else {
          const c2 = bytes[pos++];
          const c3 = bytes[pos++];
          out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
      }
      return out.join("");
    };
    base64 = {
      /**
       * Maps bytes to characters.
       */
      byteToCharMap_: null,
      /**
       * Maps characters to bytes.
       */
      charToByteMap_: null,
      /**
       * Maps bytes to websafe characters.
       * @private
       */
      byteToCharMapWebSafe_: null,
      /**
       * Maps websafe characters to bytes.
       * @private
       */
      charToByteMapWebSafe_: null,
      /**
       * Our default alphabet, shared between
       * ENCODED_VALS and ENCODED_VALS_WEBSAFE
       */
      ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      /**
       * Our default alphabet. Value 64 (=) is special; it means "nothing."
       */
      get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/=";
      },
      /**
       * Our websafe alphabet.
       */
      get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_.";
      },
      /**
       * Whether this browser supports the atob and btoa functions. This extension
       * started at Mozilla but is now implemented by many browsers. We use the
       * ASSUME_* variables to avoid pulling in the full useragent detection library
       * but still allowing the standard per-browser compilations.
       *
       */
      HAS_NATIVE_SUPPORT: typeof atob === "function",
      /**
       * Base64-encode an array of bytes.
       *
       * @param input An array of bytes (numbers with
       *     value in [0, 255]) to encode.
       * @param webSafe Boolean indicating we should use the
       *     alternative alphabet.
       * @return The base64 encoded string.
       */
      encodeByteArray(input, webSafe) {
        if (!Array.isArray(input)) {
          throw Error("encodeByteArray takes an array as a parameter");
        }
        this.init_();
        const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
        const output = [];
        for (let i = 0; i < input.length; i += 3) {
          const byte1 = input[i];
          const haveByte2 = i + 1 < input.length;
          const byte2 = haveByte2 ? input[i + 1] : 0;
          const haveByte3 = i + 2 < input.length;
          const byte3 = haveByte3 ? input[i + 2] : 0;
          const outByte1 = byte1 >> 2;
          const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
          let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
          let outByte4 = byte3 & 63;
          if (!haveByte3) {
            outByte4 = 64;
            if (!haveByte2) {
              outByte3 = 64;
            }
          }
          output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join("");
      },
      /**
       * Base64-encode a string.
       *
       * @param input A string to encode.
       * @param webSafe If true, we should use the
       *     alternative alphabet.
       * @return The base64 encoded string.
       */
      encodeString(input, webSafe) {
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
          return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray$1(input), webSafe);
      },
      /**
       * Base64-decode a string.
       *
       * @param input to decode.
       * @param webSafe True if we should use the
       *     alternative alphabet.
       * @return string representing the decoded value.
       */
      decodeString(input, webSafe) {
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
          return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
      },
      /**
       * Base64-decode a string.
       *
       * In base-64 decoding, groups of four characters are converted into three
       * bytes.  If the encoder did not apply padding, the input length may not
       * be a multiple of 4.
       *
       * In this case, the last group will have fewer than 4 characters, and
       * padding will be inferred.  If the group has one or two characters, it decodes
       * to one byte.  If the group has three characters, it decodes to two bytes.
       *
       * @param input Input to decode.
       * @param webSafe True if we should use the web-safe alphabet.
       * @return bytes representing the decoded value.
       */
      decodeStringToByteArray(input, webSafe) {
        this.init_();
        const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
        const output = [];
        for (let i = 0; i < input.length; ) {
          const byte1 = charToByteMap[input.charAt(i++)];
          const haveByte2 = i < input.length;
          const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
          ++i;
          const haveByte3 = i < input.length;
          const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
          ++i;
          const haveByte4 = i < input.length;
          const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
          ++i;
          if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
            throw new DecodeBase64StringError();
          }
          const outByte1 = byte1 << 2 | byte2 >> 4;
          output.push(outByte1);
          if (byte3 !== 64) {
            const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
            output.push(outByte2);
            if (byte4 !== 64) {
              const outByte3 = byte3 << 6 & 192 | byte4;
              output.push(outByte3);
            }
          }
        }
        return output;
      },
      /**
       * Lazy static initialization function. Called before
       * accessing any of the static map variables.
       * @private
       */
      init_() {
        if (!this.byteToCharMap_) {
          this.byteToCharMap_ = {};
          this.charToByteMap_ = {};
          this.byteToCharMapWebSafe_ = {};
          this.charToByteMapWebSafe_ = {};
          for (let i = 0; i < this.ENCODED_VALS.length; i++) {
            this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
            this.charToByteMap_[this.byteToCharMap_[i]] = i;
            this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
            this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
            if (i >= this.ENCODED_VALS_BASE.length) {
              this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
              this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
            }
          }
        }
      }
    };
    DecodeBase64StringError = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "DecodeBase64StringError";
      }
    };
    base64Encode = function(str) {
      const utf8Bytes = stringToByteArray$1(str);
      return base64.encodeByteArray(utf8Bytes, true);
    };
    base64urlEncodeWithoutPadding = function(str) {
      return base64Encode(str).replace(/\./g, "");
    };
    base64Decode = function(str) {
      try {
        return base64.decodeString(str, true);
      } catch (e) {
        console.error("base64Decode failed: ", e);
      }
      return null;
    };
    getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
    getDefaultsFromEnvVariable = () => {
      if (typeof process === "undefined" || typeof process.env === "undefined") {
        return;
      }
      const defaultsJsonString = process.env.__FIREBASE_DEFAULTS__;
      if (defaultsJsonString) {
        return JSON.parse(defaultsJsonString);
      }
    };
    getDefaultsFromCookie = () => {
      if (typeof document === "undefined") {
        return;
      }
      let match;
      try {
        match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
      } catch (e) {
        return;
      }
      const decoded = match && base64Decode(match[1]);
      return decoded && JSON.parse(decoded);
    };
    getDefaults = () => {
      try {
        return getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
      } catch (e) {
        console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
        return;
      }
    };
    getDefaultEmulatorHost = (productName) => {
      var _a, _b;
      return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
    };
    getDefaultEmulatorHostnameAndPort = (productName) => {
      const host = getDefaultEmulatorHost(productName);
      if (!host) {
        return void 0;
      }
      const separatorIndex = host.lastIndexOf(":");
      if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
        throw new Error(`Invalid host ${host} with no separate hostname and port!`);
      }
      const port = parseInt(host.substring(separatorIndex + 1), 10);
      if (host[0] === "[") {
        return [host.substring(1, separatorIndex - 1), port];
      } else {
        return [host.substring(0, separatorIndex), port];
      }
    };
    getDefaultAppConfig = () => {
      var _a;
      return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
    };
    Deferred = class {
      constructor() {
        this.reject = () => {
        };
        this.resolve = () => {
        };
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }
      /**
       * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
       * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
       * and returns a node-style callback which will resolve or reject the Deferred's promise.
       */
      wrapCallback(callback) {
        return (error2, value) => {
          if (error2) {
            this.reject(error2);
          } else {
            this.resolve(value);
          }
          if (typeof callback === "function") {
            this.promise.catch(() => {
            });
            if (callback.length === 1) {
              callback(error2);
            } else {
              callback(error2, value);
            }
          }
        };
      }
    };
    ERROR_NAME = "FirebaseError";
    FirebaseError = class _FirebaseError extends Error {
      constructor(code, message, customData) {
        super(message);
        this.code = code;
        this.customData = customData;
        this.name = ERROR_NAME;
        Object.setPrototypeOf(this, _FirebaseError.prototype);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, ErrorFactory.prototype.create);
        }
      }
    };
    ErrorFactory = class {
      constructor(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
      }
      create(code, ...data) {
        const customData = data[0] || {};
        const fullCode = `${this.service}/${code}`;
        const template = this.errors[code];
        const message = template ? replaceTemplate(template, customData) : "Error";
        const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
        const error2 = new FirebaseError(fullCode, fullMessage, customData);
        return error2;
      }
    };
    PATTERN = /\{\$([^}]+)}/g;
    MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;
  }
});

// node_modules/@firebase/component/dist/esm/index.esm2017.js
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
}
function isComponentEager(component4) {
  return component4.instantiationMode === "EAGER";
}
var Component, DEFAULT_ENTRY_NAME, Provider, ComponentContainer;
var init_index_esm20172 = __esm({
  "node_modules/@firebase/component/dist/esm/index.esm2017.js"() {
    init_index_esm2017();
    Component = class {
      /**
       *
       * @param name The public service name, e.g. app, auth, firestore, database
       * @param instanceFactory Service factory responsible for creating the public interface
       * @param type whether the service provided by the component is public or private
       */
      constructor(name3, instanceFactory, type) {
        this.name = name3;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        this.serviceProps = {};
        this.instantiationMode = "LAZY";
        this.onInstanceCreated = null;
      }
      setInstantiationMode(mode) {
        this.instantiationMode = mode;
        return this;
      }
      setMultipleInstances(multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
      }
      setServiceProps(props) {
        this.serviceProps = props;
        return this;
      }
      setInstanceCreatedCallback(callback) {
        this.onInstanceCreated = callback;
        return this;
      }
    };
    DEFAULT_ENTRY_NAME = "[DEFAULT]";
    Provider = class {
      constructor(name3, container) {
        this.name = name3;
        this.container = container;
        this.component = null;
        this.instances = /* @__PURE__ */ new Map();
        this.instancesDeferred = /* @__PURE__ */ new Map();
        this.instancesOptions = /* @__PURE__ */ new Map();
        this.onInitCallbacks = /* @__PURE__ */ new Map();
      }
      /**
       * @param identifier A provider can provide mulitple instances of a service
       * if this.component.multipleInstances is true.
       */
      get(identifier) {
        const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
          const deferred = new Deferred();
          this.instancesDeferred.set(normalizedIdentifier, deferred);
          if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
            try {
              const instance = this.getOrInitializeService({
                instanceIdentifier: normalizedIdentifier
              });
              if (instance) {
                deferred.resolve(instance);
              }
            } catch (e) {
            }
          }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
      }
      getImmediate(options2) {
        var _a;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(options2 === null || options2 === void 0 ? void 0 : options2.identifier);
        const optional = (_a = options2 === null || options2 === void 0 ? void 0 : options2.optional) !== null && _a !== void 0 ? _a : false;
        if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
          try {
            return this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
          } catch (e) {
            if (optional) {
              return null;
            } else {
              throw e;
            }
          }
        } else {
          if (optional) {
            return null;
          } else {
            throw Error(`Service ${this.name} is not available`);
          }
        }
      }
      getComponent() {
        return this.component;
      }
      setComponent(component4) {
        if (component4.name !== this.name) {
          throw Error(`Mismatching Component ${component4.name} for Provider ${this.name}.`);
        }
        if (this.component) {
          throw Error(`Component for ${this.name} has already been provided`);
        }
        this.component = component4;
        if (!this.shouldAutoInitialize()) {
          return;
        }
        if (isComponentEager(component4)) {
          try {
            this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
          } catch (e) {
          }
        }
        for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
          const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          try {
            const instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
            instanceDeferred.resolve(instance);
          } catch (e) {
          }
        }
      }
      clearInstance(identifier = DEFAULT_ENTRY_NAME) {
        this.instancesDeferred.delete(identifier);
        this.instancesOptions.delete(identifier);
        this.instances.delete(identifier);
      }
      // app.delete() will call this method on every provider to delete the services
      // TODO: should we mark the provider as deleted?
      async delete() {
        const services = Array.from(this.instances.values());
        await Promise.all([
          ...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()),
          ...services.filter((service) => "_delete" in service).map((service) => service._delete())
        ]);
      }
      isComponentSet() {
        return this.component != null;
      }
      isInitialized(identifier = DEFAULT_ENTRY_NAME) {
        return this.instances.has(identifier);
      }
      getOptions(identifier = DEFAULT_ENTRY_NAME) {
        return this.instancesOptions.get(identifier) || {};
      }
      initialize(opts = {}) {
        const { options: options2 = {} } = opts;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
        if (this.isInitialized(normalizedIdentifier)) {
          throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
        }
        if (!this.isComponentSet()) {
          throw Error(`Component ${this.name} has not been registered yet`);
        }
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier,
          options: options2
        });
        for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
          const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          if (normalizedIdentifier === normalizedDeferredIdentifier) {
            instanceDeferred.resolve(instance);
          }
        }
        return instance;
      }
      /**
       *
       * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
       * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
       *
       * @param identifier An optional instance identifier
       * @returns a function to unregister the callback
       */
      onInit(callback, identifier) {
        var _a;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
        existingCallbacks.add(callback);
        this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
        const existingInstance = this.instances.get(normalizedIdentifier);
        if (existingInstance) {
          callback(existingInstance, normalizedIdentifier);
        }
        return () => {
          existingCallbacks.delete(callback);
        };
      }
      /**
       * Invoke onInit callbacks synchronously
       * @param instance the service instance`
       */
      invokeOnInitCallbacks(instance, identifier) {
        const callbacks = this.onInitCallbacks.get(identifier);
        if (!callbacks) {
          return;
        }
        for (const callback of callbacks) {
          try {
            callback(instance, identifier);
          } catch (_a) {
          }
        }
      }
      getOrInitializeService({ instanceIdentifier, options: options2 = {} }) {
        let instance = this.instances.get(instanceIdentifier);
        if (!instance && this.component) {
          instance = this.component.instanceFactory(this.container, {
            instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
            options: options2
          });
          this.instances.set(instanceIdentifier, instance);
          this.instancesOptions.set(instanceIdentifier, options2);
          this.invokeOnInitCallbacks(instance, instanceIdentifier);
          if (this.component.onInstanceCreated) {
            try {
              this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
            } catch (_a) {
            }
          }
        }
        return instance || null;
      }
      normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
        if (this.component) {
          return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        } else {
          return identifier;
        }
      }
      shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT";
      }
    };
    ComponentContainer = class {
      constructor(name3) {
        this.name = name3;
        this.providers = /* @__PURE__ */ new Map();
      }
      /**
       *
       * @param component Component being added
       * @param overwrite When a component with the same name has already been registered,
       * if overwrite is true: overwrite the existing component with the new component and create a new
       * provider with the new component. It can be useful in tests where you want to use different mocks
       * for different tests.
       * if overwrite is false: throw an exception
       */
      addComponent(component4) {
        const provider = this.getProvider(component4.name);
        if (provider.isComponentSet()) {
          throw new Error(`Component ${component4.name} has already been registered with ${this.name}`);
        }
        provider.setComponent(component4);
      }
      addOrOverwriteComponent(component4) {
        const provider = this.getProvider(component4.name);
        if (provider.isComponentSet()) {
          this.providers.delete(component4.name);
        }
        this.addComponent(component4);
      }
      /**
       * getProvider provides a type safe interface where it can only be called with a field name
       * present in NameServiceMapping interface.
       *
       * Firebase SDKs providing services should extend NameServiceMapping interface to register
       * themselves.
       */
      getProvider(name3) {
        if (this.providers.has(name3)) {
          return this.providers.get(name3);
        }
        const provider = new Provider(name3, this);
        this.providers.set(name3, provider);
        return provider;
      }
      getProviders() {
        return Array.from(this.providers.values());
      }
    };
  }
});

// node_modules/@firebase/logger/dist/esm/index.esm2017.js
var instances, LogLevel, levelStringToEnum, defaultLogLevel, ConsoleMethod, defaultLogHandler, Logger;
var init_index_esm20173 = __esm({
  "node_modules/@firebase/logger/dist/esm/index.esm2017.js"() {
    instances = [];
    (function(LogLevel2) {
      LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
      LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
      LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
      LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
      LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
      LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    levelStringToEnum = {
      "debug": LogLevel.DEBUG,
      "verbose": LogLevel.VERBOSE,
      "info": LogLevel.INFO,
      "warn": LogLevel.WARN,
      "error": LogLevel.ERROR,
      "silent": LogLevel.SILENT
    };
    defaultLogLevel = LogLevel.INFO;
    ConsoleMethod = {
      [LogLevel.DEBUG]: "log",
      [LogLevel.VERBOSE]: "log",
      [LogLevel.INFO]: "info",
      [LogLevel.WARN]: "warn",
      [LogLevel.ERROR]: "error"
    };
    defaultLogHandler = (instance, logType, ...args) => {
      if (logType < instance.logLevel) {
        return;
      }
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const method = ConsoleMethod[logType];
      if (method) {
        console[method](`[${now}]  ${instance.name}:`, ...args);
      } else {
        throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
      }
    };
    Logger = class {
      /**
       * Gives you an instance of a Logger to capture messages according to
       * Firebase's logging scheme.
       *
       * @param name The name that the logs will be associated with
       */
      constructor(name3) {
        this.name = name3;
        this._logLevel = defaultLogLevel;
        this._logHandler = defaultLogHandler;
        this._userLogHandler = null;
        instances.push(this);
      }
      get logLevel() {
        return this._logLevel;
      }
      set logLevel(val) {
        if (!(val in LogLevel)) {
          throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
        }
        this._logLevel = val;
      }
      // Workaround for setter/getter having to be the same type.
      setLogLevel(val) {
        this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
      }
      get logHandler() {
        return this._logHandler;
      }
      set logHandler(val) {
        if (typeof val !== "function") {
          throw new TypeError("Value assigned to `logHandler` must be a function");
        }
        this._logHandler = val;
      }
      get userLogHandler() {
        return this._userLogHandler;
      }
      set userLogHandler(val) {
        this._userLogHandler = val;
      }
      /**
       * The functions below are all based on the `console` interface
       */
      debug(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
        this._logHandler(this, LogLevel.DEBUG, ...args);
      }
      log(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
        this._logHandler(this, LogLevel.VERBOSE, ...args);
      }
      info(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
        this._logHandler(this, LogLevel.INFO, ...args);
      }
      warn(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
        this._logHandler(this, LogLevel.WARN, ...args);
      }
      error(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
        this._logHandler(this, LogLevel.ERROR, ...args);
      }
    };
  }
});

// node_modules/idb/build/wrap-idb-value.js
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error2);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error2 = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error2);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error2);
      tx.removeEventListener("abort", error2);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error2 = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error2);
    tx.addEventListener("abort", error2);
  });
  transactionDoneMap.set(tx, done);
}
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
var instanceOfAny, idbProxyableTypes, cursorAdvanceMethods, cursorRequestMap, transactionDoneMap, transactionStoreNamesMap, transformCache, reverseTransformCache, idbProxyTraps, unwrap;
var init_wrap_idb_value = __esm({
  "node_modules/idb/build/wrap-idb-value.js"() {
    instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
    cursorRequestMap = /* @__PURE__ */ new WeakMap();
    transactionDoneMap = /* @__PURE__ */ new WeakMap();
    transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
    transformCache = /* @__PURE__ */ new WeakMap();
    reverseTransformCache = /* @__PURE__ */ new WeakMap();
    idbProxyTraps = {
      get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
          if (prop === "done")
            return transactionDoneMap.get(target);
          if (prop === "objectStoreNames") {
            return target.objectStoreNames || transactionStoreNamesMap.get(target);
          }
          if (prop === "store") {
            return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
          }
        }
        return wrap(target[prop]);
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
      has(target, prop) {
        if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
          return true;
        }
        return prop in target;
      }
    };
    unwrap = (value) => reverseTransformCache.get(value);
  }
});

// node_modules/idb/build/index.js
function openDB(name3, version3, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name3, version3);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db2) => {
    if (terminated)
      db2.addEventListener("close", () => terminated());
    if (blocking) {
      db2.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
var readMethods, writeMethods, cachedMethods;
var init_build = __esm({
  "node_modules/idb/build/index.js"() {
    init_wrap_idb_value();
    init_wrap_idb_value();
    readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
    writeMethods = ["put", "add", "delete", "clear"];
    cachedMethods = /* @__PURE__ */ new Map();
    replaceTraps((oldTraps) => ({
      ...oldTraps,
      get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
      has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
    }));
  }
});

// node_modules/@firebase/app/dist/esm/index.esm2017.js
function isVersionServiceProvider(provider) {
  const component4 = provider.getComponent();
  return (component4 === null || component4 === void 0 ? void 0 : component4.type) === "VERSION";
}
function _addComponent(app2, component4) {
  try {
    app2.container.addComponent(component4);
  } catch (e) {
    logger.debug(`Component ${component4.name} failed to register with FirebaseApp ${app2.name}`, e);
  }
}
function _registerComponent(component4) {
  const componentName = component4.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component4);
  for (const app2 of _apps.values()) {
    _addComponent(app2, component4);
  }
  return true;
}
function _getProvider(app2, name3) {
  const heartbeatController = app2.container.getProvider("heartbeat").getImmediate({ optional: true });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app2.container.getProvider(name3);
}
function initializeApp(_options2, rawConfig = {}) {
  let options2 = _options2;
  if (typeof rawConfig !== "object") {
    const name4 = rawConfig;
    rawConfig = { name: name4 };
  }
  const config2 = Object.assign({ name: DEFAULT_ENTRY_NAME2, automaticDataCollectionEnabled: false }, rawConfig);
  const name3 = config2.name;
  if (typeof name3 !== "string" || !name3) {
    throw ERROR_FACTORY.create("bad-app-name", {
      appName: String(name3)
    });
  }
  options2 || (options2 = getDefaultAppConfig());
  if (!options2) {
    throw ERROR_FACTORY.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  }
  const existingApp = _apps.get(name3);
  if (existingApp) {
    if (deepEqual(options2, existingApp.options) && deepEqual(config2, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app", { appName: name3 });
    }
  }
  const container = new ComponentContainer(name3);
  for (const component4 of _components.values()) {
    container.addComponent(component4);
  }
  const newApp = new FirebaseAppImpl(options2, config2, container);
  _apps.set(name3, newApp);
  return newApp;
}
function getApp(name3 = DEFAULT_ENTRY_NAME2) {
  const app2 = _apps.get(name3);
  if (!app2 && name3 === DEFAULT_ENTRY_NAME2 && getDefaultAppConfig()) {
    return initializeApp();
  }
  if (!app2) {
    throw ERROR_FACTORY.create("no-app", { appName: name3 });
  }
  return app2;
}
function registerVersion(libraryKeyOrName, version3, variant) {
  var _a;
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version3.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [
      `Unable to register library "${library}" with version "${version3}":`
    ];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push("and");
    }
    if (versionMismatch) {
      warning.push(`version name "${version3}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(" "));
    return;
  }
  _registerComponent(new Component(
    `${library}-version`,
    () => ({ library, version: version3 }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade: (db2, oldVersion) => {
        switch (oldVersion) {
          case 0:
            db2.createObjectStore(STORE_NAME);
        }
      }
    }).catch((e) => {
      throw ERROR_FACTORY.create("idb-open", {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app2) {
  try {
    const db2 = await getDbPromise();
    const result = await db2.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app2));
    return result;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app2, heartbeatObject) {
  try {
    const db2 = await getDbPromise();
    const tx = db2.transaction(STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app2));
    await tx.done;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app2) {
  return `${app2.name}!${app2.options.appId}`;
}
function getUTCDateString() {
  const today = /* @__PURE__ */ new Date();
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  const heartbeatsToSend = [];
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    const heartbeatEntry = heartbeatsToSend.find((hb2) => hb2.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
function countBytes(heartbeatsCache) {
  return base64urlEncodeWithoutPadding(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: heartbeatsCache })
  ).length;
}
function registerCoreComponents(variant) {
  _registerComponent(new Component(
    "platform-logger",
    (container) => new PlatformLoggerServiceImpl(container),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  _registerComponent(new Component(
    "heartbeat",
    (container) => new HeartbeatServiceImpl(container),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  registerVersion(name$o, version$1, variant);
  registerVersion(name$o, version$1, "esm2017");
  registerVersion("fire-js", "");
}
var PlatformLoggerServiceImpl, name$o, version$1, logger, name$n, name$m, name$l, name$k, name$j, name$i, name$h, name$g, name$f, name$e, name$d, name$c, name$b, name$a, name$9, name$8, name$7, name$6, name$5, name$4, name$3, name$2, name$1, name, version, DEFAULT_ENTRY_NAME2, PLATFORM_LOG_STRING, _apps, _components, ERRORS, ERROR_FACTORY, FirebaseAppImpl, SDK_VERSION, DB_NAME, DB_VERSION, STORE_NAME, dbPromise, MAX_HEADER_BYTES, STORED_HEARTBEAT_RETENTION_MAX_MILLIS, HeartbeatServiceImpl, HeartbeatStorageImpl;
var init_index_esm20174 = __esm({
  "node_modules/@firebase/app/dist/esm/index.esm2017.js"() {
    init_index_esm20172();
    init_index_esm20173();
    init_index_esm2017();
    init_index_esm2017();
    init_build();
    PlatformLoggerServiceImpl = class {
      constructor(container) {
        this.container = container;
      }
      // In initial implementation, this will be called by installations on
      // auth token refresh, and installations will send this string.
      getPlatformInfoString() {
        const providers = this.container.getProviders();
        return providers.map((provider) => {
          if (isVersionServiceProvider(provider)) {
            const service = provider.getImmediate();
            return `${service.library}/${service.version}`;
          } else {
            return null;
          }
        }).filter((logString) => logString).join(" ");
      }
    };
    name$o = "@firebase/app";
    version$1 = "0.9.22";
    logger = new Logger("@firebase/app");
    name$n = "@firebase/app-compat";
    name$m = "@firebase/analytics-compat";
    name$l = "@firebase/analytics";
    name$k = "@firebase/app-check-compat";
    name$j = "@firebase/app-check";
    name$i = "@firebase/auth";
    name$h = "@firebase/auth-compat";
    name$g = "@firebase/database";
    name$f = "@firebase/database-compat";
    name$e = "@firebase/functions";
    name$d = "@firebase/functions-compat";
    name$c = "@firebase/installations";
    name$b = "@firebase/installations-compat";
    name$a = "@firebase/messaging";
    name$9 = "@firebase/messaging-compat";
    name$8 = "@firebase/performance";
    name$7 = "@firebase/performance-compat";
    name$6 = "@firebase/remote-config";
    name$5 = "@firebase/remote-config-compat";
    name$4 = "@firebase/storage";
    name$3 = "@firebase/storage-compat";
    name$2 = "@firebase/firestore";
    name$1 = "@firebase/firestore-compat";
    name = "firebase";
    version = "10.5.2";
    DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
    PLATFORM_LOG_STRING = {
      [name$o]: "fire-core",
      [name$n]: "fire-core-compat",
      [name$l]: "fire-analytics",
      [name$m]: "fire-analytics-compat",
      [name$j]: "fire-app-check",
      [name$k]: "fire-app-check-compat",
      [name$i]: "fire-auth",
      [name$h]: "fire-auth-compat",
      [name$g]: "fire-rtdb",
      [name$f]: "fire-rtdb-compat",
      [name$e]: "fire-fn",
      [name$d]: "fire-fn-compat",
      [name$c]: "fire-iid",
      [name$b]: "fire-iid-compat",
      [name$a]: "fire-fcm",
      [name$9]: "fire-fcm-compat",
      [name$8]: "fire-perf",
      [name$7]: "fire-perf-compat",
      [name$6]: "fire-rc",
      [name$5]: "fire-rc-compat",
      [name$4]: "fire-gcs",
      [name$3]: "fire-gcs-compat",
      [name$2]: "fire-fst",
      [name$1]: "fire-fst-compat",
      "fire-js": "fire-js",
      [name]: "fire-js-all"
    };
    _apps = /* @__PURE__ */ new Map();
    _components = /* @__PURE__ */ new Map();
    ERRORS = {
      [
        "no-app"
        /* AppError.NO_APP */
      ]: "No Firebase App '{$appName}' has been created - call initializeApp() first",
      [
        "bad-app-name"
        /* AppError.BAD_APP_NAME */
      ]: "Illegal App name: '{$appName}",
      [
        "duplicate-app"
        /* AppError.DUPLICATE_APP */
      ]: "Firebase App named '{$appName}' already exists with different options or config",
      [
        "app-deleted"
        /* AppError.APP_DELETED */
      ]: "Firebase App named '{$appName}' already deleted",
      [
        "no-options"
        /* AppError.NO_OPTIONS */
      ]: "Need to provide options, when not being deployed to hosting via source.",
      [
        "invalid-app-argument"
        /* AppError.INVALID_APP_ARGUMENT */
      ]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
      [
        "invalid-log-argument"
        /* AppError.INVALID_LOG_ARGUMENT */
      ]: "First argument to `onLog` must be null or a function.",
      [
        "idb-open"
        /* AppError.IDB_OPEN */
      ]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
      [
        "idb-get"
        /* AppError.IDB_GET */
      ]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
      [
        "idb-set"
        /* AppError.IDB_WRITE */
      ]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
      [
        "idb-delete"
        /* AppError.IDB_DELETE */
      ]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
    };
    ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
    FirebaseAppImpl = class {
      constructor(options2, config2, container) {
        this._isDeleted = false;
        this._options = Object.assign({}, options2);
        this._config = Object.assign({}, config2);
        this._name = config2.name;
        this._automaticDataCollectionEnabled = config2.automaticDataCollectionEnabled;
        this._container = container;
        this.container.addComponent(new Component(
          "app",
          () => this,
          "PUBLIC"
          /* ComponentType.PUBLIC */
        ));
      }
      get automaticDataCollectionEnabled() {
        this.checkDestroyed();
        return this._automaticDataCollectionEnabled;
      }
      set automaticDataCollectionEnabled(val) {
        this.checkDestroyed();
        this._automaticDataCollectionEnabled = val;
      }
      get name() {
        this.checkDestroyed();
        return this._name;
      }
      get options() {
        this.checkDestroyed();
        return this._options;
      }
      get config() {
        this.checkDestroyed();
        return this._config;
      }
      get container() {
        return this._container;
      }
      get isDeleted() {
        return this._isDeleted;
      }
      set isDeleted(val) {
        this._isDeleted = val;
      }
      /**
       * This function will throw an Error if the App has already been deleted -
       * use before performing API actions on the App.
       */
      checkDestroyed() {
        if (this.isDeleted) {
          throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
        }
      }
    };
    SDK_VERSION = version;
    DB_NAME = "firebase-heartbeat-database";
    DB_VERSION = 1;
    STORE_NAME = "firebase-heartbeat-store";
    dbPromise = null;
    MAX_HEADER_BYTES = 1024;
    STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1e3;
    HeartbeatServiceImpl = class {
      constructor(container) {
        this.container = container;
        this._heartbeatsCache = null;
        const app2 = this.container.getProvider("app").getImmediate();
        this._storage = new HeartbeatStorageImpl(app2);
        this._heartbeatsCachePromise = this._storage.read().then((result) => {
          this._heartbeatsCache = result;
          return result;
        });
      }
      /**
       * Called to report a heartbeat. The function will generate
       * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
       * to IndexedDB.
       * Note that we only store one heartbeat per day. So if a heartbeat for today is
       * already logged, subsequent calls to this function in the same day will be ignored.
       */
      async triggerHeartbeat() {
        const platformLogger = this.container.getProvider("platform-logger").getImmediate();
        const agent = platformLogger.getPlatformInfoString();
        const date = getUTCDateString();
        if (this._heartbeatsCache === null) {
          this._heartbeatsCache = await this._heartbeatsCachePromise;
        }
        if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
          return;
        } else {
          this._heartbeatsCache.heartbeats.push({ date, agent });
        }
        this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((singleDateHeartbeat) => {
          const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
          const now = Date.now();
          return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
        });
        return this._storage.overwrite(this._heartbeatsCache);
      }
      /**
       * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
       * It also clears all heartbeats from memory as well as in IndexedDB.
       *
       * NOTE: Consuming product SDKs should not send the header if this method
       * returns an empty string.
       */
      async getHeartbeatsHeader() {
        if (this._heartbeatsCache === null) {
          await this._heartbeatsCachePromise;
        }
        if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
          return "";
        }
        const date = getUTCDateString();
        const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
        const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
        this._heartbeatsCache.lastSentHeartbeatDate = date;
        if (unsentEntries.length > 0) {
          this._heartbeatsCache.heartbeats = unsentEntries;
          await this._storage.overwrite(this._heartbeatsCache);
        } else {
          this._heartbeatsCache.heartbeats = [];
          void this._storage.overwrite(this._heartbeatsCache);
        }
        return headerString;
      }
    };
    HeartbeatStorageImpl = class {
      constructor(app2) {
        this.app = app2;
        this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
      }
      async runIndexedDBEnvironmentCheck() {
        if (!isIndexedDBAvailable()) {
          return false;
        } else {
          return validateIndexedDBOpenable().then(() => true).catch(() => false);
        }
      }
      /**
       * Read all heartbeats.
       */
      async read() {
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
          return { heartbeats: [] };
        } else {
          const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
          return idbHeartbeatObject || { heartbeats: [] };
        }
      }
      // overwrite the storage with the provided heartbeats
      async overwrite(heartbeatsObject) {
        var _a;
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
          return;
        } else {
          const existingHeartbeatsObject = await this.read();
          return writeHeartbeatsToIndexedDB(this.app, {
            lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
            heartbeats: heartbeatsObject.heartbeats
          });
        }
      }
      // add heartbeats
      async add(heartbeatsObject) {
        var _a;
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
          return;
        } else {
          const existingHeartbeatsObject = await this.read();
          return writeHeartbeatsToIndexedDB(this.app, {
            lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
            heartbeats: [
              ...existingHeartbeatsObject.heartbeats,
              ...heartbeatsObject.heartbeats
            ]
          });
        }
      }
    };
    registerCoreComponents("");
  }
});

// node_modules/firebase/app/dist/esm/index.esm.js
var name2, version2;
var init_index_esm = __esm({
  "node_modules/firebase/app/dist/esm/index.esm.js"() {
    init_index_esm20174();
    init_index_esm20174();
    name2 = "firebase";
    version2 = "10.5.2";
    registerVersion(name2, version2, "app");
  }
});

// node_modules/@firebase/webchannel-wrapper/dist/esm/index.esm2017.js
function aa(a) {
  var b2 = typeof a;
  b2 = "object" != b2 ? b2 : a ? Array.isArray(a) ? "array" : b2 : "null";
  return "array" == b2 || "object" == b2 && "number" == typeof a.length;
}
function p(a) {
  var b2 = typeof a;
  return "object" == b2 && null != a || "function" == b2;
}
function ba(a) {
  return Object.prototype.hasOwnProperty.call(a, ca) && a[ca] || (a[ca] = ++da);
}
function ea(a, b2, c) {
  return a.call.apply(a.bind, arguments);
}
function fa(a, b2, c) {
  if (!a)
    throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b2, e);
    };
  }
  return function() {
    return a.apply(b2, arguments);
  };
}
function q(a, b2, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q = ea : q = fa;
  return q.apply(null, arguments);
}
function ha(a, b2) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
}
function r(a, b2) {
  function c() {
  }
  c.prototype = b2.prototype;
  a.$ = b2.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.ac = function(d, e, f) {
    for (var h = Array(arguments.length - 2), n = 2; n < arguments.length; n++)
      h[n - 2] = arguments[n];
    return b2.prototype[e].apply(d, h);
  };
}
function v() {
  this.s = this.s;
  this.o = this.o;
}
function ma(a) {
  const b2 = a.length;
  if (0 < b2) {
    const c = Array(b2);
    for (let d = 0; d < b2; d++)
      c[d] = a[d];
    return c;
  }
  return [];
}
function na(a, b2) {
  for (let c = 1; c < arguments.length; c++) {
    const d = arguments[c];
    if (aa(d)) {
      const e = a.length || 0, f = d.length || 0;
      a.length = e + f;
      for (let h = 0; h < f; h++)
        a[e + h] = d[h];
    } else
      a.push(d);
  }
}
function w(a, b2) {
  this.type = a;
  this.g = this.target = b2;
  this.defaultPrevented = false;
}
function x(a) {
  return /^[\s\xa0]*$/.test(a);
}
function pa() {
  var a = l.navigator;
  return a && (a = a.userAgent) ? a : "";
}
function y(a) {
  return -1 != pa().indexOf(a);
}
function qa(a) {
  qa[" "](a);
  return a;
}
function ra(a, b2) {
  var c = sa;
  return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b2(a);
}
function ya() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
function A(a, b2) {
  w.call(this, a ? a.type : "");
  this.relatedTarget = this.g = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
  this.key = "";
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = "";
  this.i = null;
  if (a) {
    var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.g = b2;
    if (b2 = a.relatedTarget) {
      if (wa) {
        a: {
          try {
            qa(b2.nodeName);
            var e = true;
            break a;
          } catch (f) {
          }
          e = false;
        }
        e || (b2 = null);
      }
    } else
      "mouseover" == c ? b2 = a.fromElement : "mouseout" == c && (b2 = a.toElement);
    this.relatedTarget = b2;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ga[a.pointerType] || "";
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && A.$.h.call(this);
  }
}
function Ja(a, b2, c, d, e) {
  this.listener = a;
  this.proxy = null;
  this.src = b2;
  this.type = c;
  this.capture = !!d;
  this.la = e;
  this.key = ++Ia;
  this.fa = this.ia = false;
}
function Ka(a) {
  a.fa = true;
  a.listener = null;
  a.proxy = null;
  a.src = null;
  a.la = null;
}
function Na(a, b2, c) {
  for (const d in a)
    b2.call(c, a[d], d, a);
}
function Oa(a, b2) {
  for (const c in a)
    b2.call(void 0, a[c], c, a);
}
function Pa(a) {
  const b2 = {};
  for (const c in a)
    b2[c] = a[c];
  return b2;
}
function Ra(a, b2) {
  let c, d;
  for (let e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d)
      a[c] = d[c];
    for (let f = 0; f < Qa.length; f++)
      c = Qa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
  }
}
function Sa(a) {
  this.src = a;
  this.g = {};
  this.h = 0;
}
function Ua(a, b2) {
  var c = b2.type;
  if (c in a.g) {
    var d = a.g[c], e = ka(d, b2), f;
    (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
    f && (Ka(b2), 0 == a.g[c].length && (delete a.g[c], a.h--));
  }
}
function Ta(a, b2, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.fa && f.listener == b2 && f.capture == !!c && f.la == d)
      return e;
  }
  return -1;
}
function Ya(a, b2, c, d, e) {
  if (d && d.once)
    return Za(a, b2, c, d, e);
  if (Array.isArray(b2)) {
    for (var f = 0; f < b2.length; f++)
      Ya(a, b2[f], c, d, e);
    return null;
  }
  c = $a(c);
  return a && a[Ha] ? a.O(b2, c, p(d) ? !!d.capture : !!d, e) : ab(a, b2, c, false, d, e);
}
function ab(a, b2, c, d, e, f) {
  if (!b2)
    throw Error("Invalid event type");
  var h = p(e) ? !!e.capture : !!e, n = bb(a);
  n || (a[Va] = n = new Sa(a));
  c = n.add(b2, c, d, h, f);
  if (c.proxy)
    return c;
  d = cb();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener)
    oa || (e = h), void 0 === e && (e = false), a.addEventListener(b2.toString(), d, e);
  else if (a.attachEvent)
    a.attachEvent(db(b2.toString()), d);
  else if (a.addListener && a.removeListener)
    a.addListener(d);
  else
    throw Error("addEventListener and attachEvent are unavailable.");
  return c;
}
function cb() {
  function a(c) {
    return b2.call(a.src, a.listener, c);
  }
  const b2 = eb;
  return a;
}
function Za(a, b2, c, d, e) {
  if (Array.isArray(b2)) {
    for (var f = 0; f < b2.length; f++)
      Za(a, b2[f], c, d, e);
    return null;
  }
  c = $a(c);
  return a && a[Ha] ? a.P(b2, c, p(d) ? !!d.capture : !!d, e) : ab(a, b2, c, true, d, e);
}
function fb(a, b2, c, d, e) {
  if (Array.isArray(b2))
    for (var f = 0; f < b2.length; f++)
      fb(a, b2[f], c, d, e);
  else
    (d = p(d) ? !!d.capture : !!d, c = $a(c), a && a[Ha]) ? (a = a.i, b2 = String(b2).toString(), b2 in a.g && (f = a.g[b2], c = Ta(f, c, d, e), -1 < c && (Ka(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b2], a.h--)))) : a && (a = bb(a)) && (b2 = a.g[b2.toString()], a = -1, b2 && (a = Ta(b2, c, d, e)), (c = -1 < a ? b2[a] : null) && gb(c));
}
function gb(a) {
  if ("number" !== typeof a && a && !a.fa) {
    var b2 = a.src;
    if (b2 && b2[Ha])
      Ua(b2.i, a);
    else {
      var c = a.type, d = a.proxy;
      b2.removeEventListener ? b2.removeEventListener(c, d, a.capture) : b2.detachEvent ? b2.detachEvent(db(c), d) : b2.addListener && b2.removeListener && b2.removeListener(d);
      (c = bb(b2)) ? (Ua(c, a), 0 == c.h && (c.src = null, b2[Va] = null)) : Ka(a);
    }
  }
}
function db(a) {
  return a in Wa ? Wa[a] : Wa[a] = "on" + a;
}
function eb(a, b2) {
  if (a.fa)
    a = true;
  else {
    b2 = new A(b2, this);
    var c = a.listener, d = a.la || a.src;
    a.ia && gb(a);
    a = c.call(d, b2);
  }
  return a;
}
function bb(a) {
  a = a[Va];
  return a instanceof Sa ? a : null;
}
function $a(a) {
  if ("function" === typeof a)
    return a;
  a[hb] || (a[hb] = function(b2) {
    return a.handleEvent(b2);
  });
  return a[hb];
}
function B() {
  v.call(this);
  this.i = new Sa(this);
  this.S = this;
  this.J = null;
}
function C(a, b2) {
  var c, d = a.J;
  if (d)
    for (c = []; d; d = d.J)
      c.push(d);
  a = a.S;
  d = b2.type || b2;
  if ("string" === typeof b2)
    b2 = new w(b2, a);
  else if (b2 instanceof w)
    b2.target = b2.target || a;
  else {
    var e = b2;
    b2 = new w(d, a);
    Ra(b2, e);
  }
  e = true;
  if (c)
    for (var f = c.length - 1; 0 <= f; f--) {
      var h = b2.g = c[f];
      e = ib(h, d, true, b2) && e;
    }
  h = b2.g = a;
  e = ib(h, d, true, b2) && e;
  e = ib(h, d, false, b2) && e;
  if (c)
    for (f = 0; f < c.length; f++)
      h = b2.g = c[f], e = ib(h, d, false, b2) && e;
}
function ib(a, b2, c, d) {
  b2 = a.i.g[String(b2)];
  if (!b2)
    return true;
  b2 = b2.concat();
  for (var e = true, f = 0; f < b2.length; ++f) {
    var h = b2[f];
    if (h && !h.fa && h.capture == c) {
      var n = h.listener, t = h.la || h.src;
      h.ia && Ua(a.i, h);
      e = false !== n.call(t, d) && e;
    }
  }
  return e && !d.defaultPrevented;
}
function lb() {
  var a = mb;
  let b2 = null;
  a.g && (b2 = a.g, a.g = a.g.next, a.g || (a.h = null), b2.next = null);
  return b2;
}
function qb(a) {
  var b2 = 1;
  a = a.split(":");
  const c = [];
  for (; 0 < b2 && a.length; )
    c.push(a.shift()), b2--;
  a.length && c.push(a.join(":"));
  return c;
}
function rb(a) {
  l.setTimeout(() => {
    throw a;
  }, 0);
}
function wb(a, b2) {
  B.call(this);
  this.h = a || 1;
  this.g = b2 || l;
  this.j = q(this.qb, this);
  this.l = Date.now();
}
function xb(a) {
  a.ga = false;
  a.T && (a.g.clearTimeout(a.T), a.T = null);
}
function yb(a, b2, c) {
  if ("function" === typeof a)
    c && (a = q(a, c));
  else if (a && "function" == typeof a.handleEvent)
    a = q(a.handleEvent, a);
  else
    throw Error("Invalid listener argument");
  return 2147483647 < Number(b2) ? -1 : l.setTimeout(a, b2 || 0);
}
function zb(a) {
  a.g = yb(() => {
    a.g = null;
    a.i && (a.i = false, zb(a));
  }, a.j);
  const b2 = a.h;
  a.h = null;
  a.m.apply(null, b2);
}
function Bb(a) {
  v.call(this);
  this.h = a;
  this.g = {};
}
function Db(a, b2, c, d) {
  Array.isArray(c) || (c && (Cb[0] = c.toString()), c = Cb);
  for (var e = 0; e < c.length; e++) {
    var f = Ya(b2, c[e], d || a.handleEvent, false, a.h || a);
    if (!f)
      break;
    a.g[f.key] = f;
  }
}
function Fb(a) {
  Na(a.g, function(b2, c) {
    this.g.hasOwnProperty(c) && gb(b2);
  }, a);
  a.g = {};
}
function Gb() {
  this.g = true;
}
function Hb(a, b2, c, d, e, f) {
  a.info(function() {
    if (a.g)
      if (f) {
        var h = "";
        for (var n = f.split("&"), t = 0; t < n.length; t++) {
          var m = n[t].split("=");
          if (1 < m.length) {
            var u = m[0];
            m = m[1];
            var L = u.split("_");
            h = 2 <= L.length && "type" == L[1] ? h + (u + "=" + m + "&") : h + (u + "=redacted&");
          }
        }
      } else
        h = null;
    else
      h = f;
    return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b2 + "\n" + c + "\n" + h;
  });
}
function Ib(a, b2, c, d, e, f, h) {
  a.info(function() {
    return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b2 + "\n" + c + "\n" + f + " " + h;
  });
}
function D(a, b2, c, d) {
  a.info(function() {
    return "XMLHTTP TEXT (" + b2 + "): " + Jb(a, c) + (d ? " " + d : "");
  });
}
function Kb(a, b2) {
  a.info(function() {
    return "TIMEOUT: " + b2;
  });
}
function Jb(a, b2) {
  if (!a.g)
    return b2;
  if (!b2)
    return null;
  try {
    var c = JSON.parse(b2);
    if (c) {
      for (a = 0; a < c.length; a++)
        if (Array.isArray(c[a])) {
          var d = c[a];
          if (!(2 > d.length)) {
            var e = d[1];
            if (Array.isArray(e) && !(1 > e.length)) {
              var f = e[0];
              if ("noop" != f && "stop" != f && "close" != f)
                for (var h = 1; h < e.length; h++)
                  e[h] = "";
            }
          }
        }
    }
    return jb(c);
  } catch (n) {
    return b2;
  }
}
function Mb() {
  return Lb = Lb || new B();
}
function Nb(a) {
  w.call(this, E.Ta, a);
}
function Ob(a) {
  const b2 = Mb();
  C(b2, new Nb(b2));
}
function Pb(a, b2) {
  w.call(this, E.STAT_EVENT, a);
  this.stat = b2;
}
function F(a) {
  const b2 = Mb();
  C(b2, new Pb(b2, a));
}
function Qb(a, b2) {
  w.call(this, E.Ua, a);
  this.size = b2;
}
function Rb(a, b2) {
  if ("function" !== typeof a)
    throw Error("Fn must not be null and must be a function");
  return l.setTimeout(function() {
    a();
  }, b2);
}
function Ub() {
}
function Vb(a) {
  return a.h || (a.h = a.i());
}
function Wb() {
}
function Yb() {
  w.call(this, "d");
}
function Zb() {
  w.call(this, "c");
}
function ac() {
}
function bc(a, b2, c, d) {
  this.l = a;
  this.j = b2;
  this.m = c;
  this.W = d || 1;
  this.U = new Bb(this);
  this.P = cc;
  a = va ? 125 : void 0;
  this.V = new wb(a);
  this.I = null;
  this.i = false;
  this.s = this.A = this.v = this.L = this.G = this.Y = this.B = null;
  this.F = [];
  this.g = null;
  this.C = 0;
  this.o = this.u = null;
  this.ca = -1;
  this.J = false;
  this.O = 0;
  this.M = null;
  this.ba = this.K = this.aa = this.S = false;
  this.h = new dc();
}
function dc() {
  this.i = null;
  this.g = "";
  this.h = false;
}
function gc(a, b2, c) {
  a.L = 1;
  a.v = hc(G(b2));
  a.s = c;
  a.S = true;
  ic(a, null);
}
function ic(a, b2) {
  a.G = Date.now();
  jc(a);
  a.A = G(a.v);
  var c = a.A, d = a.W;
  Array.isArray(d) || (d = [String(d)]);
  kc(c.i, "t", d);
  a.C = 0;
  c = a.l.J;
  a.h = new dc();
  a.g = lc(a.l, c ? b2 : null, !a.s);
  0 < a.O && (a.M = new Ab(q(a.Pa, a, a.g), a.O));
  Db(a.U, a.g, "readystatechange", a.nb);
  b2 = a.I ? Pa(a.I) : {};
  a.s ? (a.u || (a.u = "POST"), b2["Content-Type"] = "application/x-www-form-urlencoded", a.g.ha(a.A, a.u, a.s, b2)) : (a.u = "GET", a.g.ha(a.A, a.u, null, b2));
  Ob();
  Hb(a.j, a.u, a.A, a.m, a.W, a.s);
}
function oc(a) {
  return a.g ? "GET" == a.u && 2 != a.L && a.l.Ha : false;
}
function rc(a, b2, c) {
  let d = true, e;
  for (; !a.J && a.C < c.length; )
    if (e = uc(a, c), e == fc) {
      4 == b2 && (a.o = 4, F(14), d = false);
      D(a.j, a.m, null, "[Incomplete Response]");
      break;
    } else if (e == ec) {
      a.o = 4;
      F(15);
      D(a.j, a.m, c, "[Invalid Chunk]");
      d = false;
      break;
    } else
      D(a.j, a.m, e, null), qc(a, e);
  oc(a) && e != fc && e != ec && (a.h.g = "", a.C = 0);
  4 != b2 || 0 != c.length || a.h.h || (a.o = 1, F(16), d = false);
  a.i = a.i && d;
  d ? 0 < c.length && !a.ba && (a.ba = true, b2 = a.l, b2.g == a && b2.ca && !b2.M && (b2.l.info("Great, no buffering proxy detected. Bytes received: " + c.length), vc(b2), b2.M = true, F(11))) : (D(
    a.j,
    a.m,
    c,
    "[Invalid Chunked Response]"
  ), I(a), pc(a));
}
function uc(a, b2) {
  var c = a.C, d = b2.indexOf("\n", c);
  if (-1 == d)
    return fc;
  c = Number(b2.substring(c, d));
  if (isNaN(c))
    return ec;
  d += 1;
  if (d + c > b2.length)
    return fc;
  b2 = b2.slice(d, d + c);
  a.C = d + c;
  return b2;
}
function jc(a) {
  a.Y = Date.now() + a.P;
  wc(a, a.P);
}
function wc(a, b2) {
  if (null != a.B)
    throw Error("WatchDog timer not null");
  a.B = Rb(q(a.lb, a), b2);
}
function nc(a) {
  a.B && (l.clearTimeout(a.B), a.B = null);
}
function pc(a) {
  0 == a.l.H || a.J || sc(a.l, a);
}
function I(a) {
  nc(a);
  var b2 = a.M;
  b2 && "function" == typeof b2.sa && b2.sa();
  a.M = null;
  xb(a.V);
  Fb(a.U);
  a.g && (b2 = a.g, a.g = null, b2.abort(), b2.sa());
}
function qc(a, b2) {
  try {
    var c = a.l;
    if (0 != c.H && (c.g == a || xc(c.i, a))) {
      if (!a.K && xc(c.i, a) && 3 == c.H) {
        try {
          var d = c.Ja.g.parse(b2);
        } catch (m) {
          d = null;
        }
        if (Array.isArray(d) && 3 == d.length) {
          var e = d;
          if (0 == e[0])
            a: {
              if (!c.u) {
                if (c.g)
                  if (c.g.G + 3e3 < a.G)
                    yc(c), zc(c);
                  else
                    break a;
                Ac(c);
                F(18);
              }
            }
          else
            c.Fa = e[1], 0 < c.Fa - c.V && 37500 > e[2] && c.G && 0 == c.A && !c.v && (c.v = Rb(q(c.ib, c), 6e3));
          if (1 >= Bc(c.i) && c.oa) {
            try {
              c.oa();
            } catch (m) {
            }
            c.oa = void 0;
          }
        } else
          J(c, 11);
      } else if ((a.K || c.g == a) && yc(c), !x(b2))
        for (e = c.Ja.g.parse(b2), b2 = 0; b2 < e.length; b2++) {
          let m = e[b2];
          c.V = m[0];
          m = m[1];
          if (2 == c.H)
            if ("c" == m[0]) {
              c.K = m[1];
              c.pa = m[2];
              const u = m[3];
              null != u && (c.ra = u, c.l.info("VER=" + c.ra));
              const L = m[4];
              null != L && (c.Ga = L, c.l.info("SVER=" + c.Ga));
              const La = m[5];
              null != La && "number" === typeof La && 0 < La && (d = 1.5 * La, c.L = d, c.l.info("backChannelRequestTimeoutMs_=" + d));
              d = c;
              const la = a.g;
              if (la) {
                const Ma = la.g ? la.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                if (Ma) {
                  var f = d.i;
                  f.g || -1 == Ma.indexOf("spdy") && -1 == Ma.indexOf("quic") && -1 == Ma.indexOf("h2") || (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (Cc(f, f.h), f.h = null));
                }
                if (d.F) {
                  const Eb = la.g ? la.g.getResponseHeader("X-HTTP-Session-Id") : null;
                  Eb && (d.Da = Eb, K(d.I, d.F, Eb));
                }
              }
              c.H = 3;
              c.h && c.h.Ba();
              c.ca && (c.S = Date.now() - a.G, c.l.info("Handshake RTT: " + c.S + "ms"));
              d = c;
              var h = a;
              d.wa = Dc(d, d.J ? d.pa : null, d.Y);
              if (h.K) {
                Ec(d.i, h);
                var n = h, t = d.L;
                t && n.setTimeout(t);
                n.B && (nc(n), jc(n));
                d.g = h;
              } else
                Fc(d);
              0 < c.j.length && Gc(c);
            } else
              "stop" != m[0] && "close" != m[0] || J(c, 7);
          else
            3 == c.H && ("stop" == m[0] || "close" == m[0] ? "stop" == m[0] ? J(c, 7) : Hc(c) : "noop" != m[0] && c.h && c.h.Aa(m), c.A = 0);
        }
    }
    Ob(4);
  } catch (m) {
  }
}
function Ic(a) {
  if (a.Z && "function" == typeof a.Z)
    return a.Z();
  if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set)
    return Array.from(a.values());
  if ("string" === typeof a)
    return a.split("");
  if (aa(a)) {
    for (var b2 = [], c = a.length, d = 0; d < c; d++)
      b2.push(a[d]);
    return b2;
  }
  b2 = [];
  c = 0;
  for (d in a)
    b2[c++] = a[d];
  return b2;
}
function Jc(a) {
  if (a.ta && "function" == typeof a.ta)
    return a.ta();
  if (!a.Z || "function" != typeof a.Z) {
    if ("undefined" !== typeof Map && a instanceof Map)
      return Array.from(a.keys());
    if (!("undefined" !== typeof Set && a instanceof Set)) {
      if (aa(a) || "string" === typeof a) {
        var b2 = [];
        a = a.length;
        for (var c = 0; c < a; c++)
          b2.push(c);
        return b2;
      }
      b2 = [];
      c = 0;
      for (const d in a)
        b2[c++] = d;
      return b2;
    }
  }
}
function Kc(a, b2) {
  if (a.forEach && "function" == typeof a.forEach)
    a.forEach(b2, void 0);
  else if (aa(a) || "string" === typeof a)
    Array.prototype.forEach.call(a, b2, void 0);
  else
    for (var c = Jc(a), d = Ic(a), e = d.length, f = 0; f < e; f++)
      b2.call(void 0, d[f], c && c[f], a);
}
function Mc(a, b2) {
  if (a) {
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
      var d = a[c].indexOf("="), e = null;
      if (0 <= d) {
        var f = a[c].substring(0, d);
        e = a[c].substring(d + 1);
      } else
        f = a[c];
      b2(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
    }
  }
}
function M(a) {
  this.g = this.s = this.j = "";
  this.m = null;
  this.o = this.l = "";
  this.h = false;
  if (a instanceof M) {
    this.h = a.h;
    Nc(this, a.j);
    this.s = a.s;
    this.g = a.g;
    Oc(this, a.m);
    this.l = a.l;
    var b2 = a.i;
    var c = new Pc();
    c.i = b2.i;
    b2.g && (c.g = new Map(b2.g), c.h = b2.h);
    Qc(this, c);
    this.o = a.o;
  } else
    a && (b2 = String(a).match(Lc)) ? (this.h = false, Nc(this, b2[1] || "", true), this.s = Rc(b2[2] || ""), this.g = Rc(b2[3] || "", true), Oc(this, b2[4]), this.l = Rc(b2[5] || "", true), Qc(this, b2[6] || "", true), this.o = Rc(b2[7] || "")) : (this.h = false, this.i = new Pc(null, this.h));
}
function G(a) {
  return new M(a);
}
function Nc(a, b2, c) {
  a.j = c ? Rc(b2, true) : b2;
  a.j && (a.j = a.j.replace(/:$/, ""));
}
function Oc(a, b2) {
  if (b2) {
    b2 = Number(b2);
    if (isNaN(b2) || 0 > b2)
      throw Error("Bad port number " + b2);
    a.m = b2;
  } else
    a.m = null;
}
function Qc(a, b2, c) {
  b2 instanceof Pc ? (a.i = b2, Xc(a.i, a.h)) : (c || (b2 = Sc(b2, Yc)), a.i = new Pc(b2, a.h));
}
function K(a, b2, c) {
  a.i.set(b2, c);
}
function hc(a) {
  K(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
  return a;
}
function Rc(a, b2) {
  return a ? b2 ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
}
function Sc(a, b2, c) {
  return "string" === typeof a ? (a = encodeURI(a).replace(b2, Zc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
}
function Zc(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
function Pc(a, b2) {
  this.h = this.g = null;
  this.i = a || null;
  this.j = !!b2;
}
function N(a) {
  a.g || (a.g = /* @__PURE__ */ new Map(), a.h = 0, a.i && Mc(a.i, function(b2, c) {
    a.add(decodeURIComponent(b2.replace(/\+/g, " ")), c);
  }));
}
function $c(a, b2) {
  N(a);
  b2 = O(a, b2);
  a.g.has(b2) && (a.i = null, a.h -= a.g.get(b2).length, a.g.delete(b2));
}
function ad(a, b2) {
  N(a);
  b2 = O(a, b2);
  return a.g.has(b2);
}
function kc(a, b2, c) {
  $c(a, b2);
  0 < c.length && (a.i = null, a.g.set(O(a, b2), ma(c)), a.h += c.length);
}
function O(a, b2) {
  b2 = String(b2);
  a.j && (b2 = b2.toLowerCase());
  return b2;
}
function Xc(a, b2) {
  b2 && !a.j && (N(a), a.i = null, a.g.forEach(function(c, d) {
    var e = d.toLowerCase();
    d != e && ($c(this, d), kc(this, e, c));
  }, a));
  a.j = b2;
}
function cd(a) {
  this.l = a || dd;
  l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ka && l.g.Ka() && l.g.Ka().dc);
  this.j = a ? this.l : 1;
  this.g = null;
  1 < this.j && (this.g = /* @__PURE__ */ new Set());
  this.h = null;
  this.i = [];
}
function ed(a) {
  return a.h ? true : a.g ? a.g.size >= a.j : false;
}
function Bc(a) {
  return a.h ? 1 : a.g ? a.g.size : 0;
}
function xc(a, b2) {
  return a.h ? a.h == b2 : a.g ? a.g.has(b2) : false;
}
function Cc(a, b2) {
  a.g ? a.g.add(b2) : a.h = b2;
}
function Ec(a, b2) {
  a.h && a.h == b2 ? a.h = null : a.g && a.g.has(b2) && a.g.delete(b2);
}
function fd(a) {
  if (null != a.h)
    return a.i.concat(a.h.F);
  if (null != a.g && 0 !== a.g.size) {
    let b2 = a.i;
    for (const c of a.g.values())
      b2 = b2.concat(c.F);
    return b2;
  }
  return ma(a.i);
}
function hd() {
  this.g = new gd();
}
function id(a, b2, c) {
  const d = c || "";
  try {
    Kc(a, function(e, f) {
      let h = e;
      p(e) && (h = jb(e));
      b2.push(d + f + "=" + encodeURIComponent(h));
    });
  } catch (e) {
    throw b2.push(d + "type=" + encodeURIComponent("_badmap")), e;
  }
}
function jd(a, b2) {
  const c = new Gb();
  if (l.Image) {
    const d = new Image();
    d.onload = ha(kd, c, d, "TestLoadImage: loaded", true, b2);
    d.onerror = ha(kd, c, d, "TestLoadImage: error", false, b2);
    d.onabort = ha(kd, c, d, "TestLoadImage: abort", false, b2);
    d.ontimeout = ha(kd, c, d, "TestLoadImage: timeout", false, b2);
    l.setTimeout(function() {
      if (d.ontimeout)
        d.ontimeout();
    }, 1e4);
    d.src = a;
  } else
    b2(false);
}
function kd(a, b2, c, d, e) {
  try {
    b2.onload = null, b2.onerror = null, b2.onabort = null, b2.ontimeout = null, e(d);
  } catch (f) {
  }
}
function ld(a) {
  this.l = a.ec || null;
  this.j = a.ob || false;
}
function md(a, b2) {
  B.call(this);
  this.F = a;
  this.u = b2;
  this.m = void 0;
  this.readyState = nd;
  this.status = 0;
  this.responseType = this.responseText = this.response = this.statusText = "";
  this.onreadystatechange = null;
  this.v = new Headers();
  this.h = null;
  this.C = "GET";
  this.B = "";
  this.g = false;
  this.A = this.j = this.l = null;
}
function qd(a) {
  a.j.read().then(a.Xa.bind(a)).catch(a.ka.bind(a));
}
function pd(a) {
  a.readyState = 4;
  a.l = null;
  a.j = null;
  a.A = null;
  od(a);
}
function od(a) {
  a.onreadystatechange && a.onreadystatechange.call(a);
}
function P(a) {
  B.call(this);
  this.headers = /* @__PURE__ */ new Map();
  this.u = a || null;
  this.h = false;
  this.C = this.g = null;
  this.I = "";
  this.m = 0;
  this.j = "";
  this.l = this.G = this.v = this.F = false;
  this.B = 0;
  this.A = null;
  this.K = sd;
  this.L = this.M = false;
}
function xd(a) {
  return z && "number" === typeof a.timeout && void 0 !== a.ontimeout;
}
function vd(a, b2) {
  a.h = false;
  a.g && (a.l = true, a.g.abort(), a.l = false);
  a.j = b2;
  a.m = 5;
  yd(a);
  zd(a);
}
function yd(a) {
  a.F || (a.F = true, C(a, "complete"), C(a, "error"));
}
function Ad(a) {
  if (a.h && "undefined" != typeof goog && (!a.C[1] || 4 != H(a) || 2 != a.da())) {
    if (a.v && 4 == H(a))
      yb(a.La, 0, a);
    else if (C(a, "readystatechange"), 4 == H(a)) {
      a.h = false;
      try {
        const h = a.da();
        a:
          switch (h) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var b2 = true;
              break a;
            default:
              b2 = false;
          }
        var c;
        if (!(c = b2)) {
          var d;
          if (d = 0 === h) {
            var e = String(a.I).match(Lc)[1] || null;
            !e && l.self && l.self.location && (e = l.self.location.protocol.slice(0, -1));
            d = !td.test(e ? e.toLowerCase() : "");
          }
          c = d;
        }
        if (c)
          C(a, "complete"), C(a, "success");
        else {
          a.m = 6;
          try {
            var f = 2 < H(a) ? a.g.statusText : "";
          } catch (n) {
            f = "";
          }
          a.j = f + " [" + a.da() + "]";
          yd(a);
        }
      } finally {
        zd(a);
      }
    }
  }
}
function zd(a, b2) {
  if (a.g) {
    wd(a);
    const c = a.g, d = a.C[0] ? () => {
    } : null;
    a.g = null;
    a.C = null;
    b2 || C(a, "ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
    }
  }
}
function wd(a) {
  a.g && a.L && (a.g.ontimeout = null);
  a.A && (l.clearTimeout(a.A), a.A = null);
}
function H(a) {
  return a.g ? a.g.readyState : 0;
}
function mc(a) {
  try {
    if (!a.g)
      return null;
    if ("response" in a.g)
      return a.g.response;
    switch (a.K) {
      case sd:
      case "text":
        return a.g.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in a.g)
          return a.g.mozResponseArrayBuffer;
    }
    return null;
  } catch (b2) {
    return null;
  }
}
function tc(a) {
  const b2 = {};
  a = (a.g && 2 <= H(a) ? a.g.getAllResponseHeaders() || "" : "").split("\r\n");
  for (let d = 0; d < a.length; d++) {
    if (x(a[d]))
      continue;
    var c = qb(a[d]);
    const e = c[0];
    c = c[1];
    if ("string" !== typeof c)
      continue;
    c = c.trim();
    const f = b2[e] || [];
    b2[e] = f;
    f.push(c);
  }
  Oa(b2, function(d) {
    return d.join(", ");
  });
}
function Bd(a) {
  let b2 = "";
  Na(a, function(c, d) {
    b2 += d;
    b2 += ":";
    b2 += c;
    b2 += "\r\n";
  });
  return b2;
}
function Cd(a, b2, c) {
  a: {
    for (d in c) {
      var d = false;
      break a;
    }
    d = true;
  }
  d || (c = Bd(c), "string" === typeof a ? null != c && encodeURIComponent(String(c)) : K(a, b2, c));
}
function Dd(a, b2, c) {
  return c && c.internalChannelParams ? c.internalChannelParams[a] || b2 : b2;
}
function Ed(a) {
  this.Ga = 0;
  this.j = [];
  this.l = new Gb();
  this.pa = this.wa = this.I = this.Y = this.g = this.Da = this.F = this.na = this.o = this.U = this.s = null;
  this.fb = this.W = 0;
  this.cb = Dd("failFast", false, a);
  this.G = this.v = this.u = this.m = this.h = null;
  this.aa = true;
  this.Fa = this.V = -1;
  this.ba = this.A = this.C = 0;
  this.ab = Dd("baseRetryDelayMs", 5e3, a);
  this.hb = Dd("retryDelaySeedMs", 1e4, a);
  this.eb = Dd("forwardChannelMaxRetries", 2, a);
  this.xa = Dd("forwardChannelRequestTimeoutMs", 2e4, a);
  this.va = a && a.xmlHttpFactory || void 0;
  this.Ha = a && a.useFetchStreams || false;
  this.L = void 0;
  this.J = a && a.supportsCrossDomainXhr || false;
  this.K = "";
  this.i = new cd(a && a.concurrentRequestLimit);
  this.Ja = new hd();
  this.P = a && a.fastHandshake || false;
  this.O = a && a.encodeInitMessageHeaders || false;
  this.P && this.O && (this.O = false);
  this.bb = a && a.bc || false;
  a && a.Ea && this.l.Ea();
  a && a.forceLongPolling && (this.aa = false);
  this.ca = !this.P && this.aa && a && a.detectBufferingProxy || false;
  this.qa = void 0;
  a && a.longPollingTimeout && 0 < a.longPollingTimeout && (this.qa = a.longPollingTimeout);
  this.oa = void 0;
  this.S = 0;
  this.M = false;
  this.ma = this.B = null;
}
function Hc(a) {
  Fd(a);
  if (3 == a.H) {
    var b2 = a.W++, c = G(a.I);
    K(c, "SID", a.K);
    K(c, "RID", b2);
    K(c, "TYPE", "terminate");
    Gd(a, c);
    b2 = new bc(a, a.l, b2);
    b2.L = 2;
    b2.v = hc(G(c));
    c = false;
    if (l.navigator && l.navigator.sendBeacon)
      try {
        c = l.navigator.sendBeacon(b2.v.toString(), "");
      } catch (d) {
      }
    !c && l.Image && (new Image().src = b2.v, c = true);
    c || (b2.g = lc(b2.l, null), b2.g.ha(b2.v));
    b2.G = Date.now();
    jc(b2);
  }
  Hd(a);
}
function zc(a) {
  a.g && (vc(a), a.g.cancel(), a.g = null);
}
function Fd(a) {
  zc(a);
  a.u && (l.clearTimeout(a.u), a.u = null);
  yc(a);
  a.i.cancel();
  a.m && ("number" === typeof a.m && l.clearTimeout(a.m), a.m = null);
}
function Gc(a) {
  if (!ed(a.i) && !a.m) {
    a.m = true;
    var b2 = a.Na;
    sb || vb();
    tb || (sb(), tb = true);
    mb.add(b2, a);
    a.C = 0;
  }
}
function Id(a, b2) {
  if (Bc(a.i) >= a.i.j - (a.m ? 1 : 0))
    return false;
  if (a.m)
    return a.j = b2.F.concat(a.j), true;
  if (1 == a.H || 2 == a.H || a.C >= (a.cb ? 0 : a.eb))
    return false;
  a.m = Rb(q(a.Na, a, b2), Jd(a, a.C));
  a.C++;
  return true;
}
function Ld(a, b2) {
  var c;
  b2 ? c = b2.m : c = a.W++;
  const d = G(a.I);
  K(d, "SID", a.K);
  K(d, "RID", c);
  K(d, "AID", a.V);
  Gd(a, d);
  a.o && a.s && Cd(d, a.o, a.s);
  c = new bc(a, a.l, c, a.C + 1);
  null === a.o && (c.I = a.s);
  b2 && (a.j = b2.F.concat(a.j));
  b2 = Kd(a, c, 1e3);
  c.setTimeout(Math.round(0.5 * a.xa) + Math.round(0.5 * a.xa * Math.random()));
  Cc(a.i, c);
  gc(c, d, b2);
}
function Gd(a, b2) {
  a.na && Na(a.na, function(c, d) {
    K(b2, d, c);
  });
  a.h && Kc({}, function(c, d) {
    K(b2, d, c);
  });
}
function Kd(a, b2, c) {
  c = Math.min(a.j.length, c);
  var d = a.h ? q(a.h.Va, a.h, a) : null;
  a: {
    var e = a.j;
    let f = -1;
    for (; ; ) {
      const h = ["count=" + c];
      -1 == f ? 0 < c ? (f = e[0].g, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
      let n = true;
      for (let t = 0; t < c; t++) {
        let m = e[t].g;
        const u = e[t].map;
        m -= f;
        if (0 > m)
          f = Math.max(0, e[t].g - 100), n = false;
        else
          try {
            id(u, h, "req" + m + "_");
          } catch (L) {
            d && d(u);
          }
      }
      if (n) {
        d = h.join("&");
        break a;
      }
    }
  }
  a = a.j.splice(0, c);
  b2.F = a;
  return d;
}
function Fc(a) {
  if (!a.g && !a.u) {
    a.ba = 1;
    var b2 = a.Ma;
    sb || vb();
    tb || (sb(), tb = true);
    mb.add(b2, a);
    a.A = 0;
  }
}
function Ac(a) {
  if (a.g || a.u || 3 <= a.A)
    return false;
  a.ba++;
  a.u = Rb(q(a.Ma, a), Jd(a, a.A));
  a.A++;
  return true;
}
function vc(a) {
  null != a.B && (l.clearTimeout(a.B), a.B = null);
}
function Md(a) {
  a.g = new bc(a, a.l, "rpc", a.ba);
  null === a.o && (a.g.I = a.s);
  a.g.O = 0;
  var b2 = G(a.wa);
  K(b2, "RID", "rpc");
  K(b2, "SID", a.K);
  K(b2, "AID", a.V);
  K(b2, "CI", a.G ? "0" : "1");
  !a.G && a.qa && K(b2, "TO", a.qa);
  K(b2, "TYPE", "xmlhttp");
  Gd(a, b2);
  a.o && a.s && Cd(b2, a.o, a.s);
  a.L && a.g.setTimeout(a.L);
  var c = a.g;
  a = a.pa;
  c.L = 1;
  c.v = hc(G(b2));
  c.s = null;
  c.S = true;
  ic(c, a);
}
function yc(a) {
  null != a.v && (l.clearTimeout(a.v), a.v = null);
}
function sc(a, b2) {
  var c = null;
  if (a.g == b2) {
    yc(a);
    vc(a);
    a.g = null;
    var d = 2;
  } else if (xc(a.i, b2))
    c = b2.F, Ec(a.i, b2), d = 1;
  else
    return;
  if (0 != a.H) {
    if (b2.i)
      if (1 == d) {
        c = b2.s ? b2.s.length : 0;
        b2 = Date.now() - b2.G;
        var e = a.C;
        d = Mb();
        C(d, new Qb(d, c));
        Gc(a);
      } else
        Fc(a);
    else if (e = b2.o, 3 == e || 0 == e && 0 < b2.ca || !(1 == d && Id(a, b2) || 2 == d && Ac(a)))
      switch (c && 0 < c.length && (b2 = a.i, b2.i = b2.i.concat(c)), e) {
        case 1:
          J(a, 5);
          break;
        case 4:
          J(a, 10);
          break;
        case 3:
          J(a, 6);
          break;
        default:
          J(a, 2);
      }
  }
}
function Jd(a, b2) {
  let c = a.ab + Math.floor(Math.random() * a.hb);
  a.isActive() || (c *= 2);
  return c * b2;
}
function J(a, b2) {
  a.l.info("Error code " + b2);
  if (2 == b2) {
    var c = null;
    a.h && (c = null);
    var d = q(a.pb, a);
    c || (c = new M("//www.google.com/images/cleardot.gif"), l.location && "http" == l.location.protocol || Nc(c, "https"), hc(c));
    jd(c.toString(), d);
  } else
    F(2);
  a.H = 0;
  a.h && a.h.za(b2);
  Hd(a);
  Fd(a);
}
function Hd(a) {
  a.H = 0;
  a.ma = [];
  if (a.h) {
    const b2 = fd(a.i);
    if (0 != b2.length || 0 != a.j.length)
      na(a.ma, b2), na(a.ma, a.j), a.i.i.length = 0, ma(a.j), a.j.length = 0;
    a.h.ya();
  }
}
function Dc(a, b2, c) {
  var d = c instanceof M ? G(c) : new M(c);
  if ("" != d.g)
    b2 && (d.g = b2 + "." + d.g), Oc(d, d.m);
  else {
    var e = l.location;
    d = e.protocol;
    b2 = b2 ? b2 + "." + e.hostname : e.hostname;
    e = +e.port;
    var f = new M(null);
    d && Nc(f, d);
    b2 && (f.g = b2);
    e && Oc(f, e);
    c && (f.l = c);
    d = f;
  }
  c = a.F;
  b2 = a.Da;
  c && b2 && K(d, c, b2);
  K(d, "VER", a.ra);
  Gd(a, d);
  return d;
}
function lc(a, b2, c) {
  if (b2 && !a.J)
    throw Error("Can't create secondary domain capable XhrIo object.");
  b2 = c && a.Ha && !a.va ? new P(new ld({ ob: true })) : new P(a.va);
  b2.Oa(a.J);
  return b2;
}
function Nd() {
}
function Od() {
  if (z && !(10 <= Number(Fa)))
    throw Error("Environmental error: no available transport.");
}
function Q(a, b2) {
  B.call(this);
  this.g = new Ed(b2);
  this.l = a;
  this.h = b2 && b2.messageUrlParams || null;
  a = b2 && b2.messageHeaders || null;
  b2 && b2.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
  this.g.s = a;
  a = b2 && b2.initMessageHeaders || null;
  b2 && b2.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b2.messageContentType : a = { "X-WebChannel-Content-Type": b2.messageContentType });
  b2 && b2.Ca && (a ? a["X-WebChannel-Client-Profile"] = b2.Ca : a = { "X-WebChannel-Client-Profile": b2.Ca });
  this.g.U = a;
  (a = b2 && b2.cc) && !x(a) && (this.g.o = a);
  this.A = b2 && b2.supportsCrossDomainXhr || false;
  this.v = b2 && b2.sendRawJson || false;
  (b2 = b2 && b2.httpSessionIdParam) && !x(b2) && (this.g.F = b2, a = this.h, null !== a && b2 in a && (a = this.h, b2 in a && delete a[b2]));
  this.j = new R(this);
}
function Pd(a) {
  Yb.call(this);
  a.__headers__ && (this.headers = a.__headers__, this.statusCode = a.__status__, delete a.__headers__, delete a.__status__);
  var b2 = a.__sm__;
  if (b2) {
    a: {
      for (const c in b2) {
        a = c;
        break a;
      }
      a = void 0;
    }
    if (this.i = a)
      a = this.i, b2 = null !== b2 && a in b2 ? b2[a] : void 0;
    this.data = b2;
  } else
    this.data = a;
}
function Qd() {
  Zb.call(this);
  this.status = 1;
}
function R(a) {
  this.g = a;
}
function Rd() {
  this.blockSize = -1;
}
function S() {
  this.blockSize = -1;
  this.blockSize = 64;
  this.g = Array(4);
  this.m = Array(this.blockSize);
  this.i = this.h = 0;
  this.reset();
}
function Sd(a, b2, c) {
  c || (c = 0);
  var d = Array(16);
  if ("string" === typeof b2)
    for (var e = 0; 16 > e; ++e)
      d[e] = b2.charCodeAt(c++) | b2.charCodeAt(c++) << 8 | b2.charCodeAt(c++) << 16 | b2.charCodeAt(c++) << 24;
  else
    for (e = 0; 16 > e; ++e)
      d[e] = b2[c++] | b2[c++] << 8 | b2[c++] << 16 | b2[c++] << 24;
  b2 = a.g[0];
  c = a.g[1];
  e = a.g[2];
  var f = a.g[3];
  var h = b2 + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
  b2 = c + (h << 7 & 4294967295 | h >>> 25);
  h = f + (e ^ b2 & (c ^ e)) + d[1] + 3905402710 & 4294967295;
  f = b2 + (h << 12 & 4294967295 | h >>> 20);
  h = e + (c ^ f & (b2 ^ c)) + d[2] + 606105819 & 4294967295;
  e = f + (h << 17 & 4294967295 | h >>> 15);
  h = c + (b2 ^ e & (f ^ b2)) + d[3] + 3250441966 & 4294967295;
  c = e + (h << 22 & 4294967295 | h >>> 10);
  h = b2 + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
  b2 = c + (h << 7 & 4294967295 | h >>> 25);
  h = f + (e ^ b2 & (c ^ e)) + d[5] + 1200080426 & 4294967295;
  f = b2 + (h << 12 & 4294967295 | h >>> 20);
  h = e + (c ^ f & (b2 ^ c)) + d[6] + 2821735955 & 4294967295;
  e = f + (h << 17 & 4294967295 | h >>> 15);
  h = c + (b2 ^ e & (f ^ b2)) + d[7] + 4249261313 & 4294967295;
  c = e + (h << 22 & 4294967295 | h >>> 10);
  h = b2 + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
  b2 = c + (h << 7 & 4294967295 | h >>> 25);
  h = f + (e ^ b2 & (c ^ e)) + d[9] + 2336552879 & 4294967295;
  f = b2 + (h << 12 & 4294967295 | h >>> 20);
  h = e + (c ^ f & (b2 ^ c)) + d[10] + 4294925233 & 4294967295;
  e = f + (h << 17 & 4294967295 | h >>> 15);
  h = c + (b2 ^ e & (f ^ b2)) + d[11] + 2304563134 & 4294967295;
  c = e + (h << 22 & 4294967295 | h >>> 10);
  h = b2 + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
  b2 = c + (h << 7 & 4294967295 | h >>> 25);
  h = f + (e ^ b2 & (c ^ e)) + d[13] + 4254626195 & 4294967295;
  f = b2 + (h << 12 & 4294967295 | h >>> 20);
  h = e + (c ^ f & (b2 ^ c)) + d[14] + 2792965006 & 4294967295;
  e = f + (h << 17 & 4294967295 | h >>> 15);
  h = c + (b2 ^ e & (f ^ b2)) + d[15] + 1236535329 & 4294967295;
  c = e + (h << 22 & 4294967295 | h >>> 10);
  h = b2 + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
  b2 = c + (h << 5 & 4294967295 | h >>> 27);
  h = f + (c ^ e & (b2 ^ c)) + d[6] + 3225465664 & 4294967295;
  f = b2 + (h << 9 & 4294967295 | h >>> 23);
  h = e + (b2 ^ c & (f ^ b2)) + d[11] + 643717713 & 4294967295;
  e = f + (h << 14 & 4294967295 | h >>> 18);
  h = c + (f ^ b2 & (e ^ f)) + d[0] + 3921069994 & 4294967295;
  c = e + (h << 20 & 4294967295 | h >>> 12);
  h = b2 + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
  b2 = c + (h << 5 & 4294967295 | h >>> 27);
  h = f + (c ^ e & (b2 ^ c)) + d[10] + 38016083 & 4294967295;
  f = b2 + (h << 9 & 4294967295 | h >>> 23);
  h = e + (b2 ^ c & (f ^ b2)) + d[15] + 3634488961 & 4294967295;
  e = f + (h << 14 & 4294967295 | h >>> 18);
  h = c + (f ^ b2 & (e ^ f)) + d[4] + 3889429448 & 4294967295;
  c = e + (h << 20 & 4294967295 | h >>> 12);
  h = b2 + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
  b2 = c + (h << 5 & 4294967295 | h >>> 27);
  h = f + (c ^ e & (b2 ^ c)) + d[14] + 3275163606 & 4294967295;
  f = b2 + (h << 9 & 4294967295 | h >>> 23);
  h = e + (b2 ^ c & (f ^ b2)) + d[3] + 4107603335 & 4294967295;
  e = f + (h << 14 & 4294967295 | h >>> 18);
  h = c + (f ^ b2 & (e ^ f)) + d[8] + 1163531501 & 4294967295;
  c = e + (h << 20 & 4294967295 | h >>> 12);
  h = b2 + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
  b2 = c + (h << 5 & 4294967295 | h >>> 27);
  h = f + (c ^ e & (b2 ^ c)) + d[2] + 4243563512 & 4294967295;
  f = b2 + (h << 9 & 4294967295 | h >>> 23);
  h = e + (b2 ^ c & (f ^ b2)) + d[7] + 1735328473 & 4294967295;
  e = f + (h << 14 & 4294967295 | h >>> 18);
  h = c + (f ^ b2 & (e ^ f)) + d[12] + 2368359562 & 4294967295;
  c = e + (h << 20 & 4294967295 | h >>> 12);
  h = b2 + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
  b2 = c + (h << 4 & 4294967295 | h >>> 28);
  h = f + (b2 ^ c ^ e) + d[8] + 2272392833 & 4294967295;
  f = b2 + (h << 11 & 4294967295 | h >>> 21);
  h = e + (f ^ b2 ^ c) + d[11] + 1839030562 & 4294967295;
  e = f + (h << 16 & 4294967295 | h >>> 16);
  h = c + (e ^ f ^ b2) + d[14] + 4259657740 & 4294967295;
  c = e + (h << 23 & 4294967295 | h >>> 9);
  h = b2 + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
  b2 = c + (h << 4 & 4294967295 | h >>> 28);
  h = f + (b2 ^ c ^ e) + d[4] + 1272893353 & 4294967295;
  f = b2 + (h << 11 & 4294967295 | h >>> 21);
  h = e + (f ^ b2 ^ c) + d[7] + 4139469664 & 4294967295;
  e = f + (h << 16 & 4294967295 | h >>> 16);
  h = c + (e ^ f ^ b2) + d[10] + 3200236656 & 4294967295;
  c = e + (h << 23 & 4294967295 | h >>> 9);
  h = b2 + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
  b2 = c + (h << 4 & 4294967295 | h >>> 28);
  h = f + (b2 ^ c ^ e) + d[0] + 3936430074 & 4294967295;
  f = b2 + (h << 11 & 4294967295 | h >>> 21);
  h = e + (f ^ b2 ^ c) + d[3] + 3572445317 & 4294967295;
  e = f + (h << 16 & 4294967295 | h >>> 16);
  h = c + (e ^ f ^ b2) + d[6] + 76029189 & 4294967295;
  c = e + (h << 23 & 4294967295 | h >>> 9);
  h = b2 + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
  b2 = c + (h << 4 & 4294967295 | h >>> 28);
  h = f + (b2 ^ c ^ e) + d[12] + 3873151461 & 4294967295;
  f = b2 + (h << 11 & 4294967295 | h >>> 21);
  h = e + (f ^ b2 ^ c) + d[15] + 530742520 & 4294967295;
  e = f + (h << 16 & 4294967295 | h >>> 16);
  h = c + (e ^ f ^ b2) + d[2] + 3299628645 & 4294967295;
  c = e + (h << 23 & 4294967295 | h >>> 9);
  h = b2 + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
  b2 = c + (h << 6 & 4294967295 | h >>> 26);
  h = f + (c ^ (b2 | ~e)) + d[7] + 1126891415 & 4294967295;
  f = b2 + (h << 10 & 4294967295 | h >>> 22);
  h = e + (b2 ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
  e = f + (h << 15 & 4294967295 | h >>> 17);
  h = c + (f ^ (e | ~b2)) + d[5] + 4237533241 & 4294967295;
  c = e + (h << 21 & 4294967295 | h >>> 11);
  h = b2 + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
  b2 = c + (h << 6 & 4294967295 | h >>> 26);
  h = f + (c ^ (b2 | ~e)) + d[3] + 2399980690 & 4294967295;
  f = b2 + (h << 10 & 4294967295 | h >>> 22);
  h = e + (b2 ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
  e = f + (h << 15 & 4294967295 | h >>> 17);
  h = c + (f ^ (e | ~b2)) + d[1] + 2240044497 & 4294967295;
  c = e + (h << 21 & 4294967295 | h >>> 11);
  h = b2 + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
  b2 = c + (h << 6 & 4294967295 | h >>> 26);
  h = f + (c ^ (b2 | ~e)) + d[15] + 4264355552 & 4294967295;
  f = b2 + (h << 10 & 4294967295 | h >>> 22);
  h = e + (b2 ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
  e = f + (h << 15 & 4294967295 | h >>> 17);
  h = c + (f ^ (e | ~b2)) + d[13] + 1309151649 & 4294967295;
  c = e + (h << 21 & 4294967295 | h >>> 11);
  h = b2 + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
  b2 = c + (h << 6 & 4294967295 | h >>> 26);
  h = f + (c ^ (b2 | ~e)) + d[11] + 3174756917 & 4294967295;
  f = b2 + (h << 10 & 4294967295 | h >>> 22);
  h = e + (b2 ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
  e = f + (h << 15 & 4294967295 | h >>> 17);
  h = c + (f ^ (e | ~b2)) + d[9] + 3951481745 & 4294967295;
  a.g[0] = a.g[0] + b2 & 4294967295;
  a.g[1] = a.g[1] + (e + (h << 21 & 4294967295 | h >>> 11)) & 4294967295;
  a.g[2] = a.g[2] + e & 4294967295;
  a.g[3] = a.g[3] + f & 4294967295;
}
function T(a, b2) {
  this.h = b2;
  for (var c = [], d = true, e = a.length - 1; 0 <= e; e--) {
    var f = a[e] | 0;
    d && f == b2 || (c[e] = f, d = false);
  }
  this.g = c;
}
function Td(a) {
  return -128 <= a && 128 > a ? ra(a, function(b2) {
    return new T([b2 | 0], 0 > b2 ? -1 : 0);
  }) : new T([a | 0], 0 > a ? -1 : 0);
}
function U(a) {
  if (isNaN(a) || !isFinite(a))
    return V;
  if (0 > a)
    return W(U(-a));
  for (var b2 = [], c = 1, d = 0; a >= c; d++)
    b2[d] = a / c | 0, c *= Ud;
  return new T(b2, 0);
}
function Vd(a, b2) {
  if (0 == a.length)
    throw Error("number format error: empty string");
  b2 = b2 || 10;
  if (2 > b2 || 36 < b2)
    throw Error("radix out of range: " + b2);
  if ("-" == a.charAt(0))
    return W(Vd(a.substring(1), b2));
  if (0 <= a.indexOf("-"))
    throw Error('number format error: interior "-" character');
  for (var c = U(Math.pow(b2, 8)), d = V, e = 0; e < a.length; e += 8) {
    var f = Math.min(8, a.length - e), h = parseInt(a.substring(e, e + f), b2);
    8 > f ? (f = U(Math.pow(b2, f)), d = d.R(f).add(U(h))) : (d = d.R(c), d = d.add(U(h)));
  }
  return d;
}
function Y(a) {
  if (0 != a.h)
    return false;
  for (var b2 = 0; b2 < a.g.length; b2++)
    if (0 != a.g[b2])
      return false;
  return true;
}
function X(a) {
  return -1 == a.h;
}
function W(a) {
  for (var b2 = a.g.length, c = [], d = 0; d < b2; d++)
    c[d] = ~a.g[d];
  return new T(c, ~a.h).add(Wd);
}
function Zd(a, b2) {
  return a.add(W(b2));
}
function $d(a, b2) {
  for (; (a[b2] & 65535) != a[b2]; )
    a[b2 + 1] += a[b2] >>> 16, a[b2] &= 65535, b2++;
}
function ae(a, b2) {
  this.g = a;
  this.h = b2;
}
function Yd(a, b2) {
  if (Y(b2))
    throw Error("division by zero");
  if (Y(a))
    return new ae(V, V);
  if (X(a))
    return b2 = Yd(W(a), b2), new ae(W(b2.g), W(b2.h));
  if (X(b2))
    return b2 = Yd(a, W(b2)), new ae(W(b2.g), b2.h);
  if (30 < a.g.length) {
    if (X(a) || X(b2))
      throw Error("slowDivide_ only works with positive integers.");
    for (var c = Wd, d = b2; 0 >= d.X(a); )
      c = be(c), d = be(d);
    var e = Z(c, 1), f = Z(d, 1);
    d = Z(d, 2);
    for (c = Z(c, 2); !Y(d); ) {
      var h = f.add(d);
      0 >= h.X(a) && (e = e.add(c), f = h);
      d = Z(d, 1);
      c = Z(c, 1);
    }
    b2 = Zd(a, e.R(b2));
    return new ae(e, b2);
  }
  for (e = V; 0 <= a.X(b2); ) {
    c = Math.max(1, Math.floor(a.ea() / b2.ea()));
    d = Math.ceil(Math.log(c) / Math.LN2);
    d = 48 >= d ? 1 : Math.pow(2, d - 48);
    f = U(c);
    for (h = f.R(b2); X(h) || 0 < h.X(a); )
      c -= d, f = U(c), h = f.R(b2);
    Y(f) && (f = Wd);
    e = e.add(f);
    a = Zd(a, h);
  }
  return new ae(e, a);
}
function be(a) {
  for (var b2 = a.g.length + 1, c = [], d = 0; d < b2; d++)
    c[d] = a.D(d) << 1 | a.D(d - 1) >>> 31;
  return new T(c, a.h);
}
function Z(a, b2) {
  var c = b2 >> 5;
  b2 %= 32;
  for (var d = a.g.length - c, e = [], f = 0; f < d; f++)
    e[f] = 0 < b2 ? a.D(f + c) >>> b2 | a.D(f + c + 1) << 32 - b2 : a.D(f + c);
  return new T(e, a.h);
}
var commonjsGlobal, esm, k, goog, l, ca, da, ia, ka, oa, ta, z, ua, va, wa, xa, za, Aa, Ba, Ca, Da, Ea, Fa, Ga, Ha, Ia, Qa, Va, Wa, hb, jb, kb, nb, ob, pb, sb, tb, mb, vb, ub, Ab, Cb, E, Lb, Sb, Tb, Xb, $b, cc, ec, fc, Lc, Tc, Vc, Uc, Yc, Wc, bd, dd, gd, nd, rd, sd, td, ud, sa, Ud, V, Wd, Xd, createWebChannelTransport, getStatEventTarget, ErrorCode, EventType, Event, Stat, FetchXmlHttpFactory, WebChannel, XhrIo, Md5, Integer;
var init_index_esm20175 = __esm({
  "node_modules/@firebase/webchannel-wrapper/dist/esm/index.esm2017.js"() {
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    esm = {};
    goog = goog || {};
    l = commonjsGlobal || self;
    ca = "closure_uid_" + (1e9 * Math.random() >>> 0);
    da = 0;
    ia = 0;
    v.prototype.s = false;
    v.prototype.sa = function() {
      if (!this.s && (this.s = true, this.N(), 0 != ia)) {
        ba(this);
      }
    };
    v.prototype.N = function() {
      if (this.o)
        for (; this.o.length; )
          this.o.shift()();
    };
    ka = Array.prototype.indexOf ? function(a, b2) {
      return Array.prototype.indexOf.call(a, b2, void 0);
    } : function(a, b2) {
      if ("string" === typeof a)
        return "string" !== typeof b2 || 1 != b2.length ? -1 : a.indexOf(b2, 0);
      for (let c = 0; c < a.length; c++)
        if (c in a && a[c] === b2)
          return c;
      return -1;
    };
    w.prototype.h = function() {
      this.defaultPrevented = true;
    };
    oa = function() {
      if (!l.addEventListener || !Object.defineProperty)
        return false;
      var a = false, b2 = Object.defineProperty({}, "passive", { get: function() {
        a = true;
      } });
      try {
        l.addEventListener("test", () => {
        }, b2), l.removeEventListener("test", () => {
        }, b2);
      } catch (c) {
      }
      return a;
    }();
    qa[" "] = function() {
    };
    ta = y("Opera");
    z = y("Trident") || y("MSIE");
    ua = y("Edge");
    va = ua || z;
    wa = y("Gecko") && !(-1 != pa().toLowerCase().indexOf("webkit") && !y("Edge")) && !(y("Trident") || y("MSIE")) && !y("Edge");
    xa = -1 != pa().toLowerCase().indexOf("webkit") && !y("Edge");
    a: {
      Aa = "", Ba = function() {
        var a = pa();
        if (wa)
          return /rv:([^\);]+)(\)|;)/.exec(a);
        if (ua)
          return /Edge\/([\d\.]+)/.exec(a);
        if (z)
          return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (xa)
          return /WebKit\/(\S+)/.exec(a);
        if (ta)
          return /(?:Version)[ \/]?(\S+)/.exec(a);
      }();
      Ba && (Aa = Ba ? Ba[1] : "");
      if (z) {
        Ca = ya();
        if (null != Ca && Ca > parseFloat(Aa)) {
          za = String(Ca);
          break a;
        }
      }
      za = Aa;
    }
    if (l.document && z) {
      Ea = ya();
      Da = Ea ? Ea : parseInt(za, 10) || void 0;
    } else
      Da = void 0;
    Fa = Da;
    r(A, w);
    Ga = { 2: "touch", 3: "pen", 4: "mouse" };
    A.prototype.h = function() {
      A.$.h.call(this);
      var a = this.i;
      a.preventDefault ? a.preventDefault() : a.returnValue = false;
    };
    Ha = "closure_listenable_" + (1e6 * Math.random() | 0);
    Ia = 0;
    Qa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    Sa.prototype.add = function(a, b2, c, d, e) {
      var f = a.toString();
      a = this.g[f];
      a || (a = this.g[f] = [], this.h++);
      var h = Ta(a, b2, d, e);
      -1 < h ? (b2 = a[h], c || (b2.ia = false)) : (b2 = new Ja(b2, this.src, f, !!d, e), b2.ia = c, a.push(b2));
      return b2;
    };
    Va = "closure_lm_" + (1e6 * Math.random() | 0);
    Wa = {};
    hb = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
    r(B, v);
    B.prototype[Ha] = true;
    B.prototype.removeEventListener = function(a, b2, c, d) {
      fb(this, a, b2, c, d);
    };
    B.prototype.N = function() {
      B.$.N.call(this);
      if (this.i) {
        var a = this.i, c;
        for (c in a.g) {
          for (var d = a.g[c], e = 0; e < d.length; e++)
            Ka(d[e]);
          delete a.g[c];
          a.h--;
        }
      }
      this.J = null;
    };
    B.prototype.O = function(a, b2, c, d) {
      return this.i.add(String(a), b2, false, c, d);
    };
    B.prototype.P = function(a, b2, c, d) {
      return this.i.add(String(a), b2, true, c, d);
    };
    jb = l.JSON.stringify;
    kb = class {
      constructor(a, b2) {
        this.i = a;
        this.j = b2;
        this.h = 0;
        this.g = null;
      }
      get() {
        let a;
        0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
        return a;
      }
    };
    nb = class {
      constructor() {
        this.h = this.g = null;
      }
      add(a, b2) {
        const c = ob.get();
        c.set(a, b2);
        this.h ? this.h.next = c : this.g = c;
        this.h = c;
      }
    };
    ob = new kb(() => new pb(), (a) => a.reset());
    pb = class {
      constructor() {
        this.next = this.g = this.h = null;
      }
      set(a, b2) {
        this.h = a;
        this.g = b2;
        this.next = null;
      }
      reset() {
        this.next = this.g = this.h = null;
      }
    };
    tb = false;
    mb = new nb();
    vb = () => {
      const a = l.Promise.resolve(void 0);
      sb = () => {
        a.then(ub);
      };
    };
    ub = () => {
      for (var a; a = lb(); ) {
        try {
          a.h.call(a.g);
        } catch (c) {
          rb(c);
        }
        var b2 = ob;
        b2.j(a);
        100 > b2.h && (b2.h++, a.next = b2.g, b2.g = a);
      }
      tb = false;
    };
    r(wb, B);
    k = wb.prototype;
    k.ga = false;
    k.T = null;
    k.qb = function() {
      if (this.ga) {
        var a = Date.now() - this.l;
        0 < a && a < 0.8 * this.h ? this.T = this.g.setTimeout(this.j, this.h - a) : (this.T && (this.g.clearTimeout(this.T), this.T = null), C(this, "tick"), this.ga && (xb(this), this.start()));
      }
    };
    k.start = function() {
      this.ga = true;
      this.T || (this.T = this.g.setTimeout(this.j, this.h), this.l = Date.now());
    };
    k.N = function() {
      wb.$.N.call(this);
      xb(this);
      delete this.g;
    };
    Ab = class extends v {
      constructor(a, b2) {
        super();
        this.m = a;
        this.j = b2;
        this.h = null;
        this.i = false;
        this.g = null;
      }
      l(a) {
        this.h = arguments;
        this.g ? this.i = true : zb(this);
      }
      N() {
        super.N();
        this.g && (l.clearTimeout(this.g), this.g = null, this.i = false, this.h = null);
      }
    };
    r(Bb, v);
    Cb = [];
    Bb.prototype.N = function() {
      Bb.$.N.call(this);
      Fb(this);
    };
    Bb.prototype.handleEvent = function() {
      throw Error("EventHandler.handleEvent not implemented");
    };
    Gb.prototype.Ea = function() {
      this.g = false;
    };
    Gb.prototype.info = function() {
    };
    E = {};
    Lb = null;
    E.Ta = "serverreachability";
    r(Nb, w);
    E.STAT_EVENT = "statevent";
    r(Pb, w);
    E.Ua = "timingevent";
    r(Qb, w);
    Sb = { NO_ERROR: 0, rb: 1, Eb: 2, Db: 3, yb: 4, Cb: 5, Fb: 6, Qa: 7, TIMEOUT: 8, Ib: 9 };
    Tb = { wb: "complete", Sb: "success", Ra: "error", Qa: "abort", Kb: "ready", Lb: "readystatechange", TIMEOUT: "timeout", Gb: "incrementaldata", Jb: "progress", zb: "downloadprogress", $b: "uploadprogress" };
    Ub.prototype.h = null;
    Xb = { OPEN: "a", vb: "b", Ra: "c", Hb: "d" };
    r(Yb, w);
    r(Zb, w);
    r(ac, Ub);
    ac.prototype.g = function() {
      return new XMLHttpRequest();
    };
    ac.prototype.i = function() {
      return {};
    };
    $b = new ac();
    cc = 45e3;
    ec = {};
    fc = {};
    k = bc.prototype;
    k.setTimeout = function(a) {
      this.P = a;
    };
    k.nb = function(a) {
      a = a.target;
      const b2 = this.M;
      b2 && 3 == H(a) ? b2.l() : this.Pa(a);
    };
    k.Pa = function(a) {
      try {
        if (a == this.g)
          a: {
            const u = H(this.g);
            var b2 = this.g.Ia();
            const L = this.g.da();
            if (!(3 > u) && (3 != u || va || this.g && (this.h.h || this.g.ja() || mc(this.g)))) {
              this.J || 4 != u || 7 == b2 || (8 == b2 || 0 >= L ? Ob(3) : Ob(2));
              nc(this);
              var c = this.g.da();
              this.ca = c;
              b:
                if (oc(this)) {
                  var d = mc(this.g);
                  a = "";
                  var e = d.length, f = 4 == H(this.g);
                  if (!this.h.i) {
                    if ("undefined" === typeof TextDecoder) {
                      I(this);
                      pc(this);
                      var h = "";
                      break b;
                    }
                    this.h.i = new l.TextDecoder();
                  }
                  for (b2 = 0; b2 < e; b2++)
                    this.h.h = true, a += this.h.i.decode(d[b2], { stream: f && b2 == e - 1 });
                  d.splice(
                    0,
                    e
                  );
                  this.h.g += a;
                  this.C = 0;
                  h = this.h.g;
                } else
                  h = this.g.ja();
              this.i = 200 == c;
              Ib(this.j, this.u, this.A, this.m, this.W, u, c);
              if (this.i) {
                if (this.aa && !this.K) {
                  b: {
                    if (this.g) {
                      var n, t = this.g;
                      if ((n = t.g ? t.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !x(n)) {
                        var m = n;
                        break b;
                      }
                    }
                    m = null;
                  }
                  if (c = m)
                    D(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.K = true, qc(this, c);
                  else {
                    this.i = false;
                    this.o = 3;
                    F(12);
                    I(this);
                    pc(this);
                    break a;
                  }
                }
                this.S ? (rc(this, u, h), va && this.i && 3 == u && (Db(this.U, this.V, "tick", this.mb), this.V.start())) : (D(this.j, this.m, h, null), qc(this, h));
                4 == u && I(this);
                this.i && !this.J && (4 == u ? sc(this.l, this) : (this.i = false, jc(this)));
              } else
                tc(this.g), 400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, F(12)) : (this.o = 0, F(13)), I(this), pc(this);
            }
          }
      } catch (u) {
      } finally {
      }
    };
    k.mb = function() {
      if (this.g) {
        var a = H(this.g), b2 = this.g.ja();
        this.C < b2.length && (nc(this), rc(this, a, b2), this.i && 4 != a && jc(this));
      }
    };
    k.cancel = function() {
      this.J = true;
      I(this);
    };
    k.lb = function() {
      this.B = null;
      const a = Date.now();
      0 <= a - this.Y ? (Kb(this.j, this.A), 2 != this.L && (Ob(), F(17)), I(this), this.o = 2, pc(this)) : wc(this, this.Y - a);
    };
    Lc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    M.prototype.toString = function() {
      var a = [], b2 = this.j;
      b2 && a.push(Sc(b2, Tc, true), ":");
      var c = this.g;
      if (c || "file" == b2)
        a.push("//"), (b2 = this.s) && a.push(Sc(b2, Tc, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c));
      if (c = this.l)
        this.g && "/" != c.charAt(0) && a.push("/"), a.push(Sc(c, "/" == c.charAt(0) ? Uc : Vc, true));
      (c = this.i.toString()) && a.push("?", c);
      (c = this.o) && a.push("#", Sc(c, Wc));
      return a.join("");
    };
    Tc = /[#\/\?@]/g;
    Vc = /[#\?:]/g;
    Uc = /[#\?]/g;
    Yc = /[#\?@]/g;
    Wc = /#/g;
    k = Pc.prototype;
    k.add = function(a, b2) {
      N(this);
      this.i = null;
      a = O(this, a);
      var c = this.g.get(a);
      c || this.g.set(a, c = []);
      c.push(b2);
      this.h += 1;
      return this;
    };
    k.forEach = function(a, b2) {
      N(this);
      this.g.forEach(function(c, d) {
        c.forEach(function(e) {
          a.call(b2, e, d, this);
        }, this);
      }, this);
    };
    k.ta = function() {
      N(this);
      const a = Array.from(this.g.values()), b2 = Array.from(this.g.keys()), c = [];
      for (let d = 0; d < b2.length; d++) {
        const e = a[d];
        for (let f = 0; f < e.length; f++)
          c.push(b2[d]);
      }
      return c;
    };
    k.Z = function(a) {
      N(this);
      let b2 = [];
      if ("string" === typeof a)
        ad(this, a) && (b2 = b2.concat(this.g.get(O(this, a))));
      else {
        a = Array.from(this.g.values());
        for (let c = 0; c < a.length; c++)
          b2 = b2.concat(a[c]);
      }
      return b2;
    };
    k.set = function(a, b2) {
      N(this);
      this.i = null;
      a = O(this, a);
      ad(this, a) && (this.h -= this.g.get(a).length);
      this.g.set(a, [b2]);
      this.h += 1;
      return this;
    };
    k.get = function(a, b2) {
      if (!a)
        return b2;
      a = this.Z(a);
      return 0 < a.length ? String(a[0]) : b2;
    };
    k.toString = function() {
      if (this.i)
        return this.i;
      if (!this.g)
        return "";
      const a = [], b2 = Array.from(this.g.keys());
      for (var c = 0; c < b2.length; c++) {
        var d = b2[c];
        const f = encodeURIComponent(String(d)), h = this.Z(d);
        for (d = 0; d < h.length; d++) {
          var e = f;
          "" !== h[d] && (e += "=" + encodeURIComponent(String(h[d])));
          a.push(e);
        }
      }
      return this.i = a.join("&");
    };
    bd = class {
      constructor(a, b2) {
        this.g = a;
        this.map = b2;
      }
    };
    dd = 10;
    cd.prototype.cancel = function() {
      this.i = fd(this);
      if (this.h)
        this.h.cancel(), this.h = null;
      else if (this.g && 0 !== this.g.size) {
        for (const a of this.g.values())
          a.cancel();
        this.g.clear();
      }
    };
    gd = class {
      stringify(a) {
        return l.JSON.stringify(a, void 0);
      }
      parse(a) {
        return l.JSON.parse(a, void 0);
      }
    };
    r(ld, Ub);
    ld.prototype.g = function() {
      return new md(this.l, this.j);
    };
    ld.prototype.i = function(a) {
      return function() {
        return a;
      };
    }({});
    r(md, B);
    nd = 0;
    k = md.prototype;
    k.open = function(a, b2) {
      if (this.readyState != nd)
        throw this.abort(), Error("Error reopening a connection");
      this.C = a;
      this.B = b2;
      this.readyState = 1;
      od(this);
    };
    k.send = function(a) {
      if (1 != this.readyState)
        throw this.abort(), Error("need to call open() first. ");
      this.g = true;
      const b2 = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 };
      a && (b2.body = a);
      (this.F || l).fetch(new Request(this.B, b2)).then(this.$a.bind(this), this.ka.bind(this));
    };
    k.abort = function() {
      this.response = this.responseText = "";
      this.v = new Headers();
      this.status = 0;
      this.j && this.j.cancel("Request was aborted.").catch(() => {
      });
      1 <= this.readyState && this.g && 4 != this.readyState && (this.g = false, pd(this));
      this.readyState = nd;
    };
    k.$a = function(a) {
      if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, od(this)), this.g && (this.readyState = 3, od(this), this.g)))
        if ("arraybuffer" === this.responseType)
          a.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
        else if ("undefined" !== typeof l.ReadableStream && "body" in a) {
          this.j = a.body.getReader();
          if (this.u) {
            if (this.responseType)
              throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
            this.response = [];
          } else
            this.response = this.responseText = "", this.A = new TextDecoder();
          qd(this);
        } else
          a.text().then(this.Za.bind(this), this.ka.bind(this));
    };
    k.Xa = function(a) {
      if (this.g) {
        if (this.u && a.value)
          this.response.push(a.value);
        else if (!this.u) {
          var b2 = a.value ? a.value : new Uint8Array(0);
          if (b2 = this.A.decode(b2, { stream: !a.done }))
            this.response = this.responseText += b2;
        }
        a.done ? pd(this) : od(this);
        3 == this.readyState && qd(this);
      }
    };
    k.Za = function(a) {
      this.g && (this.response = this.responseText = a, pd(this));
    };
    k.Ya = function(a) {
      this.g && (this.response = a, pd(this));
    };
    k.ka = function() {
      this.g && pd(this);
    };
    k.setRequestHeader = function(a, b2) {
      this.v.append(a, b2);
    };
    k.getResponseHeader = function(a) {
      return this.h ? this.h.get(a.toLowerCase()) || "" : "";
    };
    k.getAllResponseHeaders = function() {
      if (!this.h)
        return "";
      const a = [], b2 = this.h.entries();
      for (var c = b2.next(); !c.done; )
        c = c.value, a.push(c[0] + ": " + c[1]), c = b2.next();
      return a.join("\r\n");
    };
    Object.defineProperty(md.prototype, "withCredentials", { get: function() {
      return "include" === this.m;
    }, set: function(a) {
      this.m = a ? "include" : "same-origin";
    } });
    rd = l.JSON.parse;
    r(P, B);
    sd = "";
    td = /^https?$/i;
    ud = ["POST", "PUT"];
    k = P.prototype;
    k.Oa = function(a) {
      this.M = a;
    };
    k.ha = function(a, b2, c, d) {
      if (this.g)
        throw Error("[goog.net.XhrIo] Object is active with another request=" + this.I + "; newUri=" + a);
      b2 = b2 ? b2.toUpperCase() : "GET";
      this.I = a;
      this.j = "";
      this.m = 0;
      this.F = false;
      this.h = true;
      this.g = this.u ? this.u.g() : $b.g();
      this.C = this.u ? Vb(this.u) : Vb($b);
      this.g.onreadystatechange = q(this.La, this);
      try {
        this.G = true, this.g.open(b2, String(a), true), this.G = false;
      } catch (f) {
        vd(this, f);
        return;
      }
      a = c || "";
      c = new Map(this.headers);
      if (d)
        if (Object.getPrototypeOf(d) === Object.prototype)
          for (var e in d)
            c.set(e, d[e]);
        else if ("function" === typeof d.keys && "function" === typeof d.get)
          for (const f of d.keys())
            c.set(f, d.get(f));
        else
          throw Error("Unknown input type for opt_headers: " + String(d));
      d = Array.from(c.keys()).find((f) => "content-type" == f.toLowerCase());
      e = l.FormData && a instanceof l.FormData;
      !(0 <= ka(ud, b2)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
      for (const [f, h] of c)
        this.g.setRequestHeader(f, h);
      this.K && (this.g.responseType = this.K);
      "withCredentials" in this.g && this.g.withCredentials !== this.M && (this.g.withCredentials = this.M);
      try {
        wd(this), 0 < this.B && ((this.L = xd(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = q(this.ua, this)) : this.A = yb(this.ua, this.B, this)), this.v = true, this.g.send(a), this.v = false;
      } catch (f) {
        vd(this, f);
      }
    };
    k.ua = function() {
      "undefined" != typeof goog && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, C(this, "timeout"), this.abort(8));
    };
    k.abort = function(a) {
      this.g && this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false, this.m = a || 7, C(this, "complete"), C(this, "abort"), zd(this));
    };
    k.N = function() {
      this.g && (this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false), zd(this, true));
      P.$.N.call(this);
    };
    k.La = function() {
      this.s || (this.G || this.v || this.l ? Ad(this) : this.kb());
    };
    k.kb = function() {
      Ad(this);
    };
    k.isActive = function() {
      return !!this.g;
    };
    k.da = function() {
      try {
        return 2 < H(this) ? this.g.status : -1;
      } catch (a) {
        return -1;
      }
    };
    k.ja = function() {
      try {
        return this.g ? this.g.responseText : "";
      } catch (a) {
        return "";
      }
    };
    k.Wa = function(a) {
      if (this.g) {
        var b2 = this.g.responseText;
        a && 0 == b2.indexOf(a) && (b2 = b2.substring(a.length));
        return rd(b2);
      }
    };
    k.Ia = function() {
      return this.m;
    };
    k.Sa = function() {
      return "string" === typeof this.j ? this.j : String(this.j);
    };
    k = Ed.prototype;
    k.ra = 8;
    k.H = 1;
    k.Na = function(a) {
      if (this.m)
        if (this.m = null, 1 == this.H) {
          if (!a) {
            this.W = Math.floor(1e5 * Math.random());
            a = this.W++;
            const e = new bc(this, this.l, a);
            let f = this.s;
            this.U && (f ? (f = Pa(f), Ra(f, this.U)) : f = this.U);
            null !== this.o || this.O || (e.I = f, f = null);
            if (this.P)
              a: {
                var b2 = 0;
                for (var c = 0; c < this.j.length; c++) {
                  b: {
                    var d = this.j[c];
                    if ("__data__" in d.map && (d = d.map.__data__, "string" === typeof d)) {
                      d = d.length;
                      break b;
                    }
                    d = void 0;
                  }
                  if (void 0 === d)
                    break;
                  b2 += d;
                  if (4096 < b2) {
                    b2 = c;
                    break a;
                  }
                  if (4096 === b2 || c === this.j.length - 1) {
                    b2 = c + 1;
                    break a;
                  }
                }
                b2 = 1e3;
              }
            else
              b2 = 1e3;
            b2 = Kd(this, e, b2);
            c = G(this.I);
            K(c, "RID", a);
            K(c, "CVER", 22);
            this.F && K(c, "X-HTTP-Session-Id", this.F);
            Gd(this, c);
            f && (this.O ? b2 = "headers=" + encodeURIComponent(String(Bd(f))) + "&" + b2 : this.o && Cd(c, this.o, f));
            Cc(this.i, e);
            this.bb && K(c, "TYPE", "init");
            this.P ? (K(c, "$req", b2), K(c, "SID", "null"), e.aa = true, gc(e, c, null)) : gc(e, c, b2);
            this.H = 2;
          }
        } else
          3 == this.H && (a ? Ld(this, a) : 0 == this.j.length || ed(this.i) || Ld(this));
    };
    k.Ma = function() {
      this.u = null;
      Md(this);
      if (this.ca && !(this.M || null == this.g || 0 >= this.S)) {
        var a = 2 * this.S;
        this.l.info("BP detection timer enabled: " + a);
        this.B = Rb(q(this.jb, this), a);
      }
    };
    k.jb = function() {
      this.B && (this.B = null, this.l.info("BP detection timeout reached."), this.l.info("Buffering proxy detected and switch to long-polling!"), this.G = false, this.M = true, F(10), zc(this), Md(this));
    };
    k.ib = function() {
      null != this.v && (this.v = null, zc(this), Ac(this), F(19));
    };
    k.pb = function(a) {
      a ? (this.l.info("Successfully pinged google.com"), F(2)) : (this.l.info("Failed to ping google.com"), F(1));
    };
    k.isActive = function() {
      return !!this.h && this.h.isActive(this);
    };
    k = Nd.prototype;
    k.Ba = function() {
    };
    k.Aa = function() {
    };
    k.za = function() {
    };
    k.ya = function() {
    };
    k.isActive = function() {
      return true;
    };
    k.Va = function() {
    };
    Od.prototype.g = function(a, b2) {
      return new Q(a, b2);
    };
    r(Q, B);
    Q.prototype.m = function() {
      this.g.h = this.j;
      this.A && (this.g.J = true);
      var a = this.g, b2 = this.l, c = this.h || void 0;
      F(0);
      a.Y = b2;
      a.na = c || {};
      a.G = a.aa;
      a.I = Dc(a, null, a.Y);
      Gc(a);
    };
    Q.prototype.close = function() {
      Hc(this.g);
    };
    Q.prototype.u = function(a) {
      var b2 = this.g;
      if ("string" === typeof a) {
        var c = {};
        c.__data__ = a;
        a = c;
      } else
        this.v && (c = {}, c.__data__ = jb(a), a = c);
      b2.j.push(new bd(b2.fb++, a));
      3 == b2.H && Gc(b2);
    };
    Q.prototype.N = function() {
      this.g.h = null;
      delete this.j;
      Hc(this.g);
      delete this.g;
      Q.$.N.call(this);
    };
    r(Pd, Yb);
    r(Qd, Zb);
    r(R, Nd);
    R.prototype.Ba = function() {
      C(this.g, "a");
    };
    R.prototype.Aa = function(a) {
      C(this.g, new Pd(a));
    };
    R.prototype.za = function(a) {
      C(this.g, new Qd());
    };
    R.prototype.ya = function() {
      C(this.g, "b");
    };
    r(S, Rd);
    S.prototype.reset = function() {
      this.g[0] = 1732584193;
      this.g[1] = 4023233417;
      this.g[2] = 2562383102;
      this.g[3] = 271733878;
      this.i = this.h = 0;
    };
    S.prototype.j = function(a, b2) {
      void 0 === b2 && (b2 = a.length);
      for (var c = b2 - this.blockSize, d = this.m, e = this.h, f = 0; f < b2; ) {
        if (0 == e)
          for (; f <= c; )
            Sd(this, a, f), f += this.blockSize;
        if ("string" === typeof a)
          for (; f < b2; ) {
            if (d[e++] = a.charCodeAt(f++), e == this.blockSize) {
              Sd(this, d);
              e = 0;
              break;
            }
          }
        else
          for (; f < b2; )
            if (d[e++] = a[f++], e == this.blockSize) {
              Sd(this, d);
              e = 0;
              break;
            }
      }
      this.h = e;
      this.i += b2;
    };
    S.prototype.l = function() {
      var a = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
      a[0] = 128;
      for (var b2 = 1; b2 < a.length - 8; ++b2)
        a[b2] = 0;
      var c = 8 * this.i;
      for (b2 = a.length - 8; b2 < a.length; ++b2)
        a[b2] = c & 255, c /= 256;
      this.j(a);
      a = Array(16);
      for (b2 = c = 0; 4 > b2; ++b2)
        for (var d = 0; 32 > d; d += 8)
          a[c++] = this.g[b2] >>> d & 255;
      return a;
    };
    sa = {};
    Ud = 4294967296;
    V = Td(0);
    Wd = Td(1);
    Xd = Td(16777216);
    k = T.prototype;
    k.ea = function() {
      if (X(this))
        return -W(this).ea();
      for (var a = 0, b2 = 1, c = 0; c < this.g.length; c++) {
        var d = this.D(c);
        a += (0 <= d ? d : Ud + d) * b2;
        b2 *= Ud;
      }
      return a;
    };
    k.toString = function(a) {
      a = a || 10;
      if (2 > a || 36 < a)
        throw Error("radix out of range: " + a);
      if (Y(this))
        return "0";
      if (X(this))
        return "-" + W(this).toString(a);
      for (var b2 = U(Math.pow(a, 6)), c = this, d = ""; ; ) {
        var e = Yd(c, b2).g;
        c = Zd(c, e.R(b2));
        var f = ((0 < c.g.length ? c.g[0] : c.h) >>> 0).toString(a);
        c = e;
        if (Y(c))
          return f + d;
        for (; 6 > f.length; )
          f = "0" + f;
        d = f + d;
      }
    };
    k.D = function(a) {
      return 0 > a ? 0 : a < this.g.length ? this.g[a] : this.h;
    };
    k.X = function(a) {
      a = Zd(this, a);
      return X(a) ? -1 : Y(a) ? 0 : 1;
    };
    k.abs = function() {
      return X(this) ? W(this) : this;
    };
    k.add = function(a) {
      for (var b2 = Math.max(this.g.length, a.g.length), c = [], d = 0, e = 0; e <= b2; e++) {
        var f = d + (this.D(e) & 65535) + (a.D(e) & 65535), h = (f >>> 16) + (this.D(e) >>> 16) + (a.D(e) >>> 16);
        d = h >>> 16;
        f &= 65535;
        h &= 65535;
        c[e] = h << 16 | f;
      }
      return new T(c, c[c.length - 1] & -2147483648 ? -1 : 0);
    };
    k.R = function(a) {
      if (Y(this) || Y(a))
        return V;
      if (X(this))
        return X(a) ? W(this).R(W(a)) : W(W(this).R(a));
      if (X(a))
        return W(this.R(W(a)));
      if (0 > this.X(Xd) && 0 > a.X(Xd))
        return U(this.ea() * a.ea());
      for (var b2 = this.g.length + a.g.length, c = [], d = 0; d < 2 * b2; d++)
        c[d] = 0;
      for (d = 0; d < this.g.length; d++)
        for (var e = 0; e < a.g.length; e++) {
          var f = this.D(d) >>> 16, h = this.D(d) & 65535, n = a.D(e) >>> 16, t = a.D(e) & 65535;
          c[2 * d + 2 * e] += h * t;
          $d(c, 2 * d + 2 * e);
          c[2 * d + 2 * e + 1] += f * t;
          $d(c, 2 * d + 2 * e + 1);
          c[2 * d + 2 * e + 1] += h * n;
          $d(c, 2 * d + 2 * e + 1);
          c[2 * d + 2 * e + 2] += f * n;
          $d(c, 2 * d + 2 * e + 2);
        }
      for (d = 0; d < b2; d++)
        c[d] = c[2 * d + 1] << 16 | c[2 * d];
      for (d = b2; d < 2 * b2; d++)
        c[d] = 0;
      return new T(c, 0);
    };
    k.gb = function(a) {
      return Yd(this, a).h;
    };
    k.and = function(a) {
      for (var b2 = Math.max(this.g.length, a.g.length), c = [], d = 0; d < b2; d++)
        c[d] = this.D(d) & a.D(d);
      return new T(c, this.h & a.h);
    };
    k.or = function(a) {
      for (var b2 = Math.max(this.g.length, a.g.length), c = [], d = 0; d < b2; d++)
        c[d] = this.D(d) | a.D(d);
      return new T(c, this.h | a.h);
    };
    k.xor = function(a) {
      for (var b2 = Math.max(this.g.length, a.g.length), c = [], d = 0; d < b2; d++)
        c[d] = this.D(d) ^ a.D(d);
      return new T(c, this.h ^ a.h);
    };
    Od.prototype.createWebChannel = Od.prototype.g;
    Q.prototype.send = Q.prototype.u;
    Q.prototype.open = Q.prototype.m;
    Q.prototype.close = Q.prototype.close;
    Sb.NO_ERROR = 0;
    Sb.TIMEOUT = 8;
    Sb.HTTP_ERROR = 6;
    Tb.COMPLETE = "complete";
    Wb.EventType = Xb;
    Xb.OPEN = "a";
    Xb.CLOSE = "b";
    Xb.ERROR = "c";
    Xb.MESSAGE = "d";
    B.prototype.listen = B.prototype.O;
    P.prototype.listenOnce = P.prototype.P;
    P.prototype.getLastError = P.prototype.Sa;
    P.prototype.getLastErrorCode = P.prototype.Ia;
    P.prototype.getStatus = P.prototype.da;
    P.prototype.getResponseJson = P.prototype.Wa;
    P.prototype.getResponseText = P.prototype.ja;
    P.prototype.send = P.prototype.ha;
    P.prototype.setWithCredentials = P.prototype.Oa;
    S.prototype.digest = S.prototype.l;
    S.prototype.reset = S.prototype.reset;
    S.prototype.update = S.prototype.j;
    T.prototype.add = T.prototype.add;
    T.prototype.multiply = T.prototype.R;
    T.prototype.modulo = T.prototype.gb;
    T.prototype.compare = T.prototype.X;
    T.prototype.toNumber = T.prototype.ea;
    T.prototype.toString = T.prototype.toString;
    T.prototype.getBits = T.prototype.D;
    T.fromNumber = U;
    T.fromString = Vd;
    createWebChannelTransport = esm.createWebChannelTransport = function() {
      return new Od();
    };
    getStatEventTarget = esm.getStatEventTarget = function() {
      return Mb();
    };
    ErrorCode = esm.ErrorCode = Sb;
    EventType = esm.EventType = Tb;
    Event = esm.Event = E;
    Stat = esm.Stat = { xb: 0, Ab: 1, Bb: 2, Ub: 3, Zb: 4, Wb: 5, Xb: 6, Vb: 7, Tb: 8, Yb: 9, PROXY: 10, NOPROXY: 11, Rb: 12, Nb: 13, Ob: 14, Mb: 15, Pb: 16, Qb: 17, tb: 18, sb: 19, ub: 20 };
    FetchXmlHttpFactory = esm.FetchXmlHttpFactory = ld;
    WebChannel = esm.WebChannel = Wb;
    XhrIo = esm.XhrIo = P;
    Md5 = esm.Md5 = S;
    Integer = esm.Integer = T;
  }
});

// node_modules/@firebase/firestore/dist/index.esm2017.js
function __PRIVATE_getLogLevel() {
  return D2.logLevel;
}
function __PRIVATE_logDebug(e, ...t) {
  if (D2.logLevel <= LogLevel.DEBUG) {
    const n = t.map(__PRIVATE_argToString);
    D2.debug(`Firestore (${b}): ${e}`, ...n);
  }
}
function __PRIVATE_logError(e, ...t) {
  if (D2.logLevel <= LogLevel.ERROR) {
    const n = t.map(__PRIVATE_argToString);
    D2.error(`Firestore (${b}): ${e}`, ...n);
  }
}
function __PRIVATE_logWarn(e, ...t) {
  if (D2.logLevel <= LogLevel.WARN) {
    const n = t.map(__PRIVATE_argToString);
    D2.warn(`Firestore (${b}): ${e}`, ...n);
  }
}
function __PRIVATE_argToString(e) {
  if ("string" == typeof e)
    return e;
  try {
    return function __PRIVATE_formatJSON(e2) {
      return JSON.stringify(e2);
    }(e);
  } catch (t) {
    return e;
  }
}
function fail(e = "Unexpected state") {
  const t = `FIRESTORE (${b}) INTERNAL ASSERTION FAILED: ` + e;
  throw __PRIVATE_logError(t), new Error(t);
}
function __PRIVATE_hardAssert(e, t) {
  e || fail();
}
function __PRIVATE_debugCast(e, t) {
  return e;
}
function __PRIVATE_randomBytes(e) {
  const t = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto)
  ), n = new Uint8Array(e);
  if (t && "function" == typeof t.getRandomValues)
    t.getRandomValues(n);
  else
    for (let t2 = 0; t2 < e; t2++)
      n[t2] = Math.floor(256 * Math.random());
  return n;
}
function __PRIVATE_primitiveComparator(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function __PRIVATE_arrayEquals(e, t, n) {
  return e.length === t.length && e.every((e2, r2) => n(e2, t[r2]));
}
function __PRIVATE_newIndexOffsetSuccessorFromReadTime(e, t) {
  const n = e.toTimestamp().seconds, r2 = e.toTimestamp().nanoseconds + 1, i = SnapshotVersion.fromTimestamp(1e9 === r2 ? new Timestamp(n + 1, 0) : new Timestamp(n, r2));
  return new IndexOffset(i, DocumentKey.empty(), t);
}
function __PRIVATE_newIndexOffsetFromDocument(e) {
  return new IndexOffset(e.readTime, e.key, -1);
}
function __PRIVATE_indexOffsetComparator(e, t) {
  let n = e.readTime.compareTo(t.readTime);
  return 0 !== n ? n : (n = DocumentKey.comparator(e.documentKey, t.documentKey), 0 !== n ? n : __PRIVATE_primitiveComparator(e.largestBatchId, t.largestBatchId));
}
async function __PRIVATE_ignoreIfPrimaryLeaseLoss(e) {
  if (e.code !== C2.FAILED_PRECONDITION || e.message !== F2)
    throw e;
  __PRIVATE_logDebug("LocalStore", "Unexpectedly lost primary lease");
}
function __PRIVATE_isIndexedDbTransactionError(e) {
  return "IndexedDbTransactionError" === e.name;
}
function __PRIVATE_isNullOrUndefined(e) {
  return null == e;
}
function __PRIVATE_isNegativeZero(e) {
  return 0 === e && 1 / e == -1 / 0;
}
function __PRIVATE_objectSize(e) {
  let t = 0;
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t++;
  return t;
}
function forEach(e, t) {
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
}
function isEmpty(e) {
  for (const t in e)
    if (Object.prototype.hasOwnProperty.call(e, t))
      return false;
  return true;
}
function __PRIVATE_normalizeTimestamp(e) {
  if (__PRIVATE_hardAssert(!!e), "string" == typeof e) {
    let t = 0;
    const n = te.exec(e);
    if (__PRIVATE_hardAssert(!!n), n[1]) {
      let e2 = n[1];
      e2 = (e2 + "000000000").substr(0, 9), t = Number(e2);
    }
    const r2 = new Date(e);
    return {
      seconds: Math.floor(r2.getTime() / 1e3),
      nanos: t
    };
  }
  return {
    seconds: __PRIVATE_normalizeNumber(e.seconds),
    nanos: __PRIVATE_normalizeNumber(e.nanos)
  };
}
function __PRIVATE_normalizeNumber(e) {
  return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
}
function __PRIVATE_normalizeByteString(e) {
  return "string" == typeof e ? ByteString.fromBase64String(e) : ByteString.fromUint8Array(e);
}
function __PRIVATE_isServerTimestamp(e) {
  var t, n;
  return "server_timestamp" === (null === (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t ? void 0 : t.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}
function __PRIVATE_getPreviousValue(e) {
  const t = e.mapValue.fields.__previous_value__;
  return __PRIVATE_isServerTimestamp(t) ? __PRIVATE_getPreviousValue(t) : t;
}
function __PRIVATE_getLocalWriteTime(e) {
  const t = __PRIVATE_normalizeTimestamp(e.mapValue.fields.__local_write_time__.timestampValue);
  return new Timestamp(t.seconds, t.nanos);
}
function __PRIVATE_typeOrder(e) {
  return "nullValue" in e ? 0 : "booleanValue" in e ? 1 : "integerValue" in e || "doubleValue" in e ? 2 : "timestampValue" in e ? 3 : "stringValue" in e ? 5 : "bytesValue" in e ? 6 : "referenceValue" in e ? 7 : "geoPointValue" in e ? 8 : "arrayValue" in e ? 9 : "mapValue" in e ? __PRIVATE_isServerTimestamp(e) ? 4 : __PRIVATE_isMaxValue(e) ? 9007199254740991 : 10 : fail();
}
function __PRIVATE_valueEquals(e, t) {
  if (e === t)
    return true;
  const n = __PRIVATE_typeOrder(e);
  if (n !== __PRIVATE_typeOrder(t))
    return false;
  switch (n) {
    case 0:
    case 9007199254740991:
      return true;
    case 1:
      return e.booleanValue === t.booleanValue;
    case 4:
      return __PRIVATE_getLocalWriteTime(e).isEqual(__PRIVATE_getLocalWriteTime(t));
    case 3:
      return function __PRIVATE_timestampEquals(e2, t2) {
        if ("string" == typeof e2.timestampValue && "string" == typeof t2.timestampValue && e2.timestampValue.length === t2.timestampValue.length)
          return e2.timestampValue === t2.timestampValue;
        const n2 = __PRIVATE_normalizeTimestamp(e2.timestampValue), r2 = __PRIVATE_normalizeTimestamp(t2.timestampValue);
        return n2.seconds === r2.seconds && n2.nanos === r2.nanos;
      }(e, t);
    case 5:
      return e.stringValue === t.stringValue;
    case 6:
      return function __PRIVATE_blobEquals(e2, t2) {
        return __PRIVATE_normalizeByteString(e2.bytesValue).isEqual(__PRIVATE_normalizeByteString(t2.bytesValue));
      }(e, t);
    case 7:
      return e.referenceValue === t.referenceValue;
    case 8:
      return function __PRIVATE_geoPointEquals(e2, t2) {
        return __PRIVATE_normalizeNumber(e2.geoPointValue.latitude) === __PRIVATE_normalizeNumber(t2.geoPointValue.latitude) && __PRIVATE_normalizeNumber(e2.geoPointValue.longitude) === __PRIVATE_normalizeNumber(t2.geoPointValue.longitude);
      }(e, t);
    case 2:
      return function __PRIVATE_numberEquals(e2, t2) {
        if ("integerValue" in e2 && "integerValue" in t2)
          return __PRIVATE_normalizeNumber(e2.integerValue) === __PRIVATE_normalizeNumber(t2.integerValue);
        if ("doubleValue" in e2 && "doubleValue" in t2) {
          const n2 = __PRIVATE_normalizeNumber(e2.doubleValue), r2 = __PRIVATE_normalizeNumber(t2.doubleValue);
          return n2 === r2 ? __PRIVATE_isNegativeZero(n2) === __PRIVATE_isNegativeZero(r2) : isNaN(n2) && isNaN(r2);
        }
        return false;
      }(e, t);
    case 9:
      return __PRIVATE_arrayEquals(e.arrayValue.values || [], t.arrayValue.values || [], __PRIVATE_valueEquals);
    case 10:
      return function __PRIVATE_objectEquals(e2, t2) {
        const n2 = e2.mapValue.fields || {}, r2 = t2.mapValue.fields || {};
        if (__PRIVATE_objectSize(n2) !== __PRIVATE_objectSize(r2))
          return false;
        for (const e3 in n2)
          if (n2.hasOwnProperty(e3) && (void 0 === r2[e3] || !__PRIVATE_valueEquals(n2[e3], r2[e3])))
            return false;
        return true;
      }(e, t);
    default:
      return fail();
  }
}
function __PRIVATE_arrayValueContains(e, t) {
  return void 0 !== (e.values || []).find((e2) => __PRIVATE_valueEquals(e2, t));
}
function __PRIVATE_valueCompare(e, t) {
  if (e === t)
    return 0;
  const n = __PRIVATE_typeOrder(e), r2 = __PRIVATE_typeOrder(t);
  if (n !== r2)
    return __PRIVATE_primitiveComparator(n, r2);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return __PRIVATE_primitiveComparator(e.booleanValue, t.booleanValue);
    case 2:
      return function __PRIVATE_compareNumbers(e2, t2) {
        const n2 = __PRIVATE_normalizeNumber(e2.integerValue || e2.doubleValue), r3 = __PRIVATE_normalizeNumber(t2.integerValue || t2.doubleValue);
        return n2 < r3 ? -1 : n2 > r3 ? 1 : n2 === r3 ? 0 : (
          // one or both are NaN.
          isNaN(n2) ? isNaN(r3) ? 0 : -1 : 1
        );
      }(e, t);
    case 3:
      return __PRIVATE_compareTimestamps(e.timestampValue, t.timestampValue);
    case 4:
      return __PRIVATE_compareTimestamps(__PRIVATE_getLocalWriteTime(e), __PRIVATE_getLocalWriteTime(t));
    case 5:
      return __PRIVATE_primitiveComparator(e.stringValue, t.stringValue);
    case 6:
      return function __PRIVATE_compareBlobs(e2, t2) {
        const n2 = __PRIVATE_normalizeByteString(e2), r3 = __PRIVATE_normalizeByteString(t2);
        return n2.compareTo(r3);
      }(e.bytesValue, t.bytesValue);
    case 7:
      return function __PRIVATE_compareReferences(e2, t2) {
        const n2 = e2.split("/"), r3 = t2.split("/");
        for (let e3 = 0; e3 < n2.length && e3 < r3.length; e3++) {
          const t3 = __PRIVATE_primitiveComparator(n2[e3], r3[e3]);
          if (0 !== t3)
            return t3;
        }
        return __PRIVATE_primitiveComparator(n2.length, r3.length);
      }(e.referenceValue, t.referenceValue);
    case 8:
      return function __PRIVATE_compareGeoPoints(e2, t2) {
        const n2 = __PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e2.latitude), __PRIVATE_normalizeNumber(t2.latitude));
        if (0 !== n2)
          return n2;
        return __PRIVATE_primitiveComparator(__PRIVATE_normalizeNumber(e2.longitude), __PRIVATE_normalizeNumber(t2.longitude));
      }(e.geoPointValue, t.geoPointValue);
    case 9:
      return function __PRIVATE_compareArrays(e2, t2) {
        const n2 = e2.values || [], r3 = t2.values || [];
        for (let e3 = 0; e3 < n2.length && e3 < r3.length; ++e3) {
          const t3 = __PRIVATE_valueCompare(n2[e3], r3[e3]);
          if (t3)
            return t3;
        }
        return __PRIVATE_primitiveComparator(n2.length, r3.length);
      }(e.arrayValue, t.arrayValue);
    case 10:
      return function __PRIVATE_compareMaps(e2, t2) {
        if (e2 === ne.mapValue && t2 === ne.mapValue)
          return 0;
        if (e2 === ne.mapValue)
          return 1;
        if (t2 === ne.mapValue)
          return -1;
        const n2 = e2.fields || {}, r3 = Object.keys(n2), i = t2.fields || {}, s2 = Object.keys(i);
        r3.sort(), s2.sort();
        for (let e3 = 0; e3 < r3.length && e3 < s2.length; ++e3) {
          const t3 = __PRIVATE_primitiveComparator(r3[e3], s2[e3]);
          if (0 !== t3)
            return t3;
          const o = __PRIVATE_valueCompare(n2[r3[e3]], i[s2[e3]]);
          if (0 !== o)
            return o;
        }
        return __PRIVATE_primitiveComparator(r3.length, s2.length);
      }(e.mapValue, t.mapValue);
    default:
      throw fail();
  }
}
function __PRIVATE_compareTimestamps(e, t) {
  if ("string" == typeof e && "string" == typeof t && e.length === t.length)
    return __PRIVATE_primitiveComparator(e, t);
  const n = __PRIVATE_normalizeTimestamp(e), r2 = __PRIVATE_normalizeTimestamp(t), i = __PRIVATE_primitiveComparator(n.seconds, r2.seconds);
  return 0 !== i ? i : __PRIVATE_primitiveComparator(n.nanos, r2.nanos);
}
function canonicalId(e) {
  return __PRIVATE_canonifyValue(e);
}
function __PRIVATE_canonifyValue(e) {
  return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function __PRIVATE_canonifyTimestamp(e2) {
    const t = __PRIVATE_normalizeTimestamp(e2);
    return `time(${t.seconds},${t.nanos})`;
  }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? function __PRIVATE_canonifyByteString(e2) {
    return __PRIVATE_normalizeByteString(e2).toBase64();
  }(e.bytesValue) : "referenceValue" in e ? function __PRIVATE_canonifyReference(e2) {
    return DocumentKey.fromName(e2).toString();
  }(e.referenceValue) : "geoPointValue" in e ? function __PRIVATE_canonifyGeoPoint(e2) {
    return `geo(${e2.latitude},${e2.longitude})`;
  }(e.geoPointValue) : "arrayValue" in e ? function __PRIVATE_canonifyArray(e2) {
    let t = "[", n = true;
    for (const r2 of e2.values || [])
      n ? n = false : t += ",", t += __PRIVATE_canonifyValue(r2);
    return t + "]";
  }(e.arrayValue) : "mapValue" in e ? function __PRIVATE_canonifyMap(e2) {
    const t = Object.keys(e2.fields || {}).sort();
    let n = "{", r2 = true;
    for (const i of t)
      r2 ? r2 = false : n += ",", n += `${i}:${__PRIVATE_canonifyValue(e2.fields[i])}`;
    return n + "}";
  }(e.mapValue) : fail();
}
function isInteger(e) {
  return !!e && "integerValue" in e;
}
function isArray(e) {
  return !!e && "arrayValue" in e;
}
function __PRIVATE_isNullValue(e) {
  return !!e && "nullValue" in e;
}
function __PRIVATE_isNanValue(e) {
  return !!e && "doubleValue" in e && isNaN(Number(e.doubleValue));
}
function __PRIVATE_isMapValue(e) {
  return !!e && "mapValue" in e;
}
function __PRIVATE_deepClone(e) {
  if (e.geoPointValue)
    return {
      geoPointValue: Object.assign({}, e.geoPointValue)
    };
  if (e.timestampValue && "object" == typeof e.timestampValue)
    return {
      timestampValue: Object.assign({}, e.timestampValue)
    };
  if (e.mapValue) {
    const t = {
      mapValue: {
        fields: {}
      }
    };
    return forEach(e.mapValue.fields, (e2, n) => t.mapValue.fields[e2] = __PRIVATE_deepClone(n)), t;
  }
  if (e.arrayValue) {
    const t = {
      arrayValue: {
        values: []
      }
    };
    for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
      t.arrayValue.values[n] = __PRIVATE_deepClone(e.arrayValue.values[n]);
    return t;
  }
  return Object.assign({}, e);
}
function __PRIVATE_isMaxValue(e) {
  return "__max__" === (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}
function __PRIVATE_boundCompareToDocument(e, t, n) {
  let r2 = 0;
  for (let i = 0; i < e.position.length; i++) {
    const s2 = t[i], o = e.position[i];
    if (s2.field.isKeyField())
      r2 = DocumentKey.comparator(DocumentKey.fromName(o.referenceValue), n.key);
    else {
      r2 = __PRIVATE_valueCompare(o, n.data.field(s2.field));
    }
    if ("desc" === s2.dir && (r2 *= -1), 0 !== r2)
      break;
  }
  return r2;
}
function __PRIVATE_boundEquals(e, t) {
  if (null === e)
    return null === t;
  if (null === t)
    return false;
  if (e.inclusive !== t.inclusive || e.position.length !== t.position.length)
    return false;
  for (let n = 0; n < e.position.length; n++) {
    if (!__PRIVATE_valueEquals(e.position[n], t.position[n]))
      return false;
  }
  return true;
}
function __PRIVATE_orderByEquals(e, t) {
  return e.dir === t.dir && e.field.isEqual(t.field);
}
function __PRIVATE_compositeFilterIsConjunction(e) {
  return "and" === e.op;
}
function __PRIVATE_compositeFilterIsFlatConjunction(e) {
  return __PRIVATE_compositeFilterIsFlat(e) && __PRIVATE_compositeFilterIsConjunction(e);
}
function __PRIVATE_compositeFilterIsFlat(e) {
  for (const t of e.filters)
    if (t instanceof CompositeFilter)
      return false;
  return true;
}
function __PRIVATE_canonifyFilter(e) {
  if (e instanceof FieldFilter)
    return e.field.canonicalString() + e.op.toString() + canonicalId(e.value);
  if (__PRIVATE_compositeFilterIsFlatConjunction(e))
    return e.filters.map((e2) => __PRIVATE_canonifyFilter(e2)).join(",");
  {
    const t = e.filters.map((e2) => __PRIVATE_canonifyFilter(e2)).join(",");
    return `${e.op}(${t})`;
  }
}
function __PRIVATE_filterEquals(e, t) {
  return e instanceof FieldFilter ? function __PRIVATE_fieldFilterEquals(e2, t2) {
    return t2 instanceof FieldFilter && e2.op === t2.op && e2.field.isEqual(t2.field) && __PRIVATE_valueEquals(e2.value, t2.value);
  }(e, t) : e instanceof CompositeFilter ? function __PRIVATE_compositeFilterEquals(e2, t2) {
    if (t2 instanceof CompositeFilter && e2.op === t2.op && e2.filters.length === t2.filters.length) {
      return e2.filters.reduce((e3, n, r2) => e3 && __PRIVATE_filterEquals(n, t2.filters[r2]), true);
    }
    return false;
  }(e, t) : void fail();
}
function __PRIVATE_stringifyFilter(e) {
  return e instanceof FieldFilter ? function __PRIVATE_stringifyFieldFilter(e2) {
    return `${e2.field.canonicalString()} ${e2.op} ${canonicalId(e2.value)}`;
  }(e) : e instanceof CompositeFilter ? function __PRIVATE_stringifyCompositeFilter(e2) {
    return e2.op.toString() + " {" + e2.getFilters().map(__PRIVATE_stringifyFilter).join(" ,") + "}";
  }(e) : "Filter";
}
function __PRIVATE_extractDocumentKeysFromArrayValue(e, t) {
  var n;
  return ((null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((e2) => DocumentKey.fromName(e2.referenceValue));
}
function __PRIVATE_newTarget(e, t = null, n = [], r2 = [], i = null, s2 = null, o = null) {
  return new __PRIVATE_TargetImpl(e, t, n, r2, i, s2, o);
}
function __PRIVATE_canonifyTarget(e) {
  const t = __PRIVATE_debugCast(e);
  if (null === t.ce) {
    let e2 = t.path.canonicalString();
    null !== t.collectionGroup && (e2 += "|cg:" + t.collectionGroup), e2 += "|f:", e2 += t.filters.map((e3) => __PRIVATE_canonifyFilter(e3)).join(","), e2 += "|ob:", e2 += t.orderBy.map((e3) => function __PRIVATE_canonifyOrderBy(e4) {
      return e4.field.canonicalString() + e4.dir;
    }(e3)).join(","), __PRIVATE_isNullOrUndefined(t.limit) || (e2 += "|l:", e2 += t.limit), t.startAt && (e2 += "|lb:", e2 += t.startAt.inclusive ? "b:" : "a:", e2 += t.startAt.position.map((e3) => canonicalId(e3)).join(",")), t.endAt && (e2 += "|ub:", e2 += t.endAt.inclusive ? "a:" : "b:", e2 += t.endAt.position.map((e3) => canonicalId(e3)).join(",")), t.ce = e2;
  }
  return t.ce;
}
function __PRIVATE_targetEquals(e, t) {
  if (e.limit !== t.limit)
    return false;
  if (e.orderBy.length !== t.orderBy.length)
    return false;
  for (let n = 0; n < e.orderBy.length; n++)
    if (!__PRIVATE_orderByEquals(e.orderBy[n], t.orderBy[n]))
      return false;
  if (e.filters.length !== t.filters.length)
    return false;
  for (let n = 0; n < e.filters.length; n++)
    if (!__PRIVATE_filterEquals(e.filters[n], t.filters[n]))
      return false;
  return e.collectionGroup === t.collectionGroup && (!!e.path.isEqual(t.path) && (!!__PRIVATE_boundEquals(e.startAt, t.startAt) && __PRIVATE_boundEquals(e.endAt, t.endAt)));
}
function __PRIVATE_targetIsDocumentTarget(e) {
  return DocumentKey.isDocumentKey(e.path) && null === e.collectionGroup && 0 === e.filters.length;
}
function __PRIVATE_newQuery(e, t, n, r2, i, s2, o, _) {
  return new __PRIVATE_QueryImpl(e, t, n, r2, i, s2, o, _);
}
function __PRIVATE_newQueryForPath(e) {
  return new __PRIVATE_QueryImpl(e);
}
function __PRIVATE_queryMatchesAllDocuments(e) {
  return 0 === e.filters.length && null === e.limit && null == e.startAt && null == e.endAt && (0 === e.explicitOrderBy.length || 1 === e.explicitOrderBy.length && e.explicitOrderBy[0].field.isKeyField());
}
function __PRIVATE_isCollectionGroupQuery(e) {
  return null !== e.collectionGroup;
}
function __PRIVATE_queryNormalizedOrderBy(e) {
  const t = __PRIVATE_debugCast(e);
  if (null === t.le) {
    t.le = [];
    const e2 = /* @__PURE__ */ new Set();
    for (const n2 of t.explicitOrderBy)
      t.le.push(n2), e2.add(n2.field.canonicalString());
    const n = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : "asc", r2 = function __PRIVATE_getInequalityFilterFields(e3) {
      let t2 = new SortedSet(FieldPath$1.comparator);
      return e3.filters.forEach((e4) => {
        e4.getFlattenedFilters().forEach((e5) => {
          e5.isInequality() && (t2 = t2.add(e5.field));
        });
      }), t2;
    }(t);
    r2.forEach((r3) => {
      e2.has(r3.canonicalString()) || r3.isKeyField() || t.le.push(new OrderBy(r3, n));
    }), // Add the document key field to the last if it is not explicitly ordered.
    e2.has(FieldPath$1.keyField().canonicalString()) || t.le.push(new OrderBy(FieldPath$1.keyField(), n));
  }
  return t.le;
}
function __PRIVATE_queryToTarget(e) {
  const t = __PRIVATE_debugCast(e);
  return t.he || (t.he = __PRIVATE__queryToTarget(t, __PRIVATE_queryNormalizedOrderBy(e))), t.he;
}
function __PRIVATE__queryToTarget(e, t) {
  if ("F" === e.limitType)
    return __PRIVATE_newTarget(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt);
  {
    t = t.map((e2) => {
      const t2 = "desc" === e2.dir ? "asc" : "desc";
      return new OrderBy(e2.field, t2);
    });
    const n = e.endAt ? new Bound(e.endAt.position, e.endAt.inclusive) : null, r2 = e.startAt ? new Bound(e.startAt.position, e.startAt.inclusive) : null;
    return __PRIVATE_newTarget(e.path, e.collectionGroup, t, e.filters, e.limit, n, r2);
  }
}
function __PRIVATE_queryWithLimit(e, t, n) {
  return new __PRIVATE_QueryImpl(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt);
}
function __PRIVATE_queryEquals(e, t) {
  return __PRIVATE_targetEquals(__PRIVATE_queryToTarget(e), __PRIVATE_queryToTarget(t)) && e.limitType === t.limitType;
}
function __PRIVATE_canonifyQuery(e) {
  return `${__PRIVATE_canonifyTarget(__PRIVATE_queryToTarget(e))}|lt:${e.limitType}`;
}
function __PRIVATE_stringifyQuery(e) {
  return `Query(target=${function __PRIVATE_stringifyTarget(e2) {
    let t = e2.path.canonicalString();
    return null !== e2.collectionGroup && (t += " collectionGroup=" + e2.collectionGroup), e2.filters.length > 0 && (t += `, filters: [${e2.filters.map((e3) => __PRIVATE_stringifyFilter(e3)).join(", ")}]`), __PRIVATE_isNullOrUndefined(e2.limit) || (t += ", limit: " + e2.limit), e2.orderBy.length > 0 && (t += `, orderBy: [${e2.orderBy.map((e3) => function __PRIVATE_stringifyOrderBy(e4) {
      return `${e4.field.canonicalString()} (${e4.dir})`;
    }(e3)).join(", ")}]`), e2.startAt && (t += ", startAt: ", t += e2.startAt.inclusive ? "b:" : "a:", t += e2.startAt.position.map((e3) => canonicalId(e3)).join(",")), e2.endAt && (t += ", endAt: ", t += e2.endAt.inclusive ? "a:" : "b:", t += e2.endAt.position.map((e3) => canonicalId(e3)).join(",")), `Target(${t})`;
  }(__PRIVATE_queryToTarget(e))}; limitType=${e.limitType})`;
}
function __PRIVATE_queryMatches(e, t) {
  return t.isFoundDocument() && function __PRIVATE_queryMatchesPathAndCollectionGroup(e2, t2) {
    const n = t2.key.path;
    return null !== e2.collectionGroup ? t2.key.hasCollectionId(e2.collectionGroup) && e2.path.isPrefixOf(n) : DocumentKey.isDocumentKey(e2.path) ? e2.path.isEqual(n) : e2.path.isImmediateParentOf(n);
  }(e, t) && function __PRIVATE_queryMatchesOrderBy(e2, t2) {
    for (const n of __PRIVATE_queryNormalizedOrderBy(e2))
      if (!n.field.isKeyField() && null === t2.data.field(n.field))
        return false;
    return true;
  }(e, t) && function __PRIVATE_queryMatchesFilters(e2, t2) {
    for (const n of e2.filters)
      if (!n.matches(t2))
        return false;
    return true;
  }(e, t) && function __PRIVATE_queryMatchesBounds(e2, t2) {
    if (e2.startAt && !/**
    * Returns true if a document sorts before a bound using the provided sort
    * order.
    */
    function __PRIVATE_boundSortsBeforeDocument(e3, t3, n) {
      const r2 = __PRIVATE_boundCompareToDocument(e3, t3, n);
      return e3.inclusive ? r2 <= 0 : r2 < 0;
    }(e2.startAt, __PRIVATE_queryNormalizedOrderBy(e2), t2))
      return false;
    if (e2.endAt && !function __PRIVATE_boundSortsAfterDocument(e3, t3, n) {
      const r2 = __PRIVATE_boundCompareToDocument(e3, t3, n);
      return e3.inclusive ? r2 >= 0 : r2 > 0;
    }(e2.endAt, __PRIVATE_queryNormalizedOrderBy(e2), t2))
      return false;
    return true;
  }(e, t);
}
function __PRIVATE_queryCollectionGroup(e) {
  return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2));
}
function __PRIVATE_newQueryComparator(e) {
  return (t, n) => {
    let r2 = false;
    for (const i of __PRIVATE_queryNormalizedOrderBy(e)) {
      const e2 = __PRIVATE_compareDocs(i, t, n);
      if (0 !== e2)
        return e2;
      r2 = r2 || i.field.isKeyField();
    }
    return 0;
  };
}
function __PRIVATE_compareDocs(e, t, n) {
  const r2 = e.field.isKeyField() ? DocumentKey.comparator(t.key, n.key) : function __PRIVATE_compareDocumentsByField(e2, t2, n2) {
    const r3 = t2.data.field(e2), i = n2.data.field(e2);
    return null !== r3 && null !== i ? __PRIVATE_valueCompare(r3, i) : fail();
  }(e.field, t, n);
  switch (e.dir) {
    case "asc":
      return r2;
    case "desc":
      return -1 * r2;
    default:
      return fail();
  }
}
function __PRIVATE_mutableDocumentMap() {
  return ie;
}
function documentMap(...e) {
  let t = se;
  for (const n of e)
    t = t.insert(n.key, n);
  return t;
}
function __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e) {
  let t = se;
  return e.forEach((e2, n) => t = t.insert(e2, n.overlayedDocument)), t;
}
function __PRIVATE_newOverlayMap() {
  return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newMutationMap() {
  return __PRIVATE_newDocumentKeyMap();
}
function __PRIVATE_newDocumentKeyMap() {
  return new ObjectMap((e) => e.toString(), (e, t) => e.isEqual(t));
}
function __PRIVATE_documentKeySet(...e) {
  let t = _e;
  for (const n of e)
    t = t.add(n);
  return t;
}
function __PRIVATE_targetIdSet() {
  return ae2;
}
function __PRIVATE_toDouble(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t))
      return {
        doubleValue: "NaN"
      };
    if (t === 1 / 0)
      return {
        doubleValue: "Infinity"
      };
    if (t === -1 / 0)
      return {
        doubleValue: "-Infinity"
      };
  }
  return {
    doubleValue: __PRIVATE_isNegativeZero(t) ? "-0" : t
  };
}
function __PRIVATE_toInteger(e) {
  return {
    integerValue: "" + e
  };
}
function __PRIVATE_applyTransformOperationToLocalView(e, t, n) {
  return e instanceof __PRIVATE_ServerTimestampTransform ? function serverTimestamp$1(e2, t2) {
    const n2 = {
      fields: {
        __type__: {
          stringValue: "server_timestamp"
        },
        __local_write_time__: {
          timestampValue: {
            seconds: e2.seconds,
            nanos: e2.nanoseconds
          }
        }
      }
    };
    return t2 && __PRIVATE_isServerTimestamp(t2) && (t2 = __PRIVATE_getPreviousValue(t2)), t2 && (n2.fields.__previous_value__ = t2), {
      mapValue: n2
    };
  }(n, t) : e instanceof __PRIVATE_ArrayUnionTransformOperation ? __PRIVATE_applyArrayUnionTransformOperation(e, t) : e instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_applyArrayRemoveTransformOperation(e, t) : function __PRIVATE_applyNumericIncrementTransformOperationToLocalView(e2, t2) {
    const n2 = __PRIVATE_computeTransformOperationBaseValue(e2, t2), r2 = asNumber(n2) + asNumber(e2.Ie);
    return isInteger(n2) && isInteger(e2.Ie) ? __PRIVATE_toInteger(r2) : __PRIVATE_toDouble(e2.serializer, r2);
  }(e, t);
}
function __PRIVATE_applyTransformOperationToRemoteDocument(e, t, n) {
  return e instanceof __PRIVATE_ArrayUnionTransformOperation ? __PRIVATE_applyArrayUnionTransformOperation(e, t) : e instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_applyArrayRemoveTransformOperation(e, t) : n;
}
function __PRIVATE_computeTransformOperationBaseValue(e, t) {
  return e instanceof __PRIVATE_NumericIncrementTransformOperation ? (
    /** Returns true if `value` is either an IntegerValue or a DoubleValue. */
    function __PRIVATE_isNumber(e2) {
      return isInteger(e2) || function __PRIVATE_isDouble(e3) {
        return !!e3 && "doubleValue" in e3;
      }(e2);
    }(t) ? t : {
      integerValue: 0
    }
  ) : null;
}
function __PRIVATE_applyArrayUnionTransformOperation(e, t) {
  const n = __PRIVATE_coercedFieldValuesArray(t);
  for (const t2 of e.elements)
    n.some((e2) => __PRIVATE_valueEquals(e2, t2)) || n.push(t2);
  return {
    arrayValue: {
      values: n
    }
  };
}
function __PRIVATE_applyArrayRemoveTransformOperation(e, t) {
  let n = __PRIVATE_coercedFieldValuesArray(t);
  for (const t2 of e.elements)
    n = n.filter((e2) => !__PRIVATE_valueEquals(e2, t2));
  return {
    arrayValue: {
      values: n
    }
  };
}
function asNumber(e) {
  return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
}
function __PRIVATE_coercedFieldValuesArray(e) {
  return isArray(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
}
function __PRIVATE_fieldTransformEquals(e, t) {
  return e.field.isEqual(t.field) && function __PRIVATE_transformOperationEquals(e2, t2) {
    return e2 instanceof __PRIVATE_ArrayUnionTransformOperation && t2 instanceof __PRIVATE_ArrayUnionTransformOperation || e2 instanceof __PRIVATE_ArrayRemoveTransformOperation && t2 instanceof __PRIVATE_ArrayRemoveTransformOperation ? __PRIVATE_arrayEquals(e2.elements, t2.elements, __PRIVATE_valueEquals) : e2 instanceof __PRIVATE_NumericIncrementTransformOperation && t2 instanceof __PRIVATE_NumericIncrementTransformOperation ? __PRIVATE_valueEquals(e2.Ie, t2.Ie) : e2 instanceof __PRIVATE_ServerTimestampTransform && t2 instanceof __PRIVATE_ServerTimestampTransform;
  }(e.transform, t.transform);
}
function __PRIVATE_preconditionIsValidForDocument(e, t) {
  return void 0 !== e.updateTime ? t.isFoundDocument() && t.version.isEqual(e.updateTime) : void 0 === e.exists || e.exists === t.isFoundDocument();
}
function __PRIVATE_calculateOverlayMutation(e, t) {
  if (!e.hasLocalMutations || t && 0 === t.fields.length)
    return null;
  if (null === t)
    return e.isNoDocument() ? new __PRIVATE_DeleteMutation(e.key, Precondition.none()) : new __PRIVATE_SetMutation(e.key, e.data, Precondition.none());
  {
    const n = e.data, r2 = ObjectValue.empty();
    let i = new SortedSet(FieldPath$1.comparator);
    for (let e2 of t.fields)
      if (!i.has(e2)) {
        let t2 = n.field(e2);
        null === t2 && e2.length > 1 && (e2 = e2.popLast(), t2 = n.field(e2)), null === t2 ? r2.delete(e2) : r2.set(e2, t2), i = i.add(e2);
      }
    return new __PRIVATE_PatchMutation(e.key, r2, new FieldMask(i.toArray()), Precondition.none());
  }
}
function __PRIVATE_mutationApplyToRemoteDocument(e, t, n) {
  e instanceof __PRIVATE_SetMutation ? function __PRIVATE_setMutationApplyToRemoteDocument(e2, t2, n2) {
    const r2 = e2.value.clone(), i = __PRIVATE_serverTransformResults(e2.fieldTransforms, t2, n2.transformResults);
    r2.setAll(i), t2.convertToFoundDocument(n2.version, r2).setHasCommittedMutations();
  }(e, t, n) : e instanceof __PRIVATE_PatchMutation ? function __PRIVATE_patchMutationApplyToRemoteDocument(e2, t2, n2) {
    if (!__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return void t2.convertToUnknownDocument(n2.version);
    const r2 = __PRIVATE_serverTransformResults(e2.fieldTransforms, t2, n2.transformResults), i = t2.data;
    i.setAll(__PRIVATE_getPatch(e2)), i.setAll(r2), t2.convertToFoundDocument(n2.version, i).setHasCommittedMutations();
  }(e, t, n) : function __PRIVATE_deleteMutationApplyToRemoteDocument(e2, t2, n2) {
    t2.convertToNoDocument(n2.version).setHasCommittedMutations();
  }(0, t, n);
}
function __PRIVATE_mutationApplyToLocalView(e, t, n, r2) {
  return e instanceof __PRIVATE_SetMutation ? function __PRIVATE_setMutationApplyToLocalView(e2, t2, n2, r3) {
    if (!__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return n2;
    const i = e2.value.clone(), s2 = __PRIVATE_localTransformResults(e2.fieldTransforms, r3, t2);
    return i.setAll(s2), t2.convertToFoundDocument(t2.version, i).setHasLocalMutations(), null;
  }(e, t, n, r2) : e instanceof __PRIVATE_PatchMutation ? function __PRIVATE_patchMutationApplyToLocalView(e2, t2, n2, r3) {
    if (!__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return n2;
    const i = __PRIVATE_localTransformResults(e2.fieldTransforms, r3, t2), s2 = t2.data;
    if (s2.setAll(__PRIVATE_getPatch(e2)), s2.setAll(i), t2.convertToFoundDocument(t2.version, s2).setHasLocalMutations(), null === n2)
      return null;
    return n2.unionWith(e2.fieldMask.fields).unionWith(e2.fieldTransforms.map((e3) => e3.field));
  }(e, t, n, r2) : function __PRIVATE_deleteMutationApplyToLocalView(e2, t2, n2) {
    if (__PRIVATE_preconditionIsValidForDocument(e2.precondition, t2))
      return t2.convertToNoDocument(t2.version).setHasLocalMutations(), null;
    return n2;
  }(e, t, n);
}
function __PRIVATE_mutationEquals(e, t) {
  return e.type === t.type && (!!e.key.isEqual(t.key) && (!!e.precondition.isEqual(t.precondition) && (!!function __PRIVATE_fieldTransformsAreEqual(e2, t2) {
    return void 0 === e2 && void 0 === t2 || !(!e2 || !t2) && __PRIVATE_arrayEquals(e2, t2, (e3, t3) => __PRIVATE_fieldTransformEquals(e3, t3));
  }(e.fieldTransforms, t.fieldTransforms) && (0 === e.type ? e.value.isEqual(t.value) : 1 !== e.type || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))));
}
function __PRIVATE_getPatch(e) {
  const t = /* @__PURE__ */ new Map();
  return e.fieldMask.fields.forEach((n) => {
    if (!n.isEmpty()) {
      const r2 = e.data.field(n);
      t.set(n, r2);
    }
  }), t;
}
function __PRIVATE_serverTransformResults(e, t, n) {
  const r2 = /* @__PURE__ */ new Map();
  __PRIVATE_hardAssert(e.length === n.length);
  for (let i = 0; i < n.length; i++) {
    const s2 = e[i], o = s2.transform, _ = t.data.field(s2.field);
    r2.set(s2.field, __PRIVATE_applyTransformOperationToRemoteDocument(o, _, n[i]));
  }
  return r2;
}
function __PRIVATE_localTransformResults(e, t, n) {
  const r2 = /* @__PURE__ */ new Map();
  for (const i of e) {
    const e2 = i.transform, s2 = n.data.field(i.field);
    r2.set(i.field, __PRIVATE_applyTransformOperationToLocalView(e2, s2, t));
  }
  return r2;
}
function __PRIVATE_mapCodeFromRpcCode(e) {
  if (void 0 === e)
    return __PRIVATE_logError("GRPC error has no .code"), C2.UNKNOWN;
  switch (e) {
    case ue.OK:
      return C2.OK;
    case ue.CANCELLED:
      return C2.CANCELLED;
    case ue.UNKNOWN:
      return C2.UNKNOWN;
    case ue.DEADLINE_EXCEEDED:
      return C2.DEADLINE_EXCEEDED;
    case ue.RESOURCE_EXHAUSTED:
      return C2.RESOURCE_EXHAUSTED;
    case ue.INTERNAL:
      return C2.INTERNAL;
    case ue.UNAVAILABLE:
      return C2.UNAVAILABLE;
    case ue.UNAUTHENTICATED:
      return C2.UNAUTHENTICATED;
    case ue.INVALID_ARGUMENT:
      return C2.INVALID_ARGUMENT;
    case ue.NOT_FOUND:
      return C2.NOT_FOUND;
    case ue.ALREADY_EXISTS:
      return C2.ALREADY_EXISTS;
    case ue.PERMISSION_DENIED:
      return C2.PERMISSION_DENIED;
    case ue.FAILED_PRECONDITION:
      return C2.FAILED_PRECONDITION;
    case ue.ABORTED:
      return C2.ABORTED;
    case ue.OUT_OF_RANGE:
      return C2.OUT_OF_RANGE;
    case ue.UNIMPLEMENTED:
      return C2.UNIMPLEMENTED;
    case ue.DATA_LOSS:
      return C2.DATA_LOSS;
    default:
      return fail();
  }
}
function __PRIVATE_newTextEncoder() {
  return new TextEncoder();
}
function __PRIVATE_getMd5HashValue(e) {
  const t = __PRIVATE_newTextEncoder().encode(e), n = new Md5();
  return n.update(t), new Uint8Array(n.digest());
}
function __PRIVATE_get64BitUints(e) {
  const t = new DataView(e.buffer), n = t.getUint32(
    0,
    /* littleEndian= */
    true
  ), r2 = t.getUint32(
    4,
    /* littleEndian= */
    true
  ), i = t.getUint32(
    8,
    /* littleEndian= */
    true
  ), s2 = t.getUint32(
    12,
    /* littleEndian= */
    true
  );
  return [new Integer([n, r2], 0), new Integer([i, s2], 0)];
}
function __PRIVATE_documentTargetMap() {
  return new SortedMap(DocumentKey.comparator);
}
function __PRIVATE_snapshotChangesMap() {
  return new SortedMap(DocumentKey.comparator);
}
function __PRIVATE_toInt32Proto(e, t) {
  return e.useProto3Json || __PRIVATE_isNullOrUndefined(t) ? t : {
    value: t
  };
}
function toTimestamp(e, t) {
  if (e.useProto3Json) {
    return `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`;
  }
  return {
    seconds: "" + t.seconds,
    nanos: t.nanoseconds
  };
}
function __PRIVATE_toBytes(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array();
}
function __PRIVATE_fromVersion(e) {
  return __PRIVATE_hardAssert(!!e), SnapshotVersion.fromTimestamp(function fromTimestamp(e2) {
    const t = __PRIVATE_normalizeTimestamp(e2);
    return new Timestamp(t.seconds, t.nanos);
  }(e));
}
function __PRIVATE_toResourceName(e, t) {
  return function __PRIVATE_fullyQualifiedPrefixPath(e2) {
    return new ResourcePath(["projects", e2.projectId, "databases", e2.database]);
  }(e).child("documents").child(t).canonicalString();
}
function __PRIVATE_fromResourceName(e) {
  const t = ResourcePath.fromString(e);
  return __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(t)), t;
}
function fromName(e, t) {
  const n = __PRIVATE_fromResourceName(t);
  if (n.get(1) !== e.databaseId.projectId)
    throw new FirestoreError(C2.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + e.databaseId.projectId);
  if (n.get(3) !== e.databaseId.database)
    throw new FirestoreError(C2.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + e.databaseId.database);
  return new DocumentKey(__PRIVATE_extractLocalPathFromResourceName(n));
}
function __PRIVATE_toQueryPath(e, t) {
  return __PRIVATE_toResourceName(e.databaseId, t);
}
function __PRIVATE_fromQueryPath(e) {
  const t = __PRIVATE_fromResourceName(e);
  return 4 === t.length ? ResourcePath.emptyPath() : __PRIVATE_extractLocalPathFromResourceName(t);
}
function __PRIVATE_getEncodedDatabaseId(e) {
  return new ResourcePath(["projects", e.databaseId.projectId, "databases", e.databaseId.database]).canonicalString();
}
function __PRIVATE_extractLocalPathFromResourceName(e) {
  return __PRIVATE_hardAssert(e.length > 4 && "documents" === e.get(4)), e.popFirst(5);
}
function __PRIVATE_fromWatchChange(e, t) {
  let n;
  if ("targetChange" in t) {
    t.targetChange;
    const r2 = function __PRIVATE_fromWatchTargetChangeState(e2) {
      return "NO_CHANGE" === e2 ? 0 : "ADD" === e2 ? 1 : "REMOVE" === e2 ? 2 : "CURRENT" === e2 ? 3 : "RESET" === e2 ? 4 : fail();
    }(t.targetChange.targetChangeType || "NO_CHANGE"), i = t.targetChange.targetIds || [], s2 = function __PRIVATE_fromBytes(e2, t2) {
      return e2.useProto3Json ? (__PRIVATE_hardAssert(void 0 === t2 || "string" == typeof t2), ByteString.fromBase64String(t2 || "")) : (__PRIVATE_hardAssert(void 0 === t2 || t2 instanceof Uint8Array), ByteString.fromUint8Array(t2 || new Uint8Array()));
    }(e, t.targetChange.resumeToken), o = t.targetChange.cause, _ = o && function __PRIVATE_fromRpcStatus(e2) {
      const t2 = void 0 === e2.code ? C2.UNKNOWN : __PRIVATE_mapCodeFromRpcCode(e2.code);
      return new FirestoreError(t2, e2.message || "");
    }(o);
    n = new __PRIVATE_WatchTargetChange(r2, i, s2, _ || null);
  } else if ("documentChange" in t) {
    t.documentChange;
    const r2 = t.documentChange;
    r2.document, r2.document.name, r2.document.updateTime;
    const i = fromName(e, r2.document.name), s2 = __PRIVATE_fromVersion(r2.document.updateTime), o = r2.document.createTime ? __PRIVATE_fromVersion(r2.document.createTime) : SnapshotVersion.min(), _ = new ObjectValue({
      mapValue: {
        fields: r2.document.fields
      }
    }), a = MutableDocument.newFoundDocument(i, s2, o, _), u = r2.targetIds || [], c = r2.removedTargetIds || [];
    n = new __PRIVATE_DocumentWatchChange(u, c, a.key, a);
  } else if ("documentDelete" in t) {
    t.documentDelete;
    const r2 = t.documentDelete;
    r2.document;
    const i = fromName(e, r2.document), s2 = r2.readTime ? __PRIVATE_fromVersion(r2.readTime) : SnapshotVersion.min(), o = MutableDocument.newNoDocument(i, s2), _ = r2.removedTargetIds || [];
    n = new __PRIVATE_DocumentWatchChange([], _, o.key, o);
  } else if ("documentRemove" in t) {
    t.documentRemove;
    const r2 = t.documentRemove;
    r2.document;
    const i = fromName(e, r2.document), s2 = r2.removedTargetIds || [];
    n = new __PRIVATE_DocumentWatchChange([], s2, i, null);
  } else {
    if (!("filter" in t))
      return fail();
    {
      t.filter;
      const e2 = t.filter;
      e2.targetId;
      const { count: r2 = 0, unchangedNames: i } = e2, s2 = new ExistenceFilter(r2, i), o = e2.targetId;
      n = new __PRIVATE_ExistenceFilterChange(o, s2);
    }
  }
  return n;
}
function __PRIVATE_toDocumentsTarget(e, t) {
  return {
    documents: [__PRIVATE_toQueryPath(e, t.path)]
  };
}
function __PRIVATE_toQueryTarget(e, t) {
  const n = {
    structuredQuery: {}
  }, r2 = t.path;
  null !== t.collectionGroup ? (n.parent = __PRIVATE_toQueryPath(e, r2), n.structuredQuery.from = [{
    collectionId: t.collectionGroup,
    allDescendants: true
  }]) : (n.parent = __PRIVATE_toQueryPath(e, r2.popLast()), n.structuredQuery.from = [{
    collectionId: r2.lastSegment()
  }]);
  const i = function __PRIVATE_toFilters(e2) {
    if (0 === e2.length)
      return;
    return __PRIVATE_toFilter(CompositeFilter.create(
      e2,
      "and"
      /* CompositeOperator.AND */
    ));
  }(t.filters);
  i && (n.structuredQuery.where = i);
  const s2 = function __PRIVATE_toOrder(e2) {
    if (0 === e2.length)
      return;
    return e2.map((e3) => (
      // visible for testing
      function __PRIVATE_toPropertyOrder(e4) {
        return {
          field: __PRIVATE_toFieldPathReference(e4.field),
          direction: __PRIVATE_toDirection(e4.dir)
        };
      }(e3)
    ));
  }(t.orderBy);
  s2 && (n.structuredQuery.orderBy = s2);
  const o = __PRIVATE_toInt32Proto(e, t.limit);
  return null !== o && (n.structuredQuery.limit = o), t.startAt && (n.structuredQuery.startAt = function __PRIVATE_toStartAtCursor(e2) {
    return {
      before: e2.inclusive,
      values: e2.position
    };
  }(t.startAt)), t.endAt && (n.structuredQuery.endAt = function __PRIVATE_toEndAtCursor(e2) {
    return {
      before: !e2.inclusive,
      values: e2.position
    };
  }(t.endAt)), n;
}
function __PRIVATE_convertQueryTargetToQuery(e) {
  let t = __PRIVATE_fromQueryPath(e.parent);
  const n = e.structuredQuery, r2 = n.from ? n.from.length : 0;
  let i = null;
  if (r2 > 0) {
    __PRIVATE_hardAssert(1 === r2);
    const e2 = n.from[0];
    e2.allDescendants ? i = e2.collectionId : t = t.child(e2.collectionId);
  }
  let s2 = [];
  n.where && (s2 = function __PRIVATE_fromFilters(e2) {
    const t2 = __PRIVATE_fromFilter(e2);
    if (t2 instanceof CompositeFilter && __PRIVATE_compositeFilterIsFlatConjunction(t2))
      return t2.getFilters();
    return [t2];
  }(n.where));
  let o = [];
  n.orderBy && (o = function __PRIVATE_fromOrder(e2) {
    return e2.map((e3) => function __PRIVATE_fromPropertyOrder(e4) {
      return new OrderBy(
        __PRIVATE_fromFieldPathReference(e4.field),
        // visible for testing
        function __PRIVATE_fromDirection(e5) {
          switch (e5) {
            case "ASCENDING":
              return "asc";
            case "DESCENDING":
              return "desc";
            default:
              return;
          }
        }(e4.direction)
      );
    }(e3));
  }(n.orderBy));
  let _ = null;
  n.limit && (_ = function __PRIVATE_fromInt32Proto(e2) {
    let t2;
    return t2 = "object" == typeof e2 ? e2.value : e2, __PRIVATE_isNullOrUndefined(t2) ? null : t2;
  }(n.limit));
  let a = null;
  n.startAt && (a = function __PRIVATE_fromStartAtCursor(e2) {
    const t2 = !!e2.before, n2 = e2.values || [];
    return new Bound(n2, t2);
  }(n.startAt));
  let u = null;
  return n.endAt && (u = function __PRIVATE_fromEndAtCursor(e2) {
    const t2 = !e2.before, n2 = e2.values || [];
    return new Bound(n2, t2);
  }(n.endAt)), __PRIVATE_newQuery(t, i, o, s2, _, "F", a, u);
}
function __PRIVATE_toListenRequestLabels(e, t) {
  const n = function __PRIVATE_toLabel(e2) {
    switch (e2) {
      case "TargetPurposeListen":
        return null;
      case "TargetPurposeExistenceFilterMismatch":
        return "existence-filter-mismatch";
      case "TargetPurposeExistenceFilterMismatchBloom":
        return "existence-filter-mismatch-bloom";
      case "TargetPurposeLimboResolution":
        return "limbo-document";
      default:
        return fail();
    }
  }(t.purpose);
  return null == n ? null : {
    "goog-listen-tags": n
  };
}
function __PRIVATE_fromFilter(e) {
  return void 0 !== e.unaryFilter ? function __PRIVATE_fromUnaryFilter(e2) {
    switch (e2.unaryFilter.op) {
      case "IS_NAN":
        const t = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(t, "==", {
          doubleValue: NaN
        });
      case "IS_NULL":
        const n = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(n, "==", {
          nullValue: "NULL_VALUE"
        });
      case "IS_NOT_NAN":
        const r2 = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(r2, "!=", {
          doubleValue: NaN
        });
      case "IS_NOT_NULL":
        const i = __PRIVATE_fromFieldPathReference(e2.unaryFilter.field);
        return FieldFilter.create(i, "!=", {
          nullValue: "NULL_VALUE"
        });
      default:
        return fail();
    }
  }(e) : void 0 !== e.fieldFilter ? function __PRIVATE_fromFieldFilter(e2) {
    return FieldFilter.create(__PRIVATE_fromFieldPathReference(e2.fieldFilter.field), function __PRIVATE_fromOperatorName(e3) {
      switch (e3) {
        case "EQUAL":
          return "==";
        case "NOT_EQUAL":
          return "!=";
        case "GREATER_THAN":
          return ">";
        case "GREATER_THAN_OR_EQUAL":
          return ">=";
        case "LESS_THAN":
          return "<";
        case "LESS_THAN_OR_EQUAL":
          return "<=";
        case "ARRAY_CONTAINS":
          return "array-contains";
        case "IN":
          return "in";
        case "NOT_IN":
          return "not-in";
        case "ARRAY_CONTAINS_ANY":
          return "array-contains-any";
        default:
          return fail();
      }
    }(e2.fieldFilter.op), e2.fieldFilter.value);
  }(e) : void 0 !== e.compositeFilter ? function __PRIVATE_fromCompositeFilter(e2) {
    return CompositeFilter.create(e2.compositeFilter.filters.map((e3) => __PRIVATE_fromFilter(e3)), function __PRIVATE_fromCompositeOperatorName(e3) {
      switch (e3) {
        case "AND":
          return "and";
        case "OR":
          return "or";
        default:
          return fail();
      }
    }(e2.compositeFilter.op));
  }(e) : fail();
}
function __PRIVATE_toDirection(e) {
  return Pe[e];
}
function __PRIVATE_toOperatorName(e) {
  return Ie[e];
}
function __PRIVATE_toCompositeOperatorName(e) {
  return Te[e];
}
function __PRIVATE_toFieldPathReference(e) {
  return {
    fieldPath: e.canonicalString()
  };
}
function __PRIVATE_fromFieldPathReference(e) {
  return FieldPath$1.fromServerFormat(e.fieldPath);
}
function __PRIVATE_toFilter(e) {
  return e instanceof FieldFilter ? function __PRIVATE_toUnaryOrFieldFilter(e2) {
    if ("==" === e2.op) {
      if (__PRIVATE_isNanValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NAN"
          }
        };
      if (__PRIVATE_isNullValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NULL"
          }
        };
    } else if ("!=" === e2.op) {
      if (__PRIVATE_isNanValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NOT_NAN"
          }
        };
      if (__PRIVATE_isNullValue(e2.value))
        return {
          unaryFilter: {
            field: __PRIVATE_toFieldPathReference(e2.field),
            op: "IS_NOT_NULL"
          }
        };
    }
    return {
      fieldFilter: {
        field: __PRIVATE_toFieldPathReference(e2.field),
        op: __PRIVATE_toOperatorName(e2.op),
        value: e2.value
      }
    };
  }(e) : e instanceof CompositeFilter ? function __PRIVATE_toCompositeFilter(e2) {
    const t = e2.getFilters().map((e3) => __PRIVATE_toFilter(e3));
    if (1 === t.length)
      return t[0];
    return {
      compositeFilter: {
        op: __PRIVATE_toCompositeOperatorName(e2.op),
        filters: t
      }
    };
  }(e) : fail();
}
function __PRIVATE_isValidResourceName(e) {
  return e.length >= 4 && "projects" === e.get(0) && "databases" === e.get(2);
}
function __PRIVATE_fromBundledQuery(e) {
  const t = __PRIVATE_convertQueryTargetToQuery({
    parent: e.parent,
    structuredQuery: e.structuredQuery
  });
  return "LAST" === e.limitType ? __PRIVATE_queryWithLimit(
    t,
    t.limit,
    "L"
    /* LimitType.Last */
  ) : t;
}
function __PRIVATE_newLocalStore(e, t, n, r2) {
  return new __PRIVATE_LocalStoreImpl(e, t, n, r2);
}
async function __PRIVATE_localStoreHandleUserChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  return await n.persistence.runTransaction("Handle user change", "readonly", (e2) => {
    let r2;
    return n.mutationQueue.getAllMutationBatches(e2).next((i) => (r2 = i, n.os(t), n.mutationQueue.getAllMutationBatches(e2))).next((t2) => {
      const i = [], s2 = [];
      let o = __PRIVATE_documentKeySet();
      for (const e3 of r2) {
        i.push(e3.batchId);
        for (const t3 of e3.mutations)
          o = o.add(t3.key);
      }
      for (const e3 of t2) {
        s2.push(e3.batchId);
        for (const t3 of e3.mutations)
          o = o.add(t3.key);
      }
      return n.localDocuments.getDocuments(e2, o).next((e3) => ({
        _s: e3,
        removedBatchIds: i,
        addedBatchIds: s2
      }));
    });
  });
}
function __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e) {
  const t = __PRIVATE_debugCast(e);
  return t.persistence.runTransaction("Get last remote snapshot version", "readonly", (e2) => t.qr.getLastRemoteSnapshotVersion(e2));
}
function __PRIVATE_localStoreApplyRemoteEventToLocalCache(e, t) {
  const n = __PRIVATE_debugCast(e), r2 = t.snapshotVersion;
  let i = n.ts;
  return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (e2) => {
    const s2 = n.ss.newChangeBuffer({
      trackRemovals: true
    });
    i = n.ts;
    const o = [];
    t.targetChanges.forEach((s3, _2) => {
      const a2 = i.get(_2);
      if (!a2)
        return;
      o.push(n.qr.removeMatchingKeys(e2, s3.removedDocuments, _2).next(() => n.qr.addMatchingKeys(e2, s3.addedDocuments, _2)));
      let u = a2.withSequenceNumber(e2.currentSequenceNumber);
      null !== t.targetMismatches.get(_2) ? u = u.withResumeToken(ByteString.EMPTY_BYTE_STRING, SnapshotVersion.min()).withLastLimboFreeSnapshotVersion(SnapshotVersion.min()) : s3.resumeToken.approximateByteSize() > 0 && (u = u.withResumeToken(s3.resumeToken, r2)), i = i.insert(_2, u), // Update the target data if there are target changes (or if
      // sufficient time has passed since the last update).
      /**
      * Returns true if the newTargetData should be persisted during an update of
      * an active target. TargetData should always be persisted when a target is
      * being released and should not call this function.
      *
      * While the target is active, TargetData updates can be omitted when nothing
      * about the target has changed except metadata like the resume token or
      * snapshot version. Occasionally it's worth the extra write to prevent these
      * values from getting too stale after a crash, but this doesn't have to be
      * too frequent.
      */
      function __PRIVATE_shouldPersistTargetData(e3, t2, n2) {
        if (0 === e3.resumeToken.approximateByteSize())
          return true;
        if (t2.snapshotVersion.toMicroseconds() - e3.snapshotVersion.toMicroseconds() >= 3e8)
          return true;
        return n2.addedDocuments.size + n2.modifiedDocuments.size + n2.removedDocuments.size > 0;
      }(a2, u, s3) && o.push(n.qr.updateTargetData(e2, u));
    });
    let _ = __PRIVATE_mutableDocumentMap(), a = __PRIVATE_documentKeySet();
    if (t.documentUpdates.forEach((r3) => {
      t.resolvedLimboDocuments.has(r3) && o.push(n.persistence.referenceDelegate.updateLimboDocument(e2, r3));
    }), // Each loop iteration only affects its "own" doc, so it's safe to get all
    // the remote documents in advance in a single call.
    o.push(__PRIVATE_populateDocumentChangeBuffer(e2, s2, t.documentUpdates).next((e3) => {
      _ = e3.us, a = e3.cs;
    })), !r2.isEqual(SnapshotVersion.min())) {
      const t2 = n.qr.getLastRemoteSnapshotVersion(e2).next((t3) => n.qr.setTargetsMetadata(e2, e2.currentSequenceNumber, r2));
      o.push(t2);
    }
    return PersistencePromise.waitFor(o).next(() => s2.apply(e2)).next(() => n.localDocuments.getLocalViewOfDocuments(e2, _, a)).next(() => _);
  }).then((e2) => (n.ts = i, e2));
}
function __PRIVATE_populateDocumentChangeBuffer(e, t, n) {
  let r2 = __PRIVATE_documentKeySet(), i = __PRIVATE_documentKeySet();
  return n.forEach((e2) => r2 = r2.add(e2)), t.getEntries(e, r2).next((e2) => {
    let r3 = __PRIVATE_mutableDocumentMap();
    return n.forEach((n2, s2) => {
      const o = e2.get(n2);
      s2.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n2)), // Note: The order of the steps below is important, since we want
      // to ensure that rejected limbo resolutions (which fabricate
      // NoDocuments with SnapshotVersion.min()) never add documents to
      // cache.
      s2.isNoDocument() && s2.version.isEqual(SnapshotVersion.min()) ? (
        // NoDocuments with SnapshotVersion.min() are used in manufactured
        // events. We remove these documents from cache since we lost
        // access.
        (t.removeEntry(n2, s2.readTime), r3 = r3.insert(n2, s2))
      ) : !o.isValidDocument() || s2.version.compareTo(o.version) > 0 || 0 === s2.version.compareTo(o.version) && o.hasPendingWrites ? (t.addEntry(s2), r3 = r3.insert(n2, s2)) : __PRIVATE_logDebug("LocalStore", "Ignoring outdated watch update for ", n2, ". Current version:", o.version, " Watch version:", s2.version);
    }), {
      us: r3,
      cs: i
    };
  });
}
function __PRIVATE_localStoreAllocateTarget(e, t) {
  const n = __PRIVATE_debugCast(e);
  return n.persistence.runTransaction("Allocate target", "readwrite", (e2) => {
    let r2;
    return n.qr.getTargetData(e2, t).next((i) => i ? (
      // This target has been listened to previously, so reuse the
      // previous targetID.
      // TODO(mcg): freshen last accessed date?
      (r2 = i, PersistencePromise.resolve(r2))
    ) : n.qr.allocateTargetId(e2).next((i2) => (r2 = new TargetData(t, i2, "TargetPurposeListen", e2.currentSequenceNumber), n.qr.addTargetData(e2, r2).next(() => r2))));
  }).then((e2) => {
    const r2 = n.ts.get(e2.targetId);
    return (null === r2 || e2.snapshotVersion.compareTo(r2.snapshotVersion) > 0) && (n.ts = n.ts.insert(e2.targetId, e2), n.ns.set(t, e2.targetId)), e2;
  });
}
async function __PRIVATE_localStoreReleaseTarget(e, t, n) {
  const r2 = __PRIVATE_debugCast(e), i = r2.ts.get(t), s2 = n ? "readwrite" : "readwrite-primary";
  try {
    n || await r2.persistence.runTransaction("Release target", s2, (e2) => r2.persistence.referenceDelegate.removeTarget(e2, i));
  } catch (e2) {
    if (!__PRIVATE_isIndexedDbTransactionError(e2))
      throw e2;
    __PRIVATE_logDebug("LocalStore", `Failed to update sequence numbers for target ${t}: ${e2}`);
  }
  r2.ts = r2.ts.remove(t), r2.ns.delete(i.target);
}
function __PRIVATE_localStoreExecuteQuery(e, t, n) {
  const r2 = __PRIVATE_debugCast(e);
  let i = SnapshotVersion.min(), s2 = __PRIVATE_documentKeySet();
  return r2.persistence.runTransaction(
    "Execute query",
    "readwrite",
    // Use readwrite instead of readonly so indexes can be created
    // Use readwrite instead of readonly so indexes can be created
    (e2) => function __PRIVATE_localStoreGetTargetData(e3, t2, n2) {
      const r3 = __PRIVATE_debugCast(e3), i2 = r3.ns.get(n2);
      return void 0 !== i2 ? PersistencePromise.resolve(r3.ts.get(i2)) : r3.qr.getTargetData(t2, n2);
    }(r2, e2, __PRIVATE_queryToTarget(t)).next((t2) => {
      if (t2)
        return i = t2.lastLimboFreeSnapshotVersion, r2.qr.getMatchingKeysForTargetId(e2, t2.targetId).next((e3) => {
          s2 = e3;
        });
    }).next(() => r2.es.getDocumentsMatchingQuery(e2, t, n ? i : SnapshotVersion.min(), n ? s2 : __PRIVATE_documentKeySet())).next((e3) => (__PRIVATE_setMaxReadTime(r2, __PRIVATE_queryCollectionGroup(t), e3), {
      documents: e3,
      ls: s2
    }))
  );
}
function __PRIVATE_setMaxReadTime(e, t, n) {
  let r2 = e.rs.get(t) || SnapshotVersion.min();
  n.forEach((e2, t2) => {
    t2.readTime.compareTo(r2) > 0 && (r2 = t2.readTime);
  }), e.rs.set(t, r2);
}
function __PRIVATE_generateUniqueDebugId() {
  return null === Re ? Re = function __PRIVATE_generateInitialUniqueDebugId() {
    return 268435456 + Math.round(2147483648 * Math.random());
  }() : Re++, "0x" + Re.toString(16);
}
function getDocument() {
  return "undefined" != typeof document ? document : null;
}
function __PRIVATE_newSerializer(e) {
  return new JsonProtoSerializer(
    e,
    /* useProto3Json= */
    true
  );
}
async function __PRIVATE_enableNetworkInternal(e) {
  if (__PRIVATE_canUseNetwork(e))
    for (const t of e.v_)
      await t(
        /* enabled= */
        true
      );
}
async function __PRIVATE_disableNetworkInternal(e) {
  for (const t of e.v_)
    await t(
      /* enabled= */
      false
    );
}
function __PRIVATE_remoteStoreListen(e, t) {
  const n = __PRIVATE_debugCast(e);
  n.D_.has(t.targetId) || // Mark this as something the client is currently listening for.
  (n.D_.set(t.targetId, t), __PRIVATE_shouldStartWatchStream(n) ? (
    // The listen will be sent in onWatchStreamOpen
    __PRIVATE_startWatchStream(n)
  ) : __PRIVATE_ensureWatchStream(n).Ho() && __PRIVATE_sendWatchRequest(n, t));
}
function __PRIVATE_remoteStoreUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e), r2 = __PRIVATE_ensureWatchStream(n);
  n.D_.delete(t), r2.Ho() && __PRIVATE_sendUnwatchRequest(n, t), 0 === n.D_.size && (r2.Ho() ? r2.Zo() : __PRIVATE_canUseNetwork(n) && // Revert to OnlineState.Unknown if the watch stream is not open and we
  // have no listeners, since without any listens to send we cannot
  // confirm if the stream is healthy and upgrade to OnlineState.Online.
  n.M_.set(
    "Unknown"
    /* OnlineState.Unknown */
  ));
}
function __PRIVATE_sendWatchRequest(e, t) {
  if (e.x_.Oe(t.targetId), t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
    const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
    t = t.withExpectedCount(n);
  }
  __PRIVATE_ensureWatchStream(e).u_(t);
}
function __PRIVATE_sendUnwatchRequest(e, t) {
  e.x_.Oe(t), __PRIVATE_ensureWatchStream(e).c_(t);
}
function __PRIVATE_startWatchStream(e) {
  e.x_ = new __PRIVATE_WatchChangeAggregator({
    getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
    _t: (t) => e.D_.get(t) || null,
    nt: () => e.datastore.serializer.databaseId
  }), __PRIVATE_ensureWatchStream(e).start(), e.M_.g_();
}
function __PRIVATE_shouldStartWatchStream(e) {
  return __PRIVATE_canUseNetwork(e) && !__PRIVATE_ensureWatchStream(e).jo() && e.D_.size > 0;
}
function __PRIVATE_canUseNetwork(e) {
  return 0 === __PRIVATE_debugCast(e).C_.size;
}
function __PRIVATE_cleanUpWatchStreamState(e) {
  e.x_ = void 0;
}
async function __PRIVATE_onWatchStreamOpen(e) {
  e.D_.forEach((t, n) => {
    __PRIVATE_sendWatchRequest(e, t);
  });
}
async function __PRIVATE_onWatchStreamClose(e, t) {
  __PRIVATE_cleanUpWatchStreamState(e), // If we still need the watch stream, retry the connection.
  __PRIVATE_shouldStartWatchStream(e) ? (e.M_.w_(t), __PRIVATE_startWatchStream(e)) : (
    // No need to restart watch stream because there are no active targets.
    // The online state is set to unknown because there is no active attempt
    // at establishing a connection
    e.M_.set(
      "Unknown"
      /* OnlineState.Unknown */
    )
  );
}
async function __PRIVATE_onWatchStreamChange(e, t, n) {
  if (
    // Mark the client as online since we got a message from the server
    e.M_.set(
      "Online"
      /* OnlineState.Online */
    ), t instanceof __PRIVATE_WatchTargetChange && 2 === t.state && t.cause
  )
    try {
      await /** Handles an error on a target */
      async function __PRIVATE_handleTargetError(e2, t2) {
        const n2 = t2.cause;
        for (const r2 of t2.targetIds)
          e2.D_.has(r2) && (await e2.remoteSyncer.rejectListen(r2, n2), e2.D_.delete(r2), e2.x_.removeTarget(r2));
      }(e, t);
    } catch (n2) {
      __PRIVATE_logDebug("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), n2), await __PRIVATE_disableNetworkUntilRecovery(e, n2);
    }
  else if (t instanceof __PRIVATE_DocumentWatchChange ? e.x_.$e(t) : t instanceof __PRIVATE_ExistenceFilterChange ? e.x_.Je(t) : e.x_.Ge(t), !n.isEqual(SnapshotVersion.min()))
    try {
      const t2 = await __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore);
      n.compareTo(t2) >= 0 && // We have received a target change with a global snapshot if the snapshot
      // version is not equal to SnapshotVersion.min().
      await /**
      * Takes a batch of changes from the Datastore, repackages them as a
      * RemoteEvent, and passes that on to the listener, which is typically the
      * SyncEngine.
      */
      function __PRIVATE_raiseWatchSnapshot(e2, t3) {
        const n2 = e2.x_.it(t3);
        return n2.targetChanges.forEach((n3, r2) => {
          if (n3.resumeToken.approximateByteSize() > 0) {
            const i = e2.D_.get(r2);
            i && e2.D_.set(r2, i.withResumeToken(n3.resumeToken, t3));
          }
        }), // Re-establish listens for the targets that have been invalidated by
        // existence filter mismatches.
        n2.targetMismatches.forEach((t4, n3) => {
          const r2 = e2.D_.get(t4);
          if (!r2)
            return;
          e2.D_.set(t4, r2.withResumeToken(ByteString.EMPTY_BYTE_STRING, r2.snapshotVersion)), // Cause a hard reset by unwatching and rewatching immediately, but
          // deliberately don't send a resume token so that we get a full update.
          __PRIVATE_sendUnwatchRequest(e2, t4);
          const i = new TargetData(r2.target, t4, n3, r2.sequenceNumber);
          __PRIVATE_sendWatchRequest(e2, i);
        }), e2.remoteSyncer.applyRemoteEvent(n2);
      }(e, n);
    } catch (t2) {
      __PRIVATE_logDebug("RemoteStore", "Failed to raise snapshot:", t2), await __PRIVATE_disableNetworkUntilRecovery(e, t2);
    }
}
async function __PRIVATE_disableNetworkUntilRecovery(e, t, n) {
  if (!__PRIVATE_isIndexedDbTransactionError(t))
    throw t;
  e.C_.add(
    1
    /* OfflineCause.IndexedDbFailed */
  ), // Disable network and raise offline snapshots
  await __PRIVATE_disableNetworkInternal(e), e.M_.set(
    "Offline"
    /* OnlineState.Offline */
  ), n || // Use a simple read operation to determine if IndexedDB recovered.
  // Ideally, we would expose a health check directly on SimpleDb, but
  // RemoteStore only has access to persistence through LocalStore.
  (n = () => __PRIVATE_localStoreGetLastRemoteSnapshotVersion(e.localStore)), // Probe IndexedDB periodically and re-enable network
  e.asyncQueue.enqueueRetryable(async () => {
    __PRIVATE_logDebug("RemoteStore", "Retrying IndexedDB access"), await n(), e.C_.delete(
      1
      /* OfflineCause.IndexedDbFailed */
    ), await __PRIVATE_enableNetworkInternal(e);
  });
}
async function __PRIVATE_remoteStoreHandleCredentialChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  n.asyncQueue.verifyOperationInProgress(), __PRIVATE_logDebug("RemoteStore", "RemoteStore received new credentials");
  const r2 = __PRIVATE_canUseNetwork(n);
  n.C_.add(
    3
    /* OfflineCause.CredentialChange */
  ), await __PRIVATE_disableNetworkInternal(n), r2 && // Don't set the network status to Unknown if we are offline.
  n.M_.set(
    "Unknown"
    /* OnlineState.Unknown */
  ), await n.remoteSyncer.handleCredentialChange(t), n.C_.delete(
    3
    /* OfflineCause.CredentialChange */
  ), await __PRIVATE_enableNetworkInternal(n);
}
async function __PRIVATE_remoteStoreApplyPrimaryState(e, t) {
  const n = __PRIVATE_debugCast(e);
  t ? (n.C_.delete(
    2
    /* OfflineCause.IsSecondary */
  ), await __PRIVATE_enableNetworkInternal(n)) : t || (n.C_.add(
    2
    /* OfflineCause.IsSecondary */
  ), await __PRIVATE_disableNetworkInternal(n), n.M_.set(
    "Unknown"
    /* OnlineState.Unknown */
  ));
}
function __PRIVATE_ensureWatchStream(e) {
  return e.O_ || // Create stream (but note that it is not started yet).
  (e.O_ = function __PRIVATE_newPersistentWatchStream(e2, t, n) {
    const r2 = __PRIVATE_debugCast(e2);
    return r2.A_(), new __PRIVATE_PersistentListenStream(t, r2.connection, r2.authCredentials, r2.appCheckCredentials, r2.serializer, n);
  }(e.datastore, e.asyncQueue, {
    ho: __PRIVATE_onWatchStreamOpen.bind(null, e),
    Io: __PRIVATE_onWatchStreamClose.bind(null, e),
    a_: __PRIVATE_onWatchStreamChange.bind(null, e)
  }), e.v_.push(async (t) => {
    t ? (e.O_.Yo(), __PRIVATE_shouldStartWatchStream(e) ? __PRIVATE_startWatchStream(e) : e.M_.set(
      "Unknown"
      /* OnlineState.Unknown */
    )) : (await e.O_.stop(), __PRIVATE_cleanUpWatchStreamState(e));
  })), e.O_;
}
function __PRIVATE_wrapInUserErrorIfRecoverable(e, t) {
  if (__PRIVATE_logError("AsyncQueue", `${t}: ${e}`), __PRIVATE_isIndexedDbTransactionError(e))
    return new FirestoreError(C2.UNAVAILABLE, `${t}: ${e}`);
  throw e;
}
async function __PRIVATE_eventManagerListen(e, t) {
  const n = __PRIVATE_debugCast(e), r2 = t.query;
  let i = false, s2 = n.queries.get(r2);
  if (s2 || (i = true, s2 = new __PRIVATE_QueryListenersInfo()), i)
    try {
      s2.k_ = await n.onListen(r2);
    } catch (e2) {
      const n2 = __PRIVATE_wrapInUserErrorIfRecoverable(e2, `Initialization of query '${__PRIVATE_stringifyQuery(t.query)}' failed`);
      return void t.onError(n2);
    }
  if (n.queries.set(r2, s2), s2.listeners.push(t), // Run global snapshot listeners if a consistent snapshot has been emitted.
  t.Q_(n.onlineState), s2.k_) {
    t.K_(s2.k_) && __PRIVATE_raiseSnapshotsInSyncEvent(n);
  }
}
async function __PRIVATE_eventManagerUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e), r2 = t.query;
  let i = false;
  const s2 = n.queries.get(r2);
  if (s2) {
    const e2 = s2.listeners.indexOf(t);
    e2 >= 0 && (s2.listeners.splice(e2, 1), i = 0 === s2.listeners.length);
  }
  if (i)
    return n.queries.delete(r2), n.onUnlisten(r2);
}
function __PRIVATE_eventManagerOnWatchChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  let r2 = false;
  for (const e2 of t) {
    const t2 = e2.query, i = n.queries.get(t2);
    if (i) {
      for (const t3 of i.listeners)
        t3.K_(e2) && (r2 = true);
      i.k_ = e2;
    }
  }
  r2 && __PRIVATE_raiseSnapshotsInSyncEvent(n);
}
function __PRIVATE_eventManagerOnWatchError(e, t, n) {
  const r2 = __PRIVATE_debugCast(e), i = r2.queries.get(t);
  if (i)
    for (const e2 of i.listeners)
      e2.onError(n);
  r2.queries.delete(t);
}
function __PRIVATE_raiseSnapshotsInSyncEvent(e) {
  e.q_.forEach((e2) => {
    e2.next();
  });
}
async function __PRIVATE_syncEngineListen(e, t) {
  const n = __PRIVATE_ensureWatchCallbacks(e);
  let r2, i;
  const s2 = n.ma.get(t);
  if (s2)
    r2 = s2.targetId, n.sharedClientState.addLocalQueryTarget(r2), i = s2.view.Aa();
  else {
    const e2 = await __PRIVATE_localStoreAllocateTarget(n.localStore, __PRIVATE_queryToTarget(t)), s3 = n.sharedClientState.addLocalQueryTarget(e2.targetId);
    r2 = e2.targetId, i = await __PRIVATE_initializeViewAndComputeSnapshot(n, t, r2, "current" === s3, e2.resumeToken), n.isPrimaryClient && __PRIVATE_remoteStoreListen(n.remoteStore, e2);
  }
  return i;
}
async function __PRIVATE_initializeViewAndComputeSnapshot(e, t, n, r2, i) {
  e.va = (t2, n2, r3) => async function __PRIVATE_applyDocChanges(e2, t3, n3, r4) {
    let i2 = t3.view.ca(n3);
    i2.Zi && // The query has a limit and some docs were removed, so we need
    // to re-run the query against the local store to make sure we
    // didn't lose any good docs that had been past the limit.
    (i2 = await __PRIVATE_localStoreExecuteQuery(
      e2.localStore,
      t3.query,
      /* usePreviousResults= */
      false
    ).then(({ documents: e3 }) => t3.view.ca(e3, i2)));
    const s3 = r4 && r4.targetChanges.get(t3.targetId), o2 = t3.view.applyChanges(
      i2,
      /* updateLimboDocuments= */
      e2.isPrimaryClient,
      s3
    );
    return __PRIVATE_updateTrackedLimbos(e2, t3.targetId, o2.Ta), o2.snapshot;
  }(e, t2, n2, r3);
  const s2 = await __PRIVATE_localStoreExecuteQuery(
    e.localStore,
    t,
    /* usePreviousResults= */
    true
  ), o = new __PRIVATE_View(t, s2.ls), _ = o.ca(s2.documents), a = TargetChange.createSynthesizedTargetChangeForCurrentChange(n, r2 && "Offline" !== e.onlineState, i), u = o.applyChanges(
    _,
    /* updateLimboDocuments= */
    e.isPrimaryClient,
    a
  );
  __PRIVATE_updateTrackedLimbos(e, n, u.Ta);
  const c = new __PRIVATE_QueryView(t, n, o);
  return e.ma.set(t, c), e.fa.has(n) ? e.fa.get(n).push(t) : e.fa.set(n, [t]), u.snapshot;
}
async function __PRIVATE_syncEngineUnlisten(e, t) {
  const n = __PRIVATE_debugCast(e), r2 = n.ma.get(t), i = n.fa.get(r2.targetId);
  if (i.length > 1)
    return n.fa.set(r2.targetId, i.filter((e2) => !__PRIVATE_queryEquals(e2, t))), void n.ma.delete(t);
  if (n.isPrimaryClient) {
    n.sharedClientState.removeLocalQueryTarget(r2.targetId);
    n.sharedClientState.isActiveQueryTarget(r2.targetId) || await __PRIVATE_localStoreReleaseTarget(
      n.localStore,
      r2.targetId,
      /*keepPersistedTargetData=*/
      false
    ).then(() => {
      n.sharedClientState.clearQueryState(r2.targetId), __PRIVATE_remoteStoreUnlisten(n.remoteStore, r2.targetId), __PRIVATE_removeAndCleanupTarget(n, r2.targetId);
    }).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss);
  } else
    __PRIVATE_removeAndCleanupTarget(n, r2.targetId), await __PRIVATE_localStoreReleaseTarget(
      n.localStore,
      r2.targetId,
      /*keepPersistedTargetData=*/
      true
    );
}
async function __PRIVATE_syncEngineApplyRemoteEvent(e, t) {
  const n = __PRIVATE_debugCast(e);
  try {
    const e2 = await __PRIVATE_localStoreApplyRemoteEventToLocalCache(n.localStore, t);
    t.targetChanges.forEach((e3, t2) => {
      const r2 = n.ya.get(t2);
      r2 && // Since this is a limbo resolution lookup, it's for a single document
      // and it could be added, modified, or removed, but not a combination.
      (__PRIVATE_hardAssert(e3.addedDocuments.size + e3.modifiedDocuments.size + e3.removedDocuments.size <= 1), e3.addedDocuments.size > 0 ? r2.Ra = true : e3.modifiedDocuments.size > 0 ? __PRIVATE_hardAssert(r2.Ra) : e3.removedDocuments.size > 0 && (__PRIVATE_hardAssert(r2.Ra), r2.Ra = false));
    }), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e2, t);
  } catch (e2) {
    await __PRIVATE_ignoreIfPrimaryLeaseLoss(e2);
  }
}
function __PRIVATE_syncEngineApplyOnlineStateChange(e, t, n) {
  const r2 = __PRIVATE_debugCast(e);
  if (r2.isPrimaryClient && 0 === n || !r2.isPrimaryClient && 1 === n) {
    const e2 = [];
    r2.ma.forEach((n2, r3) => {
      const i = r3.view.Q_(t);
      i.snapshot && e2.push(i.snapshot);
    }), function __PRIVATE_eventManagerOnOnlineStateChange(e3, t2) {
      const n2 = __PRIVATE_debugCast(e3);
      n2.onlineState = t2;
      let r3 = false;
      n2.queries.forEach((e4, n3) => {
        for (const e5 of n3.listeners)
          e5.Q_(t2) && (r3 = true);
      }), r3 && __PRIVATE_raiseSnapshotsInSyncEvent(n2);
    }(r2.eventManager, t), e2.length && r2.Va.a_(e2), r2.onlineState = t, r2.isPrimaryClient && r2.sharedClientState.setOnlineState(t);
  }
}
async function __PRIVATE_syncEngineRejectListen(e, t, n) {
  const r2 = __PRIVATE_debugCast(e);
  r2.sharedClientState.updateQueryState(t, "rejected", n);
  const i = r2.ya.get(t), s2 = i && i.key;
  if (s2) {
    let e2 = new SortedMap(DocumentKey.comparator);
    e2 = e2.insert(s2, MutableDocument.newNoDocument(s2, SnapshotVersion.min()));
    const n2 = __PRIVATE_documentKeySet().add(s2), i2 = new RemoteEvent(
      SnapshotVersion.min(),
      /* targetChanges= */
      /* @__PURE__ */ new Map(),
      /* targetMismatches= */
      new SortedMap(__PRIVATE_primitiveComparator),
      e2,
      n2
    );
    await __PRIVATE_syncEngineApplyRemoteEvent(r2, i2), // Since this query failed, we won't want to manually unlisten to it.
    // We only remove it from bookkeeping after we successfully applied the
    // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
    // this query when the RemoteStore restarts the Watch stream, which should
    // re-trigger the target failure.
    r2.pa = r2.pa.remove(s2), r2.ya.delete(t), __PRIVATE_pumpEnqueuedLimboResolutions(r2);
  } else
    await __PRIVATE_localStoreReleaseTarget(
      r2.localStore,
      t,
      /* keepPersistedTargetData */
      false
    ).then(() => __PRIVATE_removeAndCleanupTarget(r2, t, n)).catch(__PRIVATE_ignoreIfPrimaryLeaseLoss);
}
function __PRIVATE_removeAndCleanupTarget(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t);
  for (const r2 of e.fa.get(t))
    e.ma.delete(r2), n && e.Va.Fa(r2, n);
  if (e.fa.delete(t), e.isPrimaryClient) {
    e.wa.Rr(t).forEach((t2) => {
      e.wa.containsKey(t2) || // We removed the last reference for this key
      __PRIVATE_removeLimboTarget(e, t2);
    });
  }
}
function __PRIVATE_removeLimboTarget(e, t) {
  e.ga.delete(t.path.canonicalString());
  const n = e.pa.get(t);
  null !== n && (__PRIVATE_remoteStoreUnlisten(e.remoteStore, n), e.pa = e.pa.remove(t), e.ya.delete(n), __PRIVATE_pumpEnqueuedLimboResolutions(e));
}
function __PRIVATE_updateTrackedLimbos(e, t, n) {
  for (const r2 of n)
    if (r2 instanceof __PRIVATE_AddedLimboDocument)
      e.wa.addReference(r2.key, t), __PRIVATE_trackLimboChange(e, r2);
    else if (r2 instanceof __PRIVATE_RemovedLimboDocument) {
      __PRIVATE_logDebug("SyncEngine", "Document no longer in limbo: " + r2.key), e.wa.removeReference(r2.key, t);
      e.wa.containsKey(r2.key) || // We removed the last reference for this key
      __PRIVATE_removeLimboTarget(e, r2.key);
    } else
      fail();
}
function __PRIVATE_trackLimboChange(e, t) {
  const n = t.key, r2 = n.path.canonicalString();
  e.pa.get(n) || e.ga.has(r2) || (__PRIVATE_logDebug("SyncEngine", "New document in limbo: " + n), e.ga.add(r2), __PRIVATE_pumpEnqueuedLimboResolutions(e));
}
function __PRIVATE_pumpEnqueuedLimboResolutions(e) {
  for (; e.ga.size > 0 && e.pa.size < e.maxConcurrentLimboResolutions; ) {
    const t = e.ga.values().next().value;
    e.ga.delete(t);
    const n = new DocumentKey(ResourcePath.fromString(t)), r2 = e.Da.next();
    e.ya.set(r2, new LimboResolution(n)), e.pa = e.pa.insert(n, r2), __PRIVATE_remoteStoreListen(e.remoteStore, new TargetData(__PRIVATE_queryToTarget(__PRIVATE_newQueryForPath(n.path)), r2, "TargetPurposeLimboResolution", __PRIVATE_ListenSequence._e));
  }
}
async function __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(e, t, n) {
  const r2 = __PRIVATE_debugCast(e), i = [], s2 = [], o = [];
  r2.ma.isEmpty() || (r2.ma.forEach((e2, _) => {
    o.push(r2.va(_, t, n).then((e3) => {
      if (
        // If there are changes, or we are handling a global snapshot, notify
        // secondary clients to update query state.
        (e3 || n) && r2.isPrimaryClient && r2.sharedClientState.updateQueryState(_.targetId, (null == e3 ? void 0 : e3.fromCache) ? "not-current" : "current"), e3
      ) {
        i.push(e3);
        const t2 = __PRIVATE_LocalViewChanges.Qi(_.targetId, e3);
        s2.push(t2);
      }
    }));
  }), await Promise.all(o), r2.Va.a_(i), await async function __PRIVATE_localStoreNotifyLocalViewChanges(e2, t2) {
    const n2 = __PRIVATE_debugCast(e2);
    try {
      await n2.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (e3) => PersistencePromise.forEach(t2, (t3) => PersistencePromise.forEach(t3.ki, (r3) => n2.persistence.referenceDelegate.addReference(e3, t3.targetId, r3)).next(() => PersistencePromise.forEach(t3.qi, (r3) => n2.persistence.referenceDelegate.removeReference(e3, t3.targetId, r3)))));
    } catch (e3) {
      if (!__PRIVATE_isIndexedDbTransactionError(e3))
        throw e3;
      __PRIVATE_logDebug("LocalStore", "Failed to update sequence numbers: " + e3);
    }
    for (const e3 of t2) {
      const t3 = e3.targetId;
      if (!e3.fromCache) {
        const e4 = n2.ts.get(t3), r3 = e4.snapshotVersion, i2 = e4.withLastLimboFreeSnapshotVersion(r3);
        n2.ts = n2.ts.insert(t3, i2);
      }
    }
  }(r2.localStore, s2));
}
async function __PRIVATE_syncEngineHandleCredentialChange(e, t) {
  const n = __PRIVATE_debugCast(e);
  if (!n.currentUser.isEqual(t)) {
    __PRIVATE_logDebug("SyncEngine", "User change. New user:", t.toKey());
    const e2 = await __PRIVATE_localStoreHandleUserChange(n.localStore, t);
    n.currentUser = t, // Fails tasks waiting for pending writes requested by previous user.
    function __PRIVATE_rejectOutstandingPendingWritesCallbacks(e3, t2) {
      e3.ba.forEach((e4) => {
        e4.forEach((e5) => {
          e5.reject(new FirestoreError(C2.CANCELLED, t2));
        });
      }), e3.ba.clear();
    }(n, "'waitForPendingWrites' promise is rejected due to a user change."), // TODO(b/114226417): Consider calling this only in the primary tab.
    n.sharedClientState.handleUserChange(t, e2.removedBatchIds, e2.addedBatchIds), await __PRIVATE_syncEngineEmitNewSnapsAndNotifyLocalStore(n, e2._s);
  }
}
function __PRIVATE_syncEngineGetRemoteKeysForTarget(e, t) {
  const n = __PRIVATE_debugCast(e), r2 = n.ya.get(t);
  if (r2 && r2.Ra)
    return __PRIVATE_documentKeySet().add(r2.key);
  {
    let e2 = __PRIVATE_documentKeySet();
    const r3 = n.fa.get(t);
    if (!r3)
      return e2;
    for (const t2 of r3) {
      const r4 = n.ma.get(t2);
      e2 = e2.unionWith(r4.view.ua);
    }
    return e2;
  }
}
function __PRIVATE_ensureWatchCallbacks(e) {
  const t = __PRIVATE_debugCast(e);
  return t.remoteStore.remoteSyncer.applyRemoteEvent = __PRIVATE_syncEngineApplyRemoteEvent.bind(null, t), t.remoteStore.remoteSyncer.getRemoteKeysForTarget = __PRIVATE_syncEngineGetRemoteKeysForTarget.bind(null, t), t.remoteStore.remoteSyncer.rejectListen = __PRIVATE_syncEngineRejectListen.bind(null, t), t.Va.a_ = __PRIVATE_eventManagerOnWatchChange.bind(null, t.eventManager), t.Va.Fa = __PRIVATE_eventManagerOnWatchError.bind(null, t.eventManager), t;
}
async function __PRIVATE_setOfflineComponentProvider(e, t) {
  e.asyncQueue.verifyOperationInProgress(), __PRIVATE_logDebug("FirestoreClient", "Initializing OfflineComponentProvider");
  const n = await e.getConfiguration();
  await t.initialize(n);
  let r2 = n.initialUser;
  e.setCredentialChangeListener(async (e2) => {
    r2.isEqual(e2) || (await __PRIVATE_localStoreHandleUserChange(t.localStore, e2), r2 = e2);
  }), // When a user calls clearPersistence() in one client, all other clients
  // need to be terminated to allow the delete to succeed.
  t.persistence.setDatabaseDeletedListener(() => e.terminate()), e._offlineComponents = t;
}
async function __PRIVATE_setOnlineComponentProvider(e, t) {
  e.asyncQueue.verifyOperationInProgress();
  const n = await __PRIVATE_ensureOfflineComponents(e);
  __PRIVATE_logDebug("FirestoreClient", "Initializing OnlineComponentProvider");
  const r2 = await e.getConfiguration();
  await t.initialize(n, r2), // The CredentialChangeListener of the online component provider takes
  // precedence over the offline component provider.
  e.setCredentialChangeListener((e2) => __PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore, e2)), e.setAppCheckTokenChangeListener((e2, n2) => __PRIVATE_remoteStoreHandleCredentialChange(t.remoteStore, n2)), e._onlineComponents = t;
}
function __PRIVATE_canFallbackFromIndexedDbError(e) {
  return "FirebaseError" === e.name ? e.code === C2.FAILED_PRECONDITION || e.code === C2.UNIMPLEMENTED : !("undefined" != typeof DOMException && e instanceof DOMException) || // When the browser is out of quota we could get either quota exceeded
  // or an aborted error depending on whether the error happened during
  // schema migration.
  (22 === e.code || 20 === e.code || // Firefox Private Browsing mode disables IndexedDb and returns
  // INVALID_STATE for any usage.
  11 === e.code);
}
async function __PRIVATE_ensureOfflineComponents(e) {
  if (!e._offlineComponents)
    if (e._uninitializedComponentsProvider) {
      __PRIVATE_logDebug("FirestoreClient", "Using user provided OfflineComponentProvider");
      try {
        await __PRIVATE_setOfflineComponentProvider(e, e._uninitializedComponentsProvider._offline);
      } catch (t) {
        const n = t;
        if (!__PRIVATE_canFallbackFromIndexedDbError(n))
          throw n;
        __PRIVATE_logWarn("Error using user provided cache. Falling back to memory cache: " + n), await __PRIVATE_setOfflineComponentProvider(e, new MemoryOfflineComponentProvider());
      }
    } else
      __PRIVATE_logDebug("FirestoreClient", "Using default OfflineComponentProvider"), await __PRIVATE_setOfflineComponentProvider(e, new MemoryOfflineComponentProvider());
  return e._offlineComponents;
}
async function __PRIVATE_ensureOnlineComponents(e) {
  return e._onlineComponents || (e._uninitializedComponentsProvider ? (__PRIVATE_logDebug("FirestoreClient", "Using user provided OnlineComponentProvider"), await __PRIVATE_setOnlineComponentProvider(e, e._uninitializedComponentsProvider._online)) : (__PRIVATE_logDebug("FirestoreClient", "Using default OnlineComponentProvider"), await __PRIVATE_setOnlineComponentProvider(e, new OnlineComponentProvider()))), e._onlineComponents;
}
async function __PRIVATE_getEventManager(e) {
  const t = await __PRIVATE_ensureOnlineComponents(e), n = t.eventManager;
  return n.onListen = __PRIVATE_syncEngineListen.bind(null, t.syncEngine), n.onUnlisten = __PRIVATE_syncEngineUnlisten.bind(null, t.syncEngine), n;
}
function __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(e, t, n = {}) {
  const r2 = new __PRIVATE_Deferred();
  return e.asyncQueue.enqueueAndForget(async () => function __PRIVATE_readDocumentViaSnapshotListener(e2, t2, n2, r3, i) {
    const s2 = new __PRIVATE_AsyncObserver({
      next: (s3) => {
        t2.enqueueAndForget(() => __PRIVATE_eventManagerUnlisten(e2, o));
        const _ = s3.docs.has(n2);
        !_ && s3.fromCache ? (
          // TODO(dimond): If we're online and the document doesn't
          // exist then we resolve with a doc.exists set to false. If
          // we're offline however, we reject the Promise in this
          // case. Two options: 1) Cache the negative response from
          // the server so we can deliver that even when you're
          // offline 2) Actually reject the Promise in the online case
          // if the document doesn't exist.
          i.reject(new FirestoreError(C2.UNAVAILABLE, "Failed to get document because the client is offline."))
        ) : _ && s3.fromCache && r3 && "server" === r3.source ? i.reject(new FirestoreError(C2.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(s3);
      },
      error: (e3) => i.reject(e3)
    }), o = new __PRIVATE_QueryListener(__PRIVATE_newQueryForPath(n2.path), s2, {
      includeMetadataChanges: true,
      J_: true
    });
    return __PRIVATE_eventManagerListen(e2, o);
  }(await __PRIVATE_getEventManager(e), e.asyncQueue, t, n, r2)), r2.promise;
}
function __PRIVATE_cloneLongPollingOptions(e) {
  const t = {};
  return void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t;
}
function __PRIVATE_validateNonEmptyArgument(e, t, n) {
  if (!n)
    throw new FirestoreError(C2.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`);
}
function __PRIVATE_validateIsNotUsedTogether(e, t, n, r2) {
  if (true === t && true === r2)
    throw new FirestoreError(C2.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`);
}
function __PRIVATE_validateDocumentPath(e) {
  if (!DocumentKey.isDocumentKey(e))
    throw new FirestoreError(C2.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`);
}
function __PRIVATE_valueDescription(e) {
  if (void 0 === e)
    return "undefined";
  if (null === e)
    return "null";
  if ("string" == typeof e)
    return e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e);
  if ("number" == typeof e || "boolean" == typeof e)
    return "" + e;
  if ("object" == typeof e) {
    if (e instanceof Array)
      return "an array";
    {
      const t = (
        /** try to get the constructor name for an object. */
        function __PRIVATE_tryGetCustomObjectType(e2) {
          if (e2.constructor)
            return e2.constructor.name;
          return null;
        }(e)
      );
      return t ? `a custom ${t} object` : "an object";
    }
  }
  return "function" == typeof e ? "a function" : fail();
}
function __PRIVATE_cast(e, t) {
  if ("_delegate" in e && // Unwrap Compat types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e = e._delegate), !(e instanceof t)) {
    if (t.name === e.constructor.name)
      throw new FirestoreError(C2.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = __PRIVATE_valueDescription(e);
      throw new FirestoreError(C2.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`);
    }
  }
  return e;
}
function connectFirestoreEmulator(e, t, n, r2 = {}) {
  var i;
  const s2 = (e = __PRIVATE_cast(e, Firestore$1))._getSettings(), o = `${t}:${n}`;
  if ("firestore.googleapis.com" !== s2.host && s2.host !== o && __PRIVATE_logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."), e._setSettings(Object.assign(Object.assign({}, s2), {
    host: o,
    ssl: false
  })), r2.mockUserToken) {
    let t2, n2;
    if ("string" == typeof r2.mockUserToken)
      t2 = r2.mockUserToken, n2 = User.MOCK_USER;
    else {
      t2 = createMockUserToken(r2.mockUserToken, null === (i = e._app) || void 0 === i ? void 0 : i.options.projectId);
      const s3 = r2.mockUserToken.sub || r2.mockUserToken.user_id;
      if (!s3)
        throw new FirestoreError(C2.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      n2 = new User(s3);
    }
    e._authCredentials = new __PRIVATE_EmulatorAuthCredentialsProvider(new __PRIVATE_OAuthToken(t2, n2));
  }
}
function doc(e, t, ...n) {
  if (e = getModularInstance(e), // We allow omission of 'pathString' but explicitly prohibit passing in both
  // 'undefined' and 'null'.
  1 === arguments.length && (t = __PRIVATE_AutoId.newId()), __PRIVATE_validateNonEmptyArgument("doc", "path", t), e instanceof Firestore$1) {
    const r2 = ResourcePath.fromString(t, ...n);
    return __PRIVATE_validateDocumentPath(r2), new DocumentReference(
      e,
      /* converter= */
      null,
      new DocumentKey(r2)
    );
  }
  {
    if (!(e instanceof DocumentReference || e instanceof CollectionReference))
      throw new FirestoreError(C2.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const r2 = e._path.child(ResourcePath.fromString(t, ...n));
    return __PRIVATE_validateDocumentPath(r2), new DocumentReference(e.firestore, e instanceof CollectionReference ? e.converter : null, new DocumentKey(r2));
  }
}
function getFirestore(t, n) {
  const r2 = "object" == typeof t ? t : getApp(), i = "string" == typeof t ? t : n || "(default)", s2 = _getProvider(r2, "firestore").getImmediate({
    identifier: i
  });
  if (!s2._initialized) {
    const e = getDefaultEmulatorHostnameAndPort("firestore");
    e && connectFirestoreEmulator(s2, ...e);
  }
  return s2;
}
function ensureFirestoreConfigured(e) {
  return e._firestoreClient || __PRIVATE_configureFirestore(e), e._firestoreClient.verifyNotTerminated(), e._firestoreClient;
}
function __PRIVATE_configureFirestore(e) {
  var t, n, r2;
  const i = e._freezeSettings(), s2 = function __PRIVATE_makeDatabaseInfo(e2, t2, n2, r3) {
    return new DatabaseInfo(e2, t2, n2, r3.host, r3.ssl, r3.experimentalForceLongPolling, r3.experimentalAutoDetectLongPolling, __PRIVATE_cloneLongPollingOptions(r3.experimentalLongPollingOptions), r3.useFetchStreams);
  }(e._databaseId, (null === (t = e._app) || void 0 === t ? void 0 : t.options.appId) || "", e._persistenceKey, i);
  e._firestoreClient = new FirestoreClient(e._authCredentials, e._appCheckCredentials, e._queue, s2), (null === (n = i.localCache) || void 0 === n ? void 0 : n._offlineComponentProvider) && (null === (r2 = i.localCache) || void 0 === r2 ? void 0 : r2._onlineComponentProvider) && (e._firestoreClient._uninitializedComponentsProvider = {
    _offlineKind: i.localCache.kind,
    _offline: i.localCache._offlineComponentProvider,
    _online: i.localCache._onlineComponentProvider
  });
}
function __PRIVATE_fieldPathFromDotSeparatedString(e, t, n) {
  if (t.search(ye) >= 0)
    throw __PRIVATE_createError(
      `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
      e,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      n
    );
  try {
    return new FieldPath(...t.split("."))._internalPath;
  } catch (r2) {
    throw __PRIVATE_createError(
      `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      e,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      n
    );
  }
}
function __PRIVATE_createError(e, t, n, r2, i) {
  const s2 = r2 && !r2.isEmpty(), o = void 0 !== i;
  let _ = `Function ${t}() called with invalid data`;
  n && (_ += " (via `toFirestore()`)"), _ += ". ";
  let a = "";
  return (s2 || o) && (a += " (found", s2 && (a += ` in field ${r2}`), o && (a += ` in document ${i}`), a += ")"), new FirestoreError(C2.INVALID_ARGUMENT, _ + e + a);
}
function __PRIVATE_fieldPathFromArgument(e, t) {
  return "string" == typeof t ? __PRIVATE_fieldPathFromDotSeparatedString(e, t) : t instanceof FieldPath ? t._internalPath : t._delegate._internalPath;
}
function getDoc(e) {
  e = __PRIVATE_cast(e, DocumentReference);
  const t = __PRIVATE_cast(e.firestore, Firestore);
  return __PRIVATE_firestoreClientGetDocumentViaSnapshotListener(ensureFirestoreConfigured(t), e._key).then((n) => __PRIVATE_convertToDocSnapshot(t, e, n));
}
function __PRIVATE_convertToDocSnapshot(e, t, n) {
  const r2 = n.docs.get(t._key), i = new __PRIVATE_ExpUserDataWriter(e);
  return new DocumentSnapshot(e, i, t._key, r2, new SnapshotMetadata(n.hasPendingWrites, n.fromCache), t.converter);
}
var S2, User, b, D2, C2, FirestoreError, __PRIVATE_Deferred, __PRIVATE_OAuthToken, __PRIVATE_EmptyAuthCredentialsProvider, __PRIVATE_EmulatorAuthCredentialsProvider, __PRIVATE_FirebaseAuthCredentialsProvider, __PRIVATE_FirstPartyToken, __PRIVATE_FirstPartyAuthCredentialsProvider, AppCheckToken, __PRIVATE_FirebaseAppCheckTokenProvider, __PRIVATE_AutoId, Timestamp, SnapshotVersion, BasePath, ResourcePath, v2, FieldPath$1, DocumentKey, FieldIndex, IndexOffset, F2, PersistenceTransaction, PersistencePromise, __PRIVATE_ListenSequence, J2, Y2, Z2, X2, ee, SortedMap, SortedMapIterator, LLRBNode, SortedSet, SortedSetIterator, FieldMask, __PRIVATE_Base64DecodeError, ByteString, te, DatabaseInfo, DatabaseId, ne, ObjectValue, MutableDocument, Bound, OrderBy, Filter, FieldFilter, CompositeFilter, __PRIVATE_KeyFieldFilter, __PRIVATE_KeyFieldInFilter, __PRIVATE_KeyFieldNotInFilter, __PRIVATE_ArrayContainsFilter, __PRIVATE_InFilter, __PRIVATE_NotInFilter, __PRIVATE_ArrayContainsAnyFilter, __PRIVATE_TargetImpl, __PRIVATE_QueryImpl, ObjectMap, ie, se, oe, _e, ae2, TransformOperation, __PRIVATE_ServerTimestampTransform, __PRIVATE_ArrayUnionTransformOperation, __PRIVATE_ArrayRemoveTransformOperation, __PRIVATE_NumericIncrementTransformOperation, Precondition, Mutation, __PRIVATE_SetMutation, __PRIVATE_PatchMutation, __PRIVATE_DeleteMutation, MutationBatch, Overlay, ExistenceFilter, ue, ce, le, he, BloomFilter, __PRIVATE_BloomFilterError, RemoteEvent, TargetChange, __PRIVATE_DocumentWatchChange, __PRIVATE_ExistenceFilterChange, __PRIVATE_WatchTargetChange, __PRIVATE_TargetState, __PRIVATE_WatchChangeAggregator, Pe, Ie, Te, JsonProtoSerializer, TargetData, __PRIVATE_LocalSerializer, __PRIVATE_FirestoreIndexValueWriter, __PRIVATE_MemoryIndexManager, __PRIVATE_MemoryCollectionParentIndex, Ee, LruParams, __PRIVATE_TargetIdGenerator, RemoteDocumentChangeBuffer, OverlayedDocument, LocalDocumentsView, __PRIVATE_MemoryBundleCache, __PRIVATE_MemoryDocumentOverlayCache, __PRIVATE_ReferenceSet, __PRIVATE_DocReference, __PRIVATE_MemoryMutationQueue, __PRIVATE_MemoryRemoteDocumentCacheImpl, __PRIVATE_MemoryRemoteDocumentChangeBuffer, __PRIVATE_MemoryTargetCache, __PRIVATE_MemoryPersistence, __PRIVATE_MemoryTransaction, __PRIVATE_MemoryEagerDelegate, __PRIVATE_LocalViewChanges, QueryContext, __PRIVATE_QueryEngine, __PRIVATE_LocalStoreImpl, __PRIVATE_LocalClientState, __PRIVATE_MemorySharedClientState, __PRIVATE_NoopConnectivityMonitor, __PRIVATE_BrowserConnectivityMonitor, Re, Ve, __PRIVATE_StreamBridge, me, __PRIVATE_WebChannelConnection, __PRIVATE_ExponentialBackoff, __PRIVATE_PersistentStream, __PRIVATE_PersistentListenStream, __PRIVATE_DatastoreImpl, __PRIVATE_OnlineStateTracker, __PRIVATE_RemoteStoreImpl, DelayedOperation, DocumentSet, __PRIVATE_DocumentChangeSet, ViewSnapshot, __PRIVATE_QueryListenersInfo, __PRIVATE_EventManagerImpl, __PRIVATE_QueryListener, __PRIVATE_AddedLimboDocument, __PRIVATE_RemovedLimboDocument, __PRIVATE_View, __PRIVATE_QueryView, LimboResolution, __PRIVATE_SyncEngineImpl, MemoryOfflineComponentProvider, OnlineComponentProvider, __PRIVATE_AsyncObserver, FirestoreClient, fe, FirestoreSettingsImpl, Firestore$1, Query, DocumentReference, CollectionReference, __PRIVATE_AsyncQueueImpl, Firestore, Bytes, FieldPath, GeoPoint, ye, DocumentSnapshot$1, QueryDocumentSnapshot$1, AbstractUserDataWriter, SnapshotMetadata, DocumentSnapshot, QueryDocumentSnapshot, __PRIVATE_ExpUserDataWriter;
var init_index_esm20176 = __esm({
  "node_modules/@firebase/firestore/dist/index.esm2017.js"() {
    init_index_esm20174();
    init_index_esm20172();
    init_index_esm20173();
    init_index_esm2017();
    init_index_esm20175();
    S2 = "@firebase/firestore";
    User = class {
      constructor(e) {
        this.uid = e;
      }
      isAuthenticated() {
        return null != this.uid;
      }
      /**
       * Returns a key representing this user, suitable for inclusion in a
       * dictionary.
       */
      toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
      }
      isEqual(e) {
        return e.uid === this.uid;
      }
    };
    User.UNAUTHENTICATED = new User(null), // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    User.GOOGLE_CREDENTIALS = new User("google-credentials-uid"), User.FIRST_PARTY = new User("first-party-uid"), User.MOCK_USER = new User("mock-user");
    b = "10.5.2";
    D2 = new Logger("@firebase/firestore");
    C2 = {
      // Causes are copied from:
      // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
      /** Not an error; returned on success. */
      OK: "ok",
      /** The operation was cancelled (typically by the caller). */
      CANCELLED: "cancelled",
      /** Unknown error or an error from a different error domain. */
      UNKNOWN: "unknown",
      /**
       * Client specified an invalid argument. Note that this differs from
       * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
       * problematic regardless of the state of the system (e.g., a malformed file
       * name).
       */
      INVALID_ARGUMENT: "invalid-argument",
      /**
       * Deadline expired before operation could complete. For operations that
       * change the state of the system, this error may be returned even if the
       * operation has completed successfully. For example, a successful response
       * from a server could have been delayed long enough for the deadline to
       * expire.
       */
      DEADLINE_EXCEEDED: "deadline-exceeded",
      /** Some requested entity (e.g., file or directory) was not found. */
      NOT_FOUND: "not-found",
      /**
       * Some entity that we attempted to create (e.g., file or directory) already
       * exists.
       */
      ALREADY_EXISTS: "already-exists",
      /**
       * The caller does not have permission to execute the specified operation.
       * PERMISSION_DENIED must not be used for rejections caused by exhausting
       * some resource (use RESOURCE_EXHAUSTED instead for those errors).
       * PERMISSION_DENIED must not be used if the caller can not be identified
       * (use UNAUTHENTICATED instead for those errors).
       */
      PERMISSION_DENIED: "permission-denied",
      /**
       * The request does not have valid authentication credentials for the
       * operation.
       */
      UNAUTHENTICATED: "unauthenticated",
      /**
       * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
       * entire file system is out of space.
       */
      RESOURCE_EXHAUSTED: "resource-exhausted",
      /**
       * Operation was rejected because the system is not in a state required for
       * the operation's execution. For example, directory to be deleted may be
       * non-empty, an rmdir operation is applied to a non-directory, etc.
       *
       * A litmus test that may help a service implementor in deciding
       * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
       *  (a) Use UNAVAILABLE if the client can retry just the failing call.
       *  (b) Use ABORTED if the client should retry at a higher-level
       *      (e.g., restarting a read-modify-write sequence).
       *  (c) Use FAILED_PRECONDITION if the client should not retry until
       *      the system state has been explicitly fixed. E.g., if an "rmdir"
       *      fails because the directory is non-empty, FAILED_PRECONDITION
       *      should be returned since the client should not retry unless
       *      they have first fixed up the directory by deleting files from it.
       *  (d) Use FAILED_PRECONDITION if the client performs conditional
       *      REST Get/Update/Delete on a resource and the resource on the
       *      server does not match the condition. E.g., conflicting
       *      read-modify-write on the same resource.
       */
      FAILED_PRECONDITION: "failed-precondition",
      /**
       * The operation was aborted, typically due to a concurrency issue like
       * sequencer check failures, transaction aborts, etc.
       *
       * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
       * and UNAVAILABLE.
       */
      ABORTED: "aborted",
      /**
       * Operation was attempted past the valid range. E.g., seeking or reading
       * past end of file.
       *
       * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
       * if the system state changes. For example, a 32-bit file system will
       * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
       * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
       * an offset past the current file size.
       *
       * There is a fair bit of overlap between FAILED_PRECONDITION and
       * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
       * when it applies so that callers who are iterating through a space can
       * easily look for an OUT_OF_RANGE error to detect when they are done.
       */
      OUT_OF_RANGE: "out-of-range",
      /** Operation is not implemented or not supported/enabled in this service. */
      UNIMPLEMENTED: "unimplemented",
      /**
       * Internal errors. Means some invariants expected by underlying System has
       * been broken. If you see one of these errors, Something is very broken.
       */
      INTERNAL: "internal",
      /**
       * The service is currently unavailable. This is a most likely a transient
       * condition and may be corrected by retrying with a backoff.
       *
       * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
       * and UNAVAILABLE.
       */
      UNAVAILABLE: "unavailable",
      /** Unrecoverable data loss or corruption. */
      DATA_LOSS: "data-loss"
    };
    FirestoreError = class extends FirebaseError {
      /** @hideconstructor */
      constructor(e, t) {
        super(e, t), this.code = e, this.message = t, // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
      }
    };
    __PRIVATE_Deferred = class {
      constructor() {
        this.promise = new Promise((e, t) => {
          this.resolve = e, this.reject = t;
        });
      }
    };
    __PRIVATE_OAuthToken = class {
      constructor(e, t) {
        this.user = t, this.type = "OAuth", this.headers = /* @__PURE__ */ new Map(), this.headers.set("Authorization", `Bearer ${e}`);
      }
    };
    __PRIVATE_EmptyAuthCredentialsProvider = class {
      getToken() {
        return Promise.resolve(null);
      }
      invalidateToken() {
      }
      start(e, t) {
        e.enqueueRetryable(() => t(User.UNAUTHENTICATED));
      }
      shutdown() {
      }
    };
    __PRIVATE_EmulatorAuthCredentialsProvider = class {
      constructor(e) {
        this.token = e, /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
      }
      getToken() {
        return Promise.resolve(this.token);
      }
      invalidateToken() {
      }
      start(e, t) {
        this.changeListener = t, // Fire with initial user.
        e.enqueueRetryable(() => t(this.token.user));
      }
      shutdown() {
        this.changeListener = null;
      }
    };
    __PRIVATE_FirebaseAuthCredentialsProvider = class {
      constructor(e) {
        this.t = e, /** Tracks the current User. */
        this.currentUser = User.UNAUTHENTICATED, /**
         * Counter used to detect if the token changed while a getToken request was
         * outstanding.
         */
        this.i = 0, this.forceRefresh = false, this.auth = null;
      }
      start(e, t) {
        let n = this.i;
        const __PRIVATE_guardedChangeListener = (e2) => this.i !== n ? (n = this.i, t(e2)) : Promise.resolve();
        let r2 = new __PRIVATE_Deferred();
        this.o = () => {
          this.i++, this.currentUser = this.u(), r2.resolve(), r2 = new __PRIVATE_Deferred(), e.enqueueRetryable(() => __PRIVATE_guardedChangeListener(this.currentUser));
        };
        const __PRIVATE_awaitNextToken = () => {
          const t2 = r2;
          e.enqueueRetryable(async () => {
            await t2.promise, await __PRIVATE_guardedChangeListener(this.currentUser);
          });
        }, __PRIVATE_registerAuth = (e2) => {
          __PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = e2, this.auth.addAuthTokenListener(this.o), __PRIVATE_awaitNextToken();
        };
        this.t.onInit((e2) => __PRIVATE_registerAuth(e2)), // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout(() => {
          if (!this.auth) {
            const e2 = this.t.getImmediate({
              optional: true
            });
            e2 ? __PRIVATE_registerAuth(e2) : (
              // If auth is still not available, proceed with `null` user
              (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "Auth not yet detected"), r2.resolve(), r2 = new __PRIVATE_Deferred())
            );
          }
        }, 0), __PRIVATE_awaitNextToken();
      }
      getToken() {
        const e = this.i, t = this.forceRefresh;
        return this.forceRefresh = false, this.auth ? this.auth.getToken(t).then((t2) => (
          // Cancel the request since the token changed while the request was
          // outstanding so the response is potentially for a previous user (which
          // user, we can't be sure).
          this.i !== e ? (__PRIVATE_logDebug("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : t2 ? (__PRIVATE_hardAssert("string" == typeof t2.accessToken), new __PRIVATE_OAuthToken(t2.accessToken, this.currentUser)) : null
        )) : Promise.resolve(null);
      }
      invalidateToken() {
        this.forceRefresh = true;
      }
      shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
      }
      // Auth.getUid() can return null even with a user logged in. It is because
      // getUid() is synchronous, but the auth code populating Uid is asynchronous.
      // This method should only be called in the AuthTokenListener callback
      // to guarantee to get the actual user.
      u() {
        const e = this.auth && this.auth.getUid();
        return __PRIVATE_hardAssert(null === e || "string" == typeof e), new User(e);
      }
    };
    __PRIVATE_FirstPartyToken = class {
      constructor(e, t, n) {
        this.l = e, this.h = t, this.P = n, this.type = "FirstParty", this.user = User.FIRST_PARTY, this.I = /* @__PURE__ */ new Map();
      }
      /**
       * Gets an authorization token, using a provided factory function, or return
       * null.
       */
      T() {
        return this.P ? this.P() : null;
      }
      get headers() {
        this.I.set("X-Goog-AuthUser", this.l);
        const e = this.T();
        return e && this.I.set("Authorization", e), this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h), this.I;
      }
    };
    __PRIVATE_FirstPartyAuthCredentialsProvider = class {
      constructor(e, t, n) {
        this.l = e, this.h = t, this.P = n;
      }
      getToken() {
        return Promise.resolve(new __PRIVATE_FirstPartyToken(this.l, this.h, this.P));
      }
      start(e, t) {
        e.enqueueRetryable(() => t(User.FIRST_PARTY));
      }
      shutdown() {
      }
      invalidateToken() {
      }
    };
    AppCheckToken = class {
      constructor(e) {
        this.value = e, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
      }
    };
    __PRIVATE_FirebaseAppCheckTokenProvider = class {
      constructor(e) {
        this.A = e, this.forceRefresh = false, this.appCheck = null, this.R = null;
      }
      start(e, t) {
        const onTokenChanged = (e2) => {
          null != e2.error && __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${e2.error.message}`);
          const n = e2.token !== this.R;
          return this.R = e2.token, __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), n ? t(e2.token) : Promise.resolve();
        };
        this.o = (t2) => {
          e.enqueueRetryable(() => onTokenChanged(t2));
        };
        const __PRIVATE_registerAppCheck = (e2) => {
          __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = e2, this.appCheck.addTokenListener(this.o);
        };
        this.A.onInit((e2) => __PRIVATE_registerAppCheck(e2)), // Our users can initialize AppCheck after Firestore, so we give it
        // a chance to register itself with the component framework.
        setTimeout(() => {
          if (!this.appCheck) {
            const e2 = this.A.getImmediate({
              optional: true
            });
            e2 ? __PRIVATE_registerAppCheck(e2) : (
              // If AppCheck is still not available, proceed without it.
              __PRIVATE_logDebug("FirebaseAppCheckTokenProvider", "AppCheck not yet detected")
            );
          }
        }, 0);
      }
      getToken() {
        const e = this.forceRefresh;
        return this.forceRefresh = false, this.appCheck ? this.appCheck.getToken(e).then((e2) => e2 ? (__PRIVATE_hardAssert("string" == typeof e2.token), this.R = e2.token, new AppCheckToken(e2.token)) : null) : Promise.resolve(null);
      }
      invalidateToken() {
        this.forceRefresh = true;
      }
      shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
      }
    };
    __PRIVATE_AutoId = class {
      static newId() {
        const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = Math.floor(256 / e.length) * e.length;
        let n = "";
        for (; n.length < 20; ) {
          const r2 = __PRIVATE_randomBytes(40);
          for (let i = 0; i < r2.length; ++i)
            n.length < 20 && r2[i] < t && (n += e.charAt(r2[i] % e.length));
        }
        return n;
      }
    };
    Timestamp = class _Timestamp {
      /**
       * Creates a new timestamp.
       *
       * @param seconds - The number of seconds of UTC time since Unix epoch
       *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
       *     9999-12-31T23:59:59Z inclusive.
       * @param nanoseconds - The non-negative fractions of a second at nanosecond
       *     resolution. Negative second values with fractions must still have
       *     non-negative nanoseconds values that count forward in time. Must be
       *     from 0 to 999,999,999 inclusive.
       */
      constructor(e, t) {
        if (this.seconds = e, this.nanoseconds = t, t < 0)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
        if (t >= 1e9)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
        if (e < -62135596800)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
        if (e >= 253402300800)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
      }
      /**
       * Creates a new timestamp with the current date, with millisecond precision.
       *
       * @returns a new timestamp representing the current date.
       */
      static now() {
        return _Timestamp.fromMillis(Date.now());
      }
      /**
       * Creates a new timestamp from the given date.
       *
       * @param date - The date to initialize the `Timestamp` from.
       * @returns A new `Timestamp` representing the same point in time as the given
       *     date.
       */
      static fromDate(e) {
        return _Timestamp.fromMillis(e.getTime());
      }
      /**
       * Creates a new timestamp from the given number of milliseconds.
       *
       * @param milliseconds - Number of milliseconds since Unix epoch
       *     1970-01-01T00:00:00Z.
       * @returns A new `Timestamp` representing the same point in time as the given
       *     number of milliseconds.
       */
      static fromMillis(e) {
        const t = Math.floor(e / 1e3), n = Math.floor(1e6 * (e - 1e3 * t));
        return new _Timestamp(t, n);
      }
      /**
       * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
       * causes a loss of precision since `Date` objects only support millisecond
       * precision.
       *
       * @returns JavaScript `Date` object representing the same point in time as
       *     this `Timestamp`, with millisecond precision.
       */
      toDate() {
        return new Date(this.toMillis());
      }
      /**
       * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
       * epoch). This operation causes a loss of precision.
       *
       * @returns The point in time corresponding to this timestamp, represented as
       *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
       */
      toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
      }
      _compareTo(e) {
        return this.seconds === e.seconds ? __PRIVATE_primitiveComparator(this.nanoseconds, e.nanoseconds) : __PRIVATE_primitiveComparator(this.seconds, e.seconds);
      }
      /**
       * Returns true if this `Timestamp` is equal to the provided one.
       *
       * @param other - The `Timestamp` to compare against.
       * @returns true if this `Timestamp` is equal to the provided one.
       */
      isEqual(e) {
        return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
      }
      /** Returns a textual representation of this `Timestamp`. */
      toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
      }
      /** Returns a JSON-serializable representation of this `Timestamp`. */
      toJSON() {
        return {
          seconds: this.seconds,
          nanoseconds: this.nanoseconds
        };
      }
      /**
       * Converts this object to a primitive string, which allows `Timestamp` objects
       * to be compared using the `>`, `<=`, `>=` and `>` operators.
       */
      valueOf() {
        const e = this.seconds - -62135596800;
        return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
      }
    };
    SnapshotVersion = class _SnapshotVersion {
      constructor(e) {
        this.timestamp = e;
      }
      static fromTimestamp(e) {
        return new _SnapshotVersion(e);
      }
      static min() {
        return new _SnapshotVersion(new Timestamp(0, 0));
      }
      static max() {
        return new _SnapshotVersion(new Timestamp(253402300799, 999999999));
      }
      compareTo(e) {
        return this.timestamp._compareTo(e.timestamp);
      }
      isEqual(e) {
        return this.timestamp.isEqual(e.timestamp);
      }
      /** Returns a number representation of the version for use in spec tests. */
      toMicroseconds() {
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
      }
      toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
      }
      toTimestamp() {
        return this.timestamp;
      }
    };
    BasePath = class _BasePath {
      constructor(e, t, n) {
        void 0 === t ? t = 0 : t > e.length && fail(), void 0 === n ? n = e.length - t : n > e.length - t && fail(), this.segments = e, this.offset = t, this.len = n;
      }
      get length() {
        return this.len;
      }
      isEqual(e) {
        return 0 === _BasePath.comparator(this, e);
      }
      child(e) {
        const t = this.segments.slice(this.offset, this.limit());
        return e instanceof _BasePath ? e.forEach((e2) => {
          t.push(e2);
        }) : t.push(e), this.construct(t);
      }
      /** The index of one past the last segment of the path. */
      limit() {
        return this.offset + this.length;
      }
      popFirst(e) {
        return e = void 0 === e ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e);
      }
      popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
      }
      firstSegment() {
        return this.segments[this.offset];
      }
      lastSegment() {
        return this.get(this.length - 1);
      }
      get(e) {
        return this.segments[this.offset + e];
      }
      isEmpty() {
        return 0 === this.length;
      }
      isPrefixOf(e) {
        if (e.length < this.length)
          return false;
        for (let t = 0; t < this.length; t++)
          if (this.get(t) !== e.get(t))
            return false;
        return true;
      }
      isImmediateParentOf(e) {
        if (this.length + 1 !== e.length)
          return false;
        for (let t = 0; t < this.length; t++)
          if (this.get(t) !== e.get(t))
            return false;
        return true;
      }
      forEach(e) {
        for (let t = this.offset, n = this.limit(); t < n; t++)
          e(this.segments[t]);
      }
      toArray() {
        return this.segments.slice(this.offset, this.limit());
      }
      static comparator(e, t) {
        const n = Math.min(e.length, t.length);
        for (let r2 = 0; r2 < n; r2++) {
          const n2 = e.get(r2), i = t.get(r2);
          if (n2 < i)
            return -1;
          if (n2 > i)
            return 1;
        }
        return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
      }
    };
    ResourcePath = class _ResourcePath extends BasePath {
      construct(e, t, n) {
        return new _ResourcePath(e, t, n);
      }
      canonicalString() {
        return this.toArray().join("/");
      }
      toString() {
        return this.canonicalString();
      }
      /**
       * Creates a resource path from the given slash-delimited string. If multiple
       * arguments are provided, all components are combined. Leading and trailing
       * slashes from all components are ignored.
       */
      static fromString(...e) {
        const t = [];
        for (const n of e) {
          if (n.indexOf("//") >= 0)
            throw new FirestoreError(C2.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
          t.push(...n.split("/").filter((e2) => e2.length > 0));
        }
        return new _ResourcePath(t);
      }
      static emptyPath() {
        return new _ResourcePath([]);
      }
    };
    v2 = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
    FieldPath$1 = class _FieldPath$1 extends BasePath {
      construct(e, t, n) {
        return new _FieldPath$1(e, t, n);
      }
      /**
       * Returns true if the string could be used as a segment in a field path
       * without escaping.
       */
      static isValidIdentifier(e) {
        return v2.test(e);
      }
      canonicalString() {
        return this.toArray().map((e) => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), _FieldPath$1.isValidIdentifier(e) || (e = "`" + e + "`"), e)).join(".");
      }
      toString() {
        return this.canonicalString();
      }
      /**
       * Returns true if this field references the key of a document.
       */
      isKeyField() {
        return 1 === this.length && "__name__" === this.get(0);
      }
      /**
       * The field designating the key of a document.
       */
      static keyField() {
        return new _FieldPath$1(["__name__"]);
      }
      /**
       * Parses a field string from the given server-formatted string.
       *
       * - Splitting the empty string is not allowed (for now at least).
       * - Empty segments within the string (e.g. if there are two consecutive
       *   separators) are not allowed.
       *
       * TODO(b/37244157): we should make this more strict. Right now, it allows
       * non-identifier path components, even if they aren't escaped.
       */
      static fromServerFormat(e) {
        const t = [];
        let n = "", r2 = 0;
        const __PRIVATE_addCurrentSegment = () => {
          if (0 === n.length)
            throw new FirestoreError(C2.INVALID_ARGUMENT, `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
          t.push(n), n = "";
        };
        let i = false;
        for (; r2 < e.length; ) {
          const t2 = e[r2];
          if ("\\" === t2) {
            if (r2 + 1 === e.length)
              throw new FirestoreError(C2.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
            const t3 = e[r2 + 1];
            if ("\\" !== t3 && "." !== t3 && "`" !== t3)
              throw new FirestoreError(C2.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
            n += t3, r2 += 2;
          } else
            "`" === t2 ? (i = !i, r2++) : "." !== t2 || i ? (n += t2, r2++) : (__PRIVATE_addCurrentSegment(), r2++);
        }
        if (__PRIVATE_addCurrentSegment(), i)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
        return new _FieldPath$1(t);
      }
      static emptyPath() {
        return new _FieldPath$1([]);
      }
    };
    DocumentKey = class _DocumentKey {
      constructor(e) {
        this.path = e;
      }
      static fromPath(e) {
        return new _DocumentKey(ResourcePath.fromString(e));
      }
      static fromName(e) {
        return new _DocumentKey(ResourcePath.fromString(e).popFirst(5));
      }
      static empty() {
        return new _DocumentKey(ResourcePath.emptyPath());
      }
      get collectionGroup() {
        return this.path.popLast().lastSegment();
      }
      /** Returns true if the document is in the specified collectionId. */
      hasCollectionId(e) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
      }
      /** Returns the collection group (i.e. the name of the parent collection) for this key. */
      getCollectionGroup() {
        return this.path.get(this.path.length - 2);
      }
      /** Returns the fully qualified path to the parent collection. */
      getCollectionPath() {
        return this.path.popLast();
      }
      isEqual(e) {
        return null !== e && 0 === ResourcePath.comparator(this.path, e.path);
      }
      toString() {
        return this.path.toString();
      }
      static comparator(e, t) {
        return ResourcePath.comparator(e.path, t.path);
      }
      static isDocumentKey(e) {
        return e.length % 2 == 0;
      }
      /**
       * Creates and returns a new document key with the given segments.
       *
       * @param segments - The segments of the path to the document
       * @returns A new instance of DocumentKey
       */
      static fromSegments(e) {
        return new _DocumentKey(new ResourcePath(e.slice()));
      }
    };
    FieldIndex = class {
      constructor(e, t, n, r2) {
        this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r2;
      }
    };
    FieldIndex.UNKNOWN_ID = -1;
    IndexOffset = class _IndexOffset {
      constructor(e, t, n) {
        this.readTime = e, this.documentKey = t, this.largestBatchId = n;
      }
      /** Returns an offset that sorts before all regular offsets. */
      static min() {
        return new _IndexOffset(SnapshotVersion.min(), DocumentKey.empty(), -1);
      }
      /** Returns an offset that sorts after all regular offsets. */
      static max() {
        return new _IndexOffset(SnapshotVersion.max(), DocumentKey.empty(), -1);
      }
    };
    F2 = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
    PersistenceTransaction = class {
      constructor() {
        this.onCommittedListeners = [];
      }
      addOnCommittedListener(e) {
        this.onCommittedListeners.push(e);
      }
      raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach((e) => e());
      }
    };
    PersistencePromise = class _PersistencePromise {
      constructor(e) {
        this.nextCallback = null, this.catchCallback = null, // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.isDone = false, // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = false, e((e2) => {
          this.isDone = true, this.result = e2, this.nextCallback && // value should be defined unless T is Void, but we can't express
          // that in the type system.
          this.nextCallback(e2);
        }, (e2) => {
          this.isDone = true, this.error = e2, this.catchCallback && this.catchCallback(e2);
        });
      }
      catch(e) {
        return this.next(void 0, e);
      }
      next(e, t) {
        return this.callbackAttached && fail(), this.callbackAttached = true, this.isDone ? this.error ? this.wrapFailure(t, this.error) : this.wrapSuccess(e, this.result) : new _PersistencePromise((n, r2) => {
          this.nextCallback = (t2) => {
            this.wrapSuccess(e, t2).next(n, r2);
          }, this.catchCallback = (e2) => {
            this.wrapFailure(t, e2).next(n, r2);
          };
        });
      }
      toPromise() {
        return new Promise((e, t) => {
          this.next(e, t);
        });
      }
      wrapUserFunction(e) {
        try {
          const t = e();
          return t instanceof _PersistencePromise ? t : _PersistencePromise.resolve(t);
        } catch (e2) {
          return _PersistencePromise.reject(e2);
        }
      }
      wrapSuccess(e, t) {
        return e ? this.wrapUserFunction(() => e(t)) : _PersistencePromise.resolve(t);
      }
      wrapFailure(e, t) {
        return e ? this.wrapUserFunction(() => e(t)) : _PersistencePromise.reject(t);
      }
      static resolve(e) {
        return new _PersistencePromise((t, n) => {
          t(e);
        });
      }
      static reject(e) {
        return new _PersistencePromise((t, n) => {
          n(e);
        });
      }
      static waitFor(e) {
        return new _PersistencePromise((t, n) => {
          let r2 = 0, i = 0, s2 = false;
          e.forEach((e2) => {
            ++r2, e2.next(() => {
              ++i, s2 && i === r2 && t();
            }, (e3) => n(e3));
          }), s2 = true, i === r2 && t();
        });
      }
      /**
       * Given an array of predicate functions that asynchronously evaluate to a
       * boolean, implements a short-circuiting `or` between the results. Predicates
       * will be evaluated until one of them returns `true`, then stop. The final
       * result will be whether any of them returned `true`.
       */
      static or(e) {
        let t = _PersistencePromise.resolve(false);
        for (const n of e)
          t = t.next((e2) => e2 ? _PersistencePromise.resolve(e2) : n());
        return t;
      }
      static forEach(e, t) {
        const n = [];
        return e.forEach((e2, r2) => {
          n.push(t.call(this, e2, r2));
        }), this.waitFor(n);
      }
      /**
       * Concurrently map all array elements through asynchronous function.
       */
      static mapArray(e, t) {
        return new _PersistencePromise((n, r2) => {
          const i = e.length, s2 = new Array(i);
          let o = 0;
          for (let _ = 0; _ < i; _++) {
            const a = _;
            t(e[a]).next((e2) => {
              s2[a] = e2, ++o, o === i && n(s2);
            }, (e2) => r2(e2));
          }
        });
      }
      /**
       * An alternative to recursive PersistencePromise calls, that avoids
       * potential memory problems from unbounded chains of promises.
       *
       * The `action` will be called repeatedly while `condition` is true.
       */
      static doWhile(e, t) {
        return new _PersistencePromise((n, r2) => {
          const process2 = () => {
            true === e() ? t().next(() => {
              process2();
            }, r2) : n();
          };
          process2();
        });
      }
    };
    __PRIVATE_ListenSequence = class {
      constructor(e, t) {
        this.previousValue = e, t && (t.sequenceNumberHandler = (e2) => this.se(e2), this.oe = (e2) => t.writeSequenceNumber(e2));
      }
      se(e) {
        return this.previousValue = Math.max(e, this.previousValue), this.previousValue;
      }
      next() {
        const e = ++this.previousValue;
        return this.oe && this.oe(e), e;
      }
    };
    __PRIVATE_ListenSequence._e = -1;
    J2 = [...[...[...[...["mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments"], "clientMetadata"], "remoteDocumentGlobal"], "collectionParents"], "bundles", "namedQueries"];
    Y2 = [...J2, "documentOverlays"];
    Z2 = ["mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays"];
    X2 = Z2;
    ee = [...X2, "indexConfiguration", "indexState", "indexEntries"];
    SortedMap = class _SortedMap {
      constructor(e, t) {
        this.comparator = e, this.root = t || LLRBNode.EMPTY;
      }
      // Returns a copy of the map, with the specified key/value added or replaced.
      insert(e, t) {
        return new _SortedMap(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
      }
      // Returns a copy of the map, with the specified key removed.
      remove(e) {
        return new _SortedMap(this.comparator, this.root.remove(e, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
      }
      // Returns the value of the node with the given key, or null.
      get(e) {
        let t = this.root;
        for (; !t.isEmpty(); ) {
          const n = this.comparator(e, t.key);
          if (0 === n)
            return t.value;
          n < 0 ? t = t.left : n > 0 && (t = t.right);
        }
        return null;
      }
      // Returns the index of the element in this sorted map, or -1 if it doesn't
      // exist.
      indexOf(e) {
        let t = 0, n = this.root;
        for (; !n.isEmpty(); ) {
          const r2 = this.comparator(e, n.key);
          if (0 === r2)
            return t + n.left.size;
          r2 < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            (t += n.left.size + 1, n = n.right)
          );
        }
        return -1;
      }
      isEmpty() {
        return this.root.isEmpty();
      }
      // Returns the total number of nodes in the map.
      get size() {
        return this.root.size;
      }
      // Returns the minimum key in the map.
      minKey() {
        return this.root.minKey();
      }
      // Returns the maximum key in the map.
      maxKey() {
        return this.root.maxKey();
      }
      // Traverses the map in key order and calls the specified action function
      // for each key/value pair. If action returns true, traversal is aborted.
      // Returns the first truthy value returned by action, or the last falsey
      // value returned by action.
      inorderTraversal(e) {
        return this.root.inorderTraversal(e);
      }
      forEach(e) {
        this.inorderTraversal((t, n) => (e(t, n), false));
      }
      toString() {
        const e = [];
        return this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), false)), `{${e.join(", ")}}`;
      }
      // Traverses the map in reverse key order and calls the specified action
      // function for each key/value pair. If action returns true, traversal is
      // aborted.
      // Returns the first truthy value returned by action, or the last falsey
      // value returned by action.
      reverseTraversal(e) {
        return this.root.reverseTraversal(e);
      }
      // Returns an iterator over the SortedMap.
      getIterator() {
        return new SortedMapIterator(this.root, null, this.comparator, false);
      }
      getIteratorFrom(e) {
        return new SortedMapIterator(this.root, e, this.comparator, false);
      }
      getReverseIterator() {
        return new SortedMapIterator(this.root, null, this.comparator, true);
      }
      getReverseIteratorFrom(e) {
        return new SortedMapIterator(this.root, e, this.comparator, true);
      }
    };
    SortedMapIterator = class {
      constructor(e, t, n, r2) {
        this.isReverse = r2, this.nodeStack = [];
        let i = 1;
        for (; !e.isEmpty(); )
          if (i = t ? n(e.key, t) : 1, // flip the comparison if we're going in reverse
          t && r2 && (i *= -1), i < 0)
            e = this.isReverse ? e.left : e.right;
          else {
            if (0 === i) {
              this.nodeStack.push(e);
              break;
            }
            this.nodeStack.push(e), e = this.isReverse ? e.right : e.left;
          }
      }
      getNext() {
        let e = this.nodeStack.pop();
        const t = {
          key: e.key,
          value: e.value
        };
        if (this.isReverse)
          for (e = e.left; !e.isEmpty(); )
            this.nodeStack.push(e), e = e.right;
        else
          for (e = e.right; !e.isEmpty(); )
            this.nodeStack.push(e), e = e.left;
        return t;
      }
      hasNext() {
        return this.nodeStack.length > 0;
      }
      peek() {
        if (0 === this.nodeStack.length)
          return null;
        const e = this.nodeStack[this.nodeStack.length - 1];
        return {
          key: e.key,
          value: e.value
        };
      }
    };
    LLRBNode = class _LLRBNode {
      constructor(e, t, n, r2, i) {
        this.key = e, this.value = t, this.color = null != n ? n : _LLRBNode.RED, this.left = null != r2 ? r2 : _LLRBNode.EMPTY, this.right = null != i ? i : _LLRBNode.EMPTY, this.size = this.left.size + 1 + this.right.size;
      }
      // Returns a copy of the current node, optionally replacing pieces of it.
      copy(e, t, n, r2, i) {
        return new _LLRBNode(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != r2 ? r2 : this.left, null != i ? i : this.right);
      }
      isEmpty() {
        return false;
      }
      // Traverses the tree in key order and calls the specified action function
      // for each node. If action returns true, traversal is aborted.
      // Returns the first truthy value returned by action, or the last falsey
      // value returned by action.
      inorderTraversal(e) {
        return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e);
      }
      // Traverses the tree in reverse key order and calls the specified action
      // function for each node. If action returns true, traversal is aborted.
      // Returns the first truthy value returned by action, or the last falsey
      // value returned by action.
      reverseTraversal(e) {
        return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
      }
      // Returns the minimum node in the tree.
      min() {
        return this.left.isEmpty() ? this : this.left.min();
      }
      // Returns the maximum key in the tree.
      minKey() {
        return this.min().key;
      }
      // Returns the maximum key in the tree.
      maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
      }
      // Returns new tree, with the key/value added.
      insert(e, t, n) {
        let r2 = this;
        const i = n(e, r2.key);
        return r2 = i < 0 ? r2.copy(null, null, null, r2.left.insert(e, t, n), null) : 0 === i ? r2.copy(null, t, null, null, null) : r2.copy(null, null, null, null, r2.right.insert(e, t, n)), r2.fixUp();
      }
      removeMin() {
        if (this.left.isEmpty())
          return _LLRBNode.EMPTY;
        let e = this;
        return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp();
      }
      // Returns new tree, with the specified item removed.
      remove(e, t) {
        let n, r2 = this;
        if (t(e, r2.key) < 0)
          r2.left.isEmpty() || r2.left.isRed() || r2.left.left.isRed() || (r2 = r2.moveRedLeft()), r2 = r2.copy(null, null, null, r2.left.remove(e, t), null);
        else {
          if (r2.left.isRed() && (r2 = r2.rotateRight()), r2.right.isEmpty() || r2.right.isRed() || r2.right.left.isRed() || (r2 = r2.moveRedRight()), 0 === t(e, r2.key)) {
            if (r2.right.isEmpty())
              return _LLRBNode.EMPTY;
            n = r2.right.min(), r2 = r2.copy(n.key, n.value, null, null, r2.right.removeMin());
          }
          r2 = r2.copy(null, null, null, null, r2.right.remove(e, t));
        }
        return r2.fixUp();
      }
      isRed() {
        return this.color;
      }
      // Returns new tree after performing any needed rotations.
      fixUp() {
        let e = this;
        return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e;
      }
      moveRedLeft() {
        let e = this.colorFlip();
        return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e;
      }
      moveRedRight() {
        let e = this.colorFlip();
        return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e;
      }
      rotateLeft() {
        const e = this.copy(null, null, _LLRBNode.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
      }
      rotateRight() {
        const e = this.copy(null, null, _LLRBNode.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
      }
      colorFlip() {
        const e = this.left.copy(null, null, !this.left.color, null, null), t = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, e, t);
      }
      // For testing.
      checkMaxDepth() {
        const e = this.check();
        return Math.pow(2, e) <= this.size + 1;
      }
      // In a balanced RB tree, the black-depth (number of black nodes) from root to
      // leaves is equal on both sides.  This function verifies that or asserts.
      check() {
        if (this.isRed() && this.left.isRed())
          throw fail();
        if (this.right.isRed())
          throw fail();
        const e = this.left.check();
        if (e !== this.right.check())
          throw fail();
        return e + (this.isRed() ? 0 : 1);
      }
    };
    LLRBNode.EMPTY = null, LLRBNode.RED = true, LLRBNode.BLACK = false;
    LLRBNode.EMPTY = new // Represents an empty node (a leaf node in the Red-Black Tree).
    class LLRBEmptyNode {
      constructor() {
        this.size = 0;
      }
      get key() {
        throw fail();
      }
      get value() {
        throw fail();
      }
      get color() {
        throw fail();
      }
      get left() {
        throw fail();
      }
      get right() {
        throw fail();
      }
      // Returns a copy of the current node.
      copy(e, t, n, r2, i) {
        return this;
      }
      // Returns a copy of the tree, with the specified key/value added.
      insert(e, t, n) {
        return new LLRBNode(e, t);
      }
      // Returns a copy of the tree, with the specified key removed.
      remove(e, t) {
        return this;
      }
      isEmpty() {
        return true;
      }
      inorderTraversal(e) {
        return false;
      }
      reverseTraversal(e) {
        return false;
      }
      minKey() {
        return null;
      }
      maxKey() {
        return null;
      }
      isRed() {
        return false;
      }
      // For testing.
      checkMaxDepth() {
        return true;
      }
      check() {
        return 0;
      }
    }();
    SortedSet = class _SortedSet {
      constructor(e) {
        this.comparator = e, this.data = new SortedMap(this.comparator);
      }
      has(e) {
        return null !== this.data.get(e);
      }
      first() {
        return this.data.minKey();
      }
      last() {
        return this.data.maxKey();
      }
      get size() {
        return this.data.size;
      }
      indexOf(e) {
        return this.data.indexOf(e);
      }
      /** Iterates elements in order defined by "comparator" */
      forEach(e) {
        this.data.inorderTraversal((t, n) => (e(t), false));
      }
      /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */
      forEachInRange(e, t) {
        const n = this.data.getIteratorFrom(e[0]);
        for (; n.hasNext(); ) {
          const r2 = n.getNext();
          if (this.comparator(r2.key, e[1]) >= 0)
            return;
          t(r2.key);
        }
      }
      /**
       * Iterates over `elem`s such that: start &lt;= elem until false is returned.
       */
      forEachWhile(e, t) {
        let n;
        for (n = void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext(); ) {
          if (!e(n.getNext().key))
            return;
        }
      }
      /** Finds the least element greater than or equal to `elem`. */
      firstAfterOrEqual(e) {
        const t = this.data.getIteratorFrom(e);
        return t.hasNext() ? t.getNext().key : null;
      }
      getIterator() {
        return new SortedSetIterator(this.data.getIterator());
      }
      getIteratorFrom(e) {
        return new SortedSetIterator(this.data.getIteratorFrom(e));
      }
      /** Inserts or updates an element */
      add(e) {
        return this.copy(this.data.remove(e).insert(e, true));
      }
      /** Deletes an element */
      delete(e) {
        return this.has(e) ? this.copy(this.data.remove(e)) : this;
      }
      isEmpty() {
        return this.data.isEmpty();
      }
      unionWith(e) {
        let t = this;
        return t.size < e.size && (t = e, e = this), e.forEach((e2) => {
          t = t.add(e2);
        }), t;
      }
      isEqual(e) {
        if (!(e instanceof _SortedSet))
          return false;
        if (this.size !== e.size)
          return false;
        const t = this.data.getIterator(), n = e.data.getIterator();
        for (; t.hasNext(); ) {
          const e2 = t.getNext().key, r2 = n.getNext().key;
          if (0 !== this.comparator(e2, r2))
            return false;
        }
        return true;
      }
      toArray() {
        const e = [];
        return this.forEach((t) => {
          e.push(t);
        }), e;
      }
      toString() {
        const e = [];
        return this.forEach((t) => e.push(t)), "SortedSet(" + e.toString() + ")";
      }
      copy(e) {
        const t = new _SortedSet(this.comparator);
        return t.data = e, t;
      }
    };
    SortedSetIterator = class {
      constructor(e) {
        this.iter = e;
      }
      getNext() {
        return this.iter.getNext().key;
      }
      hasNext() {
        return this.iter.hasNext();
      }
    };
    FieldMask = class _FieldMask {
      constructor(e) {
        this.fields = e, // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        e.sort(FieldPath$1.comparator);
      }
      static empty() {
        return new _FieldMask([]);
      }
      /**
       * Returns a new FieldMask object that is the result of adding all the given
       * fields paths to this field mask.
       */
      unionWith(e) {
        let t = new SortedSet(FieldPath$1.comparator);
        for (const e2 of this.fields)
          t = t.add(e2);
        for (const n of e)
          t = t.add(n);
        return new _FieldMask(t.toArray());
      }
      /**
       * Verifies that `fieldPath` is included by at least one field in this field
       * mask.
       *
       * This is an O(n) operation, where `n` is the size of the field mask.
       */
      covers(e) {
        for (const t of this.fields)
          if (t.isPrefixOf(e))
            return true;
        return false;
      }
      isEqual(e) {
        return __PRIVATE_arrayEquals(this.fields, e.fields, (e2, t) => e2.isEqual(t));
      }
    };
    __PRIVATE_Base64DecodeError = class extends Error {
      constructor() {
        super(...arguments), this.name = "Base64DecodeError";
      }
    };
    ByteString = class _ByteString {
      constructor(e) {
        this.binaryString = e;
      }
      static fromBase64String(e) {
        const t = function __PRIVATE_decodeBase64(e2) {
          try {
            return atob(e2);
          } catch (e3) {
            throw "undefined" != typeof DOMException && e3 instanceof DOMException ? new __PRIVATE_Base64DecodeError("Invalid base64 string: " + e3) : e3;
          }
        }(e);
        return new _ByteString(t);
      }
      static fromUint8Array(e) {
        const t = (
          /**
          * Helper function to convert an Uint8array to a binary string.
          */
          function __PRIVATE_binaryStringFromUint8Array(e2) {
            let t2 = "";
            for (let n = 0; n < e2.length; ++n)
              t2 += String.fromCharCode(e2[n]);
            return t2;
          }(e)
        );
        return new _ByteString(t);
      }
      [Symbol.iterator]() {
        let e = 0;
        return {
          next: () => e < this.binaryString.length ? {
            value: this.binaryString.charCodeAt(e++),
            done: false
          } : {
            value: void 0,
            done: true
          }
        };
      }
      toBase64() {
        return function __PRIVATE_encodeBase64(e) {
          return btoa(e);
        }(this.binaryString);
      }
      toUint8Array() {
        return function __PRIVATE_uint8ArrayFromBinaryString(e) {
          const t = new Uint8Array(e.length);
          for (let n = 0; n < e.length; n++)
            t[n] = e.charCodeAt(n);
          return t;
        }(this.binaryString);
      }
      approximateByteSize() {
        return 2 * this.binaryString.length;
      }
      compareTo(e) {
        return __PRIVATE_primitiveComparator(this.binaryString, e.binaryString);
      }
      isEqual(e) {
        return this.binaryString === e.binaryString;
      }
    };
    ByteString.EMPTY_BYTE_STRING = new ByteString("");
    te = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
    DatabaseInfo = class {
      /**
       * Constructs a DatabaseInfo using the provided host, databaseId and
       * persistenceKey.
       *
       * @param databaseId - The database to use.
       * @param appId - The Firebase App Id.
       * @param persistenceKey - A unique identifier for this Firestore's local
       * storage (used in conjunction with the databaseId).
       * @param host - The Firestore backend host to connect to.
       * @param ssl - Whether to use SSL when connecting.
       * @param forceLongPolling - Whether to use the forceLongPolling option
       * when using WebChannel as the network transport.
       * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
       * option when using WebChannel as the network transport.
       * @param longPollingOptions Options that configure long-polling.
       * @param useFetchStreams Whether to use the Fetch API instead of
       * XMLHTTPRequest
       */
      constructor(e, t, n, r2, i, s2, o, _, a) {
        this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = r2, this.ssl = i, this.forceLongPolling = s2, this.autoDetectLongPolling = o, this.longPollingOptions = _, this.useFetchStreams = a;
      }
    };
    DatabaseId = class _DatabaseId {
      constructor(e, t) {
        this.projectId = e, this.database = t || "(default)";
      }
      static empty() {
        return new _DatabaseId("", "");
      }
      get isDefaultDatabase() {
        return "(default)" === this.database;
      }
      isEqual(e) {
        return e instanceof _DatabaseId && e.projectId === this.projectId && e.database === this.database;
      }
    };
    ne = {
      mapValue: {
        fields: {
          __type__: {
            stringValue: "__max__"
          }
        }
      }
    };
    ObjectValue = class _ObjectValue {
      constructor(e) {
        this.value = e;
      }
      static empty() {
        return new _ObjectValue({
          mapValue: {}
        });
      }
      /**
       * Returns the value at the given path or null.
       *
       * @param path - the path to search
       * @returns The value at the path or null if the path is not set.
       */
      field(e) {
        if (e.isEmpty())
          return this.value;
        {
          let t = this.value;
          for (let n = 0; n < e.length - 1; ++n)
            if (t = (t.mapValue.fields || {})[e.get(n)], !__PRIVATE_isMapValue(t))
              return null;
          return t = (t.mapValue.fields || {})[e.lastSegment()], t || null;
        }
      }
      /**
       * Sets the field to the provided value.
       *
       * @param path - The field path to set.
       * @param value - The value to set.
       */
      set(e, t) {
        this.getFieldsMap(e.popLast())[e.lastSegment()] = __PRIVATE_deepClone(t);
      }
      /**
       * Sets the provided fields to the provided values.
       *
       * @param data - A map of fields to values (or null for deletes).
       */
      setAll(e) {
        let t = FieldPath$1.emptyPath(), n = {}, r2 = [];
        e.forEach((e2, i2) => {
          if (!t.isImmediateParentOf(i2)) {
            const e3 = this.getFieldsMap(t);
            this.applyChanges(e3, n, r2), n = {}, r2 = [], t = i2.popLast();
          }
          e2 ? n[i2.lastSegment()] = __PRIVATE_deepClone(e2) : r2.push(i2.lastSegment());
        });
        const i = this.getFieldsMap(t);
        this.applyChanges(i, n, r2);
      }
      /**
       * Removes the field at the specified path. If there is no field at the
       * specified path, nothing is changed.
       *
       * @param path - The field path to remove.
       */
      delete(e) {
        const t = this.field(e.popLast());
        __PRIVATE_isMapValue(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
      }
      isEqual(e) {
        return __PRIVATE_valueEquals(this.value, e.value);
      }
      /**
       * Returns the map that contains the leaf element of `path`. If the parent
       * entry does not yet exist, or if it is not a map, a new map will be created.
       */
      getFieldsMap(e) {
        let t = this.value;
        t.mapValue.fields || (t.mapValue = {
          fields: {}
        });
        for (let n = 0; n < e.length; ++n) {
          let r2 = t.mapValue.fields[e.get(n)];
          __PRIVATE_isMapValue(r2) && r2.mapValue.fields || (r2 = {
            mapValue: {
              fields: {}
            }
          }, t.mapValue.fields[e.get(n)] = r2), t = r2;
        }
        return t.mapValue.fields;
      }
      /**
       * Modifies `fieldsMap` by adding, replacing or deleting the specified
       * entries.
       */
      applyChanges(e, t, n) {
        forEach(t, (t2, n2) => e[t2] = n2);
        for (const t2 of n)
          delete e[t2];
      }
      clone() {
        return new _ObjectValue(__PRIVATE_deepClone(this.value));
      }
    };
    MutableDocument = class _MutableDocument {
      constructor(e, t, n, r2, i, s2, o) {
        this.key = e, this.documentType = t, this.version = n, this.readTime = r2, this.createTime = i, this.data = s2, this.documentState = o;
      }
      /**
       * Creates a document with no known version or data, but which can serve as
       * base document for mutations.
       */
      static newInvalidDocument(e) {
        return new _MutableDocument(
          e,
          0,
          /* version */
          SnapshotVersion.min(),
          /* readTime */
          SnapshotVersion.min(),
          /* createTime */
          SnapshotVersion.min(),
          ObjectValue.empty(),
          0
          /* DocumentState.SYNCED */
        );
      }
      /**
       * Creates a new document that is known to exist with the given data at the
       * given version.
       */
      static newFoundDocument(e, t, n, r2) {
        return new _MutableDocument(
          e,
          1,
          /* version */
          t,
          /* readTime */
          SnapshotVersion.min(),
          /* createTime */
          n,
          r2,
          0
          /* DocumentState.SYNCED */
        );
      }
      /** Creates a new document that is known to not exist at the given version. */
      static newNoDocument(e, t) {
        return new _MutableDocument(
          e,
          2,
          /* version */
          t,
          /* readTime */
          SnapshotVersion.min(),
          /* createTime */
          SnapshotVersion.min(),
          ObjectValue.empty(),
          0
          /* DocumentState.SYNCED */
        );
      }
      /**
       * Creates a new document that is known to exist at the given version but
       * whose data is not known (e.g. a document that was updated without a known
       * base document).
       */
      static newUnknownDocument(e, t) {
        return new _MutableDocument(
          e,
          3,
          /* version */
          t,
          /* readTime */
          SnapshotVersion.min(),
          /* createTime */
          SnapshotVersion.min(),
          ObjectValue.empty(),
          2
          /* DocumentState.HAS_COMMITTED_MUTATIONS */
        );
      }
      /**
       * Changes the document type to indicate that it exists and that its version
       * and data are known.
       */
      convertToFoundDocument(e, t) {
        return !this.createTime.isEqual(SnapshotVersion.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this;
      }
      /**
       * Changes the document type to indicate that it doesn't exist at the given
       * version.
       */
      convertToNoDocument(e) {
        return this.version = e, this.documentType = 2, this.data = ObjectValue.empty(), this.documentState = 0, this;
      }
      /**
       * Changes the document type to indicate that it exists at a given version but
       * that its data is not known (e.g. a document that was updated without a known
       * base document).
       */
      convertToUnknownDocument(e) {
        return this.version = e, this.documentType = 3, this.data = ObjectValue.empty(), this.documentState = 2, this;
      }
      setHasCommittedMutations() {
        return this.documentState = 2, this;
      }
      setHasLocalMutations() {
        return this.documentState = 1, this.version = SnapshotVersion.min(), this;
      }
      setReadTime(e) {
        return this.readTime = e, this;
      }
      get hasLocalMutations() {
        return 1 === this.documentState;
      }
      get hasCommittedMutations() {
        return 2 === this.documentState;
      }
      get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
      }
      isValidDocument() {
        return 0 !== this.documentType;
      }
      isFoundDocument() {
        return 1 === this.documentType;
      }
      isNoDocument() {
        return 2 === this.documentType;
      }
      isUnknownDocument() {
        return 3 === this.documentType;
      }
      isEqual(e) {
        return e instanceof _MutableDocument && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
      }
      mutableCopy() {
        return new _MutableDocument(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
      }
      toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
      }
    };
    Bound = class {
      constructor(e, t) {
        this.position = e, this.inclusive = t;
      }
    };
    OrderBy = class {
      constructor(e, t = "asc") {
        this.field = e, this.dir = t;
      }
    };
    Filter = class {
    };
    FieldFilter = class _FieldFilter extends Filter {
      constructor(e, t, n) {
        super(), this.field = e, this.op = t, this.value = n;
      }
      /**
       * Creates a filter based on the provided arguments.
       */
      static create(e, t, n) {
        return e.isKeyField() ? "in" === t || "not-in" === t ? this.createKeyFieldInFilter(e, t, n) : new __PRIVATE_KeyFieldFilter(e, t, n) : "array-contains" === t ? new __PRIVATE_ArrayContainsFilter(e, n) : "in" === t ? new __PRIVATE_InFilter(e, n) : "not-in" === t ? new __PRIVATE_NotInFilter(e, n) : "array-contains-any" === t ? new __PRIVATE_ArrayContainsAnyFilter(e, n) : new _FieldFilter(e, t, n);
      }
      static createKeyFieldInFilter(e, t, n) {
        return "in" === t ? new __PRIVATE_KeyFieldInFilter(e, n) : new __PRIVATE_KeyFieldNotInFilter(e, n);
      }
      matches(e) {
        const t = e.data.field(this.field);
        return "!=" === this.op ? null !== t && this.matchesComparison(__PRIVATE_valueCompare(t, this.value)) : null !== t && __PRIVATE_typeOrder(this.value) === __PRIVATE_typeOrder(t) && this.matchesComparison(__PRIVATE_valueCompare(t, this.value));
      }
      matchesComparison(e) {
        switch (this.op) {
          case "<":
            return e < 0;
          case "<=":
            return e <= 0;
          case "==":
            return 0 === e;
          case "!=":
            return 0 !== e;
          case ">":
            return e > 0;
          case ">=":
            return e >= 0;
          default:
            return fail();
        }
      }
      isInequality() {
        return [
          "<",
          "<=",
          ">",
          ">=",
          "!=",
          "not-in"
          /* Operator.NOT_IN */
        ].indexOf(this.op) >= 0;
      }
      getFlattenedFilters() {
        return [this];
      }
      getFilters() {
        return [this];
      }
    };
    CompositeFilter = class _CompositeFilter extends Filter {
      constructor(e, t) {
        super(), this.filters = e, this.op = t, this.ue = null;
      }
      /**
       * Creates a filter based on the provided arguments.
       */
      static create(e, t) {
        return new _CompositeFilter(e, t);
      }
      matches(e) {
        return __PRIVATE_compositeFilterIsConjunction(this) ? void 0 === this.filters.find((t) => !t.matches(e)) : void 0 !== this.filters.find((t) => t.matches(e));
      }
      getFlattenedFilters() {
        return null !== this.ue || (this.ue = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])), this.ue;
      }
      // Returns a mutable copy of `this.filters`
      getFilters() {
        return Object.assign([], this.filters);
      }
    };
    __PRIVATE_KeyFieldFilter = class extends FieldFilter {
      constructor(e, t, n) {
        super(e, t, n), this.key = DocumentKey.fromName(n.referenceValue);
      }
      matches(e) {
        const t = DocumentKey.comparator(e.key, this.key);
        return this.matchesComparison(t);
      }
    };
    __PRIVATE_KeyFieldInFilter = class extends FieldFilter {
      constructor(e, t) {
        super(e, "in", t), this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("in", t);
      }
      matches(e) {
        return this.keys.some((t) => t.isEqual(e.key));
      }
    };
    __PRIVATE_KeyFieldNotInFilter = class extends FieldFilter {
      constructor(e, t) {
        super(e, "not-in", t), this.keys = __PRIVATE_extractDocumentKeysFromArrayValue("not-in", t);
      }
      matches(e) {
        return !this.keys.some((t) => t.isEqual(e.key));
      }
    };
    __PRIVATE_ArrayContainsFilter = class extends FieldFilter {
      constructor(e, t) {
        super(e, "array-contains", t);
      }
      matches(e) {
        const t = e.data.field(this.field);
        return isArray(t) && __PRIVATE_arrayValueContains(t.arrayValue, this.value);
      }
    };
    __PRIVATE_InFilter = class extends FieldFilter {
      constructor(e, t) {
        super(e, "in", t);
      }
      matches(e) {
        const t = e.data.field(this.field);
        return null !== t && __PRIVATE_arrayValueContains(this.value.arrayValue, t);
      }
    };
    __PRIVATE_NotInFilter = class extends FieldFilter {
      constructor(e, t) {
        super(e, "not-in", t);
      }
      matches(e) {
        if (__PRIVATE_arrayValueContains(this.value.arrayValue, {
          nullValue: "NULL_VALUE"
        }))
          return false;
        const t = e.data.field(this.field);
        return null !== t && !__PRIVATE_arrayValueContains(this.value.arrayValue, t);
      }
    };
    __PRIVATE_ArrayContainsAnyFilter = class extends FieldFilter {
      constructor(e, t) {
        super(e, "array-contains-any", t);
      }
      matches(e) {
        const t = e.data.field(this.field);
        return !(!isArray(t) || !t.arrayValue.values) && t.arrayValue.values.some((e2) => __PRIVATE_arrayValueContains(this.value.arrayValue, e2));
      }
    };
    __PRIVATE_TargetImpl = class {
      constructor(e, t = null, n = [], r2 = [], i = null, s2 = null, o = null) {
        this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r2, this.limit = i, this.startAt = s2, this.endAt = o, this.ce = null;
      }
    };
    __PRIVATE_QueryImpl = class {
      /**
       * Initializes a Query with a path and optional additional query constraints.
       * Path must currently be empty if this is a collection group query.
       */
      constructor(e, t = null, n = [], r2 = [], i = null, s2 = "F", o = null, _ = null) {
        this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r2, this.limit = i, this.limitType = s2, this.startAt = o, this.endAt = _, this.le = null, // The corresponding `Target` of this `Query` instance, for use with
        // non-aggregate queries.
        this.he = null, // The corresponding `Target` of this `Query` instance, for use with
        // aggregate queries. Unlike targets for non-aggregate queries,
        // aggregate query targets do not contain normalized order-bys, they only
        // contain explicit order-bys.
        this.Pe = null, this.startAt, this.endAt;
      }
    };
    ObjectMap = class {
      constructor(e, t) {
        this.mapKeyFn = e, this.equalsFn = t, /**
         * The inner map for a key/value pair. Due to the possibility of collisions we
         * keep a list of entries that we do a linear search through to find an actual
         * match. Note that collisions should be rare, so we still expect near
         * constant time lookups in practice.
         */
        this.inner = {}, /** The number of entries stored in the map */
        this.innerSize = 0;
      }
      /** Get a value for this key, or undefined if it does not exist. */
      get(e) {
        const t = this.mapKeyFn(e), n = this.inner[t];
        if (void 0 !== n) {
          for (const [t2, r2] of n)
            if (this.equalsFn(t2, e))
              return r2;
        }
      }
      has(e) {
        return void 0 !== this.get(e);
      }
      /** Put this key and value in the map. */
      set(e, t) {
        const n = this.mapKeyFn(e), r2 = this.inner[n];
        if (void 0 === r2)
          return this.inner[n] = [[e, t]], void this.innerSize++;
        for (let n2 = 0; n2 < r2.length; n2++)
          if (this.equalsFn(r2[n2][0], e))
            return void (r2[n2] = [e, t]);
        r2.push([e, t]), this.innerSize++;
      }
      /**
       * Remove this key from the map. Returns a boolean if anything was deleted.
       */
      delete(e) {
        const t = this.mapKeyFn(e), n = this.inner[t];
        if (void 0 === n)
          return false;
        for (let r2 = 0; r2 < n.length; r2++)
          if (this.equalsFn(n[r2][0], e))
            return 1 === n.length ? delete this.inner[t] : n.splice(r2, 1), this.innerSize--, true;
        return false;
      }
      forEach(e) {
        forEach(this.inner, (t, n) => {
          for (const [t2, r2] of n)
            e(t2, r2);
        });
      }
      isEmpty() {
        return isEmpty(this.inner);
      }
      size() {
        return this.innerSize;
      }
    };
    ie = new SortedMap(DocumentKey.comparator);
    se = new SortedMap(DocumentKey.comparator);
    oe = new SortedMap(DocumentKey.comparator);
    _e = new SortedSet(DocumentKey.comparator);
    ae2 = new SortedSet(__PRIVATE_primitiveComparator);
    TransformOperation = class {
      constructor() {
        this._ = void 0;
      }
    };
    __PRIVATE_ServerTimestampTransform = class extends TransformOperation {
    };
    __PRIVATE_ArrayUnionTransformOperation = class extends TransformOperation {
      constructor(e) {
        super(), this.elements = e;
      }
    };
    __PRIVATE_ArrayRemoveTransformOperation = class extends TransformOperation {
      constructor(e) {
        super(), this.elements = e;
      }
    };
    __PRIVATE_NumericIncrementTransformOperation = class extends TransformOperation {
      constructor(e, t) {
        super(), this.serializer = e, this.Ie = t;
      }
    };
    Precondition = class _Precondition {
      constructor(e, t) {
        this.updateTime = e, this.exists = t;
      }
      /** Creates a new empty Precondition. */
      static none() {
        return new _Precondition();
      }
      /** Creates a new Precondition with an exists flag. */
      static exists(e) {
        return new _Precondition(void 0, e);
      }
      /** Creates a new Precondition based on a version a document exists at. */
      static updateTime(e) {
        return new _Precondition(e);
      }
      /** Returns whether this Precondition is empty. */
      get isNone() {
        return void 0 === this.updateTime && void 0 === this.exists;
      }
      isEqual(e) {
        return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime);
      }
    };
    Mutation = class {
    };
    __PRIVATE_SetMutation = class extends Mutation {
      constructor(e, t, n, r2 = []) {
        super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r2, this.type = 0;
      }
      getFieldMask() {
        return null;
      }
    };
    __PRIVATE_PatchMutation = class extends Mutation {
      constructor(e, t, n, r2, i = []) {
        super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r2, this.fieldTransforms = i, this.type = 1;
      }
      getFieldMask() {
        return this.fieldMask;
      }
    };
    __PRIVATE_DeleteMutation = class extends Mutation {
      constructor(e, t) {
        super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = [];
      }
      getFieldMask() {
        return null;
      }
    };
    MutationBatch = class {
      /**
       * @param batchId - The unique ID of this mutation batch.
       * @param localWriteTime - The original write time of this mutation.
       * @param baseMutations - Mutations that are used to populate the base
       * values when this mutation is applied locally. This can be used to locally
       * overwrite values that are persisted in the remote document cache. Base
       * mutations are never sent to the backend.
       * @param mutations - The user-provided mutations in this mutation batch.
       * User-provided mutations are applied both locally and remotely on the
       * backend.
       */
      constructor(e, t, n, r2) {
        this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r2;
      }
      /**
       * Applies all the mutations in this MutationBatch to the specified document
       * to compute the state of the remote document
       *
       * @param document - The document to apply mutations to.
       * @param batchResult - The result of applying the MutationBatch to the
       * backend.
       */
      applyToRemoteDocument(e, t) {
        const n = t.mutationResults;
        for (let t2 = 0; t2 < this.mutations.length; t2++) {
          const r2 = this.mutations[t2];
          if (r2.key.isEqual(e.key)) {
            __PRIVATE_mutationApplyToRemoteDocument(r2, e, n[t2]);
          }
        }
      }
      /**
       * Computes the local view of a document given all the mutations in this
       * batch.
       *
       * @param document - The document to apply mutations to.
       * @param mutatedFields - Fields that have been updated before applying this mutation batch.
       * @returns A `FieldMask` representing all the fields that are mutated.
       */
      applyToLocalView(e, t) {
        for (const n of this.baseMutations)
          n.key.isEqual(e.key) && (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
        for (const n of this.mutations)
          n.key.isEqual(e.key) && (t = __PRIVATE_mutationApplyToLocalView(n, e, t, this.localWriteTime));
        return t;
      }
      /**
       * Computes the local view for all provided documents given the mutations in
       * this batch. Returns a `DocumentKey` to `Mutation` map which can be used to
       * replace all the mutation applications.
       */
      applyToLocalDocumentSet(e, t) {
        const n = __PRIVATE_newMutationMap();
        return this.mutations.forEach((r2) => {
          const i = e.get(r2.key), s2 = i.overlayedDocument;
          let o = this.applyToLocalView(s2, i.mutatedFields);
          o = t.has(r2.key) ? null : o;
          const _ = __PRIVATE_calculateOverlayMutation(s2, o);
          null !== _ && n.set(r2.key, _), s2.isValidDocument() || s2.convertToNoDocument(SnapshotVersion.min());
        }), n;
      }
      keys() {
        return this.mutations.reduce((e, t) => e.add(t.key), __PRIVATE_documentKeySet());
      }
      isEqual(e) {
        return this.batchId === e.batchId && __PRIVATE_arrayEquals(this.mutations, e.mutations, (e2, t) => __PRIVATE_mutationEquals(e2, t)) && __PRIVATE_arrayEquals(this.baseMutations, e.baseMutations, (e2, t) => __PRIVATE_mutationEquals(e2, t));
      }
    };
    Overlay = class {
      constructor(e, t) {
        this.largestBatchId = e, this.mutation = t;
      }
      getKey() {
        return this.mutation.key;
      }
      isEqual(e) {
        return null !== e && this.mutation === e.mutation;
      }
      toString() {
        return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
      }
    };
    ExistenceFilter = class {
      constructor(e, t) {
        this.count = e, this.unchangedNames = t;
      }
    };
    (ce = ue || (ue = {}))[ce.OK = 0] = "OK", ce[ce.CANCELLED = 1] = "CANCELLED", ce[ce.UNKNOWN = 2] = "UNKNOWN", ce[ce.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", ce[ce.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", ce[ce.NOT_FOUND = 5] = "NOT_FOUND", ce[ce.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", ce[ce.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", ce[ce.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", ce[ce.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", ce[ce.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", ce[ce.ABORTED = 10] = "ABORTED", ce[ce.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", ce[ce.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", ce[ce.INTERNAL = 13] = "INTERNAL", ce[ce.UNAVAILABLE = 14] = "UNAVAILABLE", ce[ce.DATA_LOSS = 15] = "DATA_LOSS";
    le = null;
    he = new Integer([4294967295, 4294967295], 0);
    BloomFilter = class _BloomFilter {
      constructor(e, t, n) {
        if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || t >= 8)
          throw new __PRIVATE_BloomFilterError(`Invalid padding: ${t}`);
        if (n < 0)
          throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);
        if (e.length > 0 && 0 === this.hashCount)
          throw new __PRIVATE_BloomFilterError(`Invalid hash count: ${n}`);
        if (0 === e.length && 0 !== t)
          throw new __PRIVATE_BloomFilterError(`Invalid padding when bitmap length is 0: ${t}`);
        this.Te = 8 * e.length - t, // Set the bit count in Integer to avoid repetition in mightContain().
        this.Ee = Integer.fromNumber(this.Te);
      }
      // Calculate the ith hash value based on the hashed 64bit integers,
      // and calculate its corresponding bit index in the bitmap to be checked.
      de(e, t, n) {
        let r2 = e.add(t.multiply(Integer.fromNumber(n)));
        return 1 === r2.compare(he) && (r2 = new Integer([r2.getBits(0), r2.getBits(1)], 0)), r2.modulo(this.Ee).toNumber();
      }
      // Return whether the bit on the given index in the bitmap is set to 1.
      Ae(e) {
        return 0 != (this.bitmap[Math.floor(e / 8)] & 1 << e % 8);
      }
      mightContain(e) {
        if (0 === this.Te)
          return false;
        const t = __PRIVATE_getMd5HashValue(e), [n, r2] = __PRIVATE_get64BitUints(t);
        for (let e2 = 0; e2 < this.hashCount; e2++) {
          const t2 = this.de(n, r2, e2);
          if (!this.Ae(t2))
            return false;
        }
        return true;
      }
      /** Create bloom filter for testing purposes only. */
      static create(e, t, n) {
        const r2 = e % 8 == 0 ? 0 : 8 - e % 8, i = new Uint8Array(Math.ceil(e / 8)), s2 = new _BloomFilter(i, r2, t);
        return n.forEach((e2) => s2.insert(e2)), s2;
      }
      insert(e) {
        if (0 === this.Te)
          return;
        const t = __PRIVATE_getMd5HashValue(e), [n, r2] = __PRIVATE_get64BitUints(t);
        for (let e2 = 0; e2 < this.hashCount; e2++) {
          const t2 = this.de(n, r2, e2);
          this.Re(t2);
        }
      }
      Re(e) {
        const t = Math.floor(e / 8), n = e % 8;
        this.bitmap[t] |= 1 << n;
      }
    };
    __PRIVATE_BloomFilterError = class extends Error {
      constructor() {
        super(...arguments), this.name = "BloomFilterError";
      }
    };
    RemoteEvent = class _RemoteEvent {
      constructor(e, t, n, r2, i) {
        this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = r2, this.resolvedLimboDocuments = i;
      }
      /**
       * HACK: Views require RemoteEvents in order to determine whether the view is
       * CURRENT, but secondary tabs don't receive remote events. So this method is
       * used to create a synthesized RemoteEvent that can be used to apply a
       * CURRENT status change to a View, for queries executed in a different tab.
       */
      // PORTING NOTE: Multi-tab only
      static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
        const r2 = /* @__PURE__ */ new Map();
        return r2.set(e, TargetChange.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new _RemoteEvent(SnapshotVersion.min(), r2, new SortedMap(__PRIVATE_primitiveComparator), __PRIVATE_mutableDocumentMap(), __PRIVATE_documentKeySet());
      }
    };
    TargetChange = class _TargetChange {
      constructor(e, t, n, r2, i) {
        this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = r2, this.removedDocuments = i;
      }
      /**
       * This method is used to create a synthesized TargetChanges that can be used to
       * apply a CURRENT status change to a View (for queries executed in a different
       * tab) or for new queries (to raise snapshots with correct CURRENT status).
       */
      static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
        return new _TargetChange(n, t, __PRIVATE_documentKeySet(), __PRIVATE_documentKeySet(), __PRIVATE_documentKeySet());
      }
    };
    __PRIVATE_DocumentWatchChange = class {
      constructor(e, t, n, r2) {
        this.Ve = e, this.removedTargetIds = t, this.key = n, this.me = r2;
      }
    };
    __PRIVATE_ExistenceFilterChange = class {
      constructor(e, t) {
        this.targetId = e, this.fe = t;
      }
    };
    __PRIVATE_WatchTargetChange = class {
      constructor(e, t, n = ByteString.EMPTY_BYTE_STRING, r2 = null) {
        this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = r2;
      }
    };
    __PRIVATE_TargetState = class {
      constructor() {
        this.ge = 0, /**
         * Keeps track of the document changes since the last raised snapshot.
         *
         * These changes are continuously updated as we receive document updates and
         * always reflect the current set of changes against the last issued snapshot.
         */
        this.pe = __PRIVATE_snapshotChangesMap(), /** See public getters for explanations of these fields. */
        this.ye = ByteString.EMPTY_BYTE_STRING, this.we = false, /**
         * Whether this target state should be included in the next snapshot. We
         * initialize to true so that newly-added targets are included in the next
         * RemoteEvent.
         */
        this.Se = true;
      }
      /**
       * Whether this target has been marked 'current'.
       *
       * 'Current' has special meaning in the RPC protocol: It implies that the
       * Watch backend has sent us all changes up to the point at which the target
       * was added and that the target is consistent with the rest of the watch
       * stream.
       */
      get current() {
        return this.we;
      }
      /** The last resume token sent to us for this target. */
      get resumeToken() {
        return this.ye;
      }
      /** Whether this target has pending target adds or target removes. */
      get be() {
        return 0 !== this.ge;
      }
      /** Whether we have modified any state that should trigger a snapshot. */
      get De() {
        return this.Se;
      }
      /**
       * Applies the resume token to the TargetChange, but only when it has a new
       * value. Empty resumeTokens are discarded.
       */
      Ce(e) {
        e.approximateByteSize() > 0 && (this.Se = true, this.ye = e);
      }
      /**
       * Creates a target change from the current set of changes.
       *
       * To reset the document changes after raising this snapshot, call
       * `clearPendingChanges()`.
       */
      ve() {
        let e = __PRIVATE_documentKeySet(), t = __PRIVATE_documentKeySet(), n = __PRIVATE_documentKeySet();
        return this.pe.forEach((r2, i) => {
          switch (i) {
            case 0:
              e = e.add(r2);
              break;
            case 2:
              t = t.add(r2);
              break;
            case 1:
              n = n.add(r2);
              break;
            default:
              fail();
          }
        }), new TargetChange(this.ye, this.we, e, t, n);
      }
      /**
       * Resets the document changes and sets `hasPendingChanges` to false.
       */
      Fe() {
        this.Se = false, this.pe = __PRIVATE_snapshotChangesMap();
      }
      Me(e, t) {
        this.Se = true, this.pe = this.pe.insert(e, t);
      }
      xe(e) {
        this.Se = true, this.pe = this.pe.remove(e);
      }
      Oe() {
        this.ge += 1;
      }
      Ne() {
        this.ge -= 1;
      }
      Be() {
        this.Se = true, this.we = true;
      }
    };
    __PRIVATE_WatchChangeAggregator = class {
      constructor(e) {
        this.Le = e, /** The internal state of all tracked targets. */
        this.ke = /* @__PURE__ */ new Map(), /** Keeps track of the documents to update since the last raised snapshot. */
        this.qe = __PRIVATE_mutableDocumentMap(), /** A mapping of document keys to their set of target IDs. */
        this.Qe = __PRIVATE_documentTargetMap(), /**
         * A map of targets with existence filter mismatches. These targets are
         * known to be inconsistent and their listens needs to be re-established by
         * RemoteStore.
         */
        this.Ke = new SortedMap(__PRIVATE_primitiveComparator);
      }
      /**
       * Processes and adds the DocumentWatchChange to the current set of changes.
       */
      $e(e) {
        for (const t of e.Ve)
          e.me && e.me.isFoundDocument() ? this.Ue(t, e.me) : this.We(t, e.key, e.me);
        for (const t of e.removedTargetIds)
          this.We(t, e.key, e.me);
      }
      /** Processes and adds the WatchTargetChange to the current set of changes. */
      Ge(e) {
        this.forEachTarget(e, (t) => {
          const n = this.ze(t);
          switch (e.state) {
            case 0:
              this.je(t) && n.Ce(e.resumeToken);
              break;
            case 1:
              n.Ne(), n.be || // We have a freshly added target, so we need to reset any state
              // that we had previously. This can happen e.g. when remove and add
              // back a target for existence filter mismatches.
              n.Fe(), n.Ce(e.resumeToken);
              break;
            case 2:
              n.Ne(), n.be || this.removeTarget(t);
              break;
            case 3:
              this.je(t) && (n.Be(), n.Ce(e.resumeToken));
              break;
            case 4:
              this.je(t) && // Reset the target and synthesizes removes for all existing
              // documents. The backend will re-add any documents that still
              // match the target before it sends the next global snapshot.
              (this.He(t), n.Ce(e.resumeToken));
              break;
            default:
              fail();
          }
        });
      }
      /**
       * Iterates over all targetIds that the watch change applies to: either the
       * targetIds explicitly listed in the change or the targetIds of all currently
       * active targets.
       */
      forEachTarget(e, t) {
        e.targetIds.length > 0 ? e.targetIds.forEach(t) : this.ke.forEach((e2, n) => {
          this.je(n) && t(n);
        });
      }
      /**
       * Handles existence filters and synthesizes deletes for filter mismatches.
       * Targets that are invalidated by filter mismatches are added to
       * `pendingTargetResets`.
       */
      Je(e) {
        const t = e.targetId, n = e.fe.count, r2 = this.Ye(t);
        if (r2) {
          const i = r2.target;
          if (__PRIVATE_targetIsDocumentTarget(i))
            if (0 === n) {
              const e2 = new DocumentKey(i.path);
              this.We(t, e2, MutableDocument.newNoDocument(e2, SnapshotVersion.min()));
            } else
              __PRIVATE_hardAssert(1 === n);
          else {
            const r3 = this.Ze(t);
            if (r3 !== n) {
              const n2 = this.Xe(e), i2 = n2 ? this.et(n2, e, r3) : 1;
              if (0 !== i2) {
                this.He(t);
                const e2 = 2 === i2 ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
                this.Ke = this.Ke.insert(t, e2);
              }
              null == le || le.tt(function __PRIVATE_createExistenceFilterMismatchInfoForTestingHooks(e2, t2, n3, r4, i3) {
                var s2, o, _, a, u, c;
                const l2 = {
                  localCacheCount: e2,
                  existenceFilterCount: t2.count,
                  databaseId: n3.database,
                  projectId: n3.projectId
                }, h = t2.unchangedNames;
                h && (l2.bloomFilter = {
                  applied: 0 === i3,
                  hashCount: null !== (s2 = null == h ? void 0 : h.hashCount) && void 0 !== s2 ? s2 : 0,
                  bitmapLength: null !== (a = null === (_ = null === (o = null == h ? void 0 : h.bits) || void 0 === o ? void 0 : o.bitmap) || void 0 === _ ? void 0 : _.length) && void 0 !== a ? a : 0,
                  padding: null !== (c = null === (u = null == h ? void 0 : h.bits) || void 0 === u ? void 0 : u.padding) && void 0 !== c ? c : 0,
                  mightContain: (e3) => {
                    var t3;
                    return null !== (t3 = null == r4 ? void 0 : r4.mightContain(e3)) && void 0 !== t3 && t3;
                  }
                });
                return l2;
              }(r3, e.fe, this.Le.nt(), n2, i2));
            }
          }
        }
      }
      /**
       * Parse the bloom filter from the "unchanged_names" field of an existence
       * filter.
       */
      Xe(e) {
        const t = e.fe.unchangedNames;
        if (!t || !t.bits)
          return null;
        const { bits: { bitmap: n = "", padding: r2 = 0 }, hashCount: i = 0 } = t;
        let s2, o;
        try {
          s2 = __PRIVATE_normalizeByteString(n).toUint8Array();
        } catch (e2) {
          if (e2 instanceof __PRIVATE_Base64DecodeError)
            return __PRIVATE_logWarn("Decoding the base64 bloom filter in existence filter failed (" + e2.message + "); ignoring the bloom filter and falling back to full re-query."), null;
          throw e2;
        }
        try {
          o = new BloomFilter(s2, r2, i);
        } catch (e2) {
          return __PRIVATE_logWarn(e2 instanceof __PRIVATE_BloomFilterError ? "BloomFilter error: " : "Applying bloom filter failed: ", e2), null;
        }
        return 0 === o.Te ? null : o;
      }
      /**
       * Apply bloom filter to remove the deleted documents, and return the
       * application status.
       */
      et(e, t, n) {
        return t.fe.count === n - this.rt(e, t.targetId) ? 0 : 2;
      }
      /**
       * Filter out removed documents based on bloom filter membership result and
       * return number of documents removed.
       */
      rt(e, t) {
        const n = this.Le.getRemoteKeysForTarget(t);
        let r2 = 0;
        return n.forEach((n2) => {
          const i = this.Le.nt(), s2 = `projects/${i.projectId}/databases/${i.database}/documents/${n2.path.canonicalString()}`;
          e.mightContain(s2) || (this.We(
            t,
            n2,
            /*updatedDocument=*/
            null
          ), r2++);
        }), r2;
      }
      /**
       * Converts the currently accumulated state into a remote event at the
       * provided snapshot version. Resets the accumulated changes before returning.
       */
      it(e) {
        const t = /* @__PURE__ */ new Map();
        this.ke.forEach((n2, r3) => {
          const i = this.Ye(r3);
          if (i) {
            if (n2.current && __PRIVATE_targetIsDocumentTarget(i.target)) {
              const t2 = new DocumentKey(i.target.path);
              null !== this.qe.get(t2) || this.st(r3, t2) || this.We(r3, t2, MutableDocument.newNoDocument(t2, e));
            }
            n2.De && (t.set(r3, n2.ve()), n2.Fe());
          }
        });
        let n = __PRIVATE_documentKeySet();
        this.Qe.forEach((e2, t2) => {
          let r3 = true;
          t2.forEachWhile((e3) => {
            const t3 = this.Ye(e3);
            return !t3 || "TargetPurposeLimboResolution" === t3.purpose || (r3 = false, false);
          }), r3 && (n = n.add(e2));
        }), this.qe.forEach((t2, n2) => n2.setReadTime(e));
        const r2 = new RemoteEvent(e, t, this.Ke, this.qe, n);
        return this.qe = __PRIVATE_mutableDocumentMap(), this.Qe = __PRIVATE_documentTargetMap(), this.Ke = new SortedMap(__PRIVATE_primitiveComparator), r2;
      }
      /**
       * Adds the provided document to the internal list of document updates and
       * its document key to the given target's mapping.
       */
      // Visible for testing.
      Ue(e, t) {
        if (!this.je(e))
          return;
        const n = this.st(e, t.key) ? 2 : 0;
        this.ze(e).Me(t.key, n), this.qe = this.qe.insert(t.key, t), this.Qe = this.Qe.insert(t.key, this.ot(t.key).add(e));
      }
      /**
       * Removes the provided document from the target mapping. If the
       * document no longer matches the target, but the document's state is still
       * known (e.g. we know that the document was deleted or we received the change
       * that caused the filter mismatch), the new document can be provided
       * to update the remote document cache.
       */
      // Visible for testing.
      We(e, t, n) {
        if (!this.je(e))
          return;
        const r2 = this.ze(e);
        this.st(e, t) ? r2.Me(
          t,
          1
          /* ChangeType.Removed */
        ) : (
          // The document may have entered and left the target before we raised a
          // snapshot, so we can just ignore the change.
          r2.xe(t)
        ), this.Qe = this.Qe.insert(t, this.ot(t).delete(e)), n && (this.qe = this.qe.insert(t, n));
      }
      removeTarget(e) {
        this.ke.delete(e);
      }
      /**
       * Returns the current count of documents in the target. This includes both
       * the number of documents that the LocalStore considers to be part of the
       * target as well as any accumulated changes.
       */
      Ze(e) {
        const t = this.ze(e).ve();
        return this.Le.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size;
      }
      /**
       * Increment the number of acks needed from watch before we can consider the
       * server to be 'in-sync' with the client's active targets.
       */
      Oe(e) {
        this.ze(e).Oe();
      }
      ze(e) {
        let t = this.ke.get(e);
        return t || (t = new __PRIVATE_TargetState(), this.ke.set(e, t)), t;
      }
      ot(e) {
        let t = this.Qe.get(e);
        return t || (t = new SortedSet(__PRIVATE_primitiveComparator), this.Qe = this.Qe.insert(e, t)), t;
      }
      /**
       * Verifies that the user is still interested in this target (by calling
       * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
       * from watch.
       */
      je(e) {
        const t = null !== this.Ye(e);
        return t || __PRIVATE_logDebug("WatchChangeAggregator", "Detected inactive target", e), t;
      }
      /**
       * Returns the TargetData for an active target (i.e. a target that the user
       * is still interested in that has no outstanding target change requests).
       */
      Ye(e) {
        const t = this.ke.get(e);
        return t && t.be ? null : this.Le._t(e);
      }
      /**
       * Resets the state of a Watch target to its initial state (e.g. sets
       * 'current' to false, clears the resume token and removes its target mapping
       * from all documents).
       */
      He(e) {
        this.ke.set(e, new __PRIVATE_TargetState());
        this.Le.getRemoteKeysForTarget(e).forEach((t) => {
          this.We(
            e,
            t,
            /*updatedDocument=*/
            null
          );
        });
      }
      /**
       * Returns whether the LocalStore considers the document to be part of the
       * specified target.
       */
      st(e, t) {
        return this.Le.getRemoteKeysForTarget(e).has(t);
      }
    };
    Pe = (() => {
      const e = {
        asc: "ASCENDING",
        desc: "DESCENDING"
      };
      return e;
    })();
    Ie = (() => {
      const e = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "!=": "NOT_EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "not-in": "NOT_IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY"
      };
      return e;
    })();
    Te = (() => {
      const e = {
        and: "AND",
        or: "OR"
      };
      return e;
    })();
    JsonProtoSerializer = class {
      constructor(e, t) {
        this.databaseId = e, this.useProto3Json = t;
      }
    };
    TargetData = class _TargetData {
      constructor(e, t, n, r2, i = SnapshotVersion.min(), s2 = SnapshotVersion.min(), o = ByteString.EMPTY_BYTE_STRING, _ = null) {
        this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = r2, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = s2, this.resumeToken = o, this.expectedCount = _;
      }
      /** Creates a new target data instance with an updated sequence number. */
      withSequenceNumber(e) {
        return new _TargetData(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
      }
      /**
       * Creates a new target data instance with an updated resume token and
       * snapshot version.
       */
      withResumeToken(e, t) {
        return new _TargetData(
          this.target,
          this.targetId,
          this.purpose,
          this.sequenceNumber,
          t,
          this.lastLimboFreeSnapshotVersion,
          e,
          /* expectedCount= */
          null
        );
      }
      /**
       * Creates a new target data instance with an updated expected count.
       */
      withExpectedCount(e) {
        return new _TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e);
      }
      /**
       * Creates a new target data instance with an updated last limbo free
       * snapshot version number.
       */
      withLastLimboFreeSnapshotVersion(e) {
        return new _TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount);
      }
    };
    __PRIVATE_LocalSerializer = class {
      constructor(e) {
        this.ut = e;
      }
    };
    __PRIVATE_FirestoreIndexValueWriter = class {
      constructor() {
      }
      // The write methods below short-circuit writing terminators for values
      // containing a (terminating) truncated value.
      // As an example, consider the resulting encoding for:
      // ["bar", [2, "foo"]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TERM, TERM, TERM)
      // ["bar", [2, truncated("foo")]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TRUNC)
      // ["bar", truncated(["foo"])] -> (STRING, "bar", TERM, ARRAY. STRING, "foo", TERM, TRUNC)
      /** Writes an index value.  */
      ht(e, t) {
        this.Pt(e, t), // Write separator to split index values
        // (see go/firestore-storage-format#encodings).
        t.It();
      }
      Pt(e, t) {
        if ("nullValue" in e)
          this.Tt(t, 5);
        else if ("booleanValue" in e)
          this.Tt(t, 10), t.Et(e.booleanValue ? 1 : 0);
        else if ("integerValue" in e)
          this.Tt(t, 15), t.Et(__PRIVATE_normalizeNumber(e.integerValue));
        else if ("doubleValue" in e) {
          const n = __PRIVATE_normalizeNumber(e.doubleValue);
          isNaN(n) ? this.Tt(t, 13) : (this.Tt(t, 15), __PRIVATE_isNegativeZero(n) ? (
            // -0.0, 0 and 0.0 are all considered the same
            t.Et(0)
          ) : t.Et(n));
        } else if ("timestampValue" in e) {
          const n = e.timestampValue;
          this.Tt(t, 20), "string" == typeof n ? t.dt(n) : (t.dt(`${n.seconds || ""}`), t.Et(n.nanos || 0));
        } else if ("stringValue" in e)
          this.At(e.stringValue, t), this.Rt(t);
        else if ("bytesValue" in e)
          this.Tt(t, 30), t.Vt(__PRIVATE_normalizeByteString(e.bytesValue)), this.Rt(t);
        else if ("referenceValue" in e)
          this.ft(e.referenceValue, t);
        else if ("geoPointValue" in e) {
          const n = e.geoPointValue;
          this.Tt(t, 45), t.Et(n.latitude || 0), t.Et(n.longitude || 0);
        } else
          "mapValue" in e ? __PRIVATE_isMaxValue(e) ? this.Tt(t, Number.MAX_SAFE_INTEGER) : (this.gt(e.mapValue, t), this.Rt(t)) : "arrayValue" in e ? (this.yt(e.arrayValue, t), this.Rt(t)) : fail();
      }
      At(e, t) {
        this.Tt(t, 25), this.wt(e, t);
      }
      wt(e, t) {
        t.dt(e);
      }
      gt(e, t) {
        const n = e.fields || {};
        this.Tt(t, 55);
        for (const e2 of Object.keys(n))
          this.At(e2, t), this.Pt(n[e2], t);
      }
      yt(e, t) {
        const n = e.values || [];
        this.Tt(t, 50);
        for (const e2 of n)
          this.Pt(e2, t);
      }
      ft(e, t) {
        this.Tt(t, 37);
        DocumentKey.fromName(e).path.forEach((e2) => {
          this.Tt(t, 60), this.wt(e2, t);
        });
      }
      Tt(e, t) {
        e.Et(t);
      }
      Rt(e) {
        e.Et(2);
      }
    };
    __PRIVATE_FirestoreIndexValueWriter.St = new __PRIVATE_FirestoreIndexValueWriter();
    __PRIVATE_MemoryIndexManager = class {
      constructor() {
        this.on = new __PRIVATE_MemoryCollectionParentIndex();
      }
      addToCollectionParentIndex(e, t) {
        return this.on.add(t), PersistencePromise.resolve();
      }
      getCollectionParents(e, t) {
        return PersistencePromise.resolve(this.on.getEntries(t));
      }
      addFieldIndex(e, t) {
        return PersistencePromise.resolve();
      }
      deleteFieldIndex(e, t) {
        return PersistencePromise.resolve();
      }
      deleteAllFieldIndexes(e) {
        return PersistencePromise.resolve();
      }
      createTargetIndexes(e, t) {
        return PersistencePromise.resolve();
      }
      getDocumentsMatchingTarget(e, t) {
        return PersistencePromise.resolve(null);
      }
      getIndexType(e, t) {
        return PersistencePromise.resolve(
          0
          /* IndexType.NONE */
        );
      }
      getFieldIndexes(e, t) {
        return PersistencePromise.resolve([]);
      }
      getNextCollectionGroupToUpdate(e) {
        return PersistencePromise.resolve(null);
      }
      getMinOffset(e, t) {
        return PersistencePromise.resolve(IndexOffset.min());
      }
      getMinOffsetFromCollectionGroup(e, t) {
        return PersistencePromise.resolve(IndexOffset.min());
      }
      updateCollectionGroup(e, t, n) {
        return PersistencePromise.resolve();
      }
      updateIndexEntries(e, t) {
        return PersistencePromise.resolve();
      }
    };
    __PRIVATE_MemoryCollectionParentIndex = class {
      constructor() {
        this.index = {};
      }
      // Returns false if the entry already existed.
      add(e) {
        const t = e.lastSegment(), n = e.popLast(), r2 = this.index[t] || new SortedSet(ResourcePath.comparator), i = !r2.has(n);
        return this.index[t] = r2.add(n), i;
      }
      has(e) {
        const t = e.lastSegment(), n = e.popLast(), r2 = this.index[t];
        return r2 && r2.has(n);
      }
      getEntries(e) {
        return (this.index[e] || new SortedSet(ResourcePath.comparator)).toArray();
      }
    };
    Ee = new Uint8Array(0);
    LruParams = class _LruParams {
      constructor(e, t, n) {
        this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n;
      }
      static withCacheSize(e) {
        return new _LruParams(e, _LruParams.DEFAULT_COLLECTION_PERCENTILE, _LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
      }
    };
    LruParams.DEFAULT_COLLECTION_PERCENTILE = 10, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, LruParams.DEFAULT = new LruParams(41943040, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), LruParams.DISABLED = new LruParams(-1, 0, 0);
    __PRIVATE_TargetIdGenerator = class ___PRIVATE_TargetIdGenerator {
      constructor(e) {
        this.xn = e;
      }
      next() {
        return this.xn += 2, this.xn;
      }
      static On() {
        return new ___PRIVATE_TargetIdGenerator(0);
      }
      static Nn() {
        return new ___PRIVATE_TargetIdGenerator(-1);
      }
    };
    RemoteDocumentChangeBuffer = class {
      constructor() {
        this.changes = new ObjectMap((e) => e.toString(), (e, t) => e.isEqual(t)), this.changesApplied = false;
      }
      /**
       * Buffers a `RemoteDocumentCache.addEntry()` call.
       *
       * You can only modify documents that have already been retrieved via
       * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
       */
      addEntry(e) {
        this.assertNotApplied(), this.changes.set(e.key, e);
      }
      /**
       * Buffers a `RemoteDocumentCache.removeEntry()` call.
       *
       * You can only remove documents that have already been retrieved via
       * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
       */
      removeEntry(e, t) {
        this.assertNotApplied(), this.changes.set(e, MutableDocument.newInvalidDocument(e).setReadTime(t));
      }
      /**
       * Looks up an entry in the cache. The buffered changes will first be checked,
       * and if no buffered change applies, this will forward to
       * `RemoteDocumentCache.getEntry()`.
       *
       * @param transaction - The transaction in which to perform any persistence
       *     operations.
       * @param documentKey - The key of the entry to look up.
       * @returns The cached document or an invalid document if we have nothing
       * cached.
       */
      getEntry(e, t) {
        this.assertNotApplied();
        const n = this.changes.get(t);
        return void 0 !== n ? PersistencePromise.resolve(n) : this.getFromCache(e, t);
      }
      /**
       * Looks up several entries in the cache, forwarding to
       * `RemoteDocumentCache.getEntry()`.
       *
       * @param transaction - The transaction in which to perform any persistence
       *     operations.
       * @param documentKeys - The keys of the entries to look up.
       * @returns A map of cached documents, indexed by key. If an entry cannot be
       *     found, the corresponding key will be mapped to an invalid document.
       */
      getEntries(e, t) {
        return this.getAllFromCache(e, t);
      }
      /**
       * Applies buffered changes to the underlying RemoteDocumentCache, using
       * the provided transaction.
       */
      apply(e) {
        return this.assertNotApplied(), this.changesApplied = true, this.applyChanges(e);
      }
      /** Helper to assert this.changes is not null  */
      assertNotApplied() {
      }
    };
    OverlayedDocument = class {
      constructor(e, t) {
        this.overlayedDocument = e, this.mutatedFields = t;
      }
    };
    LocalDocumentsView = class {
      constructor(e, t, n, r2) {
        this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r2;
      }
      /**
       * Get the local view of the document identified by `key`.
       *
       * @returns Local view of the document or null if we don't have any cached
       * state for it.
       */
      getDocument(e, t) {
        let n = null;
        return this.documentOverlayCache.getOverlay(e, t).next((r2) => (n = r2, this.remoteDocumentCache.getEntry(e, t))).next((e2) => (null !== n && __PRIVATE_mutationApplyToLocalView(n.mutation, e2, FieldMask.empty(), Timestamp.now()), e2));
      }
      /**
       * Gets the local view of the documents identified by `keys`.
       *
       * If we don't have cached state for a document in `keys`, a NoDocument will
       * be stored for that key in the resulting set.
       */
      getDocuments(e, t) {
        return this.remoteDocumentCache.getEntries(e, t).next((t2) => this.getLocalViewOfDocuments(e, t2, __PRIVATE_documentKeySet()).next(() => t2));
      }
      /**
       * Similar to `getDocuments`, but creates the local view from the given
       * `baseDocs` without retrieving documents from the local store.
       *
       * @param transaction - The transaction this operation is scoped to.
       * @param docs - The documents to apply local mutations to get the local views.
       * @param existenceStateChanged - The set of document keys whose existence state
       *   is changed. This is useful to determine if some documents overlay needs
       *   to be recalculated.
       */
      getLocalViewOfDocuments(e, t, n = __PRIVATE_documentKeySet()) {
        const r2 = __PRIVATE_newOverlayMap();
        return this.populateOverlays(e, r2, t).next(() => this.computeViews(e, t, r2, n).next((e2) => {
          let t2 = documentMap();
          return e2.forEach((e3, n2) => {
            t2 = t2.insert(e3, n2.overlayedDocument);
          }), t2;
        }));
      }
      /**
       * Gets the overlayed documents for the given document map, which will include
       * the local view of those documents and a `FieldMask` indicating which fields
       * are mutated locally, `null` if overlay is a Set or Delete mutation.
       */
      getOverlayedDocuments(e, t) {
        const n = __PRIVATE_newOverlayMap();
        return this.populateOverlays(e, n, t).next(() => this.computeViews(e, t, n, __PRIVATE_documentKeySet()));
      }
      /**
       * Fetches the overlays for {@code docs} and adds them to provided overlay map
       * if the map does not already contain an entry for the given document key.
       */
      populateOverlays(e, t, n) {
        const r2 = [];
        return n.forEach((e2) => {
          t.has(e2) || r2.push(e2);
        }), this.documentOverlayCache.getOverlays(e, r2).next((e2) => {
          e2.forEach((e3, n2) => {
            t.set(e3, n2);
          });
        });
      }
      /**
       * Computes the local view for the given documents.
       *
       * @param docs - The documents to compute views for. It also has the base
       *   version of the documents.
       * @param overlays - The overlays that need to be applied to the given base
       *   version of the documents.
       * @param existenceStateChanged - A set of documents whose existence states
       *   might have changed. This is used to determine if we need to re-calculate
       *   overlays from mutation queues.
       * @return A map represents the local documents view.
       */
      computeViews(e, t, n, r2) {
        let i = __PRIVATE_mutableDocumentMap();
        const s2 = __PRIVATE_newDocumentKeyMap(), o = function __PRIVATE_newOverlayedDocumentMap() {
          return __PRIVATE_newDocumentKeyMap();
        }();
        return t.forEach((e2, t2) => {
          const o2 = n.get(t2.key);
          r2.has(t2.key) && (void 0 === o2 || o2.mutation instanceof __PRIVATE_PatchMutation) ? i = i.insert(t2.key, t2) : void 0 !== o2 ? (s2.set(t2.key, o2.mutation.getFieldMask()), __PRIVATE_mutationApplyToLocalView(o2.mutation, t2, o2.mutation.getFieldMask(), Timestamp.now())) : (
            // no overlay exists
            // Using EMPTY to indicate there is no overlay for the document.
            s2.set(t2.key, FieldMask.empty())
          );
        }), this.recalculateAndSaveOverlays(e, i).next((e2) => (e2.forEach((e3, t2) => s2.set(e3, t2)), t.forEach((e3, t2) => {
          var n2;
          return o.set(e3, new OverlayedDocument(t2, null !== (n2 = s2.get(e3)) && void 0 !== n2 ? n2 : null));
        }), o));
      }
      recalculateAndSaveOverlays(e, t) {
        const n = __PRIVATE_newDocumentKeyMap();
        let r2 = new SortedMap((e2, t2) => e2 - t2), i = __PRIVATE_documentKeySet();
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e, t).next((e2) => {
          for (const i2 of e2)
            i2.keys().forEach((e3) => {
              const s2 = t.get(e3);
              if (null === s2)
                return;
              let o = n.get(e3) || FieldMask.empty();
              o = i2.applyToLocalView(s2, o), n.set(e3, o);
              const _ = (r2.get(i2.batchId) || __PRIVATE_documentKeySet()).add(e3);
              r2 = r2.insert(i2.batchId, _);
            });
        }).next(() => {
          const s2 = [], o = r2.getReverseIterator();
          for (; o.hasNext(); ) {
            const r3 = o.getNext(), _ = r3.key, a = r3.value, u = __PRIVATE_newMutationMap();
            a.forEach((e2) => {
              if (!i.has(e2)) {
                const r4 = __PRIVATE_calculateOverlayMutation(t.get(e2), n.get(e2));
                null !== r4 && u.set(e2, r4), i = i.add(e2);
              }
            }), s2.push(this.documentOverlayCache.saveOverlays(e, _, u));
          }
          return PersistencePromise.waitFor(s2);
        }).next(() => n);
      }
      /**
       * Recalculates overlays by reading the documents from remote document cache
       * first, and saves them after they are calculated.
       */
      recalculateAndSaveOverlaysForDocumentKeys(e, t) {
        return this.remoteDocumentCache.getEntries(e, t).next((t2) => this.recalculateAndSaveOverlays(e, t2));
      }
      /**
       * Performs a query against the local view of all documents.
       *
       * @param transaction - The persistence transaction.
       * @param query - The query to match documents against.
       * @param offset - Read time and key to start scanning by (exclusive).
       * @param context - A optional tracker to keep a record of important details
       *   during database local query execution.
       */
      getDocumentsMatchingQuery(e, t, n, r2) {
        return function __PRIVATE_isDocumentQuery$1(e2) {
          return DocumentKey.isDocumentKey(e2.path) && null === e2.collectionGroup && 0 === e2.filters.length;
        }(t) ? this.getDocumentsMatchingDocumentQuery(e, t.path) : __PRIVATE_isCollectionGroupQuery(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r2) : this.getDocumentsMatchingCollectionQuery(e, t, n, r2);
      }
      /**
       * Given a collection group, returns the next documents that follow the provided offset, along
       * with an updated batch ID.
       *
       * <p>The documents returned by this method are ordered by remote version from the provided
       * offset. If there are no more remote documents after the provided offset, documents with
       * mutations in order of batch id from the offset are returned. Since all documents in a batch are
       * returned together, the total number of documents returned can exceed {@code count}.
       *
       * @param transaction
       * @param collectionGroup The collection group for the documents.
       * @param offset The offset to index into.
       * @param count The number of documents to return
       * @return A LocalWriteResult with the documents that follow the provided offset and the last processed batch id.
       */
      getNextDocuments(e, t, n, r2) {
        return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r2).next((i) => {
          const s2 = r2 - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, r2 - i.size) : PersistencePromise.resolve(__PRIVATE_newOverlayMap());
          let o = -1, _ = i;
          return s2.next((t2) => PersistencePromise.forEach(t2, (t3, n2) => (o < n2.largestBatchId && (o = n2.largestBatchId), i.get(t3) ? PersistencePromise.resolve() : this.remoteDocumentCache.getEntry(e, t3).next((e2) => {
            _ = _.insert(t3, e2);
          }))).next(() => this.populateOverlays(e, t2, i)).next(() => this.computeViews(e, _, t2, __PRIVATE_documentKeySet())).next((e2) => ({
            batchId: o,
            changes: __PRIVATE_convertOverlayedDocumentMapToDocumentMap(e2)
          })));
        });
      }
      getDocumentsMatchingDocumentQuery(e, t) {
        return this.getDocument(e, new DocumentKey(t)).next((e2) => {
          let t2 = documentMap();
          return e2.isFoundDocument() && (t2 = t2.insert(e2.key, e2)), t2;
        });
      }
      getDocumentsMatchingCollectionGroupQuery(e, t, n, r2) {
        const i = t.collectionGroup;
        let s2 = documentMap();
        return this.indexManager.getCollectionParents(e, i).next((o) => PersistencePromise.forEach(o, (o2) => {
          const _ = function __PRIVATE_asCollectionQueryAtPath(e2, t2) {
            return new __PRIVATE_QueryImpl(
              t2,
              /*collectionGroup=*/
              null,
              e2.explicitOrderBy.slice(),
              e2.filters.slice(),
              e2.limit,
              e2.limitType,
              e2.startAt,
              e2.endAt
            );
          }(t, o2.child(i));
          return this.getDocumentsMatchingCollectionQuery(e, _, n, r2).next((e2) => {
            e2.forEach((e3, t2) => {
              s2 = s2.insert(e3, t2);
            });
          });
        }).next(() => s2));
      }
      getDocumentsMatchingCollectionQuery(e, t, n, r2) {
        let i;
        return this.documentOverlayCache.getOverlaysForCollection(e, t.path, n.largestBatchId).next((s2) => (i = s2, this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r2))).next((e2) => {
          i.forEach((t2, n3) => {
            const r3 = n3.getKey();
            null === e2.get(r3) && (e2 = e2.insert(r3, MutableDocument.newInvalidDocument(r3)));
          });
          let n2 = documentMap();
          return e2.forEach((e3, r3) => {
            const s2 = i.get(e3);
            void 0 !== s2 && __PRIVATE_mutationApplyToLocalView(s2.mutation, r3, FieldMask.empty(), Timestamp.now()), // Finally, insert the documents that still match the query
            __PRIVATE_queryMatches(t, r3) && (n2 = n2.insert(e3, r3));
          }), n2;
        });
      }
    };
    __PRIVATE_MemoryBundleCache = class {
      constructor(e) {
        this.serializer = e, this.ur = /* @__PURE__ */ new Map(), this.cr = /* @__PURE__ */ new Map();
      }
      getBundleMetadata(e, t) {
        return PersistencePromise.resolve(this.ur.get(t));
      }
      saveBundleMetadata(e, t) {
        return this.ur.set(
          t.id,
          /** Decodes a BundleMetadata proto into a BundleMetadata object. */
          function __PRIVATE_fromBundleMetadata(e2) {
            return {
              id: e2.id,
              version: e2.version,
              createTime: __PRIVATE_fromVersion(e2.createTime)
            };
          }(t)
        ), PersistencePromise.resolve();
      }
      getNamedQuery(e, t) {
        return PersistencePromise.resolve(this.cr.get(t));
      }
      saveNamedQuery(e, t) {
        return this.cr.set(t.name, function __PRIVATE_fromProtoNamedQuery(e2) {
          return {
            name: e2.name,
            query: __PRIVATE_fromBundledQuery(e2.bundledQuery),
            readTime: __PRIVATE_fromVersion(e2.readTime)
          };
        }(t)), PersistencePromise.resolve();
      }
    };
    __PRIVATE_MemoryDocumentOverlayCache = class {
      constructor() {
        this.overlays = new SortedMap(DocumentKey.comparator), this.lr = /* @__PURE__ */ new Map();
      }
      getOverlay(e, t) {
        return PersistencePromise.resolve(this.overlays.get(t));
      }
      getOverlays(e, t) {
        const n = __PRIVATE_newOverlayMap();
        return PersistencePromise.forEach(t, (t2) => this.getOverlay(e, t2).next((e2) => {
          null !== e2 && n.set(t2, e2);
        })).next(() => n);
      }
      saveOverlays(e, t, n) {
        return n.forEach((n2, r2) => {
          this.lt(e, t, r2);
        }), PersistencePromise.resolve();
      }
      removeOverlaysForBatchId(e, t, n) {
        const r2 = this.lr.get(n);
        return void 0 !== r2 && (r2.forEach((e2) => this.overlays = this.overlays.remove(e2)), this.lr.delete(n)), PersistencePromise.resolve();
      }
      getOverlaysForCollection(e, t, n) {
        const r2 = __PRIVATE_newOverlayMap(), i = t.length + 1, s2 = new DocumentKey(t.child("")), o = this.overlays.getIteratorFrom(s2);
        for (; o.hasNext(); ) {
          const e2 = o.getNext().value, s3 = e2.getKey();
          if (!t.isPrefixOf(s3.path))
            break;
          s3.path.length === i && (e2.largestBatchId > n && r2.set(e2.getKey(), e2));
        }
        return PersistencePromise.resolve(r2);
      }
      getOverlaysForCollectionGroup(e, t, n, r2) {
        let i = new SortedMap((e2, t2) => e2 - t2);
        const s2 = this.overlays.getIterator();
        for (; s2.hasNext(); ) {
          const e2 = s2.getNext().value;
          if (e2.getKey().getCollectionGroup() === t && e2.largestBatchId > n) {
            let t2 = i.get(e2.largestBatchId);
            null === t2 && (t2 = __PRIVATE_newOverlayMap(), i = i.insert(e2.largestBatchId, t2)), t2.set(e2.getKey(), e2);
          }
        }
        const o = __PRIVATE_newOverlayMap(), _ = i.getIterator();
        for (; _.hasNext(); ) {
          if (_.getNext().value.forEach((e2, t2) => o.set(e2, t2)), o.size() >= r2)
            break;
        }
        return PersistencePromise.resolve(o);
      }
      lt(e, t, n) {
        const r2 = this.overlays.get(n.key);
        if (null !== r2) {
          const e2 = this.lr.get(r2.largestBatchId).delete(n.key);
          this.lr.set(r2.largestBatchId, e2);
        }
        this.overlays = this.overlays.insert(n.key, new Overlay(t, n));
        let i = this.lr.get(t);
        void 0 === i && (i = __PRIVATE_documentKeySet(), this.lr.set(t, i)), this.lr.set(t, i.add(n.key));
      }
    };
    __PRIVATE_ReferenceSet = class {
      constructor() {
        this.hr = new SortedSet(__PRIVATE_DocReference.Pr), // A set of outstanding references to a document sorted by target id.
        this.Ir = new SortedSet(__PRIVATE_DocReference.Tr);
      }
      /** Returns true if the reference set contains no references. */
      isEmpty() {
        return this.hr.isEmpty();
      }
      /** Adds a reference to the given document key for the given ID. */
      addReference(e, t) {
        const n = new __PRIVATE_DocReference(e, t);
        this.hr = this.hr.add(n), this.Ir = this.Ir.add(n);
      }
      /** Add references to the given document keys for the given ID. */
      Er(e, t) {
        e.forEach((e2) => this.addReference(e2, t));
      }
      /**
       * Removes a reference to the given document key for the given
       * ID.
       */
      removeReference(e, t) {
        this.dr(new __PRIVATE_DocReference(e, t));
      }
      Ar(e, t) {
        e.forEach((e2) => this.removeReference(e2, t));
      }
      /**
       * Clears all references with a given ID. Calls removeRef() for each key
       * removed.
       */
      Rr(e) {
        const t = new DocumentKey(new ResourcePath([])), n = new __PRIVATE_DocReference(t, e), r2 = new __PRIVATE_DocReference(t, e + 1), i = [];
        return this.Ir.forEachInRange([n, r2], (e2) => {
          this.dr(e2), i.push(e2.key);
        }), i;
      }
      Vr() {
        this.hr.forEach((e) => this.dr(e));
      }
      dr(e) {
        this.hr = this.hr.delete(e), this.Ir = this.Ir.delete(e);
      }
      mr(e) {
        const t = new DocumentKey(new ResourcePath([])), n = new __PRIVATE_DocReference(t, e), r2 = new __PRIVATE_DocReference(t, e + 1);
        let i = __PRIVATE_documentKeySet();
        return this.Ir.forEachInRange([n, r2], (e2) => {
          i = i.add(e2.key);
        }), i;
      }
      containsKey(e) {
        const t = new __PRIVATE_DocReference(e, 0), n = this.hr.firstAfterOrEqual(t);
        return null !== n && e.isEqual(n.key);
      }
    };
    __PRIVATE_DocReference = class {
      constructor(e, t) {
        this.key = e, this.gr = t;
      }
      /** Compare by key then by ID */
      static Pr(e, t) {
        return DocumentKey.comparator(e.key, t.key) || __PRIVATE_primitiveComparator(e.gr, t.gr);
      }
      /** Compare by ID then by key */
      static Tr(e, t) {
        return __PRIVATE_primitiveComparator(e.gr, t.gr) || DocumentKey.comparator(e.key, t.key);
      }
    };
    __PRIVATE_MemoryMutationQueue = class {
      constructor(e, t) {
        this.indexManager = e, this.referenceDelegate = t, /**
         * The set of all mutations that have been sent but not yet been applied to
         * the backend.
         */
        this.mutationQueue = [], /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.pr = 1, /** An ordered mapping between documents and the mutations batch IDs. */
        this.yr = new SortedSet(__PRIVATE_DocReference.Pr);
      }
      checkEmpty(e) {
        return PersistencePromise.resolve(0 === this.mutationQueue.length);
      }
      addMutationBatch(e, t, n, r2) {
        const i = this.pr;
        this.pr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
        const s2 = new MutationBatch(i, t, n, r2);
        this.mutationQueue.push(s2);
        for (const t2 of r2)
          this.yr = this.yr.add(new __PRIVATE_DocReference(t2.key, i)), this.indexManager.addToCollectionParentIndex(e, t2.key.path.popLast());
        return PersistencePromise.resolve(s2);
      }
      lookupMutationBatch(e, t) {
        return PersistencePromise.resolve(this.wr(t));
      }
      getNextMutationBatchAfterBatchId(e, t) {
        const n = t + 1, r2 = this.Sr(n), i = r2 < 0 ? 0 : r2;
        return PersistencePromise.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
      }
      getHighestUnacknowledgedBatchId() {
        return PersistencePromise.resolve(0 === this.mutationQueue.length ? -1 : this.pr - 1);
      }
      getAllMutationBatches(e) {
        return PersistencePromise.resolve(this.mutationQueue.slice());
      }
      getAllMutationBatchesAffectingDocumentKey(e, t) {
        const n = new __PRIVATE_DocReference(t, 0), r2 = new __PRIVATE_DocReference(t, Number.POSITIVE_INFINITY), i = [];
        return this.yr.forEachInRange([n, r2], (e2) => {
          const t2 = this.wr(e2.gr);
          i.push(t2);
        }), PersistencePromise.resolve(i);
      }
      getAllMutationBatchesAffectingDocumentKeys(e, t) {
        let n = new SortedSet(__PRIVATE_primitiveComparator);
        return t.forEach((e2) => {
          const t2 = new __PRIVATE_DocReference(e2, 0), r2 = new __PRIVATE_DocReference(e2, Number.POSITIVE_INFINITY);
          this.yr.forEachInRange([t2, r2], (e3) => {
            n = n.add(e3.gr);
          });
        }), PersistencePromise.resolve(this.br(n));
      }
      getAllMutationBatchesAffectingQuery(e, t) {
        const n = t.path, r2 = n.length + 1;
        let i = n;
        DocumentKey.isDocumentKey(i) || (i = i.child(""));
        const s2 = new __PRIVATE_DocReference(new DocumentKey(i), 0);
        let o = new SortedSet(__PRIVATE_primitiveComparator);
        return this.yr.forEachWhile((e2) => {
          const t2 = e2.key.path;
          return !!n.isPrefixOf(t2) && // Rows with document keys more than one segment longer than the query
          // path can't be matches. For example, a query on 'rooms' can't match
          // the document /rooms/abc/messages/xyx.
          // TODO(mcg): we'll need a different scanner when we implement
          // ancestor queries.
          (t2.length === r2 && (o = o.add(e2.gr)), true);
        }, s2), PersistencePromise.resolve(this.br(o));
      }
      br(e) {
        const t = [];
        return e.forEach((e2) => {
          const n = this.wr(e2);
          null !== n && t.push(n);
        }), t;
      }
      removeMutationBatch(e, t) {
        __PRIVATE_hardAssert(0 === this.Dr(t.batchId, "removed")), this.mutationQueue.shift();
        let n = this.yr;
        return PersistencePromise.forEach(t.mutations, (r2) => {
          const i = new __PRIVATE_DocReference(r2.key, t.batchId);
          return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(e, r2.key);
        }).next(() => {
          this.yr = n;
        });
      }
      Fn(e) {
      }
      containsKey(e, t) {
        const n = new __PRIVATE_DocReference(t, 0), r2 = this.yr.firstAfterOrEqual(n);
        return PersistencePromise.resolve(t.isEqual(r2 && r2.key));
      }
      performConsistencyCheck(e) {
        return this.mutationQueue.length, PersistencePromise.resolve();
      }
      /**
       * Finds the index of the given batchId in the mutation queue and asserts that
       * the resulting index is within the bounds of the queue.
       *
       * @param batchId - The batchId to search for
       * @param action - A description of what the caller is doing, phrased in passive
       * form (e.g. "acknowledged" in a routine that acknowledges batches).
       */
      Dr(e, t) {
        return this.Sr(e);
      }
      /**
       * Finds the index of the given batchId in the mutation queue. This operation
       * is O(1).
       *
       * @returns The computed index of the batch with the given batchId, based on
       * the state of the queue. Note this index can be negative if the requested
       * batchId has already been remvoed from the queue or past the end of the
       * queue if the batchId is larger than the last added batch.
       */
      Sr(e) {
        if (0 === this.mutationQueue.length)
          return 0;
        return e - this.mutationQueue[0].batchId;
      }
      /**
       * A version of lookupMutationBatch that doesn't return a promise, this makes
       * other functions that uses this code easier to read and more efficent.
       */
      wr(e) {
        const t = this.Sr(e);
        if (t < 0 || t >= this.mutationQueue.length)
          return null;
        return this.mutationQueue[t];
      }
    };
    __PRIVATE_MemoryRemoteDocumentCacheImpl = class {
      /**
       * @param sizer - Used to assess the size of a document. For eager GC, this is
       * expected to just return 0 to avoid unnecessarily doing the work of
       * calculating the size.
       */
      constructor(e) {
        this.Cr = e, /** Underlying cache of documents and their read times. */
        this.docs = function __PRIVATE_documentEntryMap() {
          return new SortedMap(DocumentKey.comparator);
        }(), /** Size of all cached documents. */
        this.size = 0;
      }
      setIndexManager(e) {
        this.indexManager = e;
      }
      /**
       * Adds the supplied entry to the cache and updates the cache size as appropriate.
       *
       * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
       * returned by `newChangeBuffer()`.
       */
      addEntry(e, t) {
        const n = t.key, r2 = this.docs.get(n), i = r2 ? r2.size : 0, s2 = this.Cr(t);
        return this.docs = this.docs.insert(n, {
          document: t.mutableCopy(),
          size: s2
        }), this.size += s2 - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast());
      }
      /**
       * Removes the specified entry from the cache and updates the cache size as appropriate.
       *
       * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
       * returned by `newChangeBuffer()`.
       */
      removeEntry(e) {
        const t = this.docs.get(e);
        t && (this.docs = this.docs.remove(e), this.size -= t.size);
      }
      getEntry(e, t) {
        const n = this.docs.get(t);
        return PersistencePromise.resolve(n ? n.document.mutableCopy() : MutableDocument.newInvalidDocument(t));
      }
      getEntries(e, t) {
        let n = __PRIVATE_mutableDocumentMap();
        return t.forEach((e2) => {
          const t2 = this.docs.get(e2);
          n = n.insert(e2, t2 ? t2.document.mutableCopy() : MutableDocument.newInvalidDocument(e2));
        }), PersistencePromise.resolve(n);
      }
      getDocumentsMatchingQuery(e, t, n, r2) {
        let i = __PRIVATE_mutableDocumentMap();
        const s2 = t.path, o = new DocumentKey(s2.child("")), _ = this.docs.getIteratorFrom(o);
        for (; _.hasNext(); ) {
          const { key: e2, value: { document: o2 } } = _.getNext();
          if (!s2.isPrefixOf(e2.path))
            break;
          e2.path.length > s2.length + 1 || (__PRIVATE_indexOffsetComparator(__PRIVATE_newIndexOffsetFromDocument(o2), n) <= 0 || (r2.has(o2.key) || __PRIVATE_queryMatches(t, o2)) && (i = i.insert(o2.key, o2.mutableCopy())));
        }
        return PersistencePromise.resolve(i);
      }
      getAllFromCollectionGroup(e, t, n, r2) {
        fail();
      }
      vr(e, t) {
        return PersistencePromise.forEach(this.docs, (e2) => t(e2));
      }
      newChangeBuffer(e) {
        return new __PRIVATE_MemoryRemoteDocumentChangeBuffer(this);
      }
      getSize(e) {
        return PersistencePromise.resolve(this.size);
      }
    };
    __PRIVATE_MemoryRemoteDocumentChangeBuffer = class extends RemoteDocumentChangeBuffer {
      constructor(e) {
        super(), this._r = e;
      }
      applyChanges(e) {
        const t = [];
        return this.changes.forEach((n, r2) => {
          r2.isValidDocument() ? t.push(this._r.addEntry(e, r2)) : this._r.removeEntry(n);
        }), PersistencePromise.waitFor(t);
      }
      getFromCache(e, t) {
        return this._r.getEntry(e, t);
      }
      getAllFromCache(e, t) {
        return this._r.getEntries(e, t);
      }
    };
    __PRIVATE_MemoryTargetCache = class {
      constructor(e) {
        this.persistence = e, /**
         * Maps a target to the data about that target
         */
        this.Fr = new ObjectMap((e2) => __PRIVATE_canonifyTarget(e2), __PRIVATE_targetEquals), /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = SnapshotVersion.min(), /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, /** The highest sequence number encountered. */
        this.Mr = 0, /**
         * A ordered bidirectional mapping between documents and the remote target
         * IDs.
         */
        this.Or = new __PRIVATE_ReferenceSet(), this.targetCount = 0, this.Nr = __PRIVATE_TargetIdGenerator.On();
      }
      forEachTarget(e, t) {
        return this.Fr.forEach((e2, n) => t(n)), PersistencePromise.resolve();
      }
      getLastRemoteSnapshotVersion(e) {
        return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
      }
      getHighestSequenceNumber(e) {
        return PersistencePromise.resolve(this.Mr);
      }
      allocateTargetId(e) {
        return this.highestTargetId = this.Nr.next(), PersistencePromise.resolve(this.highestTargetId);
      }
      setTargetsMetadata(e, t, n) {
        return n && (this.lastRemoteSnapshotVersion = n), t > this.Mr && (this.Mr = t), PersistencePromise.resolve();
      }
      kn(e) {
        this.Fr.set(e.target, e);
        const t = e.targetId;
        t > this.highestTargetId && (this.Nr = new __PRIVATE_TargetIdGenerator(t), this.highestTargetId = t), e.sequenceNumber > this.Mr && (this.Mr = e.sequenceNumber);
      }
      addTargetData(e, t) {
        return this.kn(t), this.targetCount += 1, PersistencePromise.resolve();
      }
      updateTargetData(e, t) {
        return this.kn(t), PersistencePromise.resolve();
      }
      removeTargetData(e, t) {
        return this.Fr.delete(t.target), this.Or.Rr(t.targetId), this.targetCount -= 1, PersistencePromise.resolve();
      }
      removeTargets(e, t, n) {
        let r2 = 0;
        const i = [];
        return this.Fr.forEach((s2, o) => {
          o.sequenceNumber <= t && null === n.get(o.targetId) && (this.Fr.delete(s2), i.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r2++);
        }), PersistencePromise.waitFor(i).next(() => r2);
      }
      getTargetCount(e) {
        return PersistencePromise.resolve(this.targetCount);
      }
      getTargetData(e, t) {
        const n = this.Fr.get(t) || null;
        return PersistencePromise.resolve(n);
      }
      addMatchingKeys(e, t, n) {
        return this.Or.Er(t, n), PersistencePromise.resolve();
      }
      removeMatchingKeys(e, t, n) {
        this.Or.Ar(t, n);
        const r2 = this.persistence.referenceDelegate, i = [];
        return r2 && t.forEach((t2) => {
          i.push(r2.markPotentiallyOrphaned(e, t2));
        }), PersistencePromise.waitFor(i);
      }
      removeMatchingKeysForTargetId(e, t) {
        return this.Or.Rr(t), PersistencePromise.resolve();
      }
      getMatchingKeysForTargetId(e, t) {
        const n = this.Or.mr(t);
        return PersistencePromise.resolve(n);
      }
      containsKey(e, t) {
        return PersistencePromise.resolve(this.Or.containsKey(t));
      }
    };
    __PRIVATE_MemoryPersistence = class {
      /**
       * The constructor accepts a factory for creating a reference delegate. This
       * allows both the delegate and this instance to have strong references to
       * each other without having nullable fields that would then need to be
       * checked or asserted on every access.
       */
      constructor(e, t) {
        this.Br = {}, this.overlays = {}, this.Lr = new __PRIVATE_ListenSequence(0), this.kr = false, this.kr = true, this.referenceDelegate = e(this), this.qr = new __PRIVATE_MemoryTargetCache(this);
        this.indexManager = new __PRIVATE_MemoryIndexManager(), this.remoteDocumentCache = function __PRIVATE_newMemoryRemoteDocumentCache(e2) {
          return new __PRIVATE_MemoryRemoteDocumentCacheImpl(e2);
        }((e2) => this.referenceDelegate.Qr(e2)), this.serializer = new __PRIVATE_LocalSerializer(t), this.Kr = new __PRIVATE_MemoryBundleCache(this.serializer);
      }
      start() {
        return Promise.resolve();
      }
      shutdown() {
        return this.kr = false, Promise.resolve();
      }
      get started() {
        return this.kr;
      }
      setDatabaseDeletedListener() {
      }
      setNetworkEnabled() {
      }
      getIndexManager(e) {
        return this.indexManager;
      }
      getDocumentOverlayCache(e) {
        let t = this.overlays[e.toKey()];
        return t || (t = new __PRIVATE_MemoryDocumentOverlayCache(), this.overlays[e.toKey()] = t), t;
      }
      getMutationQueue(e, t) {
        let n = this.Br[e.toKey()];
        return n || (n = new __PRIVATE_MemoryMutationQueue(t, this.referenceDelegate), this.Br[e.toKey()] = n), n;
      }
      getTargetCache() {
        return this.qr;
      }
      getRemoteDocumentCache() {
        return this.remoteDocumentCache;
      }
      getBundleCache() {
        return this.Kr;
      }
      runTransaction(e, t, n) {
        __PRIVATE_logDebug("MemoryPersistence", "Starting transaction:", e);
        const r2 = new __PRIVATE_MemoryTransaction(this.Lr.next());
        return this.referenceDelegate.$r(), n(r2).next((e2) => this.referenceDelegate.Ur(r2).next(() => e2)).toPromise().then((e2) => (r2.raiseOnCommittedEvent(), e2));
      }
      Wr(e, t) {
        return PersistencePromise.or(Object.values(this.Br).map((n) => () => n.containsKey(e, t)));
      }
    };
    __PRIVATE_MemoryTransaction = class extends PersistenceTransaction {
      constructor(e) {
        super(), this.currentSequenceNumber = e;
      }
    };
    __PRIVATE_MemoryEagerDelegate = class ___PRIVATE_MemoryEagerDelegate {
      constructor(e) {
        this.persistence = e, /** Tracks all documents that are active in Query views. */
        this.Gr = new __PRIVATE_ReferenceSet(), /** The list of documents that are potentially GCed after each transaction. */
        this.zr = null;
      }
      static jr(e) {
        return new ___PRIVATE_MemoryEagerDelegate(e);
      }
      get Hr() {
        if (this.zr)
          return this.zr;
        throw fail();
      }
      addReference(e, t, n) {
        return this.Gr.addReference(n, t), this.Hr.delete(n.toString()), PersistencePromise.resolve();
      }
      removeReference(e, t, n) {
        return this.Gr.removeReference(n, t), this.Hr.add(n.toString()), PersistencePromise.resolve();
      }
      markPotentiallyOrphaned(e, t) {
        return this.Hr.add(t.toString()), PersistencePromise.resolve();
      }
      removeTarget(e, t) {
        this.Gr.Rr(t.targetId).forEach((e2) => this.Hr.add(e2.toString()));
        const n = this.persistence.getTargetCache();
        return n.getMatchingKeysForTargetId(e, t.targetId).next((e2) => {
          e2.forEach((e3) => this.Hr.add(e3.toString()));
        }).next(() => n.removeTargetData(e, t));
      }
      $r() {
        this.zr = /* @__PURE__ */ new Set();
      }
      Ur(e) {
        const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return PersistencePromise.forEach(this.Hr, (n) => {
          const r2 = DocumentKey.fromPath(n);
          return this.Jr(e, r2).next((e2) => {
            e2 || t.removeEntry(r2, SnapshotVersion.min());
          });
        }).next(() => (this.zr = null, t.apply(e)));
      }
      updateLimboDocument(e, t) {
        return this.Jr(e, t).next((e2) => {
          e2 ? this.Hr.delete(t.toString()) : this.Hr.add(t.toString());
        });
      }
      Qr(e) {
        return 0;
      }
      Jr(e, t) {
        return PersistencePromise.or([() => PersistencePromise.resolve(this.Gr.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.Wr(e, t)]);
      }
    };
    __PRIVATE_LocalViewChanges = class ___PRIVATE_LocalViewChanges {
      constructor(e, t, n, r2) {
        this.targetId = e, this.fromCache = t, this.ki = n, this.qi = r2;
      }
      static Qi(e, t) {
        let n = __PRIVATE_documentKeySet(), r2 = __PRIVATE_documentKeySet();
        for (const e2 of t.docChanges)
          switch (e2.type) {
            case 0:
              n = n.add(e2.doc.key);
              break;
            case 1:
              r2 = r2.add(e2.doc.key);
          }
        return new ___PRIVATE_LocalViewChanges(e, t.fromCache, n, r2);
      }
    };
    QueryContext = class {
      constructor() {
        this._documentReadCount = 0;
      }
      get documentReadCount() {
        return this._documentReadCount;
      }
      incrementDocumentReadCount(e) {
        this._documentReadCount += e;
      }
    };
    __PRIVATE_QueryEngine = class {
      constructor() {
        this.Ki = false, this.$i = false, /**
         * SDK only decides whether it should create index when collection size is
         * larger than this.
         */
        this.Ui = 100, this.Wi = 8;
      }
      /** Sets the document view to query against. */
      initialize(e, t) {
        this.Gi = e, this.indexManager = t, this.Ki = true;
      }
      /** Returns all local documents matching the specified query. */
      getDocumentsMatchingQuery(e, t, n, r2) {
        const i = {
          result: null
        };
        return this.zi(e, t).next((e2) => {
          i.result = e2;
        }).next(() => {
          if (!i.result)
            return this.ji(e, t, r2, n).next((e2) => {
              i.result = e2;
            });
        }).next(() => {
          if (i.result)
            return;
          const n2 = new QueryContext();
          return this.Hi(e, t, n2).next((r3) => {
            if (i.result = r3, this.$i)
              return this.Ji(e, t, n2, r3.size);
          });
        }).next(() => i.result);
      }
      Ji(e, t, n, r2) {
        return n.documentReadCount < this.Ui ? (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "SDK will not create cache indexes for query:", __PRIVATE_stringifyQuery(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.Ui, "documents"), PersistencePromise.resolve()) : (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Query:", __PRIVATE_stringifyQuery(t), "scans", n.documentReadCount, "local documents and returns", r2, "documents as results."), n.documentReadCount > this.Wi * r2 ? (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "The SDK decides to create cache indexes for query:", __PRIVATE_stringifyQuery(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, __PRIVATE_queryToTarget(t))) : PersistencePromise.resolve());
      }
      /**
       * Performs an indexed query that evaluates the query based on a collection's
       * persisted index values. Returns `null` if an index is not available.
       */
      zi(e, t) {
        if (__PRIVATE_queryMatchesAllDocuments(t))
          return PersistencePromise.resolve(null);
        let n = __PRIVATE_queryToTarget(t);
        return this.indexManager.getIndexType(e, n).next((r2) => 0 === r2 ? null : (null !== t.limit && 1 === r2 && // We cannot apply a limit for targets that are served using a partial
        // index. If a partial index will be used to serve the target, the
        // query may return a superset of documents that match the target
        // (e.g. if the index doesn't include all the target's filters), or
        // may return the correct set of documents in the wrong order (e.g. if
        // the index doesn't include a segment for one of the orderBys).
        // Therefore, a limit should not be applied in such cases.
        (t = __PRIVATE_queryWithLimit(
          t,
          null,
          "F"
          /* LimitType.First */
        ), n = __PRIVATE_queryToTarget(t)), this.indexManager.getDocumentsMatchingTarget(e, n).next((r3) => {
          const i = __PRIVATE_documentKeySet(...r3);
          return this.Gi.getDocuments(e, i).next((r4) => this.indexManager.getMinOffset(e, n).next((n2) => {
            const s2 = this.Yi(t, r4);
            return this.Zi(t, s2, i, n2.readTime) ? this.zi(e, __PRIVATE_queryWithLimit(
              t,
              null,
              "F"
              /* LimitType.First */
            )) : this.Xi(e, s2, t, n2);
          }));
        })));
      }
      /**
       * Performs a query based on the target's persisted query mapping. Returns
       * `null` if the mapping is not available or cannot be used.
       */
      ji(e, t, n, r2) {
        return __PRIVATE_queryMatchesAllDocuments(t) || r2.isEqual(SnapshotVersion.min()) ? PersistencePromise.resolve(null) : this.Gi.getDocuments(e, n).next((i) => {
          const s2 = this.Yi(t, i);
          return this.Zi(t, s2, n, r2) ? PersistencePromise.resolve(null) : (__PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Re-using previous result from %s to execute query: %s", r2.toString(), __PRIVATE_stringifyQuery(t)), this.Xi(e, s2, t, __PRIVATE_newIndexOffsetSuccessorFromReadTime(r2, -1)).next((e2) => e2));
        });
      }
      /** Applies the query filter and sorting to the provided documents.  */
      Yi(e, t) {
        let n = new SortedSet(__PRIVATE_newQueryComparator(e));
        return t.forEach((t2, r2) => {
          __PRIVATE_queryMatches(e, r2) && (n = n.add(r2));
        }), n;
      }
      /**
       * Determines if a limit query needs to be refilled from cache, making it
       * ineligible for index-free execution.
       *
       * @param query - The query.
       * @param sortedPreviousResults - The documents that matched the query when it
       * was last synchronized, sorted by the query's comparator.
       * @param remoteKeys - The document keys that matched the query at the last
       * snapshot.
       * @param limboFreeSnapshotVersion - The version of the snapshot when the
       * query was last synchronized.
       */
      Zi(e, t, n, r2) {
        if (null === e.limit)
          return false;
        if (n.size !== t.size)
          return true;
        const i = "F" === e.limitType ? t.last() : t.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(r2) > 0);
      }
      Hi(e, t, n) {
        return __PRIVATE_getLogLevel() <= LogLevel.DEBUG && __PRIVATE_logDebug("QueryEngine", "Using full collection scan to execute query:", __PRIVATE_stringifyQuery(t)), this.Gi.getDocumentsMatchingQuery(e, t, IndexOffset.min(), n);
      }
      /**
       * Combines the results from an indexed execution with the remaining documents
       * that have not yet been indexed.
       */
      Xi(e, t, n, r2) {
        return this.Gi.getDocumentsMatchingQuery(e, n, r2).next((e2) => (
          // Merge with existing results
          (t.forEach((t2) => {
            e2 = e2.insert(t2.key, t2);
          }), e2)
        ));
      }
    };
    __PRIVATE_LocalStoreImpl = class {
      constructor(e, t, n, r2) {
        this.persistence = e, this.es = t, this.serializer = r2, /**
         * Maps a targetID to data about its target.
         *
         * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
         * of `applyRemoteEvent()` idempotent.
         */
        this.ts = new SortedMap(__PRIVATE_primitiveComparator), /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.ns = new ObjectMap((e2) => __PRIVATE_canonifyTarget(e2), __PRIVATE_targetEquals), /**
         * A per collection group index of the last read time processed by
         * `getNewDocumentChanges()`.
         *
         * PORTING NOTE: This is only used for multi-tab synchronization.
         */
        this.rs = /* @__PURE__ */ new Map(), this.ss = e.getRemoteDocumentCache(), this.qr = e.getTargetCache(), this.Kr = e.getBundleCache(), this.os(n);
      }
      os(e) {
        this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new LocalDocumentsView(this.ss, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.ss.setIndexManager(this.indexManager), this.es.initialize(this.localDocuments, this.indexManager);
      }
      collectGarbage(e) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (t) => e.collect(t, this.ts));
      }
    };
    __PRIVATE_LocalClientState = class {
      constructor() {
        this.activeTargetIds = __PRIVATE_targetIdSet();
      }
      ds(e) {
        this.activeTargetIds = this.activeTargetIds.add(e);
      }
      As(e) {
        this.activeTargetIds = this.activeTargetIds.delete(e);
      }
      /**
       * Converts this entry into a JSON-encoded format we can use for WebStorage.
       * Does not encode `clientId` as it is part of the key in WebStorage.
       */
      Es() {
        const e = {
          activeTargetIds: this.activeTargetIds.toArray(),
          updateTimeMs: Date.now()
        };
        return JSON.stringify(e);
      }
    };
    __PRIVATE_MemorySharedClientState = class {
      constructor() {
        this.eo = new __PRIVATE_LocalClientState(), this.no = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
      }
      addPendingMutation(e) {
      }
      updateMutationState(e, t, n) {
      }
      addLocalQueryTarget(e) {
        return this.eo.ds(e), this.no[e] || "not-current";
      }
      updateQueryState(e, t, n) {
        this.no[e] = t;
      }
      removeLocalQueryTarget(e) {
        this.eo.As(e);
      }
      isLocalQueryTarget(e) {
        return this.eo.activeTargetIds.has(e);
      }
      clearQueryState(e) {
        delete this.no[e];
      }
      getAllActiveQueryTargets() {
        return this.eo.activeTargetIds;
      }
      isActiveQueryTarget(e) {
        return this.eo.activeTargetIds.has(e);
      }
      start() {
        return this.eo = new __PRIVATE_LocalClientState(), Promise.resolve();
      }
      handleUserChange(e, t, n) {
      }
      setOnlineState(e) {
      }
      shutdown() {
      }
      writeSequenceNumber(e) {
      }
      notifyBundleLoaded(e) {
      }
    };
    __PRIVATE_NoopConnectivityMonitor = class {
      ro(e) {
      }
      shutdown() {
      }
    };
    __PRIVATE_BrowserConnectivityMonitor = class {
      constructor() {
        this.io = () => this.so(), this.oo = () => this._o(), this.ao = [], this.uo();
      }
      ro(e) {
        this.ao.push(e);
      }
      shutdown() {
        window.removeEventListener("online", this.io), window.removeEventListener("offline", this.oo);
      }
      uo() {
        window.addEventListener("online", this.io), window.addEventListener("offline", this.oo);
      }
      so() {
        __PRIVATE_logDebug("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const e of this.ao)
          e(
            0
            /* NetworkStatus.AVAILABLE */
          );
      }
      _o() {
        __PRIVATE_logDebug("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const e of this.ao)
          e(
            1
            /* NetworkStatus.UNAVAILABLE */
          );
      }
      // TODO(chenbrian): Consider passing in window either into this component or
      // here for testing via FakeWindow.
      /** Checks that all used attributes of window are available. */
      static D() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
      }
    };
    Re = null;
    Ve = {
      BatchGetDocuments: "batchGet",
      Commit: "commit",
      RunQuery: "runQuery",
      RunAggregationQuery: "runAggregationQuery"
    };
    __PRIVATE_StreamBridge = class {
      constructor(e) {
        this.co = e.co, this.lo = e.lo;
      }
      ho(e) {
        this.Po = e;
      }
      Io(e) {
        this.To = e;
      }
      onMessage(e) {
        this.Eo = e;
      }
      close() {
        this.lo();
      }
      send(e) {
        this.co(e);
      }
      Ao() {
        this.Po();
      }
      Ro(e) {
        this.To(e);
      }
      Vo(e) {
        this.Eo(e);
      }
    };
    me = "WebChannelConnection";
    __PRIVATE_WebChannelConnection = class extends /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class __PRIVATE_RestConnection {
      constructor(e) {
        this.databaseInfo = e, this.databaseId = e.databaseId;
        const t = e.ssl ? "https" : "http", n = encodeURIComponent(this.databaseId.projectId), r2 = encodeURIComponent(this.databaseId.database);
        this.mo = t + "://" + e.host, this.fo = `projects/${n}/databases/${r2}`, this.po = "(default)" === this.databaseId.database ? `project_id=${n}` : `project_id=${n}&database_id=${r2}`;
      }
      get yo() {
        return false;
      }
      wo(e, t, n, r2, i) {
        const s2 = __PRIVATE_generateUniqueDebugId(), o = this.So(e, t);
        __PRIVATE_logDebug("RestConnection", `Sending RPC '${e}' ${s2}:`, o, n);
        const _ = {
          "google-cloud-resource-prefix": this.fo,
          "x-goog-request-params": this.po
        };
        return this.bo(_, r2, i), this.Do(e, o, _, n).then((t2) => (__PRIVATE_logDebug("RestConnection", `Received RPC '${e}' ${s2}: `, t2), t2), (t2) => {
          throw __PRIVATE_logWarn("RestConnection", `RPC '${e}' ${s2} failed with error: `, t2, "url: ", o, "request:", n), t2;
        });
      }
      Co(e, t, n, r2, i, s2) {
        return this.wo(e, t, n, r2, i);
      }
      /**
       * Modifies the headers for a request, adding any authorization token if
       * present and any additional headers for the request.
       */
      bo(e, t, n) {
        e["X-Goog-Api-Client"] = // SDK_VERSION is updated to different value at runtime depending on the entry point,
        // so we need to get its value when we need it in a function.
        function __PRIVATE_getGoogApiClientValue() {
          return "gl-js/ fire/" + b;
        }(), // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        e["Content-Type"] = "text/plain", this.databaseInfo.appId && (e["X-Firebase-GMPID"] = this.databaseInfo.appId), t && t.headers.forEach((t2, n2) => e[n2] = t2), n && n.headers.forEach((t2, n2) => e[n2] = t2);
      }
      So(e, t) {
        const n = Ve[e];
        return `${this.mo}/v1/${t}:${n}`;
      }
    } {
      constructor(e) {
        super(e), this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions;
      }
      Do(e, t, n, r2) {
        const i = __PRIVATE_generateUniqueDebugId();
        return new Promise((s2, o) => {
          const _ = new XhrIo();
          _.setWithCredentials(true), _.listenOnce(EventType.COMPLETE, () => {
            try {
              switch (_.getLastErrorCode()) {
                case ErrorCode.NO_ERROR:
                  const t2 = _.getResponseJson();
                  __PRIVATE_logDebug(me, `XHR for RPC '${e}' ${i} received:`, JSON.stringify(t2)), s2(t2);
                  break;
                case ErrorCode.TIMEOUT:
                  __PRIVATE_logDebug(me, `RPC '${e}' ${i} timed out`), o(new FirestoreError(C2.DEADLINE_EXCEEDED, "Request time out"));
                  break;
                case ErrorCode.HTTP_ERROR:
                  const n2 = _.getStatus();
                  if (__PRIVATE_logDebug(me, `RPC '${e}' ${i} failed with status:`, n2, "response text:", _.getResponseText()), n2 > 0) {
                    let e2 = _.getResponseJson();
                    Array.isArray(e2) && (e2 = e2[0]);
                    const t3 = null == e2 ? void 0 : e2.error;
                    if (t3 && t3.status && t3.message) {
                      const e3 = function __PRIVATE_mapCodeFromHttpResponseErrorStatus(e4) {
                        const t4 = e4.toLowerCase().replace(/_/g, "-");
                        return Object.values(C2).indexOf(t4) >= 0 ? t4 : C2.UNKNOWN;
                      }(t3.status);
                      o(new FirestoreError(e3, t3.message));
                    } else
                      o(new FirestoreError(C2.UNKNOWN, "Server responded with status " + _.getStatus()));
                  } else
                    o(new FirestoreError(C2.UNAVAILABLE, "Connection failed."));
                  break;
                default:
                  fail();
              }
            } finally {
              __PRIVATE_logDebug(me, `RPC '${e}' ${i} completed.`);
            }
          });
          const a = JSON.stringify(r2);
          __PRIVATE_logDebug(me, `RPC '${e}' ${i} sending request:`, r2), _.send(t, "POST", a, n, 15);
        });
      }
      vo(e, t, n) {
        const r2 = __PRIVATE_generateUniqueDebugId(), i = [this.mo, "/", "google.firestore.v1.Firestore", "/", e, "/channel"], s2 = createWebChannelTransport(), o = getStatEventTarget(), _ = {
          // Required for backend stickiness, routing behavior is based on this
          // parameter.
          httpSessionIdParam: "gsessionid",
          initMessageHeaders: {},
          messageUrlParams: {
            // This param is used to improve routing and project isolation by the
            // backend and must be included in every request.
            database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
          },
          sendRawJson: true,
          supportsCrossDomainXhr: true,
          internalChannelParams: {
            // Override the default timeout (randomized between 10-20 seconds) since
            // a large write batch on a slow internet connection may take a long
            // time to send to the backend. Rather than have WebChannel impose a
            // tight timeout which could lead to infinite timeouts and retries, we
            // set it very large (5-10 minutes) and rely on the browser's builtin
            // timeouts to kick in if the request isn't working.
            forwardChannelRequestTimeoutMs: 6e5
          },
          forceLongPolling: this.forceLongPolling,
          detectBufferingProxy: this.autoDetectLongPolling
        }, a = this.longPollingOptions.timeoutSeconds;
        void 0 !== a && (_.longPollingTimeout = Math.round(1e3 * a)), this.useFetchStreams && // TODO(b/307942499): switch to `useFetchStreams` once WebChannel is fixed.
        (_.xmlHttpFactory = new FetchXmlHttpFactory({})), this.bo(_.initMessageHeaders, t, n), // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the encodeInitMessageHeaders option to specify that
        // the headers should instead be encoded in the request's POST payload,
        // which is recognized by the webchannel backend.
        _.encodeInitMessageHeaders = true;
        const u = i.join("");
        __PRIVATE_logDebug(me, `Creating RPC '${e}' stream ${r2}: ${u}`, _);
        const c = s2.createWebChannel(u, _);
        let l2 = false, h = false;
        const P2 = new __PRIVATE_StreamBridge({
          co: (t2) => {
            h ? __PRIVATE_logDebug(me, `Not sending because RPC '${e}' stream ${r2} is closed:`, t2) : (l2 || (__PRIVATE_logDebug(me, `Opening RPC '${e}' stream ${r2} transport.`), c.open(), l2 = true), __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} sending:`, t2), c.send(t2));
          },
          lo: () => c.close()
        }), __PRIVATE_unguardedEventListen = (e2, t2, n2) => {
          e2.listen(t2, (e3) => {
            try {
              n2(e3);
            } catch (e4) {
              setTimeout(() => {
                throw e4;
              }, 0);
            }
          });
        };
        return __PRIVATE_unguardedEventListen(c, WebChannel.EventType.OPEN, () => {
          h || __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} transport opened.`);
        }), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.CLOSE, () => {
          h || (h = true, __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} transport closed`), P2.Ro());
        }), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.ERROR, (t2) => {
          h || (h = true, __PRIVATE_logWarn(me, `RPC '${e}' stream ${r2} transport errored:`, t2), P2.Ro(new FirestoreError(C2.UNAVAILABLE, "The operation could not be completed")));
        }), __PRIVATE_unguardedEventListen(c, WebChannel.EventType.MESSAGE, (t2) => {
          var n2;
          if (!h) {
            const i2 = t2.data[0];
            __PRIVATE_hardAssert(!!i2);
            const s3 = i2, o2 = s3.error || (null === (n2 = s3[0]) || void 0 === n2 ? void 0 : n2.error);
            if (o2) {
              __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} received error:`, o2);
              const t3 = o2.status;
              let n3 = (
                /**
                * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
                *
                * @returns The Code equivalent to the given status string or undefined if
                *     there is no match.
                */
                function __PRIVATE_mapCodeFromRpcStatus(e2) {
                  const t4 = ue[e2];
                  if (void 0 !== t4)
                    return __PRIVATE_mapCodeFromRpcCode(t4);
                }(t3)
              ), i3 = o2.message;
              void 0 === n3 && (n3 = C2.INTERNAL, i3 = "Unknown error status: " + t3 + " with message " + o2.message), // Mark closed so no further events are propagated
              h = true, P2.Ro(new FirestoreError(n3, i3)), c.close();
            } else
              __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} received:`, i2), P2.Vo(i2);
          }
        }), __PRIVATE_unguardedEventListen(o, Event.STAT_EVENT, (t2) => {
          t2.stat === Stat.PROXY ? __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} detected buffering proxy`) : t2.stat === Stat.NOPROXY && __PRIVATE_logDebug(me, `RPC '${e}' stream ${r2} detected no buffering proxy`);
        }), setTimeout(() => {
          P2.Ao();
        }, 0), P2;
      }
    };
    __PRIVATE_ExponentialBackoff = class {
      constructor(e, t, n = 1e3, r2 = 1.5, i = 6e4) {
        this.si = e, this.timerId = t, this.Fo = n, this.Mo = r2, this.xo = i, this.Oo = 0, this.No = null, /** The last backoff attempt, as epoch milliseconds. */
        this.Bo = Date.now(), this.reset();
      }
      /**
       * Resets the backoff delay.
       *
       * The very next backoffAndWait() will have no delay. If it is called again
       * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
       * subsequent ones will increase according to the backoffFactor.
       */
      reset() {
        this.Oo = 0;
      }
      /**
       * Resets the backoff delay to the maximum delay (e.g. for use after a
       * RESOURCE_EXHAUSTED error).
       */
      Lo() {
        this.Oo = this.xo;
      }
      /**
       * Returns a promise that resolves after currentDelayMs, and increases the
       * delay for any subsequent attempts. If there was a pending backoff operation
       * already, it will be canceled.
       */
      ko(e) {
        this.cancel();
        const t = Math.floor(this.Oo + this.qo()), n = Math.max(0, Date.now() - this.Bo), r2 = Math.max(0, t - n);
        r2 > 0 && __PRIVATE_logDebug("ExponentialBackoff", `Backing off for ${r2} ms (base delay: ${this.Oo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.No = this.si.enqueueAfterDelay(this.timerId, r2, () => (this.Bo = Date.now(), e())), // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.Oo *= this.Mo, this.Oo < this.Fo && (this.Oo = this.Fo), this.Oo > this.xo && (this.Oo = this.xo);
      }
      Qo() {
        null !== this.No && (this.No.skipDelay(), this.No = null);
      }
      cancel() {
        null !== this.No && (this.No.cancel(), this.No = null);
      }
      /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
      qo() {
        return (Math.random() - 0.5) * this.Oo;
      }
    };
    __PRIVATE_PersistentStream = class {
      constructor(e, t, n, r2, i, s2, o, _) {
        this.si = e, this.Ko = n, this.$o = r2, this.connection = i, this.authCredentialsProvider = s2, this.appCheckCredentialsProvider = o, this.listener = _, this.state = 0, /**
         * A close count that's incremented every time the stream is closed; used by
         * getCloseGuardedDispatcher() to invalidate callbacks that happen after
         * close.
         */
        this.Uo = 0, this.Wo = null, this.Go = null, this.stream = null, this.zo = new __PRIVATE_ExponentialBackoff(e, t);
      }
      /**
       * Returns true if start() has been called and no error has occurred. True
       * indicates the stream is open or in the process of opening (which
       * encompasses respecting backoff, getting auth tokens, and starting the
       * actual RPC). Use isOpen() to determine if the stream is open and ready for
       * outbound requests.
       */
      jo() {
        return 1 === this.state || 5 === this.state || this.Ho();
      }
      /**
       * Returns true if the underlying RPC is open (the onOpen() listener has been
       * called) and the stream is ready for outbound requests.
       */
      Ho() {
        return 2 === this.state || 3 === this.state;
      }
      /**
       * Starts the RPC. Only allowed if isStarted() returns false. The stream is
       * not immediately ready for use: onOpen() will be invoked when the RPC is
       * ready for outbound requests, at which point isOpen() will return true.
       *
       * When start returns, isStarted() will return true.
       */
      start() {
        4 !== this.state ? this.auth() : this.Jo();
      }
      /**
       * Stops the RPC. This call is idempotent and allowed regardless of the
       * current isStarted() state.
       *
       * When stop returns, isStarted() and isOpen() will both return false.
       */
      async stop() {
        this.jo() && await this.close(
          0
          /* PersistentStreamState.Initial */
        );
      }
      /**
       * After an error the stream will usually back off on the next attempt to
       * start it. If the error warrants an immediate restart of the stream, the
       * sender can use this to indicate that the receiver should not back off.
       *
       * Each error will call the onClose() listener. That function can decide to
       * inhibit backoff if required.
       */
      Yo() {
        this.state = 0, this.zo.reset();
      }
      /**
       * Marks this stream as idle. If no further actions are performed on the
       * stream for one minute, the stream will automatically close itself and
       * notify the stream's onClose() handler with Status.OK. The stream will then
       * be in a !isStarted() state, requiring the caller to start the stream again
       * before further use.
       *
       * Only streams that are in state 'Open' can be marked idle, as all other
       * states imply pending network operations.
       */
      Zo() {
        this.Ho() && null === this.Wo && (this.Wo = this.si.enqueueAfterDelay(this.Ko, 6e4, () => this.Xo()));
      }
      /** Sends a message to the underlying stream. */
      e_(e) {
        this.t_(), this.stream.send(e);
      }
      /** Called by the idle timer when the stream should close due to inactivity. */
      async Xo() {
        if (this.Ho())
          return this.close(
            0
            /* PersistentStreamState.Initial */
          );
      }
      /** Marks the stream as active again. */
      t_() {
        this.Wo && (this.Wo.cancel(), this.Wo = null);
      }
      /** Cancels the health check delayed operation. */
      n_() {
        this.Go && (this.Go.cancel(), this.Go = null);
      }
      /**
       * Closes the stream and cleans up as necessary:
       *
       * * closes the underlying GRPC stream;
       * * calls the onClose handler with the given 'error';
       * * sets internal stream state to 'finalState';
       * * adjusts the backoff timer based on the error
       *
       * A new stream can be opened by calling start().
       *
       * @param finalState - the intended state of the stream after closing.
       * @param error - the error the connection was closed with.
       */
      async close(e, t) {
        this.t_(), this.n_(), this.zo.cancel(), // Invalidates any stream-related callbacks (e.g. from auth or the
        // underlying stream), guaranteeing they won't execute.
        this.Uo++, 4 !== e ? (
          // If this is an intentional close ensure we don't delay our next connection attempt.
          this.zo.reset()
        ) : t && t.code === C2.RESOURCE_EXHAUSTED ? (
          // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
          (__PRIVATE_logError(t.toString()), __PRIVATE_logError("Using maximum backoff delay to prevent overloading the backend."), this.zo.Lo())
        ) : t && t.code === C2.UNAUTHENTICATED && 3 !== this.state && // "unauthenticated" error means the token was rejected. This should rarely
        // happen since both Auth and AppCheck ensure a sufficient TTL when we
        // request a token. If a user manually resets their system clock this can
        // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
        // before we received the first message and we need to invalidate the token
        // to ensure that we fetch a new token.
        (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), // Clean up the underlying stream because we are no longer interested in events.
        null !== this.stream && (this.r_(), this.stream.close(), this.stream = null), // This state must be assigned before calling onClose() to allow the callback to
        // inhibit backoff or otherwise manipulate the state in its non-started state.
        this.state = e, // Notify the listener that the stream closed.
        await this.listener.Io(t);
      }
      /**
       * Can be overridden to perform additional cleanup before the stream is closed.
       * Calling super.tearDown() is not required.
       */
      r_() {
      }
      auth() {
        this.state = 1;
        const e = this.i_(this.Uo), t = this.Uo;
        Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([e2, n]) => {
          this.Uo === t && // Normally we'd have to schedule the callback on the AsyncQueue.
          // However, the following calls are safe to be called outside the
          // AsyncQueue since they don't chain asynchronous calls
          this.s_(e2, n);
        }, (t2) => {
          e(() => {
            const e2 = new FirestoreError(C2.UNKNOWN, "Fetching auth token failed: " + t2.message);
            return this.o_(e2);
          });
        });
      }
      s_(e, t) {
        const n = this.i_(this.Uo);
        this.stream = this.__(e, t), this.stream.ho(() => {
          n(() => (this.state = 2, this.Go = this.si.enqueueAfterDelay(this.$o, 1e4, () => (this.Ho() && (this.state = 3), Promise.resolve())), this.listener.ho()));
        }), this.stream.Io((e2) => {
          n(() => this.o_(e2));
        }), this.stream.onMessage((e2) => {
          n(() => this.onMessage(e2));
        });
      }
      Jo() {
        this.state = 5, this.zo.ko(async () => {
          this.state = 0, this.start();
        });
      }
      // Visible for tests
      o_(e) {
        return __PRIVATE_logDebug("PersistentStream", `close with error: ${e}`), this.stream = null, this.close(4, e);
      }
      /**
       * Returns a "dispatcher" function that dispatches operations onto the
       * AsyncQueue but only runs them if closeCount remains unchanged. This allows
       * us to turn auth / stream callbacks into no-ops if the stream is closed /
       * re-opened, etc.
       */
      i_(e) {
        return (t) => {
          this.si.enqueueAndForget(() => this.Uo === e ? t() : (__PRIVATE_logDebug("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()));
        };
      }
    };
    __PRIVATE_PersistentListenStream = class extends __PRIVATE_PersistentStream {
      constructor(e, t, n, r2, i, s2) {
        super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, n, r2, s2), this.serializer = i;
      }
      __(e, t) {
        return this.connection.vo("Listen", e, t);
      }
      onMessage(e) {
        this.zo.reset();
        const t = __PRIVATE_fromWatchChange(this.serializer, e), n = function __PRIVATE_versionFromListenResponse(e2) {
          if (!("targetChange" in e2))
            return SnapshotVersion.min();
          const t2 = e2.targetChange;
          return t2.targetIds && t2.targetIds.length ? SnapshotVersion.min() : t2.readTime ? __PRIVATE_fromVersion(t2.readTime) : SnapshotVersion.min();
        }(e);
        return this.listener.a_(t, n);
      }
      /**
       * Registers interest in the results of the given target. If the target
       * includes a resumeToken it will be included in the request. Results that
       * affect the target will be streamed back as WatchChange messages that
       * reference the targetId.
       */
      u_(e) {
        const t = {};
        t.database = __PRIVATE_getEncodedDatabaseId(this.serializer), t.addTarget = function __PRIVATE_toTarget(e2, t2) {
          let n2;
          const r2 = t2.target;
          if (n2 = __PRIVATE_targetIsDocumentTarget(r2) ? {
            documents: __PRIVATE_toDocumentsTarget(e2, r2)
          } : {
            query: __PRIVATE_toQueryTarget(e2, r2)
          }, n2.targetId = t2.targetId, t2.resumeToken.approximateByteSize() > 0) {
            n2.resumeToken = __PRIVATE_toBytes(e2, t2.resumeToken);
            const r3 = __PRIVATE_toInt32Proto(e2, t2.expectedCount);
            null !== r3 && (n2.expectedCount = r3);
          } else if (t2.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
            n2.readTime = toTimestamp(e2, t2.snapshotVersion.toTimestamp());
            const r3 = __PRIVATE_toInt32Proto(e2, t2.expectedCount);
            null !== r3 && (n2.expectedCount = r3);
          }
          return n2;
        }(this.serializer, e);
        const n = __PRIVATE_toListenRequestLabels(this.serializer, e);
        n && (t.labels = n), this.e_(t);
      }
      /**
       * Unregisters interest in the results of the target associated with the
       * given targetId.
       */
      c_(e) {
        const t = {};
        t.database = __PRIVATE_getEncodedDatabaseId(this.serializer), t.removeTarget = e, this.e_(t);
      }
    };
    __PRIVATE_DatastoreImpl = class extends class Datastore {
    } {
      constructor(e, t, n, r2) {
        super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r2, this.d_ = false;
      }
      A_() {
        if (this.d_)
          throw new FirestoreError(C2.FAILED_PRECONDITION, "The client has already been terminated.");
      }
      /** Invokes the provided RPC with auth and AppCheck tokens. */
      wo(e, t, n) {
        return this.A_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([r2, i]) => this.connection.wo(e, t, n, r2, i)).catch((e2) => {
          throw "FirebaseError" === e2.name ? (e2.code === C2.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e2) : new FirestoreError(C2.UNKNOWN, e2.toString());
        });
      }
      /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */
      Co(e, t, n, r2) {
        return this.A_(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([i, s2]) => this.connection.Co(e, t, n, i, s2, r2)).catch((e2) => {
          throw "FirebaseError" === e2.name ? (e2.code === C2.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e2) : new FirestoreError(C2.UNKNOWN, e2.toString());
        });
      }
      terminate() {
        this.d_ = true;
      }
    };
    __PRIVATE_OnlineStateTracker = class {
      constructor(e, t) {
        this.asyncQueue = e, this.onlineStateHandler = t, /** The current OnlineState. */
        this.state = "Unknown", /**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */
        this.V_ = 0, /**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */
        this.m_ = null, /**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */
        this.f_ = true;
      }
      /**
       * Called by RemoteStore when a watch stream is started (including on each
       * backoff attempt).
       *
       * If this is the first attempt, it sets the OnlineState to Unknown and starts
       * the onlineStateTimer.
       */
      g_() {
        0 === this.V_ && (this.p_(
          "Unknown"
          /* OnlineState.Unknown */
        ), this.m_ = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.m_ = null, this.y_("Backend didn't respond within 10 seconds."), this.p_(
          "Offline"
          /* OnlineState.Offline */
        ), Promise.resolve())));
      }
      /**
       * Updates our OnlineState as appropriate after the watch stream reports a
       * failure. The first failure moves us to the 'Unknown' state. We then may
       * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
       * actually transition to the 'Offline' state.
       */
      w_(e) {
        "Online" === this.state ? this.p_(
          "Unknown"
          /* OnlineState.Unknown */
        ) : (this.V_++, this.V_ >= 1 && (this.S_(), this.y_(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.p_(
          "Offline"
          /* OnlineState.Offline */
        )));
      }
      /**
       * Explicitly sets the OnlineState to the specified state.
       *
       * Note that this resets our timers / failure counters, etc. used by our
       * Offline heuristics, so must not be used in place of
       * handleWatchStreamStart() and handleWatchStreamFailure().
       */
      set(e) {
        this.S_(), this.V_ = 0, "Online" === e && // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        (this.f_ = false), this.p_(e);
      }
      p_(e) {
        e !== this.state && (this.state = e, this.onlineStateHandler(e));
      }
      y_(e) {
        const t = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.f_ ? (__PRIVATE_logError(t), this.f_ = false) : __PRIVATE_logDebug("OnlineStateTracker", t);
      }
      S_() {
        null !== this.m_ && (this.m_.cancel(), this.m_ = null);
      }
    };
    __PRIVATE_RemoteStoreImpl = class {
      constructor(e, t, n, r2, i) {
        this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, /**
         * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
         * LocalStore via fillWritePipeline() and have or will send to the write
         * stream.
         *
         * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
         * restart the write stream. When the stream is established the writes in the
         * pipeline will be sent in order.
         *
         * Writes remain in writePipeline until they are acknowledged by the backend
         * and thus will automatically be re-sent if the stream is interrupted /
         * restarted before they're acknowledged.
         *
         * Write responses from the backend are linked to their originating request
         * purely based on order, and so we can just shift() writes from the front of
         * the writePipeline as we receive responses.
         */
        this.b_ = [], /**
         * A mapping of watched targets that the client cares about tracking and the
         * user has explicitly called a 'listen' for this target.
         *
         * These targets may or may not have been sent to or acknowledged by the
         * server. On re-establishing the listen stream, these targets should be sent
         * to the server. The targets removed with unlistens are removed eagerly
         * without waiting for confirmation from the listen stream.
         */
        this.D_ = /* @__PURE__ */ new Map(), /**
         * A set of reasons for why the RemoteStore may be offline. If empty, the
         * RemoteStore may start its network connections.
         */
        this.C_ = /* @__PURE__ */ new Set(), /**
         * Event handlers that get called when the network is disabled or enabled.
         *
         * PORTING NOTE: These functions are used on the Web client to create the
         * underlying streams (to support tree-shakeable streams). On Android and iOS,
         * the streams are created during construction of RemoteStore.
         */
        this.v_ = [], this.F_ = i, this.F_.ro((e2) => {
          n.enqueueAndForget(async () => {
            __PRIVATE_canUseNetwork(this) && (__PRIVATE_logDebug("RemoteStore", "Restarting streams for network reachability change."), await async function __PRIVATE_restartNetwork(e3) {
              const t2 = __PRIVATE_debugCast(e3);
              t2.C_.add(
                4
                /* OfflineCause.ConnectivityChange */
              ), await __PRIVATE_disableNetworkInternal(t2), t2.M_.set(
                "Unknown"
                /* OnlineState.Unknown */
              ), t2.C_.delete(
                4
                /* OfflineCause.ConnectivityChange */
              ), await __PRIVATE_enableNetworkInternal(t2);
            }(this));
          });
        }), this.M_ = new __PRIVATE_OnlineStateTracker(n, r2);
      }
    };
    DelayedOperation = class _DelayedOperation {
      constructor(e, t, n, r2, i) {
        this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r2, this.removalCallback = i, this.deferred = new __PRIVATE_Deferred(), this.then = this.deferred.promise.then.bind(this.deferred.promise), // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch((e2) => {
        });
      }
      get promise() {
        return this.deferred.promise;
      }
      /**
       * Creates and returns a DelayedOperation that has been scheduled to be
       * executed on the provided asyncQueue after the provided delayMs.
       *
       * @param asyncQueue - The queue to schedule the operation on.
       * @param id - A Timer ID identifying the type of operation this is.
       * @param delayMs - The delay (ms) before the operation should be scheduled.
       * @param op - The operation to run.
       * @param removalCallback - A callback to be called synchronously once the
       *   operation is executed or canceled, notifying the AsyncQueue to remove it
       *   from its delayedOperations list.
       *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
       *   the DelayedOperation class public.
       */
      static createAndSchedule(e, t, n, r2, i) {
        const s2 = Date.now() + n, o = new _DelayedOperation(e, t, s2, r2, i);
        return o.start(n), o;
      }
      /**
       * Starts the timer. This is called immediately after construction by
       * createAndSchedule().
       */
      start(e) {
        this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
      }
      /**
       * Queues the operation to run immediately (if it hasn't already been run or
       * canceled).
       */
      skipDelay() {
        return this.handleDelayElapsed();
      }
      /**
       * Cancels the operation if it hasn't already been executed or canceled. The
       * promise will be rejected.
       *
       * As long as the operation has not yet been run, calling cancel() provides a
       * guarantee that the operation will not be run.
       */
      cancel(e) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new FirestoreError(C2.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))));
      }
      handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e))) : Promise.resolve());
      }
      clearTimeout() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
      }
    };
    DocumentSet = class _DocumentSet {
      /** The default ordering is by key if the comparator is omitted */
      constructor(e) {
        this.comparator = e ? (t, n) => e(t, n) || DocumentKey.comparator(t.key, n.key) : (e2, t) => DocumentKey.comparator(e2.key, t.key), this.keyedMap = documentMap(), this.sortedSet = new SortedMap(this.comparator);
      }
      /**
       * Returns an empty copy of the existing DocumentSet, using the same
       * comparator.
       */
      static emptySet(e) {
        return new _DocumentSet(e.comparator);
      }
      has(e) {
        return null != this.keyedMap.get(e);
      }
      get(e) {
        return this.keyedMap.get(e);
      }
      first() {
        return this.sortedSet.minKey();
      }
      last() {
        return this.sortedSet.maxKey();
      }
      isEmpty() {
        return this.sortedSet.isEmpty();
      }
      /**
       * Returns the index of the provided key in the document set, or -1 if the
       * document key is not present in the set;
       */
      indexOf(e) {
        const t = this.keyedMap.get(e);
        return t ? this.sortedSet.indexOf(t) : -1;
      }
      get size() {
        return this.sortedSet.size;
      }
      /** Iterates documents in order defined by "comparator" */
      forEach(e) {
        this.sortedSet.inorderTraversal((t, n) => (e(t), false));
      }
      /** Inserts or updates a document with the same key */
      add(e) {
        const t = this.delete(e.key);
        return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
      }
      /** Deletes a document with a given key */
      delete(e) {
        const t = this.get(e);
        return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this;
      }
      isEqual(e) {
        if (!(e instanceof _DocumentSet))
          return false;
        if (this.size !== e.size)
          return false;
        const t = this.sortedSet.getIterator(), n = e.sortedSet.getIterator();
        for (; t.hasNext(); ) {
          const e2 = t.getNext().key, r2 = n.getNext().key;
          if (!e2.isEqual(r2))
            return false;
        }
        return true;
      }
      toString() {
        const e = [];
        return this.forEach((t) => {
          e.push(t.toString());
        }), 0 === e.length ? "DocumentSet ()" : "DocumentSet (\n  " + e.join("  \n") + "\n)";
      }
      copy(e, t) {
        const n = new _DocumentSet();
        return n.comparator = this.comparator, n.keyedMap = e, n.sortedSet = t, n;
      }
    };
    __PRIVATE_DocumentChangeSet = class {
      constructor() {
        this.B_ = new SortedMap(DocumentKey.comparator);
      }
      track(e) {
        const t = e.doc.key, n = this.B_.get(t);
        n ? (
          // Merge the new change with the existing change.
          0 !== e.type && 3 === n.type ? this.B_ = this.B_.insert(t, e) : 3 === e.type && 1 !== n.type ? this.B_ = this.B_.insert(t, {
            type: n.type,
            doc: e.doc
          }) : 2 === e.type && 2 === n.type ? this.B_ = this.B_.insert(t, {
            type: 2,
            doc: e.doc
          }) : 2 === e.type && 0 === n.type ? this.B_ = this.B_.insert(t, {
            type: 0,
            doc: e.doc
          }) : 1 === e.type && 0 === n.type ? this.B_ = this.B_.remove(t) : 1 === e.type && 2 === n.type ? this.B_ = this.B_.insert(t, {
            type: 1,
            doc: n.doc
          }) : 0 === e.type && 1 === n.type ? this.B_ = this.B_.insert(t, {
            type: 2,
            doc: e.doc
          }) : (
            // This includes these cases, which don't make sense:
            // Added->Added
            // Removed->Removed
            // Modified->Added
            // Removed->Modified
            // Metadata->Added
            // Removed->Metadata
            fail()
          )
        ) : this.B_ = this.B_.insert(t, e);
      }
      L_() {
        const e = [];
        return this.B_.inorderTraversal((t, n) => {
          e.push(n);
        }), e;
      }
    };
    ViewSnapshot = class _ViewSnapshot {
      constructor(e, t, n, r2, i, s2, o, _, a) {
        this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = r2, this.mutatedKeys = i, this.fromCache = s2, this.syncStateChanged = o, this.excludesMetadataChanges = _, this.hasCachedResults = a;
      }
      /** Returns a view snapshot as if all documents in the snapshot were added. */
      static fromInitialDocuments(e, t, n, r2, i) {
        const s2 = [];
        return t.forEach((e2) => {
          s2.push({
            type: 0,
            doc: e2
          });
        }), new _ViewSnapshot(
          e,
          t,
          DocumentSet.emptySet(t),
          s2,
          n,
          r2,
          /* syncStateChanged= */
          true,
          /* excludesMetadataChanges= */
          false,
          i
        );
      }
      get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
      }
      isEqual(e) {
        if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && __PRIVATE_queryEquals(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs)))
          return false;
        const t = this.docChanges, n = e.docChanges;
        if (t.length !== n.length)
          return false;
        for (let e2 = 0; e2 < t.length; e2++)
          if (t[e2].type !== n[e2].type || !t[e2].doc.isEqual(n[e2].doc))
            return false;
        return true;
      }
    };
    __PRIVATE_QueryListenersInfo = class {
      constructor() {
        this.k_ = void 0, this.listeners = [];
      }
    };
    __PRIVATE_EventManagerImpl = class {
      constructor() {
        this.queries = new ObjectMap((e) => __PRIVATE_canonifyQuery(e), __PRIVATE_queryEquals), this.onlineState = "Unknown", this.q_ = /* @__PURE__ */ new Set();
      }
    };
    __PRIVATE_QueryListener = class {
      constructor(e, t, n) {
        this.query = e, this.U_ = t, /**
         * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
         * observer. This flag is set to true once we've actually raised an event.
         */
        this.W_ = false, this.G_ = null, this.onlineState = "Unknown", this.options = n || {};
      }
      /**
       * Applies the new ViewSnapshot to this listener, raising a user-facing event
       * if applicable (depending on what changed, whether the user has opted into
       * metadata-only changes, etc.). Returns true if a user-facing event was
       * indeed raised.
       */
      K_(e) {
        if (!this.options.includeMetadataChanges) {
          const t2 = [];
          for (const n of e.docChanges)
            3 !== n.type && t2.push(n);
          e = new ViewSnapshot(
            e.query,
            e.docs,
            e.oldDocs,
            t2,
            e.mutatedKeys,
            e.fromCache,
            e.syncStateChanged,
            /* excludesMetadataChanges= */
            true,
            e.hasCachedResults
          );
        }
        let t = false;
        return this.W_ ? this.z_(e) && (this.U_.next(e), t = true) : this.j_(e, this.onlineState) && (this.H_(e), t = true), this.G_ = e, t;
      }
      onError(e) {
        this.U_.error(e);
      }
      /** Returns whether a snapshot was raised. */
      Q_(e) {
        this.onlineState = e;
        let t = false;
        return this.G_ && !this.W_ && this.j_(this.G_, e) && (this.H_(this.G_), t = true), t;
      }
      j_(e, t) {
        if (!e.fromCache)
          return true;
        const n = "Offline" !== t;
        return (!this.options.J_ || !n) && (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t);
      }
      z_(e) {
        if (e.docChanges.length > 0)
          return true;
        const t = this.G_ && this.G_.hasPendingWrites !== e.hasPendingWrites;
        return !(!e.syncStateChanged && !t) && true === this.options.includeMetadataChanges;
      }
      H_(e) {
        e = ViewSnapshot.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.W_ = true, this.U_.next(e);
      }
    };
    __PRIVATE_AddedLimboDocument = class {
      constructor(e) {
        this.key = e;
      }
    };
    __PRIVATE_RemovedLimboDocument = class {
      constructor(e) {
        this.key = e;
      }
    };
    __PRIVATE_View = class {
      constructor(e, t) {
        this.query = e, this.ia = t, this.sa = null, this.hasCachedResults = false, /**
         * A flag whether the view is current with the backend. A view is considered
         * current after it has seen the current flag from the backend and did not
         * lose consistency within the watch stream (e.g. because of an existence
         * filter mismatch).
         */
        this.current = false, /** Documents in the view but not in the remote target */
        this.oa = __PRIVATE_documentKeySet(), /** Document Keys that have local changes */
        this.mutatedKeys = __PRIVATE_documentKeySet(), this._a = __PRIVATE_newQueryComparator(e), this.aa = new DocumentSet(this._a);
      }
      /**
       * The set of remote documents that the server has told us belongs to the target associated with
       * this view.
       */
      get ua() {
        return this.ia;
      }
      /**
       * Iterates over a set of doc changes, applies the query limit, and computes
       * what the new results should be, what the changes were, and whether we may
       * need to go back to the local cache for more results. Does not make any
       * changes to the view.
       * @param docChanges - The doc changes to apply to this view.
       * @param previousChanges - If this is being called with a refill, then start
       *        with this set of docs and changes instead of the current view.
       * @returns a new set of docs, changes, and refill flag.
       */
      ca(e, t) {
        const n = t ? t.la : new __PRIVATE_DocumentChangeSet(), r2 = t ? t.aa : this.aa;
        let i = t ? t.mutatedKeys : this.mutatedKeys, s2 = r2, o = false;
        const _ = "F" === this.query.limitType && r2.size === this.query.limit ? r2.last() : null, a = "L" === this.query.limitType && r2.size === this.query.limit ? r2.first() : null;
        if (e.inorderTraversal((e2, t2) => {
          const u = r2.get(e2), c = __PRIVATE_queryMatches(this.query, t2) ? t2 : null, l2 = !!u && this.mutatedKeys.has(u.key), h = !!c && (c.hasLocalMutations || // We only consider committed mutations for documents that were
          // mutated during the lifetime of the view.
          this.mutatedKeys.has(c.key) && c.hasCommittedMutations);
          let P2 = false;
          if (u && c) {
            u.data.isEqual(c.data) ? l2 !== h && (n.track({
              type: 3,
              doc: c
            }), P2 = true) : this.ha(u, c) || (n.track({
              type: 2,
              doc: c
            }), P2 = true, (_ && this._a(c, _) > 0 || a && this._a(c, a) < 0) && // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            (o = true));
          } else
            !u && c ? (n.track({
              type: 0,
              doc: c
            }), P2 = true) : u && !c && (n.track({
              type: 1,
              doc: u
            }), P2 = true, (_ || a) && // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            (o = true));
          P2 && (c ? (s2 = s2.add(c), i = h ? i.add(e2) : i.delete(e2)) : (s2 = s2.delete(e2), i = i.delete(e2)));
        }), null !== this.query.limit)
          for (; s2.size > this.query.limit; ) {
            const e2 = "F" === this.query.limitType ? s2.last() : s2.first();
            s2 = s2.delete(e2.key), i = i.delete(e2.key), n.track({
              type: 1,
              doc: e2
            });
          }
        return {
          aa: s2,
          la: n,
          Zi: o,
          mutatedKeys: i
        };
      }
      ha(e, t) {
        return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations;
      }
      /**
       * Updates the view with the given ViewDocumentChanges and optionally updates
       * limbo docs and sync state from the provided target change.
       * @param docChanges - The set of changes to make to the view's docs.
       * @param updateLimboDocuments - Whether to update limbo documents based on
       *        this change.
       * @param targetChange - A target change to apply for computing limbo docs and
       *        sync state.
       * @returns A new ViewChange with the given docs, changes, and sync state.
       */
      // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
      applyChanges(e, t, n) {
        const r2 = this.aa;
        this.aa = e.aa, this.mutatedKeys = e.mutatedKeys;
        const i = e.la.L_();
        i.sort((e2, t2) => function __PRIVATE_compareChangeType(e3, t3) {
          const order = (e4) => {
            switch (e4) {
              case 0:
                return 1;
              case 2:
              case 3:
                return 2;
              case 1:
                return 0;
              default:
                return fail();
            }
          };
          return order(e3) - order(t3);
        }(e2.type, t2.type) || this._a(e2.doc, t2.doc)), this.Pa(n);
        const s2 = t ? this.Ia() : [], o = 0 === this.oa.size && this.current ? 1 : 0, _ = o !== this.sa;
        if (this.sa = o, 0 !== i.length || _) {
          return {
            snapshot: new ViewSnapshot(
              this.query,
              e.aa,
              r2,
              i,
              e.mutatedKeys,
              0 === o,
              _,
              /* excludesMetadataChanges= */
              false,
              !!n && n.resumeToken.approximateByteSize() > 0
            ),
            Ta: s2
          };
        }
        return {
          Ta: s2
        };
      }
      /**
       * Applies an OnlineState change to the view, potentially generating a
       * ViewChange if the view's syncState changes as a result.
       */
      Q_(e) {
        return this.current && "Offline" === e ? (
          // If we're offline, set `current` to false and then call applyChanges()
          // to refresh our syncState and generate a ViewChange as appropriate. We
          // are guaranteed to get a new TargetChange that sets `current` back to
          // true once the client is back online.
          (this.current = false, this.applyChanges(
            {
              aa: this.aa,
              la: new __PRIVATE_DocumentChangeSet(),
              mutatedKeys: this.mutatedKeys,
              Zi: false
            },
            /* updateLimboDocuments= */
            false
          ))
        ) : {
          Ta: []
        };
      }
      /**
       * Returns whether the doc for the given key should be in limbo.
       */
      Ea(e) {
        return !this.ia.has(e) && // The local store doesn't think it's a result, so it shouldn't be in limbo.
        (!!this.aa.has(e) && !this.aa.get(e).hasLocalMutations);
      }
      /**
       * Updates syncedDocuments, current, and limbo docs based on the given change.
       * Returns the list of changes to which docs are in limbo.
       */
      Pa(e) {
        e && (e.addedDocuments.forEach((e2) => this.ia = this.ia.add(e2)), e.modifiedDocuments.forEach((e2) => {
        }), e.removedDocuments.forEach((e2) => this.ia = this.ia.delete(e2)), this.current = e.current);
      }
      Ia() {
        if (!this.current)
          return [];
        const e = this.oa;
        this.oa = __PRIVATE_documentKeySet(), this.aa.forEach((e2) => {
          this.Ea(e2.key) && (this.oa = this.oa.add(e2.key));
        });
        const t = [];
        return e.forEach((e2) => {
          this.oa.has(e2) || t.push(new __PRIVATE_RemovedLimboDocument(e2));
        }), this.oa.forEach((n) => {
          e.has(n) || t.push(new __PRIVATE_AddedLimboDocument(n));
        }), t;
      }
      /**
       * Update the in-memory state of the current view with the state read from
       * persistence.
       *
       * We update the query view whenever a client's primary status changes:
       * - When a client transitions from primary to secondary, it can miss
       *   LocalStorage updates and its query views may temporarily not be
       *   synchronized with the state on disk.
       * - For secondary to primary transitions, the client needs to update the list
       *   of `syncedDocuments` since secondary clients update their query views
       *   based purely on synthesized RemoteEvents.
       *
       * @param queryResult.documents - The documents that match the query according
       * to the LocalStore.
       * @param queryResult.remoteKeys - The keys of the documents that match the
       * query according to the backend.
       *
       * @returns The ViewChange that resulted from this synchronization.
       */
      // PORTING NOTE: Multi-tab only.
      da(e) {
        this.ia = e.ls, this.oa = __PRIVATE_documentKeySet();
        const t = this.ca(e.documents);
        return this.applyChanges(
          t,
          /*updateLimboDocuments=*/
          true
        );
      }
      /**
       * Returns a view snapshot as if this query was just listened to. Contains
       * a document add for every existing document and the `fromCache` and
       * `hasPendingWrites` status of the already established view.
       */
      // PORTING NOTE: Multi-tab only.
      Aa() {
        return ViewSnapshot.fromInitialDocuments(this.query, this.aa, this.mutatedKeys, 0 === this.sa, this.hasCachedResults);
      }
    };
    __PRIVATE_QueryView = class {
      constructor(e, t, n) {
        this.query = e, this.targetId = t, this.view = n;
      }
    };
    LimboResolution = class {
      constructor(e) {
        this.key = e, /**
         * Set to true once we've received a document. This is used in
         * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
         * decide whether it needs to manufacture a delete event for the target once
         * the target is CURRENT.
         */
        this.Ra = false;
      }
    };
    __PRIVATE_SyncEngineImpl = class {
      constructor(e, t, n, r2, i, s2) {
        this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r2, this.currentUser = i, this.maxConcurrentLimboResolutions = s2, this.Va = {}, this.ma = new ObjectMap((e2) => __PRIVATE_canonifyQuery(e2), __PRIVATE_queryEquals), this.fa = /* @__PURE__ */ new Map(), /**
         * The keys of documents that are in limbo for which we haven't yet started a
         * limbo resolution query. The strings in this set are the result of calling
         * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
         *
         * The `Set` type was chosen because it provides efficient lookup and removal
         * of arbitrary elements and it also maintains insertion order, providing the
         * desired queue-like FIFO semantics.
         */
        this.ga = /* @__PURE__ */ new Set(), /**
         * Keeps track of the target ID for each document that is in limbo with an
         * active target.
         */
        this.pa = new SortedMap(DocumentKey.comparator), /**
         * Keeps track of the information about an active limbo resolution for each
         * active target ID that was started for the purpose of limbo resolution.
         */
        this.ya = /* @__PURE__ */ new Map(), this.wa = new __PRIVATE_ReferenceSet(), /** Stores user completion handlers, indexed by User and BatchId. */
        this.Sa = {}, /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.ba = /* @__PURE__ */ new Map(), this.Da = __PRIVATE_TargetIdGenerator.Nn(), this.onlineState = "Unknown", // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.Ca = void 0;
      }
      get isPrimaryClient() {
        return true === this.Ca;
      }
    };
    MemoryOfflineComponentProvider = class {
      constructor() {
        this.synchronizeTabs = false;
      }
      async initialize(e) {
        this.serializer = __PRIVATE_newSerializer(e.databaseInfo.databaseId), this.sharedClientState = this.createSharedClientState(e), this.persistence = this.createPersistence(e), await this.persistence.start(), this.localStore = this.createLocalStore(e), this.gcScheduler = this.createGarbageCollectionScheduler(e, this.localStore), this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(e, this.localStore);
      }
      createGarbageCollectionScheduler(e, t) {
        return null;
      }
      createIndexBackfillerScheduler(e, t) {
        return null;
      }
      createLocalStore(e) {
        return __PRIVATE_newLocalStore(this.persistence, new __PRIVATE_QueryEngine(), e.initialUser, this.serializer);
      }
      createPersistence(e) {
        return new __PRIVATE_MemoryPersistence(__PRIVATE_MemoryEagerDelegate.jr, this.serializer);
      }
      createSharedClientState(e) {
        return new __PRIVATE_MemorySharedClientState();
      }
      async terminate() {
        this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), await this.persistence.shutdown();
      }
    };
    OnlineComponentProvider = class {
      async initialize(e, t) {
        this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(
          t,
          /* startAsPrimary=*/
          !e.synchronizeTabs
        ), this.sharedClientState.onlineStateHandler = (e2) => __PRIVATE_syncEngineApplyOnlineStateChange(
          this.syncEngine,
          e2,
          1
          /* OnlineStateSource.SharedClientState */
        ), this.remoteStore.remoteSyncer.handleCredentialChange = __PRIVATE_syncEngineHandleCredentialChange.bind(null, this.syncEngine), await __PRIVATE_remoteStoreApplyPrimaryState(this.remoteStore, this.syncEngine.isPrimaryClient));
      }
      createEventManager(e) {
        return function __PRIVATE_newEventManager() {
          return new __PRIVATE_EventManagerImpl();
        }();
      }
      createDatastore(e) {
        const t = __PRIVATE_newSerializer(e.databaseInfo.databaseId), n = function __PRIVATE_newConnection(e2) {
          return new __PRIVATE_WebChannelConnection(e2);
        }(e.databaseInfo);
        return function __PRIVATE_newDatastore(e2, t2, n2, r2) {
          return new __PRIVATE_DatastoreImpl(e2, t2, n2, r2);
        }(e.authCredentials, e.appCheckCredentials, n, t);
      }
      createRemoteStore(e) {
        return function __PRIVATE_newRemoteStore(e2, t, n, r2, i) {
          return new __PRIVATE_RemoteStoreImpl(e2, t, n, r2, i);
        }(this.localStore, this.datastore, e.asyncQueue, (e2) => __PRIVATE_syncEngineApplyOnlineStateChange(
          this.syncEngine,
          e2,
          0
          /* OnlineStateSource.RemoteStore */
        ), function __PRIVATE_newConnectivityMonitor() {
          return __PRIVATE_BrowserConnectivityMonitor.D() ? new __PRIVATE_BrowserConnectivityMonitor() : new __PRIVATE_NoopConnectivityMonitor();
        }());
      }
      createSyncEngine(e, t) {
        return function __PRIVATE_newSyncEngine(e2, t2, n, r2, i, s2, o) {
          const _ = new __PRIVATE_SyncEngineImpl(e2, t2, n, r2, i, s2);
          return o && (_.Ca = true), _;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t);
      }
      terminate() {
        return async function __PRIVATE_remoteStoreShutdown(e) {
          const t = __PRIVATE_debugCast(e);
          __PRIVATE_logDebug("RemoteStore", "RemoteStore shutting down."), t.C_.add(
            5
            /* OfflineCause.Shutdown */
          ), await __PRIVATE_disableNetworkInternal(t), t.F_.shutdown(), // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
          // triggering spurious listener events with cached data, etc.
          t.M_.set(
            "Unknown"
            /* OnlineState.Unknown */
          );
        }(this.remoteStore);
      }
    };
    __PRIVATE_AsyncObserver = class {
      constructor(e) {
        this.observer = e, /**
         * When set to true, will not raise future events. Necessary to deal with
         * async detachment of listener.
         */
        this.muted = false;
      }
      next(e) {
        this.observer.next && this.Oa(this.observer.next, e);
      }
      error(e) {
        this.observer.error ? this.Oa(this.observer.error, e) : __PRIVATE_logError("Uncaught Error in snapshot listener:", e.toString());
      }
      Na() {
        this.muted = true;
      }
      Oa(e, t) {
        this.muted || setTimeout(() => {
          this.muted || e(t);
        }, 0);
      }
    };
    FirestoreClient = class {
      constructor(e, t, n, r2) {
        this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this.databaseInfo = r2, this.user = User.UNAUTHENTICATED, this.clientId = __PRIVATE_AutoId.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, async (e2) => {
          __PRIVATE_logDebug("FirestoreClient", "Received user=", e2.uid), await this.authCredentialListener(e2), this.user = e2;
        }), this.appCheckCredentials.start(n, (e2) => (__PRIVATE_logDebug("FirestoreClient", "Received new app check token=", e2), this.appCheckCredentialListener(e2, this.user)));
      }
      async getConfiguration() {
        return {
          asyncQueue: this.asyncQueue,
          databaseInfo: this.databaseInfo,
          clientId: this.clientId,
          authCredentials: this.authCredentials,
          appCheckCredentials: this.appCheckCredentials,
          initialUser: this.user,
          maxConcurrentLimboResolutions: 100
        };
      }
      setCredentialChangeListener(e) {
        this.authCredentialListener = e;
      }
      setAppCheckTokenChangeListener(e) {
        this.appCheckCredentialListener = e;
      }
      /**
       * Checks that the client has not been terminated. Ensures that other methods on //
       * this class cannot be called after the client is terminated. //
       */
      verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown)
          throw new FirestoreError(C2.FAILED_PRECONDITION, "The client has already been terminated.");
      }
      terminate() {
        this.asyncQueue.enterRestrictedMode();
        const e = new __PRIVATE_Deferred();
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
          try {
            this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), // The credentials provider must be terminated after shutting down the
            // RemoteStore as it will prevent the RemoteStore from retrieving auth
            // tokens.
            this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), e.resolve();
          } catch (t) {
            const n = __PRIVATE_wrapInUserErrorIfRecoverable(t, "Failed to shutdown persistence");
            e.reject(n);
          }
        }), e.promise;
      }
    };
    fe = /* @__PURE__ */ new Map();
    FirestoreSettingsImpl = class {
      constructor(e) {
        var t, n;
        if (void 0 === e.host) {
          if (void 0 !== e.ssl)
            throw new FirestoreError(C2.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
          this.host = "firestore.googleapis.com", this.ssl = true;
        } else
          this.host = e.host, this.ssl = null === (t = e.ssl) || void 0 === t || t;
        if (this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, void 0 === e.cacheSizeBytes)
          this.cacheSizeBytes = 41943040;
        else {
          if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
            throw new FirestoreError(C2.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
          this.cacheSizeBytes = e.cacheSizeBytes;
        }
        __PRIVATE_validateIsNotUsedTogether("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = false : void 0 === e.experimentalAutoDetectLongPolling ? this.experimentalAutoDetectLongPolling = true : (
          // For backwards compatibility, coerce the value to boolean even though
          // the TypeScript compiler has narrowed the type to boolean already.
          // noinspection PointlessBooleanExpressionJS
          this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling
        ), this.experimentalLongPollingOptions = __PRIVATE_cloneLongPollingOptions(null !== (n = e.experimentalLongPollingOptions) && void 0 !== n ? n : {}), function __PRIVATE_validateLongPollingOptions(e2) {
          if (void 0 !== e2.timeoutSeconds) {
            if (isNaN(e2.timeoutSeconds))
              throw new FirestoreError(C2.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (must not be NaN)`);
            if (e2.timeoutSeconds < 5)
              throw new FirestoreError(C2.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (minimum allowed value is 5)`);
            if (e2.timeoutSeconds > 30)
              throw new FirestoreError(C2.INVALID_ARGUMENT, `invalid long polling timeout: ${e2.timeoutSeconds} (maximum allowed value is 30)`);
          }
        }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams;
      }
      isEqual(e) {
        return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && function __PRIVATE_longPollingOptionsEqual(e2, t) {
          return e2.timeoutSeconds === t.timeoutSeconds;
        }(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams;
      }
    };
    Firestore$1 = class {
      /** @hideconstructor */
      constructor(e, t, n, r2) {
        this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r2, /**
         * Whether it's a Firestore or Firestore Lite instance.
         */
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new FirestoreSettingsImpl({}), this._settingsFrozen = false;
      }
      /**
       * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
       * instance.
       */
      get app() {
        if (!this._app)
          throw new FirestoreError(C2.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this._app;
      }
      get _initialized() {
        return this._settingsFrozen;
      }
      get _terminated() {
        return void 0 !== this._terminateTask;
      }
      _setSettings(e) {
        if (this._settingsFrozen)
          throw new FirestoreError(C2.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new FirestoreSettingsImpl(e), void 0 !== e.credentials && (this._authCredentials = function __PRIVATE_makeAuthCredentialsProvider(e2) {
          if (!e2)
            return new __PRIVATE_EmptyAuthCredentialsProvider();
          switch (e2.type) {
            case "firstParty":
              return new __PRIVATE_FirstPartyAuthCredentialsProvider(e2.sessionIndex || "0", e2.iamToken || null, e2.authTokenFactory || null);
            case "provider":
              return e2.client;
            default:
              throw new FirestoreError(C2.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
          }
        }(e.credentials));
      }
      _getSettings() {
        return this._settings;
      }
      _freezeSettings() {
        return this._settingsFrozen = true, this._settings;
      }
      _delete() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
      }
      /** Returns a JSON-serializable representation of this `Firestore` instance. */
      toJSON() {
        return {
          app: this._app,
          databaseId: this._databaseId,
          settings: this._settings
        };
      }
      /**
       * Terminates all components used by this client. Subclasses can override
       * this method to clean up their own dependencies, but must also call this
       * method.
       *
       * Only ever called once.
       */
      _terminate() {
        return function __PRIVATE_removeComponents(e) {
          const t = fe.get(e);
          t && (__PRIVATE_logDebug("ComponentProvider", "Removing Datastore"), fe.delete(e), t.terminate());
        }(this), Promise.resolve();
      }
    };
    Query = class _Query {
      // This is the lite version of the Query class in the main SDK.
      /** @hideconstructor protected */
      constructor(e, t, n) {
        this.converter = t, this._query = n, /** The type of this Firestore reference. */
        this.type = "query", this.firestore = e;
      }
      withConverter(e) {
        return new _Query(this.firestore, e, this._query);
      }
    };
    DocumentReference = class _DocumentReference {
      /** @hideconstructor */
      constructor(e, t, n) {
        this.converter = t, this._key = n, /** The type of this Firestore reference. */
        this.type = "document", this.firestore = e;
      }
      get _path() {
        return this._key.path;
      }
      /**
       * The document's identifier within its collection.
       */
      get id() {
        return this._key.path.lastSegment();
      }
      /**
       * A string representing the path of the referenced document (relative
       * to the root of the database).
       */
      get path() {
        return this._key.path.canonicalString();
      }
      /**
       * The collection this `DocumentReference` belongs to.
       */
      get parent() {
        return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
      }
      withConverter(e) {
        return new _DocumentReference(this.firestore, e, this._key);
      }
    };
    CollectionReference = class _CollectionReference extends Query {
      /** @hideconstructor */
      constructor(e, t, n) {
        super(e, t, __PRIVATE_newQueryForPath(n)), this._path = n, /** The type of this Firestore reference. */
        this.type = "collection";
      }
      /** The collection's identifier. */
      get id() {
        return this._query.path.lastSegment();
      }
      /**
       * A string representing the path of the referenced collection (relative
       * to the root of the database).
       */
      get path() {
        return this._query.path.canonicalString();
      }
      /**
       * A reference to the containing `DocumentReference` if this is a
       * subcollection. If this isn't a subcollection, the reference is null.
       */
      get parent() {
        const e = this._path.popLast();
        return e.isEmpty() ? null : new DocumentReference(
          this.firestore,
          /* converter= */
          null,
          new DocumentKey(e)
        );
      }
      withConverter(e) {
        return new _CollectionReference(this.firestore, e, this._path);
      }
    };
    __PRIVATE_AsyncQueueImpl = class {
      constructor() {
        this.Ja = Promise.resolve(), // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.Ya = [], // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.Za = false, // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.Xa = [], // visible for testing
        this.eu = null, // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.tu = false, // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.nu = false, // List of TimerIds to fast-forward delays for.
        this.ru = [], // Backoff timer used to schedule retries for retryable operations
        this.zo = new __PRIVATE_ExponentialBackoff(
          this,
          "async_queue_retry"
          /* TimerId.AsyncQueueRetry */
        ), // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.iu = () => {
          const e2 = getDocument();
          e2 && __PRIVATE_logDebug("AsyncQueue", "Visibility state changed to " + e2.visibilityState), this.zo.Qo();
        };
        const e = getDocument();
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.iu);
      }
      get isShuttingDown() {
        return this.Za;
      }
      /**
       * Adds a new operation to the queue without waiting for it to complete (i.e.
       * we ignore the Promise result).
       */
      enqueueAndForget(e) {
        this.enqueue(e);
      }
      enqueueAndForgetEvenWhileRestricted(e) {
        this.su(), // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.ou(e);
      }
      enterRestrictedMode(e) {
        if (!this.Za) {
          this.Za = true, this.nu = e || false;
          const t = getDocument();
          t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.iu);
        }
      }
      enqueue(e) {
        if (this.su(), this.Za)
          return new Promise(() => {
          });
        const t = new __PRIVATE_Deferred();
        return this.ou(() => this.Za && this.nu ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise)).then(() => t.promise);
      }
      enqueueRetryable(e) {
        this.enqueueAndForget(() => (this.Ya.push(e), this._u()));
      }
      /**
       * Runs the next operation from the retryable queue. If the operation fails,
       * reschedules with backoff.
       */
      async _u() {
        if (0 !== this.Ya.length) {
          try {
            await this.Ya[0](), this.Ya.shift(), this.zo.reset();
          } catch (e) {
            if (!__PRIVATE_isIndexedDbTransactionError(e))
              throw e;
            __PRIVATE_logDebug("AsyncQueue", "Operation failed with retryable error: " + e);
          }
          this.Ya.length > 0 && // If there are additional operations, we re-schedule `retryNextOp()`.
          // This is necessary to run retryable operations that failed during
          // their initial attempt since we don't know whether they are already
          // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
          // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
          // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
          // call scheduled here.
          // Since `backoffAndRun()` cancels an existing backoff and schedules a
          // new backoff on every call, there is only ever a single additional
          // operation in the queue.
          this.zo.ko(() => this._u());
        }
      }
      ou(e) {
        const t = this.Ja.then(() => (this.tu = true, e().catch((e2) => {
          this.eu = e2, this.tu = false;
          const t2 = (
            /**
            * Chrome includes Error.message in Error.stack. Other browsers do not.
            * This returns expected output of message + stack when available.
            * @param error - Error or FirestoreError
            */
            function __PRIVATE_getMessageOrStack(e3) {
              let t3 = e3.message || "";
              e3.stack && (t3 = e3.stack.includes(e3.message) ? e3.stack : e3.message + "\n" + e3.stack);
              return t3;
            }(e2)
          );
          throw __PRIVATE_logError("INTERNAL UNHANDLED ERROR: ", t2), e2;
        }).then((e2) => (this.tu = false, e2))));
        return this.Ja = t, t;
      }
      enqueueAfterDelay(e, t, n) {
        this.su(), // Fast-forward delays for timerIds that have been overriden.
        this.ru.indexOf(e) > -1 && (t = 0);
        const r2 = DelayedOperation.createAndSchedule(this, e, t, n, (e2) => this.au(e2));
        return this.Xa.push(r2), r2;
      }
      su() {
        this.eu && fail();
      }
      verifyOperationInProgress() {
      }
      /**
       * Waits until all currently queued tasks are finished executing. Delayed
       * operations are not run.
       */
      async uu() {
        let e;
        do {
          e = this.Ja, await e;
        } while (e !== this.Ja);
      }
      /**
       * For Tests: Determine if a delayed operation with a particular TimerId
       * exists.
       */
      cu(e) {
        for (const t of this.Xa)
          if (t.timerId === e)
            return true;
        return false;
      }
      /**
       * For Tests: Runs some or all delayed operations early.
       *
       * @param lastTimerId - Delayed operations up to and including this TimerId
       * will be drained. Pass TimerId.All to run all delayed operations.
       * @returns a Promise that resolves once all operations have been run.
       */
      lu(e) {
        return this.uu().then(() => {
          this.Xa.sort((e2, t) => e2.targetTimeMs - t.targetTimeMs);
          for (const t of this.Xa)
            if (t.skipDelay(), "all" !== e && t.timerId === e)
              break;
          return this.uu();
        });
      }
      /**
       * For Tests: Skip all subsequent delays for a timer id.
       */
      hu(e) {
        this.ru.push(e);
      }
      /** Called once a DelayedOperation is run or canceled. */
      au(e) {
        const t = this.Xa.indexOf(e);
        this.Xa.splice(t, 1);
      }
    };
    Firestore = class extends Firestore$1 {
      /** @hideconstructor */
      constructor(e, t, n, r2) {
        super(e, t, n, r2), /**
         * Whether it's a {@link Firestore} or Firestore Lite instance.
         */
        this.type = "firestore", this._queue = function __PRIVATE_newAsyncQueue() {
          return new __PRIVATE_AsyncQueueImpl();
        }(), this._persistenceKey = (null == r2 ? void 0 : r2.name) || "[DEFAULT]";
      }
      _terminate() {
        return this._firestoreClient || // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        __PRIVATE_configureFirestore(this), this._firestoreClient.terminate();
      }
    };
    Bytes = class _Bytes {
      /** @hideconstructor */
      constructor(e) {
        this._byteString = e;
      }
      /**
       * Creates a new `Bytes` object from the given Base64 string, converting it to
       * bytes.
       *
       * @param base64 - The Base64 string used to create the `Bytes` object.
       */
      static fromBase64String(e) {
        try {
          return new _Bytes(ByteString.fromBase64String(e));
        } catch (e2) {
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e2);
        }
      }
      /**
       * Creates a new `Bytes` object from the given Uint8Array.
       *
       * @param array - The Uint8Array used to create the `Bytes` object.
       */
      static fromUint8Array(e) {
        return new _Bytes(ByteString.fromUint8Array(e));
      }
      /**
       * Returns the underlying bytes as a Base64-encoded string.
       *
       * @returns The Base64-encoded string created from the `Bytes` object.
       */
      toBase64() {
        return this._byteString.toBase64();
      }
      /**
       * Returns the underlying bytes in a new `Uint8Array`.
       *
       * @returns The Uint8Array created from the `Bytes` object.
       */
      toUint8Array() {
        return this._byteString.toUint8Array();
      }
      /**
       * Returns a string representation of the `Bytes` object.
       *
       * @returns A string representation of the `Bytes` object.
       */
      toString() {
        return "Bytes(base64: " + this.toBase64() + ")";
      }
      /**
       * Returns true if this `Bytes` object is equal to the provided one.
       *
       * @param other - The `Bytes` object to compare against.
       * @returns true if this `Bytes` object is equal to the provided one.
       */
      isEqual(e) {
        return this._byteString.isEqual(e._byteString);
      }
    };
    FieldPath = class {
      /**
       * Creates a `FieldPath` from the provided field names. If more than one field
       * name is provided, the path will point to a nested field in a document.
       *
       * @param fieldNames - A list of field names.
       */
      constructor(...e) {
        for (let t = 0; t < e.length; ++t)
          if (0 === e[t].length)
            throw new FirestoreError(C2.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new FieldPath$1(e);
      }
      /**
       * Returns true if this `FieldPath` is equal to the provided one.
       *
       * @param other - The `FieldPath` to compare against.
       * @returns true if this `FieldPath` is equal to the provided one.
       */
      isEqual(e) {
        return this._internalPath.isEqual(e._internalPath);
      }
    };
    GeoPoint = class {
      /**
       * Creates a new immutable `GeoPoint` object with the provided latitude and
       * longitude values.
       * @param latitude - The latitude as number between -90 and 90.
       * @param longitude - The longitude as number between -180 and 180.
       */
      constructor(e, t) {
        if (!isFinite(e) || e < -90 || e > 90)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
        if (!isFinite(t) || t < -180 || t > 180)
          throw new FirestoreError(C2.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
        this._lat = e, this._long = t;
      }
      /**
       * The latitude of this `GeoPoint` instance.
       */
      get latitude() {
        return this._lat;
      }
      /**
       * The longitude of this `GeoPoint` instance.
       */
      get longitude() {
        return this._long;
      }
      /**
       * Returns true if this `GeoPoint` is equal to the provided one.
       *
       * @param other - The `GeoPoint` to compare against.
       * @returns true if this `GeoPoint` is equal to the provided one.
       */
      isEqual(e) {
        return this._lat === e._lat && this._long === e._long;
      }
      /** Returns a JSON-serializable representation of this GeoPoint. */
      toJSON() {
        return {
          latitude: this._lat,
          longitude: this._long
        };
      }
      /**
       * Actually private to JS consumers of our API, so this function is prefixed
       * with an underscore.
       */
      _compareTo(e) {
        return __PRIVATE_primitiveComparator(this._lat, e._lat) || __PRIVATE_primitiveComparator(this._long, e._long);
      }
    };
    ye = new RegExp("[~\\*/\\[\\]]");
    DocumentSnapshot$1 = class {
      // Note: This class is stripped down version of the DocumentSnapshot in
      // the legacy SDK. The changes are:
      // - No support for SnapshotMetadata.
      // - No support for SnapshotOptions.
      /** @hideconstructor protected */
      constructor(e, t, n, r2, i) {
        this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r2, this._converter = i;
      }
      /** Property of the `DocumentSnapshot` that provides the document's ID. */
      get id() {
        return this._key.path.lastSegment();
      }
      /**
       * The `DocumentReference` for the document included in the `DocumentSnapshot`.
       */
      get ref() {
        return new DocumentReference(this._firestore, this._converter, this._key);
      }
      /**
       * Signals whether or not the document at the snapshot's location exists.
       *
       * @returns true if the document exists.
       */
      exists() {
        return null !== this._document;
      }
      /**
       * Retrieves all fields in the document as an `Object`. Returns `undefined` if
       * the document doesn't exist.
       *
       * @returns An `Object` containing all fields in the document or `undefined`
       * if the document doesn't exist.
       */
      data() {
        if (this._document) {
          if (this._converter) {
            const e = new QueryDocumentSnapshot$1(
              this._firestore,
              this._userDataWriter,
              this._key,
              this._document,
              /* converter= */
              null
            );
            return this._converter.fromFirestore(e);
          }
          return this._userDataWriter.convertValue(this._document.data.value);
        }
      }
      /**
       * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
       * document or field doesn't exist.
       *
       * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
       * field.
       * @returns The data at the specified field location or undefined if no such
       * field exists in the document.
       */
      // We are using `any` here to avoid an explicit cast by our users.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(e) {
        if (this._document) {
          const t = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
          if (null !== t)
            return this._userDataWriter.convertValue(t);
        }
      }
    };
    QueryDocumentSnapshot$1 = class extends DocumentSnapshot$1 {
      /**
       * Retrieves all fields in the document as an `Object`.
       *
       * @override
       * @returns An `Object` containing all fields in the document.
       */
      data() {
        return super.data();
      }
    };
    AbstractUserDataWriter = class {
      convertValue(e, t = "none") {
        switch (__PRIVATE_typeOrder(e)) {
          case 0:
            return null;
          case 1:
            return e.booleanValue;
          case 2:
            return __PRIVATE_normalizeNumber(e.integerValue || e.doubleValue);
          case 3:
            return this.convertTimestamp(e.timestampValue);
          case 4:
            return this.convertServerTimestamp(e, t);
          case 5:
            return e.stringValue;
          case 6:
            return this.convertBytes(__PRIVATE_normalizeByteString(e.bytesValue));
          case 7:
            return this.convertReference(e.referenceValue);
          case 8:
            return this.convertGeoPoint(e.geoPointValue);
          case 9:
            return this.convertArray(e.arrayValue, t);
          case 10:
            return this.convertObject(e.mapValue, t);
          default:
            throw fail();
        }
      }
      convertObject(e, t) {
        return this.convertObjectMap(e.fields, t);
      }
      /**
       * @internal
       */
      convertObjectMap(e, t = "none") {
        const n = {};
        return forEach(e, (e2, r2) => {
          n[e2] = this.convertValue(r2, t);
        }), n;
      }
      convertGeoPoint(e) {
        return new GeoPoint(__PRIVATE_normalizeNumber(e.latitude), __PRIVATE_normalizeNumber(e.longitude));
      }
      convertArray(e, t) {
        return (e.values || []).map((e2) => this.convertValue(e2, t));
      }
      convertServerTimestamp(e, t) {
        switch (t) {
          case "previous":
            const n = __PRIVATE_getPreviousValue(e);
            return null == n ? null : this.convertValue(n, t);
          case "estimate":
            return this.convertTimestamp(__PRIVATE_getLocalWriteTime(e));
          default:
            return null;
        }
      }
      convertTimestamp(e) {
        const t = __PRIVATE_normalizeTimestamp(e);
        return new Timestamp(t.seconds, t.nanos);
      }
      convertDocumentKey(e, t) {
        const n = ResourcePath.fromString(e);
        __PRIVATE_hardAssert(__PRIVATE_isValidResourceName(n));
        const r2 = new DatabaseId(n.get(1), n.get(3)), i = new DocumentKey(n.popFirst(5));
        return r2.isEqual(t) || // TODO(b/64130202): Somehow support foreign references.
        __PRIVATE_logError(`Document ${i} contains a document reference within a different database (${r2.projectId}/${r2.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`), i;
      }
    };
    SnapshotMetadata = class {
      /** @hideconstructor */
      constructor(e, t) {
        this.hasPendingWrites = e, this.fromCache = t;
      }
      /**
       * Returns true if this `SnapshotMetadata` is equal to the provided one.
       *
       * @param other - The `SnapshotMetadata` to compare against.
       * @returns true if this `SnapshotMetadata` is equal to the provided one.
       */
      isEqual(e) {
        return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
      }
    };
    DocumentSnapshot = class extends DocumentSnapshot$1 {
      /** @hideconstructor protected */
      constructor(e, t, n, r2, i, s2) {
        super(e, t, n, r2, s2), this._firestore = e, this._firestoreImpl = e, this.metadata = i;
      }
      /**
       * Returns whether or not the data exists. True if the document exists.
       */
      exists() {
        return super.exists();
      }
      /**
       * Retrieves all fields in the document as an `Object`. Returns `undefined` if
       * the document doesn't exist.
       *
       * By default, `serverTimestamp()` values that have not yet been
       * set to their final value will be returned as `null`. You can override
       * this by passing an options object.
       *
       * @param options - An options object to configure how data is retrieved from
       * the snapshot (for example the desired behavior for server timestamps that
       * have not yet been set to their final value).
       * @returns An `Object` containing all fields in the document or `undefined` if
       * the document doesn't exist.
       */
      data(e = {}) {
        if (this._document) {
          if (this._converter) {
            const t = new QueryDocumentSnapshot(
              this._firestore,
              this._userDataWriter,
              this._key,
              this._document,
              this.metadata,
              /* converter= */
              null
            );
            return this._converter.fromFirestore(t, e);
          }
          return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
        }
      }
      /**
       * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
       * document or field doesn't exist.
       *
       * By default, a `serverTimestamp()` that has not yet been set to
       * its final value will be returned as `null`. You can override this by
       * passing an options object.
       *
       * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
       * field.
       * @param options - An options object to configure how the field is retrieved
       * from the snapshot (for example the desired behavior for server timestamps
       * that have not yet been set to their final value).
       * @returns The data at the specified field location or undefined if no such
       * field exists in the document.
       */
      // We are using `any` here to avoid an explicit cast by our users.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(e, t = {}) {
        if (this._document) {
          const n = this._document.data.field(__PRIVATE_fieldPathFromArgument("DocumentSnapshot.get", e));
          if (null !== n)
            return this._userDataWriter.convertValue(n, t.serverTimestamps);
        }
      }
    };
    QueryDocumentSnapshot = class extends DocumentSnapshot {
      /**
       * Retrieves all fields in the document as an `Object`.
       *
       * By default, `serverTimestamp()` values that have not yet been
       * set to their final value will be returned as `null`. You can override
       * this by passing an options object.
       *
       * @override
       * @param options - An options object to configure how data is retrieved from
       * the snapshot (for example the desired behavior for server timestamps that
       * have not yet been set to their final value).
       * @returns An `Object` containing all fields in the document.
       */
      data(e = {}) {
        return super.data(e);
      }
    };
    __PRIVATE_ExpUserDataWriter = class extends AbstractUserDataWriter {
      constructor(e) {
        super(), this.firestore = e;
      }
      convertBytes(e) {
        return new Bytes(e);
      }
      convertReference(e) {
        const t = this.convertDocumentKey(e, this.firestore._databaseId);
        return new DocumentReference(
          this.firestore,
          /* converter= */
          null,
          t
        );
      }
    };
    !function __PRIVATE_registerFirestore(e, t = true) {
      !function __PRIVATE_setSDKVersion(e2) {
        b = e2;
      }(SDK_VERSION), _registerComponent(new Component("firestore", (e2, { instanceIdentifier: n, options: r2 }) => {
        const i = e2.getProvider("app").getImmediate(), s2 = new Firestore(new __PRIVATE_FirebaseAuthCredentialsProvider(e2.getProvider("auth-internal")), new __PRIVATE_FirebaseAppCheckTokenProvider(e2.getProvider("app-check-internal")), function __PRIVATE_databaseIdFromApp(e3, t2) {
          if (!Object.prototype.hasOwnProperty.apply(e3.options, ["projectId"]))
            throw new FirestoreError(C2.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
          return new DatabaseId(e3.options.projectId, t2);
        }(i, n), i);
        return r2 = Object.assign({
          useFetchStreams: t
        }, r2), s2._setSettings(r2), s2;
      }, "PUBLIC").setMultipleInstances(true)), registerVersion(S2, "4.3.2", e), // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
      registerVersion(S2, "4.3.2", "esm2017");
    }();
  }
});

// node_modules/firebase/firestore/dist/esm/index.esm.js
var init_index_esm2 = __esm({
  "node_modules/firebase/firestore/dist/esm/index.esm.js"() {
    init_index_esm20176();
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
async function checkingServer() {
  const db2 = getFirestore(app);
  const serverWorking = await getDoc(doc(db2, "server", "working"));
  return serverWorking.data().working;
}
var firebaseConfig, app, handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    init_index_esm();
    init_index_esm2();
    firebaseConfig = {
      apiKey: "AIzaSyCHVpsnCS3l6ymBXDDJQzlIOon5N_NGyi8",
      authDomain: "tisqo-8366e.firebaseapp.com",
      projectId: "tisqo-8366e",
      storageBucket: "tisqo-8366e.appspot.com",
      messagingSenderId: "730933148446",
      appId: "1:730933148446:web:3f34f6363431c3f7c5a70f",
      measurementId: "G-R0V2WK8W0F"
    };
    app = initializeApp(firebaseConfig);
    handle = async ({ event, resolve }) => {
      const server2 = await checkingServer();
      if (!server2)
        return {};
      const response = await resolve(event);
      return response;
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function redirect(status, location) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  return new Redirect(status, location);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function fail2(status, data) {
  return new ActionFailure(status, data);
}
var HttpError, Redirect, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} [data]
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
      Object.prototype
    ).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b2) => b2[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v3, i) => i in thing ? stringify2(v3) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name3, thing) => {
      params.push(name3);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v3, i) => {
            statements.push(`${name3}[${i}]=${stringify2(v3)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name3}.${Array.from(thing).map((v3) => `add(${stringify2(v3)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name3}.${Array.from(thing).map(([k2, v3]) => `set(${stringify2(k2)}, ${stringify2(v3)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name3}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name3 = "";
  do {
    name3 = chars[num % chars.length] + name3;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name3) ? `${name3}0` : name3;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_constants();
  }
});

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index5 = p2++;
    indexes.set(thing, index5);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index5] = `["${key2}",${flatten(value2)}]`;
        return index5;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index5] = str;
    return index5;
  }
  const index4 = flatten(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index4 = 0;
      while (index4 < str.length) {
        var eqIdx = str.indexOf("=", index4);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index4);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index4, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index4 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name3, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name3)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name3 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name3 = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name: name3,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name3 = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name3 = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name: name3, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="min-h-screen flex flex-col gap-1"><header></header> <main class="flex-1 flex">${slots.default ? slots.default({}) : ``}</main> <footer class="flex flex-col gap-2 py-4 text-center text-sm" data-svelte-h="svelte-1995uie"><p>Developed by <a href="https://wa.link/l9lp65" class="text-blue-400">Mohamed D. Nour</a></p> <p>Tisqaad \xA9 2023. All rights reserved.</p></footer></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.085d23b2.js", "_app/immutable/chunks/scheduler.56f0b95c.js", "_app/immutable/chunks/index.231d6169.js"];
    stylesheets = ["_app/immutable/assets/app.fba3abf4.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.2fb80eaf.js", "_app/immutable/chunks/scheduler.56f0b95c.js", "_app/immutable/chunks/index.231d6169.js", "_app/immutable/chunks/singletons.dcb18b4e.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/airtable-fetcher/dist/index.mjs
var __async, AirtableFetcher;
var init_dist = __esm({
  "node_modules/airtable-fetcher/dist/index.mjs"() {
    __async = (__this, __arguments, generator) => {
      return new Promise((resolve, reject) => {
        var fulfilled = (value) => {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        };
        var rejected = (value) => {
          try {
            step(generator.throw(value));
          } catch (e) {
            reject(e);
          }
        };
        var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
      });
    };
    AirtableFetcher = class {
      constructor({ baseId: baseId2, tableId: tableId2, token: token2 }) {
        this.baseId = baseId2;
        this.tableId = tableId2;
        this.accessToken = token2;
      }
      get(_0) {
        return __async(this, arguments, function* ({ filter, sort, max }) {
          const res = yield fetch(
            `https://api.airtable.com/v0/${this.baseId}/${this.tableId}/listRecords`,
            {
              method: "POST",
              headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
                Authorization: `Bearer ${this.accessToken}`
              },
              body: JSON.stringify({
                filterByFormula: filter || "",
                sort: sort || [],
                maxRecords: max || 100
              })
            }
          );
          const data = yield res.json();
          return data;
        });
      }
    };
  }
});

// .svelte-kit/output/server/chunks/utils.js
async function getData(id2) {
  const fetcher = new AirtableFetcher({ baseId, tableId, token });
  return await fetcher.get({ filter: `ID = '${id2}'` });
}
var baseId, tableId, token;
var init_utils2 = __esm({
  ".svelte-kit/output/server/chunks/utils.js"() {
    init_dist();
    baseId = "appkEfTWO7B38MDOf";
    tableId = "tblBrUfD8LyFLR2AB";
    token = "patiflGyLcKd6rL4e.bf1e8bb4fc97aef9c9ed2946d64fe4d19b93b79c0b28039f5c9e36a914c33486";
  }
});

// .svelte-kit/output/server/entries/pages/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions,
  config: () => config,
  load: () => load
});
function load() {
  return {};
}
var config, actions;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_page.server.ts.js"() {
    init_utils2();
    init_chunks();
    config = {
      runtime: "edge"
    };
    actions = {
      search: async ({ request }) => {
        const id2 = (await request.formData()).get("id");
        if (!id2 || id2.length <= 2) {
          return fail2(400, { missing: true });
        }
        let data = await getData(id2);
        if (!data.records || !data.records.length) {
          return fail2(404, { notFound: true });
        }
        throw redirect(302, `/${id2}`);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var logo, css, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_devalue();
    logo = "/_app/immutable/assets/logo.ee0e7faa.png";
    css = {
      code: ":root{--primary-color:#0064c8;--secondary-color:#90c8ff;--light-secondary-color:#90c8ff88;--accent-color:#cee6ff;--light-color:#deeefe;--min-height:100vh}",
      map: null
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { form } = $$props;
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      $$result.css.add(css);
      return `${$$result.head += `<!-- HEAD_svelte-1svfpki_START -->${$$result.title = `<title>Tisqaad College</title>`, ""}<!-- HEAD_svelte-1svfpki_END -->`, ""} <section class="w-full max-w-[400px] mx-auto flex flex-col justify-center gap-6"><picture data-svelte-h="svelte-8igutq"><source${add_attribute("srcset", logo, 0)}> <img class="mx-auto w-28 rounded-full"${add_attribute("src", logo, 0)} alt=""></picture> <form class="space-y-2" method="POST" action="?/search"><div class="space-y-1" data-svelte-h="svelte-1kvijoh"><label class="font-medium text-gray-500 text-sm" for="id">ID No.</label> <input class="w-full p-2 px-4 border-2 rounded-sm" type="number" name="id" id="id" placeholder="ID No"></div> ${form?.missing ? `<p class="text-red-500 text-sm font-medium" data-svelte-h="svelte-7036yo">Please enter your ID correctly.</p>` : `${form?.notFound ? `<p class="text-red-500 text-sm font-medium" data-svelte-h="svelte-7btcyn">No matching ID No.</p>` : ``}`} <button${add_attribute("class", `w-full h-10 ${"bg-blue-700"} font-medium text-white rounded-sm`, 0)} ${""}>${escape("Search")}</button></form> </section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, server_id, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_page_server_ts();
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    server_id = "src/routes/+page.server.ts";
    imports3 = ["_app/immutable/nodes/2.203ea5cc.js", "_app/immutable/chunks/scheduler.56f0b95c.js", "_app/immutable/chunks/index.231d6169.js", "_app/immutable/chunks/forms.bc878ad9.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/chunks/singletons.dcb18b4e.js"];
    stylesheets3 = ["_app/immutable/assets/2.3f538a96.css", "_app/immutable/assets/app.fba3abf4.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n	<meta charset="utf-8" />\n	<link rel="icon" href="' + assets2 + '/favicon.png" />\n	<meta name="viewport" content="width=device-width" />\n	' + head + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n	<div style="display: contents">' + body + "</div>\n</body>\n\n</html>",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1jqvxml"
};
function get_hooks() {
  return Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports));
}

// .svelte-kit/output/server/index.js
init_chunks();
init_devalue();
init_ssr();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
var PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q2 = "1"] = match;
      parts.push({ type, subtype, q: +q2, i });
    }
  });
  parts.sort((a, b2) => {
    if (a.q !== b2.q) {
      return b2.q - a.q;
    }
    if (a.subtype === "*" !== (b2.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b2.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b2.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method];
  if (!handler && method === "HEAD") {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions2) {
  if (actions2.default && Object.keys(actions2).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions2) {
  const url = new URL(event.request.url);
  let name3 = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name3 = param[0].slice(1);
      if (name3 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions2[name3];
  if (!action) {
    throw new Error(`No action with name '${name3}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w2 = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b2;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w2[i2];
      } else {
        a = w2[i2 + 1 & 15];
        b2 = w2[i2 + 14 & 15];
        tmp = w2[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b2 >>> 17 ^ b2 >>> 19 ^ b2 >>> 10 ^ b2 << 15 ^ b2 << 13) + w2[i2 & 15] + w2[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base642(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b2 = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b2;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base642(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l2; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l2 + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l2) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base642(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v3) => !!v3).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r2) => {
    fulfil = f;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets4 = new Set(client.stylesheets);
  const fonts4 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets4.add(url);
      for (const url of node.fonts)
        fonts4.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k2, v3]) => inline_styles.set(k2, v3));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b2) => b2.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id2 = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id: id2, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id: id2, data, error: error2 }, replacer);
          }
          push(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id2})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i) => p2.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id2 = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id2},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id2;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises)
      p2.catch(() => {
      });
    for (const p2 of load_promises)
      p2.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name3, opts) {
      const c = new_cookies[name3];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name3];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name3, value]) => ({ name: name3, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name3, value, opts = {}) {
      set_internal(name3, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name3, opts = {}) {
      cookies.set(name3, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name3, value, opts) {
      return (0, import_cookie.serialize)(name3, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name3 in parsed) {
        combined_cookies[name3] = parsed[name3];
      }
    }
    return Object.entries(combined_cookies).map(([name3, value]) => `${name3}=${value}`).join("; ");
  }
  function set_internal(name3, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name3] = {
      name: name3,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name: name3, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name3, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name: name3, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name3,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v3) => v3.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k2]) => k2.startsWith(private_prefix) && (public_prefix === "" || !k2.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k2]) => k2.startsWith(public_prefix) && (private_prefix === "" || !k2.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn-0/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png"]),
    mimeTypes: { ".png": "image/png" },
    _: {
      client: { "start": "_app/immutable/entry/start.80116f2f.js", "app": "_app/immutable/entry/app.17137de5.js", "imports": ["_app/immutable/entry/start.80116f2f.js", "_app/immutable/chunks/scheduler.56f0b95c.js", "_app/immutable/chunks/singletons.dcb18b4e.js", "_app/immutable/chunks/parse.bee59afc.js", "_app/immutable/entry/app.17137de5.js", "_app/immutable/chunks/scheduler.56f0b95c.js", "_app/immutable/chunks/index.231d6169.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();

// .svelte-kit/vercel-tmp/fn-0/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map
