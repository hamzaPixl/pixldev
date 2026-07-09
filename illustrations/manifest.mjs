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
    id: "seo-is-a-graph",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "object/scene",
    concept:
      "A website homepage glowing on a dark screen, its content lifting off the page into a luminous green knowledge-graph of connected entity nodes and links floating above it, as if machines are reading the site's structure rather than its pixels.",
    tags: ["website", "knowledge-graph", "nodes", "structured-data", "green"],
  },
  {
    id: "storyboard-to-generated-video",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "still-life",
    concept:
      "A film storyboard laid on a dark table: a neat row of sketched shot-panels for a short spot, one panel in the middle lit bright green and coming alive into a moving frame, the rest waiting in graphite — a video assembled shot by shot.",
    tags: ["storyboard", "film", "panels", "shots", "green"],
  },
  {
    id: "every-image-from-one-manifest",
    kind: "blog",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "still-life",
    concept:
      "An editorial photographer's contact sheet laid on a dark light-table, a grid of small frames all sharing the same green-lit cinematic look, one frame in the grid glowing brighter than the rest — a whole visual system printed from one source.",
    tags: ["contact-sheet", "system", "grid", "meta", "green"],
  },
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

  // ── Products (recognizable subject, each in its brand accent) ──
  {
    id: "feen",
    kind: "product",
    accent: "#5C7CFF",
    aspect: "16:9",
    archetype: "still-life",
    concept:
      "Top-down view of a dark desk where scattered paper receipts and invoices slide into neat, aligned, reconciled stacks under a cool blue light — accounting settling itself into order.",
    tags: ["desk", "receipts", "invoices", "order", "blue"],
  },
  {
    id: "company-data",
    kind: "product",
    accent: "#22D3EE",
    aspect: "16:9",
    archetype: "map",
    concept:
      "A glowing cyan map of Belgium on a dark surface, fine data-lines linking official building facades and registry documents into one clear authoritative graph.",
    tags: ["map", "belgium", "registry", "data", "cyan"],
  },
  {
    id: "bumpi",
    kind: "product",
    accent: "#A78BFA",
    aspect: "16:9",
    archetype: "still-life",
    concept:
      "A neat fan of on-brand social media cards and posts laid on a dark studio surface, all locked to one consistent look, lit in violet — an AI content studio's output.",
    tags: ["social-cards", "content", "brand", "studio", "violet"],
  },
  {
    id: "syncco",
    kind: "product",
    accent: "#34D399",
    aspect: "16:9",
    archetype: "still-life",
    concept:
      "Two official documents on a dark surface sliding toward each other and aligning line by line under emerald light, one mismatch flaring then snapping into a clean checkmark — continuous compliance.",
    tags: ["documents", "reconcile", "compliance", "checkmark", "emerald"],
  },
  {
    id: "pixl-web",
    kind: "product",
    accent: "#F472B6",
    aspect: "16:9",
    archetype: "object",
    concept:
      "A browser window floating on a dark screen where a clean website assembles itself section by section from blocks of pink light — an AI website builder at work.",
    tags: ["browser", "website", "assembly", "builder", "pink"],
  },
  {
    id: "pixl-branding",
    kind: "product",
    accent: "#FBBF24",
    aspect: "16:9",
    archetype: "still-life",
    concept:
      "An open brand book on a dark desk radiating amber light, its spread pages showing a logo grid, color swatches and type specimens — a brand identity system coming into being.",
    tags: ["brand-book", "swatches", "logo-grid", "identity", "amber"],
  },

  // ── Storyboard: a 5-shot Pixl brand spot (example for the video post) ──
  // All 16:9, same house style + brand.md §5 motifs, so the frames read as
  // stills from one film.
  {
    id: "spot-01-command",
    kind: "storyboard",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "hand+object",
    concept:
      "Cinematic still, shot 1 of 5: extreme close-up of a finger pressing one glowing green key on a dark mechanical keyboard, a terminal cursor blinking green beside a command line just visible in the dark.",
    tags: ["storyboard", "command", "keyboard", "cursor", "green"],
  },
  {
    id: "spot-02-horizon",
    kind: "storyboard",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "landscape",
    concept:
      "Cinematic still, shot 2 of 5: a single bright green horizon line igniting across a pitch-black frame, dawn breaking over the curve of a dark planet, soft bloom and one lens flare.",
    tags: ["storyboard", "horizon", "dawn", "ignite", "green"],
  },
  {
    id: "spot-03-assemble",
    kind: "storyboard",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "object",
    concept:
      "Cinematic still, shot 3 of 5: blocks of green light assembling in mid-air into the faint forms of a website, an invoice and a brand card, over a dark reflective floor, motion-blur on the pieces snapping into place.",
    tags: ["storyboard", "assembly", "company", "montage", "green"],
  },
  {
    id: "spot-04-core",
    kind: "storyboard",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "architecture",
    concept:
      "Cinematic still, shot 4 of 5: a small bright green core glowing at the center of a vast dark engine room, gantries and rails receding into perspective around it.",
    tags: ["storyboard", "core", "engine-room", "system", "green"],
  },
  {
    id: "spot-05-logo",
    kind: "storyboard",
    accent: PIXL_GREEN,
    aspect: "16:9",
    archetype: "object",
    concept:
      "Cinematic still, shot 5 of 5: an abstract square mark resolving out of a grid of green pixels on pure black, a clean pixel-dissolve settling into a single crisp glyph, generous negative space for a wordmark.",
    tags: ["storyboard", "logo", "pixel-dissolve", "resolve", "green"],
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
