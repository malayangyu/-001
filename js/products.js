/* Product catalog — front-end demo data only. */
const PRODUCTS = [
  {
    id: 'luna-coat',
    name: 'Luna Wool-Blend Coat',
    category: 'clothing',
    price: 129,
    image: 'assets/images/product-coat.jpg',
    badge: 'Bestseller',
    colors: ['#7C9BC1', '#2E2E2E', '#B08D57'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A relaxed, tailored coat in a soft wool blend. Designed for layering through cooler days with an effortless silhouette.',
    details: ['60% wool, 40% recycled polyester', 'Relaxed fit · mid-thigh length', 'Dry clean only']
  },
  {
    id: 'everyday-tee',
    name: 'Everyday Essential Tee',
    category: 'clothing',
    price: 29,
    image: 'assets/images/product-tee.jpg',
    badge: 'New',
    colors: ['#6E8B84', '#F4F1EA', '#2E2E2E'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The tee you will reach for every day. Made from breathable combed cotton with a perfectly broken-in feel.',
    details: ['100% combed cotton', 'Pre-shrunk · machine washable', 'True to size']
  },
  {
    id: 'studio-bomber',
    name: 'Studio Bomber Jacket',
    category: 'clothing',
    price: 98,
    image: 'assets/images/product-bomber.jpg',
    badge: '',
    colors: ['#A66447', '#222222', '#4A5A6A'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A lightweight bomber with a clean, modern line. Ribbed cuffs and a smooth lining make it an easy transitional layer.',
    details: ['Lightweight woven shell', 'Zip front · side pockets', 'Machine wash cold']
  },
  {
    id: 'weekend-hoodie',
    name: 'Weekend Cotton Hoodie',
    category: 'clothing',
    price: 45,
    image: 'assets/images/product-hoodie.jpg',
    badge: 'Bestseller',
    colors: ['#F2F0EB', '#8A8A8A', '#333333'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Soft, substantial and quietly oversized. Your off-duty uniform for travel, weekends and everything in between.',
    details: ['Cotton-rich fleece', 'Adjustable drawstring hood', 'Machine washable']
  },
  {
    id: 'solstice-set',
    name: 'Solstice Tracksuit Set',
    category: 'clothing',
    price: 89,
    image: 'assets/images/product-tracksuit.jpg',
    badge: 'New',
    colors: ['#E5B62E', '#6C6C6C', '#D9C6B0'],
    sizes: ['S', 'M', 'L'],
    description: 'A coordinated set with a cropped hoodie and relaxed joggers. Comfort that still looks considered.',
    details: ['Cotton-blend loopback', 'Elasticated waistband', 'Sold as a set']
  },
  {
    id: 'ivory-blouse',
    name: 'Ivory Lace Blouse',
    category: 'clothing',
    price: 56,
    image: 'assets/images/product-blouse.jpg',
    badge: '',
    colors: ['#F5F0E8', '#D8C9B4', '#E3D9D0'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Delicate lace detailing meets an easy, flowing shape. A soft neutral that pairs with everything.',
    details: ['Lightweight woven fabric', 'Lace trim detail', 'Gentle hand wash']
  },
  {
    id: 'breeze-dress',
    name: 'Breeze Wrap Midi Dress',
    category: 'clothing',
    price: 79,
    image: 'assets/images/product-midi-dress.jpg',
    badge: 'New',
    colors: ['#AFC3D6', '#E8D9C8', '#3F4A55'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A light, fluid wrap dress that moves with you. Made for long lunches, coastal walks and golden hours.',
    details: ['Breathable textured weave', 'Adjustable tie waist', 'Lined bodice']
  },
  {
    id: 'oxford-shirt',
    name: 'Classic Oxford Shirt',
    category: 'clothing',
    price: 52,
    image: 'assets/images/product-oxford.jpg',
    badge: '',
    colors: ['#5D7B93', '#FFFFFF', '#C9C2B6'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A refined everyday shirt with a subtle print and a gently tailored cut. Works open or buttoned to the top.',
    details: ['Cotton oxford weave', 'Button-down collar', 'Machine wash cold']
  },
  {
    id: 'aurora-necklace',
    name: 'Aurora Layered Necklace',
    category: 'jewelry',
    price: 39,
    image: 'assets/images/product-layered-necklace.jpg',
    badge: 'Bestseller',
    colors: ['#C8A45C', '#D9D9D9'],
    sizes: ['One Size'],
    description: 'Two delicate chains layered with a fine stone pendant. An easy way to add a little light to any neckline.',
    details: ['Gold-tone brass', 'Adjustable 40–45 cm chain', 'Nickel free']
  },
  {
    id: 'pearl-essence',
    name: 'Pearl Essence Necklace',
    category: 'jewelry',
    price: 65,
    image: 'assets/images/product-pearl-necklace.jpg',
    badge: '',
    colors: ['#EFE7DA', '#D8D3CB'],
    sizes: ['One Size'],
    description: 'A strand of luminous freshwater pearls finished with a crystal clasp. Quietly elegant, never loud.',
    details: ['Freshwater cultured pearls', 'Crystal detail clasp', 'Presented in a gift box']
  },
  {
    id: 'sapphire-earrings',
    name: 'Sapphire Halo Earrings',
    category: 'jewelry',
    price: 49,
    image: 'assets/images/product-sapphire-earrings.jpg',
    badge: 'New',
    colors: ['#1F3F8F', '#C0C0C0'],
    sizes: ['One Size'],
    description: 'Faceted blue stones framed by a halo of clear crystals. A statement pair that still feels light.',
    details: ['Silver-tone setting', 'Push-back closure', 'Hypoallergenic']
  },
  {
    id: 'golden-link',
    name: 'Golden Link Bracelet',
    category: 'jewelry',
    price: 42,
    image: 'assets/images/product-gold-bracelet.jpg',
    badge: 'Bestseller',
    colors: ['#C8A45C', '#E4C987'],
    sizes: ['One Size'],
    description: 'A chunky chain bracelet with a warm gold finish. Wear it alone or stacked with your favourites.',
    details: ['Gold-tone stainless steel', 'Lobster clasp', 'Tarnish resistant']
  },
  {
    id: 'celestial-pendant',
    name: 'Celestial Pendant Duo',
    category: 'jewelry',
    price: 58,
    image: 'assets/images/product-celestial-pendant.jpg',
    badge: 'New',
    colors: ['#B8914E', '#2C2C2C'],
    sizes: ['One Size'],
    description: 'A moon and geometric stone pendant on two fine chains. A little piece of the night sky, made wearable.',
    details: ['Gold-tone chain', 'Glass stone pendant', 'Adjustable length']
  },
  {
    id: 'radiance-bracelet',
    name: 'Radiance Crystal Bracelet',
    category: 'jewelry',
    price: 72,
    image: 'assets/images/product-crystal-bracelet.jpg',
    badge: '',
    colors: ['#CFCFCF', '#D9B86C'],
    sizes: ['One Size'],
    description: 'An open-link bracelet set with brilliant-cut crystals. Designed to catch the light from every angle.',
    details: ['Rhodium-plated setting', 'Crystal embellishment', 'Secure fold-over clasp']
  },
  {
    id: 'twist-hoops',
    name: 'Twist Hoop Earrings',
    category: 'jewelry',
    price: 36,
    image: 'assets/images/product-hoop-earrings.jpg',
    badge: 'Bestseller',
    colors: ['#C8A45C', '#E0E0E0'],
    sizes: ['One Size'],
    description: 'Sculpted rope-texture hoops with a polished finish. The kind of everyday pair that goes everywhere.',
    details: ['Gold-tone brass', 'Hinge closure', 'Lightweight design']
  },
  {
    id: 'halo-ring',
    name: 'Halo Solitaire Ring',
    category: 'jewelry',
    price: 89,
    image: 'assets/images/product-solitaire-ring.jpg',
    badge: 'New',
    colors: ['#D8C6B0', '#C0C0C0'],
    sizes: ['6', '7', '8', '9'],
    description: 'A brilliant central stone surrounded by a fine halo. A modern classic made for everyday moments.',
    details: ['Rose gold-tone band', 'Cubic zirconia centre stone', 'Arrives gift boxed']
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTS;
}
