import { Product } from './types';

export const ARCHIVE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'HEAVY_BOX_HOODIE',
    itemCode: 'BS-ARC-101',
    price: 320,
    category: 'hoodie',
    szn: 'SZN_01 / DROP_01',
    releaseYear: 2026,
    materials: ['100% Cotton French Terry', '500 GSM Double-Weave', 'Organic Washed Yarn'],
    description: 'Heavyweight loopback fabric, boxy cropped drape, double-layered drop shoulder design. Finished with matte-iron raw cuffs and structural compression styling.',
    coordinates: '19.4326° N / 99.1332° W',
    specs: {
      weight: '500 GSM',
      fit: 'Boxy Cropped Oversized',
      care: 'Dry Clean Only / Iron Inside Out'
    },
    dimensions: [
      { size: 'S', chest: 64, shoulder: 60, length: 62, sleeve: 58 },
      { size: 'M', chest: 67, shoulder: 63, length: 64, sleeve: 60 },
      { size: 'L', chest: 70, shoulder: 66, length: 66, sleeve: 62 },
      { size: 'XL', chest: 73, shoulder: 69, length: 68, sleeve: 64 }
    ],
    stock: 12,
    colorHex: '#14171A',
    accentColor: '#FFD400'
  },
  {
    id: '2',
    title: 'CONC3PT_ID3A_TEE',
    itemCode: 'BS-ARC-102',
    price: 140,
    category: 'tshirt',
    szn: 'SZN_01 / OBJECTS',
    releaseYear: 2026,
    materials: ['100% Combed Cotton', '240 GSM Mid-weight', 'High Density Ink Print'],
    description: 'Graphic oversize tee featuring a custom silver metallic starch print combined with a circular green-white-red Mexican agency element. Technical coordinates and alignment ticks printed inside.',
    coordinates: '19.4326° N / 99.1332° W',
    specs: {
      weight: '240 GSM',
      fit: 'Oversized Boxy Fit',
      care: 'Machine Wash Cold / Air Dry Only'
    },
    dimensions: [
      { size: 'S', chest: 58, shoulder: 54, length: 70, sleeve: 22 },
      { size: 'M', chest: 61, shoulder: 57, length: 72, sleeve: 23 },
      { size: 'L', chest: 64, shoulder: 60, length: 74, sleeve: 24 },
      { size: 'XL', chest: 67, shoulder: 63, length: 76, sleeve: 25 }
    ],
    stock: 24,
    colorHex: '#F3F1EC',
    accentColor: '#C1121F'
  },
  {
    id: '3',
    title: 'TACTICAL_BOOT_MIST',
    itemCode: 'BS-ARC-103',
    price: 490,
    category: 'footwear',
    szn: 'SZN_01 / FIELD_SYSTEM',
    releaseYear: 2025,
    materials: ['Ballistic Technical Cordura', 'Vulcanized Matte Rubber Soles', 'Micro-mesh Lining'],
    description: 'Brutalist chunky speed-laced utility boots. Speed hook bindings, layered synthetic guard shells, steel mist gray treatment, engineered traction grip structure.',
    coordinates: '45.4642° N / 9.1900° E',
    specs: {
      weight: '820g Per Boot',
      fit: 'True to Size / Medium Padding',
      care: 'Wipe with Damp Cloth'
    },
    dimensions: [
      { size: 'S', chest: 0, shoulder: 0, length: 26, sleeve: 0 }, // Represents shoe sizes as S/M/L/XL codes for simplicity or archive mapping
      { size: 'M', chest: 0, shoulder: 0, length: 27, sleeve: 0 },
      { size: 'L', chest: 0, shoulder: 0, length: 28, sleeve: 0 },
      { size: 'XL', chest: 0, shoulder: 0, length: 29, sleeve: 0 }
    ],
    stock: 6,
    colorHex: '#6D7684',
    accentColor: '#FFD400'
  },
  {
    id: '4',
    title: 'MODULAR_SASH_RIG',
    itemCode: 'BS-ARC-104',
    price: 210,
    category: 'utility',
    szn: 'SZN_01 / ACCESSORIES',
    releaseYear: 2026,
    materials: ['1000D Cordura Nylon Webbing', 'Fidlock® V-Buckle 25', 'YKK AquaGuard Zippers'],
    description: 'Crossbody sash chest bag featuring modular storage. Includes external steel carabiner attachment loops and high-density logo system typography printed in warning-yellow.',
    coordinates: '35.6762° N / 139.6503° E',
    specs: {
      weight: '310g empty',
      fit: 'Adjustable Utility Sash',
      care: 'Do Not Wash / Hand Clean Only'
    },
    dimensions: [
      { size: 'S', chest: 0, shoulder: 0, length: 30, sleeve: 0 },
      { size: 'M', chest: 0, shoulder: 0, length: 32, sleeve: 0 },
      { size: 'L', chest: 0, shoulder: 0, length: 34, sleeve: 0 },
      { size: 'XL', chest: 0, shoulder: 0, length: 36, sleeve: 0 }
    ],
    stock: 15,
    colorHex: '#0A0A0A',
    accentColor: '#FFD400'
  },
  {
    id: '5',
    title: 'SZN_COTR_WINDSHIELD',
    itemCode: 'BS-ARC-105',
    price: 580,
    category: 'outerwear',
    szn: 'SZN_01 / SHIELD_DEV',
    releaseYear: 2026,
    materials: ['Technical Ripstop Nylon', 'Semi-transparent Polyurethane Coating', 'Alloy Zinc Hardware'],
    description: 'Raw-edge hooded windbreaker in semi-translucent cloud surface. Built with modular zip-away sleeves, elastic toggle waist tighteners, and back ventilation channel tags.',
    coordinates: '19.4326° N / 99.1332° W',
    specs: {
      weight: '340 GSM',
      fit: 'Wide Drawstring Silhouette',
      care: 'Hand Wash Only / Cold Water'
    },
    dimensions: [
      { size: 'S', chest: 65, shoulder: 58, length: 72, sleeve: 62 },
      { size: 'M', chest: 68, shoulder: 61, length: 74, sleeve: 64 },
      { size: 'L', chest: 71, shoulder: 64, length: 76, sleeve: 66 },
      { size: 'XL', chest: 74, shoulder: 67, length: 78, sleeve: 68 }
    ],
    stock: 8,
    colorHex: '#ECEFF3',
    accentColor: '#E9FF60'
  },
  {
    id: '6',
    title: 'DECON_WOOL_SWEATER',
    itemCode: 'BS-ARC-106',
    price: 360,
    category: 'outerwear',
    szn: 'SZN_01 / OBJECT_SERIES',
    releaseYear: 2026,
    materials: ['70% Wool', '30% Mohair Blend', 'Coarse Gauge Raw Yarn'],
    description: 'Deconstructed chunky knit. Highlights frayed yarn trails, intentionally exposed outer seam borders, and a slightly asymmetrical hem that replicates manual atelier prototyping.',
    coordinates: '45.4642° N / 9.1900° E',
    specs: {
      weight: '620 GSM',
      fit: 'Relaxed Slouchy Fit',
      care: 'Professional Dry Clean Only'
    },
    dimensions: [
      { size: 'S', chest: 62, shoulder: 56, length: 66, sleeve: 60 },
      { size: 'M', chest: 65, shoulder: 59, length: 68, sleeve: 62 },
      { size: 'L', chest: 68, shoulder: 62, length: 70, sleeve: 64 },
      { size: 'XL', chest: 71, shoulder: 65, length: 72, sleeve: 66 }
    ],
    stock: 10,
    colorHex: '#B8B6B0',
    accentColor: '#C1121F'
  }
];
