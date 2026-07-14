const COLLECTION_TAGS = {
  'DPPHOTGRAPHY-8082': 'temple_inspired',
  'DPPHOTGRAPHY-8084': 'temple_inspired',
  'DPPHOTGRAPHY-8292': 'temple_inspired',
  'DPPHOTGRAPHY-8343': 'temple_inspired',
  'DPPHOTGRAPHY-8388': 'bridal_heirloom',
  'DPPHOTGRAPHY-8392': 'bridal_heirloom',
  'DPPHOTGRAPHY-8250': 'bridal_heirloom',
  'DPPHOTGRAPHY-8243': 'bridal_heirloom',
  'DPPHOTGRAPHY-8302': 'everyday_classic',
  'DPPHOTGRAPHY-8300': 'everyday_classic',
  'DPPHOTGRAPHY-8168': 'everyday_classic',
  'DPPHOTGRAPHY-8098': 'everyday_classic',
  'DPPHOTGRAPHY-8404': 'heritage_revival',
  'DPPHOTGRAPHY-8395': 'heritage_revival',
  'DPPHOTGRAPHY-8227': 'heritage_revival',
  'DPPHOTGRAPHY-8200': 'heritage_revival',
};

const CATEGORY_META = {
  bangles: {
    name: 'Heritage Gold Bangle',
    craft: 'Hand-hammered 22k gold bangle with traditional nakshi repoussé work, finished by master artisans in our Mylapore atelier.',
  },
  earring: {
    name: 'Temple Motif Earrings',
    craft: 'Delicate goldwork featuring kemp stones and pearls, crafted using time-honored South Indian earring-making techniques.',
  },
  necklace: {
    name: 'Heirloom Gold Necklace',
    craft: 'A statement necklace in 22k gold with hand-set kemp rubies and uncut diamonds, built layer by layer in the Kundan tradition.',
  },
  ring: {
    name: 'Artisan Gold Ring',
    craft: 'Solid 22k gold ring with hand-carved motifs, polished to a warm heirloom patina that deepens with wear.',
  },
  set: {
    name: 'Curated Jewelry Set',
    craft: 'A coordinated jewelry set designed as a complete heirloom ensemble, each piece harmonized in weight, motif, and finish.',
  },
  collection: {
    name: 'Signature Collection Piece',
    craft: 'A curated heirloom piece from our signature archive, crafted in 22k gold with traditional South Indian techniques.',
  },
};

const FOLDER_FILES = {
  bangles: [
    'DPPHOTGRAPHY-8147.webp', 'DPPHOTGRAPHY-8152.webp', 'DPPHOTGRAPHY-8156.webp',
    'DPPHOTGRAPHY-8158.webp', 'DPPHOTGRAPHY-8160.webp', 'DPPHOTGRAPHY-8162.webp',
    'DPPHOTGRAPHY-8166.webp', 'DPPHOTGRAPHY-8168.webp',
  ],
  earring: [
    'DPPHOTGRAPHY-8089.webp', 'DPPHOTGRAPHY-8091.webp', 'DPPHOTGRAPHY-8094.webp',
    'DPPHOTGRAPHY-8095.webp', 'DPPHOTGRAPHY-8122.webp', 'DPPHOTGRAPHY-8130.webp',
    'DPPHOTGRAPHY-8133.webp', 'DPPHOTGRAPHY-8135.webp', 'DPPHOTGRAPHY-8250.webp',
    'DPPHOTGRAPHY-8404.webp', 'DPPHOTGRAPHY-8407.webp',
  ],
  necklace: [
    'DPPHOTGRAPHY-8082.webp', 'DPPHOTGRAPHY-8084.webp', 'DPPHOTGRAPHY-8120.webp',
    'DPPHOTGRAPHY-8171.webp', 'DPPHOTGRAPHY-8173.webp', 'DPPHOTGRAPHY-8175.webp',
    'DPPHOTGRAPHY-8177.webp', 'DPPHOTGRAPHY-8180.webp', 'DPPHOTGRAPHY-8186.webp',
    'DPPHOTGRAPHY-8190.webp', 'DPPHOTGRAPHY-8194.webp', 'DPPHOTGRAPHY-8196.webp',
    'DPPHOTGRAPHY-8199.webp', 'DPPHOTGRAPHY-8200.webp', 'DPPHOTGRAPHY-8202.webp',
    'DPPHOTGRAPHY-8206.webp', 'DPPHOTGRAPHY-8209.webp', 'DPPHOTGRAPHY-8212.webp',
    'DPPHOTGRAPHY-8214.webp', 'DPPHOTGRAPHY-8216.webp', 'DPPHOTGRAPHY-8220.webp',
    'DPPHOTGRAPHY-8224.webp', 'DPPHOTGRAPHY-8227.webp', 'DPPHOTGRAPHY-8229.webp',
    'DPPHOTGRAPHY-8233.webp', 'DPPHOTGRAPHY-8237.webp', 'DPPHOTGRAPHY-8254.webp',
    'DPPHOTGRAPHY-8259.webp', 'DPPHOTGRAPHY-8262.webp', 'DPPHOTGRAPHY-8264.webp',
    'DPPHOTGRAPHY-8265.webp', 'DPPHOTGRAPHY-8270.webp',
    'DPPHOTGRAPHY-8273.webp', 'DPPHOTGRAPHY-8275.webp', 'DPPHOTGRAPHY-8278.webp',
    'DPPHOTGRAPHY-8286.webp', 'DPPHOTGRAPHY-8290.webp', 'DPPHOTGRAPHY-8292.webp',
    'DPPHOTGRAPHY-8335.webp', 'DPPHOTGRAPHY-8338.webp', 'DPPHOTGRAPHY-8340.webp',
    'DPPHOTGRAPHY-8343.webp', 'DPPHOTGRAPHY-8346.webp', 'DPPHOTGRAPHY-8348.webp',
    'DPPHOTGRAPHY-8350.webp', 'DPPHOTGRAPHY-8354.webp', 'DPPHOTGRAPHY-8356.webp',
    'DPPHOTGRAPHY-8358.webp',
  ],
  ring: [
    'DPPHOTGRAPHY-8098.webp', 'DPPHOTGRAPHY-8102.webp', 'DPPHOTGRAPHY-8107.webp',
    'DPPHOTGRAPHY-8142.webp', 'DPPHOTGRAPHY-8145.webp',
  ],
  sets: [
    'DPPHOTGRAPHY-8108.webp', 'DPPHOTGRAPHY-8111.webp', 'DPPHOTGRAPHY-8115.webp',
    'DPPHOTGRAPHY-8118.webp', 'DPPHOTGRAPHY-8243.webp', 'DPPHOTGRAPHY-8312.webp',
    'DPPHOTGRAPHY-8315.webp', 'DPPHOTGRAPHY-8317.webp', 'DPPHOTGRAPHY-8319.webp',
    'DPPHOTGRAPHY-8323.webp', 'DPPHOTGRAPHY-8326.webp',
    'DPPHOTGRAPHY-8328.webp', 'DPPHOTGRAPHY-8332.webp', 'DPPHOTGRAPHY-8399.webp',
  ],
};

function buildJewelryCatalog() {
  const items = [];
  const seenIds = new Set();

  for (const [folder, files] of Object.entries(FOLDER_FILES)) {
    const category = folder === 'sets' ? 'set' : folder;
    const meta = CATEGORY_META[category];

    for (const file of files) {
      const id = file.replace('.webp', '');
      const tags = [category];
      if (COLLECTION_TAGS[id]) tags.push(COLLECTION_TAGS[id]);

      items.push({
        id,
        image: `/jewellry/Web-Optimised/jewellry/${folder}/${file}`,
        category,
        tags,
        name: meta.name,
        craft: meta.craft,
      });
      seenIds.add(id);
    }
  }

  for (const [id, collectionTag] of Object.entries(COLLECTION_TAGS)) {
    if (seenIds.has(id)) continue;

    items.push({
      id,
      image: `/jewellry/Web-Optimised/jewellry/Extra/${id}.webp`,
      category: 'collection',
      tags: [collectionTag],
      name: CATEGORY_META.collection.name,
      craft: CATEGORY_META.collection.craft,
    });
  }

  return items;
}

export const JEWELRY_ITEMS = buildJewelryCatalog();

export function getJewelryByTag(tag) {
  if (!tag) return [];
  return JEWELRY_ITEMS.filter((item) => item.tags.includes(tag));
}
