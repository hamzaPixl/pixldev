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

/**
 * Shared style suffix — the Pixl "house style" applied to a RECOGNIZABLE
 * subject (a face, a hand, an object, a landscape), not to abstract shapes.
 * The signature stays constant (near-black, one green light, motion blur, grain,
 * pixel grid, editorial); the subject changes per post so the set has variety.
 * Deliberately does NOT ban humans/objects/robots — that ban is what flattened
 * the first pass into interchangeable light-blobs.
 */
export const STYLE_BASE = [
  "Shot as a cinematic editorial photograph, high-end art direction.",
  "Near-black background (#08090A), deep negative space, one clear subject.",
  "Lit by a single {ACCENT} light source with soft bloom and horizontal",
  "motion-blur light streaks; the rest falls into shadow.",
  "Subtle film grain, a faint fine pixel-grid texture, shallow depth of field,",
  "high contrast. Premium, engineered, quietly cinematic — never stocky,",
  "never a gradient blob, never an 'AI brain' or circuit-board cliché.",
  "No text, no words, no watermark, no logo, no UI. Photographic light, 8k.",
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
  // ── Blog posts (each a recognizable subject, not an abstract blob) ──
  {
    id: "the-company-is-an-api-call",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "hand+object",
    concept:
      "A single human hand pressing one glowing key on a dark mechanical keyboard; from that keystroke a stream of green light shoots to the right and assembles into the faint silhouette of a factory floor — one command instantiating a whole company.",
    tags: ["hand", "keyboard", "factory", "instantiation", "green"],
  },
  {
    id: "i-changed-my-mind-three-times",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "portrait",
    concept:
      "A conceptual editorial portrait of one thoughtful person, their head captured in three overlapping motion-blur exposures as if turning to reconsider a decision, cool dark tones with a single bright green light streak crossing horizontally at eye level.",
    tags: ["portrait", "motion-blur", "editorial", "revision", "green"],
  },
  {
    id: "no-consumer-no-build",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "figure+scene",
    concept:
      "A lone human silhouette standing small in a vast empty dark hall, facing one distant green light glowing across the void — something fully built, waiting, with no one there to call it.",
    tags: ["figure", "silhouette", "emptiness", "restraint", "green"],
  },
  {
    id: "the-baton-pattern",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "hands+object",
    concept:
      "Extreme close-up of two hands at the exact moment of a relay handoff, passing a small glowing green baton-token between them, motion-blur trailing the pass across a dark background.",
    tags: ["hands", "relay", "handoff", "token", "green"],
  },
  {
    id: "simulating-my-whatsapp-group-with-llm-personas",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "portraits",
    concept:
      "Five distinct human faces in profile emerging from darkness at different depths, each rim-lit by its own green glow as if mid-conversation — a simulated group chat rendered as a row of editorial portraits.",
    tags: ["portraits", "profiles", "conversation", "personas", "green"],
  },
  {
    id: "a-practical-map-of-the-next-tech-decade",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "landscape",
    concept:
      "A layered mountain-range landscape at night receding into fog, each successive ridge rimmed with a brighter green light than the one before, mapping a sequence of eras marching toward the horizon.",
    tags: ["landscape", "mountains", "layers", "roadmap", "green"],
  },
  {
    id: "ai-is-not-about-models-its-about-systems",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "architecture",
    concept:
      "A vast dark engine room in dramatic perspective, its architecture of gantries and rails dwarfing a single small bright green core glowing at the center — the operating system visibly larger than the model.",
    tags: ["architecture", "engine-room", "scale", "core", "green"],
  },
  {
    id: "fine-tuned-local-models-are-the-next-layer",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "object",
    concept:
      "A glass prism resting on a dark reflective surface, taking a broad diffuse green glow entering from one side and focusing it into a few sharp precise beams exiting the other — general capability refined into specialized local models.",
    tags: ["object", "prism", "focus", "specialization", "green"],
  },
  {
    id: "robotics-is-where-agentic-systems-become-real",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "object/robot",
    concept:
      "A sleek robotic hand emerging from darkness into a shaft of green rim-light, fingertips just making contact with a real physical surface — agentic systems stepping into the physical world.",
    tags: ["robotics", "robotic-hand", "embodiment", "contact", "green"],
  },
  {
    id: "the-technical-stack-behind-my-ai-projects",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "scene",
    concept:
      "A developer's dark desk at night lit only by a glowing terminal, with two translucent layers of green light — an execution loop and a knowledge field — hovering interlocked in the air above the keyboard.",
    tags: ["scene", "desk", "terminal", "layers", "green"],
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
