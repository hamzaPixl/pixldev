// Pixl illustration manifest — the single source of truth for every generated
// visual (blog heroes, product panels, OG art). Edit the specs, then run
// `node illustrations/generate.mjs` to (re)generate. See README.md.
//
// House style follows public/brand.md: near-black canvas, ONE accent light
// source with soft bloom + horizontal motion-blur light trails, film grain and
// a faint pixel grid, premium/engineered mood, generous negative space.
// Reference feel: cinematic editorial (motion-blur portraits, neon light
// trails, high-contrast profiles) — abstract and conceptual, never stocky.

export const PIXL_GREEN = "#30CB77";

/** Shared style suffix appended to every prompt (the "house style"). */
export const STYLE_BASE = [
  "Cinematic editorial illustration, abstract and conceptual.",
  "Near-black background (#08090A) with deep negative space.",
  "A single {ACCENT} light source with soft bloom, and horizontal motion-blur",
  "light-trail streaks crossing the frame.",
  "Subtle film grain and a faint fine pixel grid texture.",
  "High contrast, premium and engineered mood, shallow depth, one dominant hue.",
  "No text, no words, no watermark, no logos, no UI, no literal robots,",
  "no brains, no circuit-board clichés, no stock 3D. 8k, photographic light.",
].join(" ");

/** Default model (OpenRouter). Fallback used if the primary returns no image. */
export const MODEL = "google/gemini-3-pro-image";
export const MODEL_FALLBACK = "google/gemini-2.5-flash-image";

/**
 * kind: "blog" → writes public/illustrations/blog/<id>.jpg, meant for the post
 *        `image:` frontmatter + OG. "product" → product panel + OG. "hero".
 * accent: hex that tints the light. concept: the one-line idea to depict.
 * aspect: target ratio (prompt hint; see README for the canvas trick).
 */
export const illustrations = [
  // ── Blog posts ───────────────────────────────────────────────
  {
    id: "the-company-is-an-api-call",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "A factory made of light: geometric modules assembling themselves along one bright green horizon line, provisioning streams flowing outward, as if a company is being instantiated from a single call.",
    tags: ["abstract", "systems", "horizon", "assembly", "green"],
  },
  {
    id: "i-changed-my-mind-three-times",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "Three overlapping horizon arcs shifting position, motion-blur showing a path being revised over time, with one continuous bright green current surviving through all three.",
    tags: ["abstract", "iteration", "arcs", "revision", "green"],
  },
  {
    id: "no-consumer-no-build",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "A single brightly-lit node on a dark grid, surrounded by unused connectors fading into black, with one taut green thread of light pulled toward it — value with no caller.",
    tags: ["abstract", "node", "grid", "restraint", "green"],
  },
  {
    id: "the-baton-pattern",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "A small luminous token passed along a relay line of light between glowing stations, a motion-blur trail marking the handoff across a dark field.",
    tags: ["abstract", "relay", "handoff", "token", "green"],
  },
  {
    id: "simulating-my-whatsapp-group-with-llm-personas",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "Five distinct points of light in conversation, their threads crossing and balancing on a dark stage, none dominating — a simulated group as a constellation of currents.",
    tags: ["abstract", "multi-agent", "constellation", "balance", "green"],
  },
  {
    id: "a-practical-map-of-the-next-tech-decade",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "A layered stack of horizon lines receding into depth, each one a brighter green than the last, mapping a sequence of eras.",
    tags: ["abstract", "layers", "roadmap", "depth", "green"],
  },
  {
    id: "ai-is-not-about-models-its-about-systems",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "A small bright model-core dwarfed by the operating structure of light rails around it, the system visibly larger and more important than the core.",
    tags: ["abstract", "systems", "structure", "core", "green"],
  },
  {
    id: "fine-tuned-local-models-are-the-next-layer",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "Small sharp specialized light-nodes crystallizing out of a broad diffuse green glow, specialization emerging from generality.",
    tags: ["abstract", "specialization", "crystallize", "nodes", "green"],
  },
  {
    id: "robotics-is-where-agentic-systems-become-real",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "An abstract embodied form emerging from a field of green light, agentic motion-blur suggesting a system stepping into the physical world.",
    tags: ["abstract", "embodiment", "emergence", "motion", "green"],
  },
  {
    id: "the-technical-stack-behind-my-ai-projects",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    concept:
      "Two luminous interlocking layers — an execution loop and a knowledge field — bound together by green light over a dark ground.",
    tags: ["abstract", "layers", "harness", "knowledge", "green"],
  },

  // ── Products (each in its brand accent) ──────────────────────
  {
    id: "feen",
    kind: "product",
    accent: "#5C7CFF",
    aspect: "16:9",
    concept:
      "Streams of blue light resolving out of chaos into calm, ordered financial ledgers and reconciled rows, a sense of automated accounting settling into place.",
    tags: ["abstract", "finance", "order", "blue"],
  },
  {
    id: "company-data",
    kind: "product",
    accent: "#22D3EE",
    aspect: "16:9",
    concept:
      "A cyan constellation of official records and registries connecting into one clear, authoritative graph of a Belgian company.",
    tags: ["abstract", "data", "graph", "cyan"],
  },
  {
    id: "bumpi",
    kind: "product",
    accent: "#A78BFA",
    aspect: "16:9",
    concept:
      "Violet brand-light locking into one consistent form while off-brand fragments are repelled and fade to black — a guardrail holding a brand together.",
    tags: ["abstract", "brand", "guardrail", "violet"],
  },
  {
    id: "syncco",
    kind: "product",
    accent: "#34D399",
    aspect: "16:9",
    concept:
      "Two emerald record-streams flowing toward each other and reconciling, small mismatches flaring red then snapping into aligned green.",
    tags: ["abstract", "compliance", "reconcile", "emerald"],
  },
  {
    id: "pixl-web",
    kind: "product",
    accent: "#F472B6",
    aspect: "16:9",
    concept:
      "A website assembling itself from blocks of pink light, agent-built, sections snapping into a clean layout across a dark field.",
    tags: ["abstract", "web", "assembly", "pink"],
  },
  {
    id: "pixl-branding",
    kind: "product",
    accent: "#FBBF24",
    aspect: "16:9",
    concept:
      "An amber identity system radiating consistent design tokens outward from a single source, a brand book coming into being.",
    tags: ["abstract", "brand", "tokens", "amber"],
  },
];

/** Compose the full prompt for a spec. */
export function buildPrompt(spec) {
  return `${spec.concept} ${STYLE_BASE.replace(/\{ACCENT\}/g, spec.accent)}`;
}

/** Output path (relative to public/) for a spec. */
export function outPath(spec) {
  return `illustrations/${spec.kind}/${spec.id}.jpg`;
}
