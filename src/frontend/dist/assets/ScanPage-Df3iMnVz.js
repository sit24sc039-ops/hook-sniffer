import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useActor, a as useAppStore, P as PageHeader, S as ShieldCheck, T as TriangleAlert, b as createActor } from "./index-B9QzGcrp.js";
import { B as Badge } from "./badge-DLiSrIsl.js";
import { B as Button, L as Link2, C as CircleCheck } from "./button-CEaoTiK2.js";
import { b as normalizeScan, S as ScanResult, T as ThreatType, a as ThreatSource } from "./types-D5Hoju2w.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DXWyW35z.js";
import { Q as QrCode, M as Mail } from "./qr-code-R1Uy9or9.js";
import { C as ChevronRight } from "./chevron-right-BR06CZkr.js";
import { Z as Zap } from "./zap-DvkvY2DE.js";
import { S as ShieldAlert } from "./shield-alert-D0CSN26u.js";
import "./clsx-DgYk2OaC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const TABS = [
  { id: "url", label: "Paste URL", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { size: 14 }) },
  { id: "qr", label: "QR Code", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 14 }) },
  { id: "email", label: "Email", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14 }) }
];
const SCAN_STAGES = [
  { id: "lexical", label: "Lexical Analysis", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 12 }) },
  { id: "domain", label: "Domain Age Check", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12 }) },
  {
    id: "nlp",
    label: "NLP Sentiment Analysis",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 12 })
  }
];
const RING_SCALES = [1, 0.67, 0.33];
function RadarDisplay({ scanning }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 180, height: 180 },
      children: [
        RING_SCALES.map((scale) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full border border-primary/20",
            style: { width: 180 * scale, height: 180 * scale }
          },
          scale
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-full h-px bg-primary/15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-px h-full bg-primary/15" }),
        scanning && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-full radar-sweep animate-radar-rotate",
            style: { clipPath: "circle(50%)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dot-active z-10" }),
        scanning && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute w-2 h-2 rounded-full bg-primary animate-threat-pulse",
              style: { top: "28%", left: "60%" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute w-1.5 h-1.5 rounded-full bg-primary/70",
              style: { top: "55%", left: "30%" }
            }
          )
        ] })
      ]
    }
  );
}
const BRACKET_POSITIONS = [
  { cls: "top-2 left-2", isTop: true, isLeft: true },
  { cls: "top-2 right-2", isTop: true, isLeft: false },
  { cls: "bottom-2 left-2", isTop: false, isLeft: true },
  { cls: "bottom-2 right-2", isTop: false, isLeft: false }
];
function QrViewfinder({ scanning }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-lg overflow-hidden",
      style: { width: 220, height: 220, background: "oklch(0.08 0 0)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-xs text-center px-4", children: "Aim camera at QR code" }) }),
        BRACKET_POSITIONS.map(({ cls, isTop, isLeft }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute ${cls} w-6 h-6`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute",
              style: {
                width: "100%",
                height: 2,
                top: isTop ? 0 : "auto",
                bottom: !isTop ? 0 : "auto",
                background: "oklch(0.72 0.28 145)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute",
              style: {
                height: "100%",
                width: 2,
                left: isLeft ? 0 : "auto",
                right: !isLeft ? 0 : "auto",
                background: "oklch(0.72 0.28 145)"
              }
            }
          )
        ] }, cls)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-8 h-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 left-0 right-0 h-px -translate-y-1/2",
              style: { background: "oklch(0.72 0.28 145 / 0.7)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2",
              style: { background: "oklch(0.72 0.28 145 / 0.7)" }
            }
          )
        ] }) }),
        scanning && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute left-0 right-0 h-0.5",
            style: {
              background: "oklch(0.72 0.28 145 / 0.7)",
              boxShadow: "0 0 8px oklch(0.72 0.28 145)"
            },
            animate: { top: ["10%", "90%", "10%"] },
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }
          }
        )
      ]
    }
  );
}
function StageIndicators({ currentStage }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 w-full mt-4", children: SCAN_STAGES.map((stage, i) => {
    const active = i < currentStage;
    const current = i === currentStage;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex items-center gap-2 rounded-md px-3 py-2",
        style: {
          background: active ? "oklch(0.72 0.28 145 / 0.12)" : current ? "oklch(0.72 0.28 145 / 0.06)" : "oklch(0.14 0 0)",
          border: `1px solid ${active ? "oklch(0.72 0.28 145 / 0.4)" : current ? "oklch(0.72 0.28 145 / 0.2)" : "oklch(0.22 0 0)"}`
        },
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                color: active || current ? "oklch(0.72 0.28 145)" : "oklch(0.45 0 0)"
              },
              children: active ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }) : stage.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono text-xs",
              style: {
                color: active ? "oklch(0.72 0.28 145)" : current ? "oklch(0.75 0 0)" : "oklch(0.45 0 0)"
              },
              children: stage.label
            }
          ),
          active && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-auto font-mono text-xs",
              style: { color: "oklch(0.72 0.28 145)" },
              children: "✓"
            }
          ),
          current && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              className: "ml-auto font-mono text-xs",
              style: { color: "oklch(0.72 0.28 145)" },
              animate: { opacity: [1, 0.3, 1] },
              transition: { duration: 0.8, repeat: Number.POSITIVE_INFINITY },
              children: "scanning..."
            }
          )
        ]
      },
      stage.id
    );
  }) });
}
const RESULT_META = {
  [ScanResult.phishing]: {
    label: "Phishing",
    color: "oklch(0.62 0.22 22)",
    bg: "oklch(0.62 0.22 22 / 0.12)",
    action: "Immediately avoid this URL. Do not enter credentials.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 18 })
  },
  [ScanResult.malware]: {
    label: "Malware",
    color: "oklch(0.65 0.20 30)",
    bg: "oklch(0.65 0.20 30 / 0.12)",
    action: "Dangerous payload detected. Block and report this URL.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18 })
  },
  [ScanResult.spam]: {
    label: "Spam",
    color: "oklch(0.75 0.18 85)",
    bg: "oklch(0.75 0.18 85 / 0.12)",
    action: "Low-risk spam content. Proceed with caution.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18 })
  },
  [ScanResult.safe]: {
    label: "Safe",
    color: "oklch(0.72 0.28 145)",
    bg: "oklch(0.72 0.28 145 / 0.10)",
    action: "No threats detected. URL appears safe.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 })
  }
};
function ResultCard({
  scan,
  onAddToAlerts,
  onDismiss
}) {
  const meta = RESULT_META[scan.result];
  const isThreat = scan.result !== ScanResult.safe;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "w-full rounded-xl overflow-hidden",
      style: {
        background: meta.bg,
        border: `1px solid ${meta.color}`,
        boxShadow: `0 0 20px ${meta.color}33`
      },
      initial: { opacity: 0, scale: 0.96, y: 12 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-4 py-3",
            style: { borderBottom: `1px solid ${meta.color}33` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: meta.color }, children: meta.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-semibold text-sm",
                  style: { color: meta.color },
                  children: "Threat Classification"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "ml-auto font-mono text-xs px-2",
                  style: {
                    background: meta.bg,
                    color: meta.color,
                    border: `1px solid ${meta.color}`
                  },
                  children: meta.label
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Confidence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono font-bold",
                  style: { color: meta.color },
                  children: [
                    scan.confidence,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-1.5 rounded-full",
                style: { background: "oklch(0.22 0 0)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full",
                    style: { background: meta.color },
                    initial: { width: 0 },
                    animate: { width: `${scan.confidence}%` },
                    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono block mb-1", children: "Scanned URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-mono text-xs rounded px-2 py-1.5 truncate",
                style: { background: "oklch(0.10 0 0)", color: "oklch(0.75 0 0)" },
                children: scan.url
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 rounded-lg px-3 py-2",
              style: { background: "oklch(0.10 0 0)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronRight,
                  {
                    size: 13,
                    className: "mt-0.5 shrink-0 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: meta.action })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            isThreat && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                className: "flex-1 font-mono text-xs h-9",
                "data-ocid": "scan-add-to-alerts",
                onClick: onAddToAlerts,
                style: {
                  background: meta.color,
                  color: "oklch(0.06 0 0)",
                  border: "none"
                },
                children: "Add to Alerts"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "flex-1 font-mono text-xs h-9",
                "data-ocid": "scan-dismiss",
                onClick: onDismiss,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 12, className: "mr-1.5" }),
                  "Dismiss"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ScanPage() {
  const { actor } = useActor(createActor);
  const addAlert = useAppStore((s) => s.addAlert);
  const [activeTab, setActiveTab] = reactExports.useState("url");
  const [urlInput, setUrlInput] = reactExports.useState("");
  const [qrInput, setQrInput] = reactExports.useState("");
  const [emailInput, setEmailInput] = reactExports.useState("");
  const [scanning, setScanning] = reactExports.useState(false);
  const [stageIndex, setStageIndex] = reactExports.useState(-1);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const stageTimer = reactExports.useRef(null);
  const clearStageTimers = reactExports.useCallback(() => {
    if (stageTimer.current) clearTimeout(stageTimer.current);
  }, []);
  reactExports.useEffect(() => () => clearStageTimers(), [clearStageTimers]);
  const runStages = reactExports.useCallback((onComplete) => {
    setStageIndex(0);
    stageTimer.current = setTimeout(() => {
      setStageIndex(1);
      stageTimer.current = setTimeout(() => {
        setStageIndex(2);
        stageTimer.current = setTimeout(async () => {
          setStageIndex(3);
          await onComplete();
        }, 500);
      }, 500);
    }, 500);
  }, []);
  const handleScan = reactExports.useCallback(async () => {
    if (!actor) return;
    setError(null);
    setResult(null);
    const input = activeTab === "url" ? urlInput.trim() : activeTab === "qr" ? qrInput.trim() : emailInput.trim();
    if (!input) {
      setError("Please enter content to scan.");
      return;
    }
    setScanning(true);
    runStages(async () => {
      try {
        let entry;
        if (activeTab === "url") entry = await actor.scanUrl(input);
        else if (activeTab === "qr") entry = await actor.scanQr(input);
        else entry = await actor.scanEmail(input);
        const display = normalizeScan(entry);
        setResult(display);
        if (display.result !== ScanResult.safe) {
          const alertPayload = {
            id: BigInt(Date.now()),
            url: display.url,
            source: activeTab === "email" ? ThreatSource.email : activeTab === "qr" ? ThreatSource.qr : ThreatSource.url,
            isRead: false,
            threatName: `${display.result.charAt(0).toUpperCase()}${display.result.slice(1)} URL`,
            threatType: display.result === ScanResult.phishing ? ThreatType.phishing : display.result === ScanResult.malware ? ThreatType.malware : ThreatType.spam,
            timestamp: BigInt(Date.now()) * 1000000n,
            riskScore: BigInt(display.confidence)
          };
          addAlert(alertPayload);
        }
      } catch {
        setError("Scan failed. Please try again.");
      } finally {
        setScanning(false);
      }
    });
  }, [actor, activeTab, urlInput, qrInput, emailInput, runStages, addAlert]);
  const handleTabChange = (id) => {
    if (scanning) return;
    setActiveTab(id);
    setResult(null);
    setError(null);
    setStageIndex(-1);
  };
  const handleDismiss = () => {
    setResult(null);
    setStageIndex(-1);
    setError(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-0 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Threat Scanner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 pb-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 rounded-xl p-1 mt-2",
          style: { background: "oklch(0.12 0 0)" },
          "data-ocid": "scan-tab-bar",
          children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `scan-tab-${tab.id}`,
              onClick: () => handleTabChange(tab.id),
              className: "flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-xs font-medium transition-smooth relative",
              style: {
                background: activeTab === tab.id ? "oklch(0.18 0 0)" : "transparent",
                color: activeTab === tab.id ? "oklch(0.72 0.28 145)" : "oklch(0.5 0 0)"
              },
              disabled: scanning,
              children: [
                tab.icon,
                tab.label,
                activeTab === tab.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    layoutId: "tab-underline",
                    className: "absolute bottom-0 left-3 right-3 h-0.5 rounded-full",
                    style: { background: "oklch(0.72 0.28 145)" },
                    transition: { duration: 0.2, ease: "easeInOut" }
                  }
                )
              ]
            },
            tab.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.18, ease: "easeOut" },
          className: "space-y-4",
          children: [
            activeTab === "url" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "url-input",
                  className: "text-xs font-mono text-muted-foreground block",
                  children: "Enter URL to scan"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "url-input",
                  "data-ocid": "scan-url-input",
                  className: "w-full rounded-lg px-3 py-2.5 font-mono text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-smooth",
                  placeholder: "https://suspicious-link.example.com",
                  value: urlInput,
                  onChange: (e) => setUrlInput(e.target.value),
                  disabled: scanning,
                  onKeyDown: (e) => e.key === "Enter" && handleScan()
                }
              )
            ] }),
            activeTab === "qr" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrViewfinder, { scanning }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "qr-input",
                    className: "text-xs font-mono text-muted-foreground block",
                    children: "Or enter QR URL manually"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "qr-input",
                    "data-ocid": "scan-qr-input",
                    className: "w-full rounded-lg px-3 py-2.5 font-mono text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-smooth",
                    placeholder: "Paste decoded QR URL here",
                    value: qrInput,
                    onChange: (e) => setQrInput(e.target.value),
                    disabled: scanning,
                    onKeyDown: (e) => e.key === "Enter" && handleScan()
                  }
                )
              ] })
            ] }),
            activeTab === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "email-input",
                  className: "text-xs font-mono text-muted-foreground block",
                  children: "Paste full email content or a suspicious URL found in an email"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "email-input",
                  "data-ocid": "scan-email-input",
                  className: "w-full rounded-lg px-3 py-2.5 font-mono text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-smooth resize-none",
                  placeholder: "Subject: Your account has been compromised\n\nDear Customer, please click the link below...\nhttps://fake-bank-login.net/verify",
                  rows: 6,
                  value: emailInput,
                  onChange: (e) => setEmailInput(e.target.value),
                  disabled: scanning
                }
              )
            ] })
          ]
        },
        activeTab
      ) }),
      !scanning && !result && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "scan-now-btn",
              onClick: handleScan,
              disabled: scanning || !actor,
              className: "w-full h-12 font-display font-semibold text-sm tracking-wide",
              style: {
                background: "oklch(0.72 0.28 145)",
                color: "oklch(0.06 0 0)",
                boxShadow: "0 0 20px oklch(0.72 0.28 145 / 0.4)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "mr-2" }),
                "SCAN NOW"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          className: "text-xs font-mono text-center",
          style: { color: "oklch(0.62 0.22 22)" },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: error
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: scanning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col items-center gap-2",
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: { duration: 0.25 },
          "data-ocid": "scan-processing",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RadarDisplay, { scanning }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-mono text-xs mt-1 animate-neon-flicker",
                style: { color: "oklch(0.72 0.28 145)" },
                children: "ML Engine Running..."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StageIndicators, { currentStage: stageIndex })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !scanning && result && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResultCard,
        {
          scan: result,
          onAddToAlerts: handleDismiss,
          onDismiss: handleDismiss
        }
      ) })
    ] })
  ] });
}
export {
  ScanPage as default
};
