const ITEMS = {
  type: [
    'Wolf',
    'Crow',
    'Zombie-alien',
    'Zombie',
    'Monkey',
    'Orc',
    'Clown',
    'Iguana',
    'Alien',
    'Viking',
    'Robot',
  ],
  CHARACTER: [
    'Diamond Paws',
    'Escrow',
    'Frankie',
    'Glenn',
    'Goldtooth',
    'Troll God',
    'Charles',
    'Mariguana',
    'Vitalik',
    'Ragnar',
    'X-YZ',
  ],
  FOOTWEAR: [
    'No shoes',
    'Amish Shoes',
    'Astronaut Footwear',
    'Basketball Shoes',
    'Black Dress Shoes',
    'Black Ninja Boots',
    'Brown Dress Shoes',
    'Brown Spartan Sandals',
    'Chemical Protection Boots',
    'Clown Boots',
    'Golden Knight Boots',
    'Golden Shoes',
    'Golf Shoes',
    'Ice Skates',
    'Loafers',
    'Marine Boots',
    'Platinum Spartan Sandals',
    'Red Football Cleats',
    'Red Soccer Cleats',
    'Samurai Boots',
    'Silver Knight Boots',
    'Sneakers',
    'Sushi Chef Shoes',
    'Tennis Socks & Shoes',
    'White-Yellow Football Cleats',
  ],
  PANTS: [
    'Underwear',
    'Amish Pants',
    'Argentina Pants',
    'Astronaut Pants',
    'Black Dress Pants',
    'Black Ninja Pants',
    'Black Pants',
    'Black Soccer Pants',
    'Blue Hockey Pants',
    'Blue Jeans',
    'Brazil Pants',
    'Cargo Shorts',
    'Chemical Protection Pants',
    'Classic Plaid Pants',
    'Clown Pants',
    'Golden Grieves',
    'Golden Pants',
    'Gray Jeans',
    'Grey Dress Pants',
    'Grey Football Pants',
    'Grey Pants',
    'Marine Pants',
    'Rainbow Pants',
    'Red Basketball Pants',
    'Red Football Pants',
    'Ribbed Zombie Pants',
    'Samurai Pants',
    'Silver Grieves',
    'Spartan Pants',
    'Sushi Chef Pants',
    'Taekwondo Pants',
    'Tennis Pants',
    'Tuxedo Pants',
  ],
  TORSO: [
    'No Torso',
    'Amish Shirt',
    'Argentina Jersey',
    'Astronaut Torso',
    'Beer Mug Tshirt',
    'Black Ninja Robe',
    'Blue Hockey Jersey',
    'Bow Tie & Suit',
    'Brazil Jersey',
    'Chemical Protection Robe',
    'Clown Jacket',
    'Golden Armor',
    'Golden Jacket',
    'Golden Spartan Armor',
    'Grey Jacket',
    'Marine Shirt',
    'Platinum Spartan Armor',
    'Rainbow Jacket',
    'Red Basketball Jersey',
    'Red Collared Shirt',
    'Red Football Jersey',
    'Ribbed Zombie Shirt',
    'Samurai Armor',
    'Silver Armor',
    'Silver Spartan Armor',
    'Striped Soccer Jersey',
    'Suit & Tie',
    'Suit',
    'Sushi Chef Shirt',
    'Taekwondo Robe',
    'Tennis Shirt',
    'Tuxedo Jacket',
    'Weed Plant Tshirt',
    'White Football Jersey',
  ],
  EYEWEAR: [
    'No Eyewear',
    '3D Glasses',
    'Bar Shades',
    'Eye Paint',
    'Golden Sunglasses',
    'Monocle',
    'Orange Sunglasses',
    'Purple Sunglasses',
    'Respirator',
    'Retro Glasses',
    'Round Glasses',
    'Sunglasses',
    'VR Set',
  ],
  HEAD: [
    'No Headwear',
    'Amish Hat',
    'Astronnaut Helmet',
    'Party Hat',
    'Black Golf Hat',
    'Black Ninja Headband',
    'Black Ushanka',
    'Blue Beanie',
    'Brown Ushanka',
    'Caesar Hat',
    'Clown Hat',
    'Copter Hat',
    'Golden Hat',
    'Golden Knight Helmet',
    'Golden Spartan Helmet',
    'Green Beanie',
    'Grey Football Helmet',
    'Marine Helmet',
    'Old Hat',
    'Platinum Spartan Helmet',
    'Purple Ushanka',
    'Rainbow Cap',
    'Red Beanie',
    'Red Football Helmet',
    'Silver Knight Helmet',
    'Silver Spartan Helmet',
    'Straw Hat',
    'Sushi Chef Hat',
    'Traffic Cone',
    'Tuxedo Hat',
    'Violet Beanie',
  ],
  WEAPON_RIGHT: [
    'No Right Hand Accesories',
    'American Football',
    'Amish Pitch Fork',
    'Banana',
    'Basketball',
    'Beer',
    'Big Gun',
    'Black Gun',
    'Blue Degen Sword',
    'Bong',
    'Bow & Arrow',
    'Corn Gun',
    'Diamond',
    'Double Degen Sword Blue',
    'Double Degen Sword Red',
    'Double Degen Sword Yellow',
    'Football',
    'Golden Gun',
    'Golden Spartan Sword',
    'Golf Club',
    'Green Degen Sword',
    'Grenade',
    'Hockey Stick',
    'Katana',
    'Platinum Spartan Sword',
    'Purple Degen Sword',
    'Red Degen Sword',
    'Shield',
    'Silver Spartan Sword',
    'Sushi Knife',
    'Sword',
    'Tennis Racket',
  ],
  WEAPON_LEFT: [
    'No Left Hand Accesories',
    'American Football',
    'Amish Pitch Fork',
    'Banana',
    'Basketball',
    'Beer',
    'Big Gun',
    'Black Gun',
    'Blue Degen Sword',
    'Bong',
    'Bow & Arrow',
    'Corn Gun',
    'Diamond',
    'Double Degen Sword Blue',
    'Double Degen Sword Red',
    'Double Degen Sword Yellow',
    'Football',
    'Golden Gun',
    'Golden Spartan Sword',
    'Golf Club',
    'Green Degen Sword',
    'Grenade',
    'Hockey Stick',
    'Katana',
    'Platinum Spartan Sword',
    'Purple Degen Sword',
    'Red Degen Sword',
    'Shield',
    'Silver Spartan Sword',
    'Sushi Knife',
    'Sword',
    'Tennis Racket',
  ],
  BACKGROUND: [
    'Angel Tears',
    'Aqua Splash',
    'Crimson Blush',
    'Deep Relief',
    'Desert Hump',
    'Eternal Constance',
    'Flying High',
    'Happy Fisher',
    'Plum Plate',
    'Squeaky Clean',
    'Strong Bliss',
    'Summer Salad',
    'Winter Solstice',
  ],
};

const GENES_TYPE_COUNT_MAP = {
  BACKGROUND_GENES_COUNT: ITEMS.BACKGROUND.length,
  CHARACTER_GENES_COUNT: ITEMS.CHARACTER.length,
  EYEWEAR_GENES_COUNT: ITEMS.EYEWEAR.length,
  FOOTWEAR_GENES_COUNT: ITEMS.FOOTWEAR.length,
  PANTS_GENES_COUNT: ITEMS.PANTS.length,
  HEAD_GENES_COUNT: ITEMS.HEAD.length,
  TORSO_GENES_COUNT: ITEMS.TORSO.length,
  WEAPON_RIGHT_GENES_COUNT: ITEMS.WEAPON_RIGHT.length,
  WEAPON_LEFT_GENES_COUNT: ITEMS.WEAPON_LEFT.length,
};

const GENE_POSITIONS_MAP = {
  CHARACTER: 0,
  BACKGROUND: 1,
  PANTS: 2,
  TORSO: 3,
  FOOTWEAR: 4,
  EYEWEAR: 5,
  HEAD: 6,
  WEAPON_RIGHT: 7,
  WEAPON_LEFT: 8,
};

class GenesParser {
  parse = (gene) => {
    // let gene = '8578337193583896977622242819238527022510612018955151247142290718548395028898'; // example
    const adjustableGenes = gene.substr(gene.length - 18); // take the last 18 digits
    // We must take the genes from righ to left for example 98 -> CHARACTER code
    const genesToArray = adjustableGenes.split('');
    const groupedGenes = []; // ['89', '88', '20', '59', '38', '45', '81', '70', '92']
    const geneDelimeter = 2;
    for (let i = genesToArray.length - 1; i >= 0; i -= geneDelimeter) {
      const current = genesToArray[i];
      const prev = genesToArray[i - 1];
      const pair = prev.concat(current);
      groupedGenes.push(pair);
    }

    const genesMap = Object.keys(GENE_POSITIONS_MAP).reduce((res, key, index) => {
      res[key] = groupedGenes[index];
      return res;
    }, {});

    // 1. In order to turn the gene to a actual item we need to:
    // Get the modulus of the GENE BACKGROUND % geneTypeItemsCount (98 % 13) = 7
    // Then map it on items object map ITEMS[key][geneItemIndex] will show the name of the item
    // 2. In order to Query the Graph, we need to send an id of the following format 9905:
    // Which is described as
    // 99 -> is the prefix for the ID, because the FE apolloql querys don't support sending string as a parameter to the query
    // 0 -> is the category of the gene for example CHARACTER, take a look at GENE_POSITIONS_MAP
    // 5 -> is the result of the calculation between the modulus of the GENE BACKGROUND % geneTypeItemsCount, which points to the desired item
    const result = {};
    Object.keys(GENE_POSITIONS_MAP).forEach((key) => {
      const geneTypeItemsCount = GENES_TYPE_COUNT_MAP[`${key}_GENES_COUNT`];
      const geneItemIndex = groupedGenes[GENE_POSITIONS_MAP[key]] % geneTypeItemsCount;
      const prefix = '99';
      const id = `${prefix}${GENE_POSITIONS_MAP[key]}${geneItemIndex}`;
      if (ITEMS[key]) {
        // console.log(key, ITEMS[key][geneItemIndex]);
        // THOSE ARE SPECIFIC KEYS FOR ATTRIBUTES RETURNED FROM THE BE
        // FOR THAT REASON IN ORER TO MATCH THEM, CHANGE THE MAPPING HERE
        if (key === 'WEAPON_LEFT') {
          result['LEFT HAND'] = id;
        } else if (key === 'WEAPON_RIGHT') {
          result['RIGHT HAND'] = id;
        } else if (key === 'HEAD') {
          result.HEADWEAR = id;
        } else {
          result[key] = id;
        }
      }
    });

    return result;
  };
}

const GeneParser = new GenesParser();
export default GeneParser;
