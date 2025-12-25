// types/index.ts

export interface Shop {
  id: string;
  name: string;
  address: string;
  phone: string;
  services: string[];
  hasGas: boolean;
  mapEmbed: string;
  // isOpen: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  category: string;
  shop: string; // "Under-G" | "Randa" | "Both"
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GasPrice {
  id: string;
  price: number;
  updatedAt: Date;
  updatedBy: string;
}

export interface SolarProject {
  id: string;
  title: string;
  location: string;
  image: string;
  description?: string;
  kva?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SolarCalculation {
  fans: number;
  tvs: number;
  fridges: number;
  bulbs: number;
  laptops?: number;
  other?: number;
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductCategory =
  | "Power Banks"
  | "Chargers"
  | "Cables"
  | "Adaptor"
  | "Earbuds"
  | "MPS"
  | "Speakers"
  | "Phone Accessories"
  | "Other";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Power Banks",
  "Chargers",
  "Cables",
  "Adaptor",
  "Earbuds",
  "MPS",
  "Speakers",
  "Phone Accessories",
  "Other",
];

export const SHOP_LOCATIONS = {
  UNDERG: "Under-G",
  RANDA: "Randa",
  BOTH: "Both",
} as const;

export type ShopLocation = (typeof SHOP_LOCATIONS)[keyof typeof SHOP_LOCATIONS];
