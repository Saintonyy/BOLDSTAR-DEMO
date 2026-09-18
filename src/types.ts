export interface Product {
  id: string;
  title: string;
  itemCode: string; // e.g., 'BS-ARC-001'
  price: number;
  category: 'hoodie' | 'tshirt' | 'footwear' | 'utility' | 'outerwear';
  szn: string; // e.g., 'SZN_01', 'DROP_V2'
  releaseYear: number;
  materials: string[];
  description: string;
  coordinates: string; // e.g., '19.4326 N / 99.1332 W'
  specs: {
    weight?: string; // e.g., '480 GSM'
    fit: string; // e.g., 'Boxy Cropped Oversized'
    care: string; // e.g., 'Dry Clean Only'
  };
  dimensions: {
    size: 'S' | 'M' | 'L' | 'XL';
    chest: number; // in cm
    shoulder: number; // in cm
    length: number; // in cm
    sleeve?: number; // in cm
  }[];
  stock: number;
  colorHex: string; // Background visual tone
  accentColor: string; // Secondary accent highlight
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: 'S' | 'M' | 'L' | 'XL';
}

export interface SystemState {
  isCartOpen: boolean;
  activeTab: 'collections' | 'archive' | 'system' | 'custom-submit';
  searchQuery: string;
  categoryFilter: string;
  priceRange: number;
  viewMode: 'grid' | 'index';
}

export interface DesignSubmission {
  id: string;
  userName: string;
  designTitle: string;
  notes: string;
  imageUrl?: string;
  timestamp: string;
  status: 'PENDING' | 'ACCEPTED' | 'ARCHIVED';
  code: string;
}
