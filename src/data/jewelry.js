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
    'DPPHOTGRAPHY-8147.jpg', 'DPPHOTGRAPHY-8152.jpg', 'DPPHOTGRAPHY-8156.jpg',
    'DPPHOTGRAPHY-8158.jpg', 'DPPHOTGRAPHY-8160.jpg', 'DPPHOTGRAPHY-8162.jpg',
    'DPPHOTGRAPHY-8166.jpg', 'DPPHOTGRAPHY-8168.jpg',
  ],
  earring: [
    'DPPHOTGRAPHY-8089.jpg', 'DPPHOTGRAPHY-8091.jpg', 'DPPHOTGRAPHY-8094.jpg',
    'DPPHOTGRAPHY-8095.jpg', 'DPPHOTGRAPHY-8122.jpg', 'DPPHOTGRAPHY-8130.jpg',
    'DPPHOTGRAPHY-8133.jpg', 'DPPHOTGRAPHY-8135.jpg', 'DPPHOTGRAPHY-8250.jpg',
    'DPPHOTGRAPHY-8404.jpg', 'DPPHOTGRAPHY-8407.jpg',
  ],
  necklace: [
    'DPPHOTGRAPHY-8082.jpg', 'DPPHOTGRAPHY-8084.jpg', 'DPPHOTGRAPHY-8120.jpg',
    'DPPHOTGRAPHY-8171.jpg', 'DPPHOTGRAPHY-8173.jpg', 'DPPHOTGRAPHY-8175.jpg',
    'DPPHOTGRAPHY-8177.jpg', 'DPPHOTGRAPHY-8180.jpg', 'DPPHOTGRAPHY-8186.jpg',
    'DPPHOTGRAPHY-8190.jpg', 'DPPHOTGRAPHY-8194.jpg', 'DPPHOTGRAPHY-8196.jpg',
    'DPPHOTGRAPHY-8199.jpg', 'DPPHOTGRAPHY-8200.jpg', 'DPPHOTGRAPHY-8202.jpg',
    'DPPHOTGRAPHY-8206.jpg', 'DPPHOTGRAPHY-8209.jpg', 'DPPHOTGRAPHY-8212.jpg',
    'DPPHOTGRAPHY-8214.jpg', 'DPPHOTGRAPHY-8216.jpg', 'DPPHOTGRAPHY-8220.jpg',
    'DPPHOTGRAPHY-8224.jpg', 'DPPHOTGRAPHY-8227.jpg', 'DPPHOTGRAPHY-8229.jpg',
    'DPPHOTGRAPHY-8233.jpg', 'DPPHOTGRAPHY-8237.jpg', 'DPPHOTGRAPHY-8254.jpg',
    'DPPHOTGRAPHY-8259.jpg', 'DPPHOTGRAPHY-8262.jpg', 'DPPHOTGRAPHY-8264.jpg',
    'DPPHOTGRAPHY-8265.jpg', 'DPPHOTGRAPHY-8266.jpg', 'DPPHOTGRAPHY-8270.jpg',
    'DPPHOTGRAPHY-8273.jpg', 'DPPHOTGRAPHY-8275.jpg', 'DPPHOTGRAPHY-8278.jpg',
    'DPPHOTGRAPHY-8286.jpg', 'DPPHOTGRAPHY-8290.jpg', 'DPPHOTGRAPHY-8292.jpg',
    'DPPHOTGRAPHY-8335.jpg', 'DPPHOTGRAPHY-8338.jpg', 'DPPHOTGRAPHY-8340.jpg',
    'DPPHOTGRAPHY-8343.jpg', 'DPPHOTGRAPHY-8346.jpg', 'DPPHOTGRAPHY-8348.jpg',
    'DPPHOTGRAPHY-8350.jpg', 'DPPHOTGRAPHY-8354.jpg', 'DPPHOTGRAPHY-8356.jpg',
    'DPPHOTGRAPHY-8358.jpg',
  ],
  ring: [
    'DPPHOTGRAPHY-8098.jpg', 'DPPHOTGRAPHY-8102.jpg', 'DPPHOTGRAPHY-8107.jpg',
    'DPPHOTGRAPHY-8142.jpg', 'DPPHOTGRAPHY-8145.jpg',
  ],
  sets: [
    'DPPHOTGRAPHY-8108.jpg', 'DPPHOTGRAPHY-8111.jpg', 'DPPHOTGRAPHY-8115.jpg',
    'DPPHOTGRAPHY-8118.jpg', 'DPPHOTGRAPHY-8243.jpg', 'DPPHOTGRAPHY-8312.jpg',
    'DPPHOTGRAPHY-8315.jpg', 'DPPHOTGRAPHY-8317.jpg', 'DPPHOTGRAPHY-8319.jpg',
    'DPPHOTGRAPHY-8322.jpg', 'DPPHOTGRAPHY-8323.jpg', 'DPPHOTGRAPHY-8326.jpg',
    'DPPHOTGRAPHY-8328.jpg', 'DPPHOTGRAPHY-8332.jpg', 'DPPHOTGRAPHY-8399.jpg',
  ],
};

function buildJewelryCatalog() {
  const items = [];
  const seenIds = new Set();

  for (const [folder, files] of Object.entries(FOLDER_FILES)) {
    const category = folder === 'sets' ? 'set' : folder;
    const meta = CATEGORY_META[category];

    for (const file of files) {
      const id = file.replace('.jpg', '');
      const tags = [category];
      if (COLLECTION_TAGS[id]) tags.push(COLLECTION_TAGS[id]);

      items.push({
        id,
        image: `/jewellry/${folder}/${file}`,
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
      image: `/jewellry/collection/${id}.jpg`,
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
