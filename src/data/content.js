import { img } from "./images";

/* ─── Brand ──────────────────────────────────────────────────── */
export const brand = {
  name:       "Murthy Ateliers",
  tagline:    "by 9th",
  fullName:   "Murthy Ateliers by 9th",
  signature:  "Heirloom Jewels Crafted to Endure",
  address:    "South Mada Street, Mylapore, Chennai",
  email:      "hello@murthyateliers.com",
  phone:      "+91 98410 24790",
  instagram:  "murthyateliers",
  whatsapp:   "https://wa.me/919841024790?text=Hello%20Murthy%20Ateliers%2C%20I%20would%20love%20to%20know%20more%20about%20your%20jewelry.",
  mapLink:    "https://maps.google.com/?q=South+Mada+Street+Mylapore+Chennai",
};

/* ─── Navigation ─────────────────────────────────────────────── */
export const navigation = [
  { label: "Collections",    href: "/collections" },
  { label: "Craftsmanship",  href: "/craftsmanship" },
  { label: "Heritage",       href: "/heritage" },
  { label: "Journal",        href: "/journal" },
  { label: "Consultation",   href: "/consultation" },
];

/* ─── Hero ───────────────────────────────────────────────────── */
export const hero = {
  eyebrow:    "Murthy Ateliers by 9th",
  heading:    "Heirloom Jewels for Generations to Come",
  subheading: "Crafted with memory, intention, and timeless artistry — Murthy Ateliers creates jewels meant to be worn, loved, and passed on.",
  cta1:       { label: "Explore Collections", href: "/collections" },
  cta2:       { label: "Book a Consultation", href: "/consultation" },
  images:     [img.hero1, img.hero2, img.hero3, img.heroCinematic],
};

/* ─── Founder Story ──────────────────────────────────────────── */
export const founderStory = {
  eyebrow:        "A Legacy Continued",
  heading:        "A Legacy Continued",
  founder:        "Vidya Shankaran",
  role:           "Founder, Murthy Ateliers",
  blessingTamil:  "வாழ்க வளமுடன்",
  blessingEnglish:"May you live and flourish.",
  body: [
    "This piece carries a name — Shanthi Shankar, jeweller's daughter, a woman of warmth and grace who was still becoming when we lost her.",
    "She was the daughter of D.K. Murthy, who spent a lifetime building something real in the heart of Mylapore — the trust of families, the integrity of craft, beauty made to outlast the hands that made it.",
    "Murthy Ateliers is her unfinished sentence, continued. We carry that goodwill forward into every piece, with gratitude for everything they built and love for where it is going.",
    "We are so glad this found its way to you. Wear it with intention. Keep it long. Pass it on.",
  ],
  image:   img.founder,
  sketch:  img.archival,
};

/* ─── Philosophy ─────────────────────────────────────────────── */
export const philosophy = {
  eyebrow: "Made to Outlive Trends",
  heading: "Made to Outlive Trends",
  pillars: [
    {
      number: "01",
      title:  "Craftsmanship",
      body:   "Handcrafted with attention to detail, preserving traditional artistry while embracing contemporary elegance.",
      image:  img.goldwork1,
    },
    {
      number: "02",
      title:  "Meaning",
      body:   "Every jewel carries emotion, memory, and personal significance beyond ornamentation.",
      image:  img.gemstone1,
    },
    {
      number: "03",
      title:  "Heirloom Value",
      body:   "Designed not for seasons, but for generations — and the stories they gather along the way.",
      image:  img.velvetTray,
    },
  ],
};

/* ─── Collections ────────────────────────────────────────────── */
export const collections = [
  {
    id:      "bridal-heirlooms",
    name:    "Bridal Heirlooms",
    tagline: "For wedding mornings, ancestral gold, and measured grandeur.",
    story:   "Layered necklaces, vankis, and jhumkas designed for muhurtham light, silk richness, and the emotional weight of family ceremony. Each piece is composed to feel like it has always belonged to the family.",
    image:   img.bridal,
    accent:  img.necklace1,
  },
  {
    id:      "temple-inspired",
    name:    "Temple-Inspired Pieces",
    tagline: "Architectural, sculptural, and deeply rooted.",
    story:   "Forms informed by shrine doors, lotus borders, peacock reliefs, and the quiet geometry of Tamil sanctum ornament. Jewelry that carries the memory of sacred spaces.",
    image:   img.temple,
    accent:  img.gemstone2,
  },
  {
    id:      "everyday-classics",
    name:    "Everyday Classics",
    tagline: "Refined enough for daily rituals, enduring enough for repetition.",
    story:   "Softer collars, diamond accents, and versatile silhouettes that still carry the dignity of heirloom thinking. Pieces that become part of who you are.",
    image:   img.everyday,
    accent:  img.necklace2,
  },
  {
    id:      "custom-commissions",
    name:    "Custom Commissions",
    tagline: "Personal, collaborative, and made with restraint.",
    story:   "Client-led pieces where memory, material, and wearability are shaped together from the very first conversation. Your story, translated into gold.",
    image:   img.custom,
    accent:  img.earrings1,
  },
  {
    id:      "heritage-revivals",
    name:    "Heritage Revivals",
    tagline: "Museum-like depth with present-day intimacy.",
    story:   "Designs that revive antique language without becoming costume, preserving cultural richness while softening the finish for modern wear.",
    image:   img.heritage,
    accent:  img.bangles1,
  },
];

/* ─── Process Steps ──────────────────────────────────────────── */
export const processSteps = [
  {
    step:  "01",
    title: "Concept & Story",
    body:  "Every piece begins with a family memory, ceremonial need, or personal moodboard that defines its emotional center.",
    image: img.sketch,
  },
  {
    step:  "02",
    title: "Stone Selection",
    body:  "Rubies, emeralds, diamonds, and pearls are chosen for warmth, balance, and how they sit against the gold.",
    image: img.stones,
  },
  {
    step:  "03",
    title: "Handcrafting",
    body:  "Temple geometry, kasu rhythm, granulation, and setting work are shaped slowly by bench-led discipline.",
    image: img.artisan1,
  },
  {
    step:  "04",
    title: "Finishing & Detailing",
    body:  "Edges are softened, surfaces are polished, and contrast is tuned until the jewel feels complete in portrait light.",
    image: img.finishing,
  },
  {
    step:  "05",
    title: "Passed Into Your Hands",
    body:  "The final experience is intimate and guided, with care advice, styling notes, and space for the piece to become yours.",
    image: img.velvetTray,
  },
];

/* ─── Bespoke ────────────────────────────────────────────────── */
export const bespoke = {
  eyebrow:     "Create Something Personal",
  heading:     "Create Something Personal",
  body:        "Whether reimagining inherited jewels or creating a new legacy piece, we work closely with clients to design jewelry rooted in sentiment and individuality.",
  cta1:        { label: "Begin Your Consultation", href: "/consultation" },
  cta2:        { label: "Share Your Story", href: `mailto:hello@murthyateliers.com?subject=Share%20My%20Story` },
  image:       img.bespoke,
};

/* ─── Journal ────────────────────────────────────────────────── */
export const journalArticles = [
  {
    slug:     "story-of-heirloom-jewelry",
    category: "Heritage",
    title:    "The Story of Heirloom Jewelry",
    excerpt:  "Why jewels intended for memory age more beautifully than pieces made for trend cycles. A meditation on permanence and the objects we choose to keep.",
    image:    img.journal1,
    readTime: "6 min read",
  },
  {
    slug:     "mylapore-craft-heritage",
    category: "Culture",
    title:    "Mylapore & Craft Heritage",
    excerpt:  "How street, sanctum, and silk have shaped the visual language of South Indian ornament across centuries of living tradition.",
    image:    img.journal2,
    readTime: "8 min read",
  },
  {
    slug:     "styling-antique-jewelry",
    category: "Styling",
    title:    "Styling Antique Jewelry",
    excerpt:  "Layering temple pieces with restraint so the jewel remains the point of focus. Notes on proportion, occasion, and the art of wearing less.",
    image:    img.journal3,
    readTime: "5 min read",
  },
  {
    slug:     "caring-for-precious-pieces",
    category: "Care",
    title:    "Caring for Precious Pieces",
    excerpt:  "Warm storage, gentle cleaning, and ritual-minded care that keeps heirlooms luminous across generations of wearing.",
    image:    img.journal4,
    readTime: "4 min read",
  },
  {
    slug:     "behind-the-design-process",
    category: "Craft",
    title:    "Behind the Design Process",
    excerpt:  "From the first sketch to the final polish — a look inside the atelier and the slow, deliberate work that makes a piece feel inevitable.",
    image:    img.journal5,
    readTime: "7 min read",
  },
  {
    slug:     "emotional-value-of-passing-jewelry",
    category: "Legacy",
    title:    "The Emotional Value of Passing Jewelry Through Generations",
    excerpt:  "On the quiet power of objects that carry names, dates, and the warmth of hands that wore them before yours.",
    image:    img.journal6,
    readTime: "9 min read",
  },
];

/* ─── Legacy Stories ─────────────────────────────────────────── */
export const legacyStories = [
  {
    quote:  "My daughter wore my wedding bangles redesigned by Murthy Ateliers, and somehow both generations felt present at once.",
    byline: "Family redesign commission",
    detail: "Chennai, 2023",
  },
  {
    quote:  "A choker that reminded us of temple lamps and old photographs. It felt less like shopping and more like recovering a memory.",
    byline: "Bride from Chennai",
    detail: "Bridal commission",
  },
  {
    quote:  "The team understood sentiment before silhouette. That is why the piece still feels deeply ours.",
    byline: "Custom heirloom revival",
    detail: "Heritage collection",
  },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
export const faqs = [
  {
    question: "Do you offer custom-made jewelry?",
    answer:   "Yes. Consultations can begin from a story, sketch, heirloom reference, or ceremonial need, and the final direction is developed privately with the client.",
  },
  {
    question: "Can heirloom jewelry be redesigned?",
    answer:   "Absolutely. Redesign work preserves sentiment first, then reshapes the jewel into a form that can be worn and cherished again.",
  },
  {
    question: "How long does a bespoke piece take?",
    answer:   "Lead times depend on complexity, stone sourcing, and finishing. Most bespoke commissions are planned across several guided stages rather than rushed.",
  },
  {
    question: "Do you work by appointment only?",
    answer:   "Private consultations are encouraged so conversations around family jewelry, ceremonies, and design direction can happen with care and focus.",
  },
  {
    question: "How should heirloom jewelry be cared for?",
    answer:   "Store pieces individually, avoid harsh chemicals, and schedule periodic cleaning or clasp checks to preserve both brilliance and structure.",
  },
  {
    question: "Can pieces be made in different finishes or stones?",
    answer:   "Yes. Many designs can be adapted with alternate stones, finishes, or proportion adjustments while maintaining the original story and silhouette.",
  },
];

/* ─── Final Message ──────────────────────────────────────────── */
export const finalMessage = {
  heading: "Some things are too meaningful to be trend-driven.",
  lines:   ["Jewelry should hold memory.", "It should gather stories.", "It should stay."],
  image:   img.cinematic,
};
