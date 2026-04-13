import { c as createLucideIcon, o, r as reactExports, v as vt, R as React, j as jsxRuntimeExports, u as useActor, e as useNavigate, a as useAppStore, P as PageHeader, T as TriangleAlert, S as ShieldCheck, b as createActor } from "./index-B9QzGcrp.js";
import { u as useComposedRefs, c as cn, B as Badge } from "./badge-DLiSrIsl.js";
import { C as CircleCheck, B as Button, L as Link2 } from "./button-CEaoTiK2.js";
import { u as useLayoutEffect2, P as Primitive, a as composeEventHandlers, c as createContextScope } from "./index-B4N5fjgF.js";
import { m as motion } from "./proxy-DXWyW35z.js";
import { S as Shield } from "./shield-BWtu2nWP.js";
import { C as ChevronRight } from "./chevron-right-BR06CZkr.js";
import { Z as Zap } from "./zap-DvkvY2DE.js";
import "./clsx-DgYk2OaC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
      key: "yqzxt4"
    }
  ],
  [
    "path",
    {
      d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
      key: "4qinb0"
    }
  ],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "5", key: "1041cp" }],
  ["line", { x1: "2", x2: "5", y1: "8", y2: "8", key: "14m1p5" }],
  ["line", { x1: "16", x2: "16", y1: "19", y2: "22", key: "rzdirn" }],
  ["line", { x1: "19", x2: "22", y1: "16", y2: "16", key: "ox905f" }]
];
const Unlink = createLucideIcon("unlink", __iconNode);
var jt = (n) => {
  switch (n) {
    case "success":
      return ee;
    case "info":
      return ae;
    case "warning":
      return oe;
    case "error":
      return se;
    default:
      return null;
  }
}, te = Array(12).fill(0), Yt = ({ visible: n, className: e }) => o.createElement("div", { className: ["sonner-loading-wrapper", e].filter(Boolean).join(" "), "data-visible": n }, o.createElement("div", { className: "sonner-spinner" }, te.map((t, a) => o.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a}` })))), ee = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), oe = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), ae = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), se = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })), Ot = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, o.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), o.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
var Ft = () => {
  let [n, e] = o.useState(document.hidden);
  return o.useEffect(() => {
    let t = () => {
      e(document.hidden);
    };
    return document.addEventListener("visibilitychange", t), () => window.removeEventListener("visibilitychange", t);
  }, []), n;
};
var bt = 1, yt = class {
  constructor() {
    this.subscribe = (e) => (this.subscribers.push(e), () => {
      let t = this.subscribers.indexOf(e);
      this.subscribers.splice(t, 1);
    });
    this.publish = (e) => {
      this.subscribers.forEach((t) => t(e));
    };
    this.addToast = (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    };
    this.create = (e) => {
      var S;
      let { message: t, ...a } = e, u = typeof (e == null ? void 0 : e.id) == "number" || ((S = e.id) == null ? void 0 : S.length) > 0 ? e.id : bt++, f = this.toasts.find((g) => g.id === u), w = e.dismissible === void 0 ? true : e.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({ ...g, ...e, id: u, title: t }), { ...g, ...e, id: u, dismissible: w, title: t }) : g) : this.addToast({ title: t, ...a, dismissible: w, id: u }), u;
    };
    this.dismiss = (e) => (this.dismissedToasts.add(e), e || this.toasts.forEach((t) => {
      this.subscribers.forEach((a) => a({ id: t.id, dismiss: true }));
    }), this.subscribers.forEach((t) => t({ id: e, dismiss: true })), e);
    this.message = (e, t) => this.create({ ...t, message: e });
    this.error = (e, t) => this.create({ ...t, message: e, type: "error" });
    this.success = (e, t) => this.create({ ...t, type: "success", message: e });
    this.info = (e, t) => this.create({ ...t, type: "info", message: e });
    this.warning = (e, t) => this.create({ ...t, type: "warning", message: e });
    this.loading = (e, t) => this.create({ ...t, type: "loading", message: e });
    this.promise = (e, t) => {
      if (!t) return;
      let a;
      t.loading !== void 0 && (a = this.create({ ...t, promise: e, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
      let u = e instanceof Promise ? e : e(), f = a !== void 0, w, S = u.then(async (i) => {
        if (w = ["resolve", i], o.isValidElement(i)) f = false, this.create({ id: a, type: "default", message: i });
        else if (ie(i) && !i.ok) {
          f = false;
          let T = typeof t.error == "function" ? await t.error(`HTTP error! status: ${i.status}`) : t.error, F = typeof t.description == "function" ? await t.description(`HTTP error! status: ${i.status}`) : t.description;
          this.create({ id: a, type: "error", message: T, description: F });
        } else if (t.success !== void 0) {
          f = false;
          let T = typeof t.success == "function" ? await t.success(i) : t.success, F = typeof t.description == "function" ? await t.description(i) : t.description;
          this.create({ id: a, type: "success", message: T, description: F });
        }
      }).catch(async (i) => {
        if (w = ["reject", i], t.error !== void 0) {
          f = false;
          let D = typeof t.error == "function" ? await t.error(i) : t.error, T = typeof t.description == "function" ? await t.description(i) : t.description;
          this.create({ id: a, type: "error", message: D, description: T });
        }
      }).finally(() => {
        var i;
        f && (this.dismiss(a), a = void 0), (i = t.finally) == null || i.call(t);
      }), g = () => new Promise((i, D) => S.then(() => w[0] === "reject" ? D(w[1]) : i(w[1])).catch(D));
      return typeof a != "string" && typeof a != "number" ? { unwrap: g } : Object.assign(a, { unwrap: g });
    };
    this.custom = (e, t) => {
      let a = (t == null ? void 0 : t.id) || bt++;
      return this.create({ jsx: e(a), id: a, ...t }), a;
    };
    this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}, v = new yt(), ne = (n, e) => {
  let t = (e == null ? void 0 : e.id) || bt++;
  return v.addToast({ title: n, ...e, id: t }), t;
}, ie = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", le = ne, ce = () => v.toasts, de = () => v.getActiveToasts(), ue = Object.assign(le, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: ce, getToasts: de });
function wt(n, { insertAt: e } = {}) {
  if (typeof document == "undefined") return;
  let t = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
  a.type = "text/css", e === "top" && t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), a.styleSheet ? a.styleSheet.cssText = n : a.appendChild(document.createTextNode(n));
}
wt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function tt(n) {
  return n.label !== void 0;
}
var pe = 3, me = "32px", ge = "16px", Wt = 4e3, he = 356, be = 14, ye = 20, we = 200;
function M(...n) {
  return n.filter(Boolean).join(" ");
}
function xe(n) {
  let [e, t] = n.split("-"), a = [];
  return e && a.push(e), t && a.push(t), a;
}
var ve = (n) => {
  var Dt, Pt, Nt, Bt, Ct, kt, It, Mt, Ht, At, Lt;
  let { invert: e, toast: t, unstyled: a, interacting: u, setHeights: f, visibleToasts: w, heights: S, index: g, toasts: i, expanded: D, removeToast: T, defaultRichColors: F, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l, className: ot = "", descriptionClassName: at = "", duration: X, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n, [Y, C] = o.useState(null), [lt, J] = o.useState(null), [W, H] = o.useState(false), [A, mt] = o.useState(false), [L, z] = o.useState(false), [ct, d] = o.useState(false), [h, y] = o.useState(false), [R, j] = o.useState(0), [p, _] = o.useState(0), O = o.useRef(t.duration || X || Wt), G = o.useRef(null), k = o.useRef(null), Vt = g === 0, Ut = g + 1 <= w, N = t.type, V = t.dismissible !== false, Kt = t.className || "", Xt = t.descriptionClassName || "", dt = o.useMemo(() => S.findIndex((r) => r.toastId === t.id) || 0, [S, t.id]), Jt = o.useMemo(() => {
    var r;
    return (r = t.closeButton) != null ? r : et;
  }, [t.closeButton, et]), Tt = o.useMemo(() => t.duration || X || Wt, [t.duration, X]), gt = o.useRef(0), U = o.useRef(0), St = o.useRef(0), K = o.useRef(null), [Gt, Qt] = st.split("-"), Rt = o.useMemo(() => S.reduce((r, m, c) => c >= dt ? r : r + m.height, 0), [S, dt]), Et = Ft(), qt = t.invert || e, ht = N === "loading";
  U.current = o.useMemo(() => dt * pt + Rt, [dt, Rt]), o.useEffect(() => {
    O.current = Tt;
  }, [Tt]), o.useEffect(() => {
    H(true);
  }, []), o.useEffect(() => {
    let r = k.current;
    if (r) {
      let m = r.getBoundingClientRect().height;
      return _(m), f((c) => [{ toastId: t.id, height: m, position: t.position }, ...c]), () => f((c) => c.filter((b) => b.toastId !== t.id));
    }
  }, [f, t.id]), o.useLayoutEffect(() => {
    if (!W) return;
    let r = k.current, m = r.style.height;
    r.style.height = "auto";
    let c = r.getBoundingClientRect().height;
    r.style.height = m, _(c), f((b) => b.find((x) => x.toastId === t.id) ? b.map((x) => x.toastId === t.id ? { ...x, height: c } : x) : [{ toastId: t.id, height: c, position: t.position }, ...b]);
  }, [W, t.title, t.description, f, t.id]);
  let $ = o.useCallback(() => {
    mt(true), j(U.current), f((r) => r.filter((m) => m.toastId !== t.id)), setTimeout(() => {
      T(t);
    }, we);
  }, [t, T, f, U]);
  o.useEffect(() => {
    if (t.promise && N === "loading" || t.duration === 1 / 0 || t.type === "loading") return;
    let r;
    return D || u || it && Et ? (() => {
      if (St.current < gt.current) {
        let b = (/* @__PURE__ */ new Date()).getTime() - gt.current;
        O.current = O.current - b;
      }
      St.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      O.current !== 1 / 0 && (gt.current = (/* @__PURE__ */ new Date()).getTime(), r = setTimeout(() => {
        var b;
        (b = t.onAutoClose) == null || b.call(t, t), $();
      }, O.current));
    })(), () => clearTimeout(r);
  }, [D, u, t, N, it, Et, $]), o.useEffect(() => {
    t.delete && $();
  }, [$, t.delete]);
  function Zt() {
    var r, m, c;
    return P != null && P.loading ? o.createElement("div", { className: M(s == null ? void 0 : s.loader, (r = t == null ? void 0 : t.classNames) == null ? void 0 : r.loader, "sonner-loader"), "data-visible": N === "loading" }, P.loading) : rt ? o.createElement("div", { className: M(s == null ? void 0 : s.loader, (m = t == null ? void 0 : t.classNames) == null ? void 0 : m.loader, "sonner-loader"), "data-visible": N === "loading" }, rt) : o.createElement(Yt, { className: M(s == null ? void 0 : s.loader, (c = t == null ? void 0 : t.classNames) == null ? void 0 : c.loader), visible: N === "loading" });
  }
  return o.createElement("li", { tabIndex: 0, ref: k, className: M(ot, Kt, s == null ? void 0 : s.toast, (Dt = t == null ? void 0 : t.classNames) == null ? void 0 : Dt.toast, s == null ? void 0 : s.default, s == null ? void 0 : s[N], (Pt = t == null ? void 0 : t.classNames) == null ? void 0 : Pt[N]), "data-sonner-toast": "", "data-rich-colors": (Nt = t.richColors) != null ? Nt : F, "data-styled": !(t.jsx || t.unstyled || a), "data-mounted": W, "data-promise": !!t.promise, "data-swiped": h, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g, "data-front": Vt, "data-swiping": L, "data-dismissible": V, "data-type": N, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W), style: { "--index": g, "--toasts-before": g, "--z-index": i.length - g, "--offset": `${A ? R : U.current}px`, "--initial-height": B ? "auto" : `${p}px`, ...ut, ...t.style }, onDragEnd: () => {
    z(false), C(null), K.current = null;
  }, onPointerDown: (r) => {
    ht || !V || (G.current = /* @__PURE__ */ new Date(), j(U.current), r.target.setPointerCapture(r.pointerId), r.target.tagName !== "BUTTON" && (z(true), K.current = { x: r.clientX, y: r.clientY }));
  }, onPointerUp: () => {
    var x, Q, q, Z;
    if (ct || !V) return;
    K.current = null;
    let r = Number(((x = k.current) == null ? void 0 : x.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), m = Number(((Q = k.current) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), c = (/* @__PURE__ */ new Date()).getTime() - ((q = G.current) == null ? void 0 : q.getTime()), b = Y === "x" ? r : m, I = Math.abs(b) / c;
    if (Math.abs(b) >= ye || I > 0.11) {
      j(U.current), (Z = t.onDismiss) == null || Z.call(t, t), J(Y === "x" ? r > 0 ? "right" : "left" : m > 0 ? "down" : "up"), $(), d(true), y(false);
      return;
    }
    z(false), C(null);
  }, onPointerMove: (r) => {
    var Q, q, Z, zt;
    if (!K.current || !V || ((Q = window.getSelection()) == null ? void 0 : Q.toString().length) > 0) return;
    let c = r.clientY - K.current.y, b = r.clientX - K.current.x, I = (q = n.swipeDirections) != null ? q : xe(st);
    !Y && (Math.abs(b) > 1 || Math.abs(c) > 1) && C(Math.abs(b) > Math.abs(c) ? "x" : "y");
    let x = { x: 0, y: 0 };
    Y === "y" ? (I.includes("top") || I.includes("bottom")) && (I.includes("top") && c < 0 || I.includes("bottom") && c > 0) && (x.y = c) : Y === "x" && (I.includes("left") || I.includes("right")) && (I.includes("left") && b < 0 || I.includes("right") && b > 0) && (x.x = b), (Math.abs(x.x) > 0 || Math.abs(x.y) > 0) && y(true), (Z = k.current) == null || Z.style.setProperty("--swipe-amount-x", `${x.x}px`), (zt = k.current) == null || zt.style.setProperty("--swipe-amount-y", `${x.y}px`);
  } }, Jt && !t.jsx ? o.createElement("button", { "aria-label": nt, "data-disabled": ht, "data-close-button": true, onClick: ht || !V ? () => {
  } : () => {
    var r;
    $(), (r = t.onDismiss) == null || r.call(t, t);
  }, className: M(s == null ? void 0 : s.closeButton, (Bt = t == null ? void 0 : t.classNames) == null ? void 0 : Bt.closeButton) }, (Ct = P == null ? void 0 : P.close) != null ? Ct : Ot) : null, t.jsx || reactExports.isValidElement(t.title) ? t.jsx ? t.jsx : typeof t.title == "function" ? t.title() : t.title : o.createElement(o.Fragment, null, N || t.icon || t.promise ? o.createElement("div", { "data-icon": "", className: M(s == null ? void 0 : s.icon, (kt = t == null ? void 0 : t.classNames) == null ? void 0 : kt.icon) }, t.promise || t.type === "loading" && !t.icon ? t.icon || Zt() : null, t.type !== "loading" ? t.icon || (P == null ? void 0 : P[N]) || jt(N) : null) : null, o.createElement("div", { "data-content": "", className: M(s == null ? void 0 : s.content, (It = t == null ? void 0 : t.classNames) == null ? void 0 : It.content) }, o.createElement("div", { "data-title": "", className: M(s == null ? void 0 : s.title, (Mt = t == null ? void 0 : t.classNames) == null ? void 0 : Mt.title) }, typeof t.title == "function" ? t.title() : t.title), t.description ? o.createElement("div", { "data-description": "", className: M(at, Xt, s == null ? void 0 : s.description, (Ht = t == null ? void 0 : t.classNames) == null ? void 0 : Ht.description) }, typeof t.description == "function" ? t.description() : t.description) : null), reactExports.isValidElement(t.cancel) ? t.cancel : t.cancel && tt(t.cancel) ? o.createElement("button", { "data-button": true, "data-cancel": true, style: t.cancelButtonStyle || ft, onClick: (r) => {
    var m, c;
    tt(t.cancel) && V && ((c = (m = t.cancel).onClick) == null || c.call(m, r), $());
  }, className: M(s == null ? void 0 : s.cancelButton, (At = t == null ? void 0 : t.classNames) == null ? void 0 : At.cancelButton) }, t.cancel.label) : null, reactExports.isValidElement(t.action) ? t.action : t.action && tt(t.action) ? o.createElement("button", { "data-button": true, "data-action": true, style: t.actionButtonStyle || l, onClick: (r) => {
    var m, c;
    tt(t.action) && ((c = (m = t.action).onClick) == null || c.call(m, r), !r.defaultPrevented && $());
  }, className: M(s == null ? void 0 : s.actionButton, (Lt = t == null ? void 0 : t.classNames) == null ? void 0 : Lt.actionButton) }, t.action.label) : null));
};
function _t() {
  if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
  let n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function Te(n, e) {
  let t = {};
  return [n, e].forEach((a, u) => {
    let f = u === 1, w = f ? "--mobile-offset" : "--offset", S = f ? ge : me;
    function g(i) {
      ["top", "right", "bottom", "left"].forEach((D) => {
        t[`${w}-${D}`] = typeof i == "number" ? `${i}px` : i;
      });
    }
    typeof a == "number" || typeof a == "string" ? g(a) : typeof a == "object" ? ["top", "right", "bottom", "left"].forEach((i) => {
      a[i] === void 0 ? t[`${w}-${i}`] = S : t[`${w}-${i}`] = typeof a[i] == "number" ? `${a[i]}px` : a[i];
    }) : g(S);
  }), t;
}
reactExports.forwardRef(function(e, t) {
  let { invert: a, position: u = "bottom-right", hotkey: f = ["altKey", "KeyT"], expand: w, closeButton: S, className: g, offset: i, mobileOffset: D, theme: T = "light", richColors: F, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l, dir: ot = _t(), gap: at = be, loadingIcon: X, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e, [B, s] = o.useState([]), P = o.useMemo(() => Array.from(new Set([u].concat(B.filter((d) => d.position).map((d) => d.position)))), [B, u]), [nt, it] = o.useState([]), [Y, C] = o.useState(false), [lt, J] = o.useState(false), [W, H] = o.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = o.useRef(null), mt = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = o.useRef(null), z = o.useRef(false), ct = o.useCallback((d) => {
    s((h) => {
      var y;
      return (y = h.find((R) => R.id === d.id)) != null && y.delete || v.dismiss(d.id), h.filter(({ id: R }) => R !== d.id);
    });
  }, []);
  return o.useEffect(() => v.subscribe((d) => {
    if (d.dismiss) {
      s((h) => h.map((y) => y.id === d.id ? { ...y, delete: true } : y));
      return;
    }
    setTimeout(() => {
      vt.flushSync(() => {
        s((h) => {
          let y = h.findIndex((R) => R.id === d.id);
          return y !== -1 ? [...h.slice(0, y), { ...h[y], ...d }, ...h.slice(y + 1)] : [d, ...h];
        });
      });
    });
  }), []), o.useEffect(() => {
    if (T !== "system") {
      H(T);
      return;
    }
    if (T === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H("dark") : H("light")), typeof window == "undefined") return;
    let d = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      d.addEventListener("change", ({ matches: h }) => {
        H(h ? "dark" : "light");
      });
    } catch (h) {
      d.addListener(({ matches: y }) => {
        try {
          H(y ? "dark" : "light");
        } catch (R) {
          console.error(R);
        }
      });
    }
  }, [T]), o.useEffect(() => {
    B.length <= 1 && C(false);
  }, [B]), o.useEffect(() => {
    let d = (h) => {
      var R, j;
      f.every((p) => h[p] || h.code === p) && (C(true), (R = A.current) == null || R.focus()), h.code === "Escape" && (document.activeElement === A.current || (j = A.current) != null && j.contains(document.activeElement)) && C(false);
    };
    return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
  }, [f]), o.useEffect(() => {
    if (A.current) return () => {
      L.current && (L.current.focus({ preventScroll: true }), L.current = null, z.current = false);
    };
  }, [A.current]), o.createElement("section", { ref: t, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d, h) => {
    var j;
    let [y, R] = d.split("-");
    return B.length ? o.createElement("ol", { key: d, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g, "data-sonner-toaster": true, "data-theme": W, "data-y-position": y, "data-lifted": Y && B.length > 1 && !w, "data-x-position": R, style: { "--front-toast-height": `${((j = nt[0]) == null ? void 0 : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i, D) }, onBlur: (p) => {
      z.current && !p.currentTarget.contains(p.relatedTarget) && (z.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
    }, onFocus: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || z.current || (z.current = true, L.current = p.relatedTarget);
    }, onMouseEnter: () => C(true), onMouseMove: () => C(true), onMouseLeave: () => {
      lt || C(false);
    }, onDragEnd: () => C(false), onPointerDown: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || J(true);
    }, onPointerUp: () => J(false) }, B.filter((p) => !p.position && h === 0 || p.position === d).map((p, _) => {
      var O, G;
      return o.createElement(ve, { key: p.id, icons: st, index: _, toast: p, defaultRichColors: F, duration: (O = l == null ? void 0 : l.duration) != null ? O : et, className: l == null ? void 0 : l.className, descriptionClassName: l == null ? void 0 : l.descriptionClassName, invert: a, visibleToasts: ft, closeButton: (G = l == null ? void 0 : l.closeButton) != null ? G : S, interacting: lt, position: d, style: l == null ? void 0 : l.style, unstyled: l == null ? void 0 : l.unstyled, classNames: l == null ? void 0 : l.classNames, cancelButtonStyle: l == null ? void 0 : l.cancelButtonStyle, actionButtonStyle: l == null ? void 0 : l.actionButtonStyle, removeToast: ct, toasts: B.filter((k) => k.position == p.position), heights: nt.filter((k) => k.position == p.position), setHeights: it, expandByDefault: w, gap: at, loadingIcon: X, expanded: Y, pauseWhenPageIsHidden: rt, swipeDirections: e.swipeDirections });
    })) : null;
  }));
});
var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = reactExports.useRef(prop !== void 0);
    reactExports.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = reactExports.useCallback(
    (nextValue) => {
      var _a;
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = reactExports.useState(defaultProp);
  const prevValueRef = reactExports.useRef(value);
  const onChangeRef = reactExports.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  reactExports.useEffect(() => {
    var _a;
    if (prevValueRef.current !== value) {
      (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
function useSize(element) {
  const [size, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const HELPLINES = [
  {
    name: "National Cyber Crime Portal",
    number: "1930",
    description: "Report cybercrime incidents",
    icon: Shield
  },
  {
    name: "RBI Fraud Helpline",
    number: "14440",
    description: "Banking fraud & phishing",
    icon: TriangleAlert
  },
  {
    name: "Cyber Crime Helpline India",
    number: "1930",
    description: "24/7 cyber threat response",
    icon: Phone
  },
  {
    name: "CERT-In Incident Response",
    number: "+91-1800-11-4949",
    description: "National security incidents",
    icon: ShieldCheck
  }
];
const EMAIL_PROVIDERS = [
  { id: "gmail", label: "Gmail", color: "oklch(0.62 0.22 22)" },
  { id: "outlook", label: "Outlook", color: "oklch(0.55 0.18 240)" },
  { id: "yahoo", label: "Yahoo", color: "oklch(0.55 0.22 280)" }
];
function SectionCard({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `rounded-xl border border-border overflow-hidden ${className}`,
      style: { backgroundColor: "oklch(0.12 0 0)" },
      children
    }
  );
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono font-semibold text-primary uppercase tracking-widest px-4 pt-4 pb-2", children });
}
function ProfilePage() {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const protectionSettings = useAppStore((s) => s.protectionSettings);
  const linkedEmail = useAppStore((s) => s.linkedEmail);
  const setProtectionSettings = useAppStore((s) => s.setProtectionSettings);
  const setLinkedEmail = useAppStore((s) => s.setLinkedEmail);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setAlerts = useAppStore((s) => s.setAlerts);
  const setActiveThreatModal = useAppStore((s) => s.setActiveThreatModal);
  const [linkedPhone, setLinkedPhone] = reactExports.useState({
    isLinked: false,
    phoneNumber: ""
  });
  const [phoneInput, setPhoneInput] = reactExports.useState("");
  const [linkingEmail, setLinkingEmail] = reactExports.useState(
    null
  );
  const [linkingPhone, setLinkingPhone] = reactExports.useState(false);
  const [unlinkingEmail, setUnlinkingEmail] = reactExports.useState(false);
  const [unlinkingPhone, setUnlinkingPhone] = reactExports.useState(false);
  const [simulatingThreat, setSimulatingThreat] = reactExports.useState(false);
  const [savingSettings, setSavingSettings] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor) return;
    actor.getLinkedPhone().then((p) => {
      setLinkedPhone(p);
      if (p.isLinked) setPhoneInput(p.phoneNumber);
    });
  }, [actor]);
  const handleLinkEmail = reactExports.useCallback(
    async (provider) => {
      if (!actor) return;
      setLinkingEmail(provider);
      try {
        const demoEmail = `user@${provider}.com`;
        await actor.linkEmail(provider, demoEmail);
        const updated = await actor.getLinkedEmail();
        setLinkedEmail(updated);
        ue.success(`${provider} linked successfully`, {
          description: demoEmail
        });
      } catch {
        ue.error("Failed to link email");
      } finally {
        setLinkingEmail(null);
      }
    },
    [actor, setLinkedEmail]
  );
  const handleUnlinkEmail = reactExports.useCallback(async () => {
    if (!actor) return;
    setUnlinkingEmail(true);
    try {
      await actor.unlinkEmail();
      setLinkedEmail({ provider: "", isLinked: false, emailAddress: "" });
      ue.success("Email account unlinked");
    } catch {
      ue.error("Failed to unlink email");
    } finally {
      setUnlinkingEmail(false);
    }
  }, [actor, setLinkedEmail]);
  const handleLinkPhone = reactExports.useCallback(async () => {
    if (!actor || !phoneInput.trim()) return;
    setLinkingPhone(true);
    try {
      await actor.linkPhone(phoneInput.trim());
      const updated = await actor.getLinkedPhone();
      setLinkedPhone(updated);
      ue.success("Phone number linked", { description: phoneInput.trim() });
    } catch {
      ue.error("Failed to link phone");
    } finally {
      setLinkingPhone(false);
    }
  }, [actor, phoneInput]);
  const handleUnlinkPhone = reactExports.useCallback(async () => {
    if (!actor) return;
    setUnlinkingPhone(true);
    try {
      await actor.unlinkPhone();
      setLinkedPhone({ isLinked: false, phoneNumber: "" });
      setPhoneInput("");
      ue.success("Phone number unlinked");
    } catch {
      ue.error("Failed to unlink phone");
    } finally {
      setUnlinkingPhone(false);
    }
  }, [actor]);
  const handleToggle = reactExports.useCallback(
    async (key, value) => {
      if (!actor) return;
      const updated = { ...protectionSettings, [key]: value };
      setProtectionSettings(updated);
      setSavingSettings(true);
      try {
        await actor.updateProtectionSettings(updated);
      } catch {
        setProtectionSettings(protectionSettings);
        ue.error("Failed to update setting");
      } finally {
        setSavingSettings(false);
      }
    },
    [actor, protectionSettings, setProtectionSettings]
  );
  const handleSimulateThreat = reactExports.useCallback(async () => {
    if (!actor) return;
    setSimulatingThreat(true);
    try {
      const threat = await actor.simulateEmailThreat(
        "https://crime.com",
        "Phishing Email Alert"
      );
      const alerts = await actor.getAlerts();
      setAlerts(alerts);
      setActiveThreatModal(threat);
      ue.success("Demo threat triggered!", {
        description: "Check the threat modal on Home."
      });
    } catch {
      ue.error("Failed to simulate threat");
    } finally {
      setSimulatingThreat(false);
    }
  }, [actor, setAlerts, setActiveThreatModal]);
  const handleLogout = reactExports.useCallback(() => {
    setAuthenticated(false);
    navigate({ to: "/login" });
  }, [setAuthenticated, navigate]);
  const settingsRows = [
    {
      key: "emailProtection",
      label: "Email Protection",
      description: "Scan incoming emails for phishing"
    },
    {
      key: "smsProtection",
      label: "SMS Protection",
      description: "Detect malicious links in SMS"
    },
    {
      key: "browserProtection",
      label: "Browser Protection",
      description: "Block phishing sites in real-time"
    },
    {
      key: "silentScan",
      label: "Silent Scan Mode",
      description: "Scan without notifications"
    },
    {
      key: "aiIntel",
      label: "AI Intelligence",
      description: "Enhanced ML threat detection"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-4 space-y-5 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-threat-glow",
                style: {
                  backgroundColor: "oklch(0.16 0 0)",
                  border: "1.5px solid oklch(0.72 0.28 145 / 0.4)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Shield,
                  {
                    className: "w-8 h-8",
                    style: { color: "oklch(0.72 0.28 145)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg leading-tight truncate", children: "Hook Sniffer User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-primary text-primary font-mono text-xs px-2 py-0",
                  style: { borderColor: "oklch(0.72 0.28 145 / 0.5)" },
                  children: "PRO SHIELD"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-1", children: [
                "Member since",
                " ",
                (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric"
                })
              ] })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.05 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Linked Email Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: linkedEmail.isLinked ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dot-active shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground truncate font-medium capitalize", children: linkedEmail.provider }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: linkedEmail.emailAddress })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "w-4 h-4 shrink-0 ml-1",
                    style: { color: "oklch(0.72 0.28 145)" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleUnlinkEmail,
                  disabled: unlinkingEmail,
                  className: "text-destructive hover:text-destructive shrink-0 ml-2",
                  "data-ocid": "unlink-email-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Unlink, { className: "w-3.5 h-3.5 mr-1" }),
                    "Disconnect"
                  ]
                }
              )
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Connect your inbox to enable automatic phishing detection." }),
              EMAIL_PROVIDERS.map((provider) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleLinkEmail(provider.id),
                  disabled: linkingEmail !== null,
                  "data-ocid": `link-${provider.id}-btn`,
                  className: "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border transition-smooth hover:border-primary/40 disabled:opacity-50",
                  style: { backgroundColor: "oklch(0.14 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-3 h-3 rounded-full",
                          style: { backgroundColor: provider.color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                        "Connect ",
                        provider.label
                      ] })
                    ] }),
                    linkingEmail === provider.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-4 h-4 rounded-full border-2 border-t-transparent animate-spin",
                        style: { borderColor: "oklch(0.72 0.28 145)" }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
                  ]
                },
                provider.id
              ))
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Linked Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: linkedPhone.isLinked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dot-active shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground font-medium", children: linkedPhone.phoneNumber }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "SMS Protection Active" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "w-4 h-4 shrink-0 ml-1",
                    style: { color: "oklch(0.72 0.28 145)" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleUnlinkPhone,
                  disabled: unlinkingPhone,
                  className: "text-destructive hover:text-destructive shrink-0 ml-2",
                  "data-ocid": "unlink-phone-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Unlink, { className: "w-3.5 h-3.5 mr-1" }),
                    "Unlink"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    value: phoneInput,
                    onChange: (e) => setPhoneInput(e.target.value),
                    placeholder: "+91 98765 43210",
                    "data-ocid": "phone-input",
                    className: "w-full bg-input border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-smooth"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleLinkPhone,
                  disabled: linkingPhone || !phoneInput.trim(),
                  size: "sm",
                  className: "shrink-0",
                  "data-ocid": "link-phone-btn",
                  style: {
                    backgroundColor: "oklch(0.72 0.28 145)",
                    color: "oklch(0.06 0 0)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-3.5 h-3.5 mr-1" }),
                    linkingPhone ? "Linking…" : "Link"
                  ]
                }
              )
            ] }) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.15 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionTitle, { children: [
              "Protection Settings",
              savingSettings && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-muted-foreground normal-case font-normal", children: "Saving…" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: settingsRows.map(({ key, label, description }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-4 py-3.5 transition-smooth hover:bg-muted/20",
                style: { animationDelay: `${i * 40}ms` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 mr-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: protectionSettings[key],
                      onCheckedChange: (v2) => handleToggle(key, v2),
                      "data-ocid": `toggle-${key}`,
                      className: "shrink-0"
                    }
                  )
                ]
              },
              key
            )) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.2 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Report Threats — Government Helplines" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: HELPLINES.map(({ name, number, description, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                  style: { backgroundColor: "oklch(0.16 0 0)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: "w-4 h-4",
                      style: { color: "oklch(0.72 0.28 145)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-tight truncate", children: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono font-bold text-sm",
                    style: { color: "oklch(0.72 0.28 145)" },
                    children: number
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      navigator.clipboard.writeText(number);
                      ue.success("Number copied");
                    },
                    "data-ocid": `copy-${number}`,
                    className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth",
                    "aria-label": `Copy ${name} number`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] }) }, `${name}-${number}`)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.25 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Developer Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Simulate an incoming email threat to test the alert system." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSimulateThreat,
                  disabled: simulatingThreat,
                  "data-ocid": "simulate-threat-btn",
                  className: "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono font-semibold text-sm transition-smooth disabled:opacity-60 shadow-danger-glow",
                  style: {
                    backgroundColor: "oklch(0.62 0.22 22 / 0.15)",
                    border: "1px solid oklch(0.62 0.22 22 / 0.5)",
                    color: "oklch(0.85 0.15 22)"
                  },
                  children: simulatingThreat ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-4 h-4 rounded-full border-2 border-t-transparent animate-spin",
                        style: { borderColor: "oklch(0.85 0.15 22)" }
                      }
                    ),
                    "Triggering Threat…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                    "Test Email Alert (Demo)"
                  ] })
                }
              )
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.3 },
          className: "pb-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                onClick: handleLogout,
                "data-ocid": "logout-btn",
                className: "w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive transition-smooth font-mono",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                  "Sign Out"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4 font-mono", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              ".",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-primary transition-colors",
                  children: "Built with love using caffeine.ai"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  ProfilePage as default
};
