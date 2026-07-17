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
      image:  "/jewellry/Web-Optimised/imgs/craftmanship.webp",
    },
    {
      number: "02",
      title:  "Meaning",
      body:   "Every jewel carries emotion, memory, and personal significance beyond ornamentation.",
      image:  "/jewellry/Web-Optimised/imgs/meaning.webp",
    },
    {
      number: "03",
      title:  "Heirloom Value",
      body:   "Designed not for seasons, but for generations — and the stories they gather along the way.",
      image:  "/jewellry/Web-Optimised/imgs/heirloom.webp",
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
    image:   "/jewellry/Web-Optimised/imgs/cat1.webp",
    accent:  img.necklace1,
  },
  {
    id:      "temple-inspired",
    name:    "Temple-Inspired Pieces",
    tagline: "Architectural, sculptural, and deeply rooted.",
    story:   "Forms informed by shrine doors, lotus borders, peacock reliefs, and the quiet geometry of Tamil sanctum ornament. Jewelry that carries the memory of sacred spaces.",
    image:   "/jewellry/Web-Optimised/imgs/cat2.webp",
    accent:  img.gemstone2,
    imagePosition: "center center",
  },
  {
    id:      "everyday-classics",
    name:    "Everyday Classics",
    tagline: "Refined enough for daily rituals, enduring enough for repetition.",
    story:   "Softer collars, diamond accents, and versatile silhouettes that still carry the dignity of heirloom thinking. Pieces that become part of who you are.",
    image:   "/jewellry/Web-Optimised/imgs/cat3.webp",
    accent:  img.necklace2,
    imagePosition: "center calc(50% - 25px)",
  },
  {
    id:      "custom-commissions",
    name:    "Custom Commissions",
    tagline: "Personal, collaborative, and made with restraint.",
    story:   "Client-led pieces where memory, material, and wearability are shaped together from the very first conversation. Your story, translated into gold.",
    image:   "/jewellry/Web-Optimised/imgs/cat4.webp",
    accent:  img.earrings1,
  },
  {
    id:      "heritage-revivals",
    name:    "Heritage Revivals",
    tagline: "Museum-like depth with present-day intimacy.",
    story:   "Designs that revive antique language without becoming costume, preserving cultural richness while softening the finish for modern wear.",
    image:   "/jewellry/Web-Optimised/imgs/cat5.webp",
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
  image:       "/jewellry/Web-Optimised/crafter.webp",
};

/* ─── Journal ────────────────────────────────────────────────── */
export const journalArticles = [
  {
    slug:     "story-of-heirloom-jewelry",
    category: "Heritage",
    title:    "The Story of Heirloom Jewelry",
    excerpt:  "Why jewels intended for memory age more beautifully than pieces made for trend cycles. A meditation on permanence and the objects we choose to keep.",
    image:    "/jewellry/Web-Optimised/heirStory.webp",
    readTime: "6 min read",
  },
  {
    slug:     "mylapore-craft-heritage",
    category: "Culture",
    title:    "Mylapore & Craft Heritage",
    excerpt:  "How street, sanctum, and silk have shaped the visual language of South Indian ornament across centuries of living tradition.",
    image:    "/jewellry/Web-Optimised/imgs/craftmanship.webp",
    readTime: "8 min read",
  },
  {
    slug:     "styling-antique-jewelry",
    category: "Styling",
    title:    "Styling Antique Jewelry",
    excerpt:  "Layering temple pieces with restraint so the jewel remains the point of focus. Notes on proportion, occasion, and the art of wearing less.",
    image:    "/jewellry/Web-Optimised/antique.webp",
    readTime: "5 min read",
  },
  {
    slug:     "caring-for-precious-pieces",
    category: "Care",
    title:    "Caring for Precious Pieces",
    excerpt:  "Warm storage, gentle cleaning, and ritual-minded care that keeps heirlooms luminous across generations of wearing.",
    image:    "/jewellry/Web-Optimised/imgs/heirloom.webp",
    readTime: "4 min read",
  },
  {
    slug:     "behind-the-design-process",
    category: "Craft",
    title:    "Behind the Design Process",
    excerpt:  "From the first sketch to the final polish — a look inside the atelier and the slow, deliberate work that makes a piece feel inevitable.",
    image:    "/jewellry/Web-Optimised/craft.webp",
    readTime: "7 min read",
  },
  {
    slug:     "emotional-value-of-passing-jewelry",
    category: "Legacy",
    title:    "The Emotional Value of Passing Jewelry Through Generations",
    excerpt:  "On the quiet power of objects that carry names, dates, and the warmth of hands that wore them before yours.",
    image:    "/jewellry/Web-Optimised/lineage.webp",
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

/* ─── Stories Behind the Jewels ─────────────────────────────── */
export const jewelleryStories = [
  {
    slug:     "the-swan-who-could-drink-only-the-milk",
    category: "Wisdom",
    title:    "The Swan Who Could Drink Only the Milk",
    jewel:    "Hamsa Pendant (No. 1) and Hamsa Earrings (No. 5)",
    excerpt:  "Long before she was ever carved in gold, Saraswati was given a choice of how to travel through the world. She chose the humblest-looking of all the divine mounts: a plain white swan — and the reason is everything.",
    image:    "/jewellry/Web-Optimised/heirStory.webp",
    readTime: "4 min read",
    body: [
      "Long before she was ever carved in gold, Saraswati was given a choice of how to travel through the world. She could have chosen the lion, like Durga. She could have chosen the elephant, like Indra. Instead, the goddess of knowledge chose the humblest-looking of all the divine mounts: a plain white swan.",
      "The reason becomes clear the moment you learn what this particular swan can do. Pour milk and water into the same bowl and stir them together until no eye alive can tell them apart — and this swan, it is said, can still bend its beak to the bowl and drink up only the milk, leaving every last drop of water behind.",
      "The sages called this power neera-kshira-viveka, and they meant it as more than a party trick. They meant it as the definition of wisdom itself: not the ability to see two things that are obviously different, but the far rarer ability to separate what is true and nourishing from what merely looks the same, when the two have been mixed together on purpose.",
      "This is why, when a soul is said to have achieved the very highest realisation in Hindu thought, tradition does not call that person enlightened, or holy, or wise. It calls them a Paramahamsa — 'the supreme swan' — because to see clearly through confusion, all the way down to what is real, is understood as the swan's own gift, on loan to the rare human being who earns it.",
    ],
    meaning: "A gold swan on a bride's ear or a child's pendant is not decoration for its own sake — it is a small, wearable prayer that the person wearing it will grow into someone who can tell milk from water: someone who is not fooled by what merely looks true.",
  },
  {
    slug:     "the-boy-who-danced-on-the-serpents-hood",
    category: "Devotion",
    title:    "The Boy Who Danced on the Serpent's Hood",
    jewel:    "Nagaram Pendant (No. 3) and Nagar Pendant (No. 13)",
    excerpt:  "In the village of Vrindavan there was a bend in the river Yamuna so poisoned that birds fell dead from the sky. And one day a boy dived in after a ball without a second thought.",
    image:    "/jewellry/Web-Optimised/heritage.webp",
    readTime: "4 min read",
    body: [
      "In the village of Vrindavan there was a bend in the river Yamuna so poisoned that birds fell dead from the sky simply flying over it, and cattle who drank from it never rose again. Beneath that water lived Kaliya, a serpent with five hoods, driven from his true home in the ocean for his arrogance and left to rule this one small, ruined stretch of river as his only kingdom.",
      "One day the cowherd boy Krishna, chasing a ball that had rolled into the water, dived in after it without a second thought — and Kaliya, feeling his territory invaded, coiled around the boy and struck. The village above, watching from the bank, believed in that instant that their beloved child was dead.",
      "But Krishna had not come to kill Kaliya. He rose instead onto the very centre of the serpent's spread hoods and began, impossibly, to dance — a light, joyful, unhurried dance, his anklets ringing with every step, pressing down on each hood in turn until the great serpent's strength gave out beneath him. Only when Kaliya was fully humbled, and his wives had begged for his life, did Krishna stop. He did not destroy the serpent. He simply ordered him back to the ocean where he belonged, and let him go.",
    ],
    meaning: "A serpent pendant so often carries a small figure of Krishna at its centre: it is not a picture of a monster being killed, but of danger being tamed without being destroyed — power that corrects rather than punishes. It is worn, even today, as a wish that a child grow up protected.",
  },
  {
    slug:     "the-race-for-the-one-mango",
    category: "Wisdom",
    title:    "The Race for the One Mango",
    jewel:    "Mango Necklace (No. 4), Big Mango Malai, and Mango-Pattern Eartops",
    excerpt:  "The sage Narada arrived on Mount Kailash carrying a single mango that could grant complete knowledge — but it could not be divided. Only one person could eat it.",
    image:    "/jewellry/Web-Optimised/lineage.webp",
    readTime: "4 min read",
    body: [
      "The sage Narada was well known among the gods for a particular talent: he could not resist stirring up a little mischief, however holy his intentions. One day he arrived on Mount Kailash carrying a single mango, gifted to him by Brahma himself, and explained to Shiva and Parvati that whoever ate this fruit would gain complete knowledge and wisdom — but that it could not be divided. Only one person could eat it.",
      "Parvati looked at her two sons — clever, round Ganesha on his little mouse, and swift, handsome Kartikeya on his peacock — and did not know how she would ever choose between them. So Narada, feigning helpfulness, proposed a solution: let the brothers race three times around the entire world, and whoever returned first would win the mango.",
      "Kartikeya laughed and was gone in an instant, his peacock a blur across the sky. Ganesha did not move. He sat and thought for a moment — and then simply stood up and walked, slowly and with great ceremony, three full circles around his own seated parents.",
      "'My son,' Parvati asked, bewildered, 'why are you not racing?' 'You and Father are my world,' Ganesha replied. 'I have gone around the world three times already.'",
      "When Kartikeya returned, breathless and certain of victory, he found his younger brother already holding the mango. Wisdom, Shiva and Parvati had decided, had already won the race before it began.",
    ],
    meaning: "A mango motif worn on a bride's neck carries a double blessing: the mango itself as an ancient symbol of fertility and abundance, and this story's insistence that the truest kind of intelligence is not speed or strength but the wisdom to recognise what already surrounds you as everything you need.",
  },
  {
    slug:     "the-moon-who-was-loved-unevenly",
    category: "Mercy",
    title:    "The Moon Who Was Loved Unevenly",
    jewel:    "Crescent-Shaped Pendant (No. 8) and Chocker Necklace of Crescents (No. 11)",
    excerpt:  "Chandra, the moon-god, was married to twenty-seven daughters of the sage Daksha. But he loved only one of them, and left the other twenty-six to feel the particular loneliness of being married but unchosen.",
    image:    "/jewellry/Web-Optimised/imgs/heirloom.webp",
    readTime: "5 min read",
    body: [
      "Chandra, the moon-god, was married to all twenty-seven daughters of the great sage Daksha — each of them one of the twenty-seven lunar houses through which the moon passes every month. But Chandra, for all his brightness, loved only one of his twenty-seven wives, a gentle star named Rohini, and left the other twenty-six to feel the particular loneliness of being married but unchosen.",
      "Daksha warned his son-in-law again and again to treat all twenty-seven with equal care. Chandra would not listen. So Daksha, in the fury that fathers reserve for daughters wronged, pronounced a curse: that Chandra's own light would fade a little more each day, until nothing of him remained.",
      "It happened exactly as the curse foretold. Night by night the moon grew thinner and dimmer, until the whole world — its tides, its herbs, its sleeping creatures — began to suffer for the loss of his light. In terror, Chandra fled and hid himself in the ocean, and finally, in desperation, turned to Shiva, offering the deepest penance he could manage.",
      "'Your father-in-law's curse cannot simply be erased,' Shiva told him at last. 'But it need not be the end of you, either. From now on you will wane for a fortnight, as the curse demands — and then you will wax again for a fortnight, growing new each time. And so that you are never without shelter, I will keep a piece of you always, here, on my own head.'",
      "From that day, Shiva has worn the crescent moon in his hair, and is known by the name Chandrashekhara — 'he who wears the moon as his crest.' The moon still wanes every month, exactly as Daksha's anger demanded. But it never disappears for good, exactly as Shiva's mercy demanded too.",
    ],
    meaning: "A crescent-moon necklace is therefore not simply pretty — it is a small argument, worn on the body, that consequences and compassion can both be true at once: that a debt can be paid in full and a person still be protected, not despite the curse but through it.",
  },
  {
    slug:     "the-bird-with-two-heads",
    category: "Power",
    title:    "The Bird with Two Heads and the Fight That Would Not End",
    jewel:    "Makaripadakkam (No. 17)",
    excerpt:  "When Vishnu tore himself out of a stone pillar as Narasimha to destroy a tyrant, he did exactly what he had come to do. But having done it, he could not stop.",
    image:    "/jewellry/Web-Optimised/preservation.webp",
    readTime: "5 min read",
    body: [
      "When Vishnu tore himself out of a stone pillar as Narasimha, half man and half lion, to destroy the tyrant king Hiranyakashipu, he did exactly what he had come to do. But having done it, he could not stop. His fury, once loosed, kept burning long after its target was dead, until the gods themselves began to fear that Narasimha would go on to unmake the very world he had just saved.",
      "Two versions of what happened next are still told, in two different homes, and both deserve to be heard rather than settled. In the tradition that honours Shiva above all, the gods turned to him in their fear, and Shiva took on a new and terrible form of his own — Sharabha, part lion, part bird — specifically to hold that runaway anger and press it back down into stillness, the way a parent might finally, physically, hold a child too far gone in a tantrum to hear reason.",
      "In the tradition that honours Vishnu above all, it is Narasimha himself who, refusing to be contained, transforms further still — into Gandaberunda, a bird with two heads and talons strong enough to grip an elephant in each one — and it is Gandaberunda who prevails, restoring order by force rather than by being restrained.",
      "Either way, the story both traditions keep agreeing on is this: the battle raged for eighteen days, destroying nearly everything around it, until whichever god had triumphed finally paused, looked at the wreckage their own fight had caused, and understood that continuing to fight — even for a good reason, even having started on the right side — had itself become the danger. Only then did peace return.",
    ],
    meaning: "A twin-headed bird pendant, worn as the grand centrepiece of a wedding or an arangetram, is therefore a story about strength that knows when to stop — carried, appropriately, by Karnataka's own royal house, the Wodeyars of Mysore, as the emblem of a kingdom's power, precisely because true sovereignty was understood to include the wisdom to end a fight, not merely the strength to win one.",
  },
  {
    slug:     "the-creature-who-carries-the-river",
    category: "Abundance",
    title:    "The Creature Who Carries the River Down From Heaven",
    jewel:    "Makarakanti Padakkam (Nos. 22 & 23) and the Guardian Arches of Every Temple",
    excerpt:  "The river Ganga did not always flow on earth. She lived once only in the heavens, until a king undertook a penance so long and so severe that even the gods took notice.",
    image:    "/jewellry/Web-Optimised/collection1.webp",
    readTime: "5 min read",
    body: [
      "The river Ganga did not always flow on earth. She lived once only in the heavens, until a king named Bhagiratha, desperate to free the souls of his sixty thousand ancestors who could find no peace until they were touched by her sacred water, undertook a penance so long and so severe that even the gods took notice.",
      "Ganga agreed at last to descend — but her fall from the sky was so immense that it threatened to shatter the earth itself the instant she touched it. It was Shiva who caught her fall in his own matted hair, breaking her descent into a hundred gentler streams before releasing her, at last, to run across the land as the river the world still depends on.",
      "And when Ganga finally took her place among the great goddesses, she was given her own vehicle — not a lion, not an elephant, but the Makara: a strange, composite creature with the jaws of a crocodile, the trunk of an elephant, and the tail of a fish, embodying every dangerous, fertile, unpredictable thing that a river itself can be.",
      "Wherever Ganga is carved in temple stone, the Makara carries her; and wherever a temple threshold needed guarding, sculptors placed a pair of Makaras at the doorway itself, their open jaws pouring out not water but garlands and lotus vines — danger transformed, at the very entrance to a sacred space, into blessing.",
    ],
    meaning: "A Makara Kanti pendant worn at the throat is therefore doing exactly what the temple doorway does: standing guard at a vulnerable point of entry — the throat, where breath and voice both pass — while simultaneously promising the abundance that only a great river, wild as it is, can bring.",
  },
  {
    slug:     "the-ocean-that-was-churned",
    category: "Perseverance",
    title:    "The Ocean That Was Churned Until It Gave Up Everything",
    jewel:    "Every Pearl Strand in This Catalogue",
    excerpt:  "Long ago, the gods lost their strength — and Vishnu offered them one path back to power: churn the great Ocean of Milk itself. But nectar was not the first thing to surface.",
    image:    "/jewellry/Web-Optimised/handCrafted.webp",
    readTime: "5 min read",
    body: [
      "Long ago, the gods lost their strength — cursed by an offended sage for a single act of carelessness — and the demons, sensing weakness, rose to seize the three worlds for themselves. Vishnu offered the gods one path back to power: churn the great Ocean of Milk itself, using Mount Mandara as the churning rod and the serpent-king Vasuki as the rope, and out of that endless churning would eventually rise Amrita, the nectar of immortality.",
      "But nectar was not the first thing to surface. As gods pulled one end of the serpent and demons pulled the other, turning the mountain against the ocean floor for what the old texts describe as a thousand years, the ocean gave up its treasures one at a time, almost reluctantly, before it gave up its greatest one.",
      "First a terrible poison so dark it threatened to end everything before the churning had even finished — which Shiva swallowed to save the worlds, turning his own throat blue forever. Then the divine cow, the wishing-tree, the great white elephant, the physician of the gods — and, rising last of all from the white foam of that churned, exhausted ocean, the goddess Lakshmi, seated on a lotus, radiant enough that flowers rained down from heaven simply at the sight of her.",
      "Among the smaller treasures the ocean surrendered in the course of all that churning — easy to overlook beside a goddess and a pot of immortality, but treasured for exactly this reason — were pearls: pale, cool, born of the same water that had also produced poison, and kept, ever since, as one of the ocean's own rare gifts rather than something merely mined or grown.",
    ],
    meaning: "This is why pearls appear, again and again, threaded alongside the fierier red kemp stones in nearly every piece in this catalogue: they are the ocean's own calm answer to fire — one more thing the world only received because someone — gods and demons both — was willing to labour, for what felt like forever, before any reward appeared at all.",
  },
  {
    slug:     "the-god-who-dances-wearing-the-sky",
    category: "Dance",
    title:    "The God Who Dances Wearing the Sky Itself",
    jewel:    "Head Ornament with Teeka, Chandra and Surya (No. 10)",
    excerpt:  "Among all of Shiva's countless forms, none is more beloved in Tamil Nadu than Nataraja — the Lord of the Cosmic Dance, caught forever mid-motion inside a circle of flame.",
    image:    "/jewellry/Web-Optimised/craft.webp",
    readTime: "4 min read",
    body: [
      "Among all of Shiva's countless forms, none is more beloved in Tamil Nadu than Nataraja — Shiva as the Lord of the Cosmic Dance, caught forever mid-motion inside a circle of flame, one foot planted on the small demon of ignorance beneath him, the other lifted free into the air.",
      "This is not merely a dance for its own pleasure. Devotional verse describes it as the dance by which the universe itself is created, sustained, and, when its time comes, gently dissolved, only to begin again.",
      "And in describing this cosmic dancer, an old Tamil devotional verse — the Thiyana Slokam — makes a striking claim: that Nataraja wears, quite literally, the sun and the stars themselves as his jewellery, the sky wrapped around his dancing body the way an ordinary man might wear a necklace.",
    ],
    meaning: "This is the direct inspiration for the Bharatanatyam dancer's own forehead ornament — a Teeka at the centre of the parting, with Surya (the sun) and Chandra (the moon) set to either side. When a young dancer ties this ornament on before her arangetram debut, she is not merely decorating her hairline; she is, quite deliberately, putting on the same jewellery the god she is about to dance for is said to wear — becoming, for the length of one performance, a small and mortal echo of Nataraja's own cosmic dance.",
  },
];

/* ─── Final Message ──────────────────────────────────────────── */
export const finalMessage = {
  heading: "Some things are too meaningful to be trend-driven.",
  lines:   ["Jewelry should hold memory.", "It should gather stories.", "It should stay."],
  // image served directly in Home.jsx via hero_jewel.webp
};
