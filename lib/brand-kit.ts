export const PIXL_COLORS = [
  { key: "signal", name: "Signal Green", value: "#30CB77", role: "Identity, action, focus" },
  { key: "ground", name: "Deep Ground", value: "#08090A", role: "Primary canvas" },
  { key: "surface", name: "System Surface", value: "#111411", role: "Specimens and UI" },
  { key: "ink", name: "Signal White", value: "#F7F8F8", role: "Primary type" },
  { key: "muted", name: "Trace", value: "#8A918C", role: "Supporting type" },
] as const;

export const PIXL_ASSETS = [
  { key: "mark.signal", label: "Signal Green pictogram", path: "/pixl-mark.svg", format: "SVG", use: "App icons and compact signatures" },
  { key: "mark.white", label: "Signal White pictogram", path: "/pixl-mark-white.svg", format: "SVG", use: "Dark monochrome applications" },
  { key: "motion.signal", label: "Signal Green motion", path: "/brand/pixl-pictogram-green.gif", format: "GIF", use: "Presentations and messaging" },
  { key: "motion.white", label: "Signal White motion", path: "/brand/pixl-pictogram-white.gif", format: "GIF", use: "Dark presentations and messaging" },
  { key: "lockup.light", label: "Light lockup", path: "/logo.svg", format: "SVG", use: "Dark backgrounds" },
  { key: "lockup.color", label: "Color lockup", path: "/Logo Color.svg", format: "SVG", use: "Light backgrounds" },
] as const;

export const PIXL_MOTION = [
  { key: "mark.build", name: "System build", duration: "1.8s", repeat: "Once", purpose: "Construct the identity from one signal" },
  { key: "mark.listen", name: "Listening state", duration: "2.4s", repeat: "Finite", purpose: "Show an active system without a spinner" },
  { key: "content.reveal", name: "Evidence reveal", duration: "600ms", repeat: "Once", purpose: "Establish reading order" },
] as const;

export const PIXL_OG_PREVIEWS = [
  {
    id: "studio",
    label: "Studio",
    src: "/og?eyebrow=Pixl%20Studio&title=AI%20systems%20for%20Belgian%20business",
  },
  {
    id: "principle",
    label: "Editorial",
    src: "/og?eyebrow=Operating%20principle&title=Models%20are%20not%20the%20product.%20Systems%20are.",
  },
] as const;
