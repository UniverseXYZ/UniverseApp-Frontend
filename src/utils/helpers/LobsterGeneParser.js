const ITEMS = {
  SKIN: [
    'Red',
    'Blue',
    'Green',
    'Albino',
    'Pink',
    'Reef Camo',
    'Cow',
    'Zebra',
    'Tiger',
    'Cheetah',
    'Robot',
    'Fluorescent',
    'Holographic',
    'Trippy',
    'Galaxy',
    'Zombie',
    'Silver',
    'Gold',
  ],
  CLOTHES: [
    'Red Suit w/ Tie',
    'Blue Suit w/ Tie',
    'Black Suit w/ Tie',
    'Grey Suit w/ Tie',
    'White Suit w/ Tie',
    'Tan Suit w/ Tie',
    'Striped Suit w/ Tie',
    'Polka Dot Suit w/ Tie',
    'Seersucker Suit w/ Tie',
    'Rainbow Suit w/ Tie',
    'Corn Suit w/ Tie',
    'Sergeant Uniform',
    'Judge Gown',
    'Orange Hawaiian Shirt',
    'Blue Hawaiian Shirt',
    'Naked',
    'Ethereum Suit w/ Tie',
    'Bitcoin Suit w/ Tie',
    'Money Suit w/ Tie',
    'Gold Suit w/ Tie',
  ],
  HAND: [
    'Docs',
    'Breifcase',
    'Seed Phrase',
    'The Constitution',
    'American Flag',
    'Grenade',
    'Black Smoking Gun',
    'Rainbow Briefcase',
    'Burner Phone',
    'Wireless Microphone',
    'Megaphone',
    'Blue Lollipop',
    'Green Lollipop',
    'Pink Lollipop',
    'Whiskey & Cigar',
    'Silver Gavel',
    'Silver Smoking Gun',
    'Silver Ray Gun',
    'Empty',
    'Gold Gavel',
    'Gold Smoking Gun',
    'Gold Ray Gun',
    'Corn',
  ],
  MOUTH: [
    'Calm',
    'Smile',
    'Large Smile',
    'Sneaky Smile',
    'Game Face',
    'Angry Face',
    'Wow',
    'Laughing',
    'Tounge Stuck Out',
    'Chipped Teeth',
    'Sad',
    'Toothpick',
    'Vampire',
    'Rainbow Grillz',
    'Zombie',
    'Gold Grillz',
    'Diamond Grillz',
  ],
  EYES: [
    'Open Eyes',
    'Bloodshot Eyes',
    'Aviators',
    'Sunglasses',
    'Star Shades',
    'Pink Shutter Shades',
    'White Shutter Shades',
    'Perscriptions',
    'Monocle ',
    'Dragon Shades',
    '3D Glasses',
    'American Flag Eyes',
    'Bitcoin Eyes',
    'Ethereum Eyes',
    'Trippy Shades',
    'Heart Shades',
    'Money Shades',
    'Alien Shades',
    'Devil Eyes',
    'Glowing Eyes',
    'Alien Eyes',
    'Flaming Eyes',
    'Laser Eyes',
  ],
  HEAD: [
    'Bald',
    'Blonde Crew Cut',
    'Red Crew Cut',
    'Brunette Crew Cut',
    'Black Crew Cut',
    'Slicked Back Blonde',
    'Slicked Back Red',
    'Slicked Back Brunette',
    'Slicked Back Black',
    'Blonde Comb Over',
    'Red Comb Over',
    'Brunette Comb Over',
    'Black Comb Over',
    'Old Man Comb Over',
    'Cowboy Hat',
    'MAD Hat',
    'Queue',
    'Legally Blonde',
    'Fair Lady',
    'Yes Man',
    'Silver Crown',
    'Gold Crown',
  ],
  BACKGROUND: ['Red', 'Green', 'Blue', 'Turquoise', 'Purple', 'Yellow', 'White', 'Black'],
};

const GENES_TYPE_COUNT_MAP = {
  BACKGROUND_GENE_COUNT: ITEMS.BACKGROUND.length,
  MOUTH_GENES_COUNT: ITEMS.MOUTH.length,
  SKIN_GENES_COUNT: ITEMS.SKIN.length,
  HAND_GENES_COUNT: ITEMS.HAND.length,
  CLOTHES_GENES_COUNT: ITEMS.CLOTHES.length,
  EYES_GENES_COUNT: ITEMS.EYES.length,
  HEAD_GENES_COUNT: ITEMS.HEAD.length,
};

const GENE_POSITIONS_MAP = {
  BACKGROUND: 0,
  SKIN: 1,
  CLOTHES: 2,
  HAND: 3,
  HEAD: 4,
  MOUTH: 5,
  EYES: 6,
};

const SKIN_DISITRIBUTION = [
  1750, 1750, 1750, 1500, 750, 500, 400, 350, 300, 250, 175, 150, 125, 100, 65, 50, 25, 10,
];
const CLOTHES_DISTRIBUTION = [
  1750, 1750, 1500, 1000, 850, 500, 450, 400, 350, 300, 250, 200, 175, 150, 125, 100, 65, 50, 25,
  10,
];
const HAND_DISTRIBUTION = [
  1150, 1000, 1000, 850, 750, 650, 600, 550, 500, 450, 400, 350, 300, 250, 225, 200, 175, 150, 125,
  100, 75, 65, 50, 25, 10,
];
const MOUTH_DISTRIBUTION = [
  1350, 1250, 1150, 1050, 950, 850, 750, 650, 550, 450, 350, 250, 150, 100, 75, 50, 25,
];
const EYES_DISTRIBUTION = [
  1400, 1300, 1200, 1000, 850, 700, 600, 500, 450, 400, 350, 250, 200, 175, 150, 125, 100, 75, 55,
  45, 35, 25, 15,
];
const HEAD_DISTRIBUTION = [
  750, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 550, 400, 325, 250, 200, 150,
  100, 50, 25,
];
const BACKGROUND_DISTRIBUTION = [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250];

class GenesParser {
  splitArrayIntoChunksOfLen = (arr, len) => {
    const chunks = [];
    let i = 0;
    const n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)).join());
    }
    return chunks;
  };

  parse = (gene) => {
    // let gene = '8578337193583896977622242819238527022510612018955151247142290718548395028898'; // example
    const adjustableGenes = gene.substr(gene.length - 28); // take the last 18 digits
    const groupedGenes = [];
    // We must take the genes from righ to left for example 9808 -> BACKGROUND code
    // We split them in pair of 4
    for (let i = adjustableGenes.length - 4; i >= 0; i -= 4) {
      const endOfPair = i + 4;
      const genePair = adjustableGenes.substring(i, endOfPair);
      groupedGenes.push(genePair);
    }

    const result = {};
    Object.keys(GENE_POSITIONS_MAP).forEach((key, index) => {
      let distribution = [];
      switch (key) {
        case 'BACKGROUND':
          distribution = BACKGROUND_DISTRIBUTION;
          break;
        case 'SKIN':
          distribution = SKIN_DISITRIBUTION;
          break;
        case 'CLOTHES':
          distribution = CLOTHES_DISTRIBUTION;
          break;
        case 'EYES':
          distribution = EYES_DISTRIBUTION;
          break;
        case 'MOUTH':
          distribution = MOUTH_DISTRIBUTION;
          break;
        case 'HAND':
          distribution = HAND_DISTRIBUTION;
          break;
        case 'HEAD':
          distribution = HEAD_DISTRIBUTION;
          break;
        default:
          break;
      }

      let geneItemIndex = 0;
      let counter = 0;
      const traitGene = +groupedGenes[index];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < distribution.length; i++) {
        const distr = distribution[i];
        counter += distr;
        if (traitGene <= counter) {
          geneItemIndex = i;
          break;
        }
      }

      const prefix = '99';
      const id = `${prefix}${GENE_POSITIONS_MAP[key]}${geneItemIndex}`;
      if (ITEMS[key]) {
        result[key] = id;
      }
    });

    return result;
  };
}

const GeneParser = new GenesParser();
export default GeneParser;
