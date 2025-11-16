import { ImageSourcePropType } from "react-native";

export interface CartItemInterface {
  product?: Product;
  productId: number;
  quantity: number;
}

export interface Cart {
  activeItems: CartItemInterface[];
  userId: number;
}

export interface FoodType {
  id: number;
  type: string; // latticini, carne, verdure ec...
  color: string;
}

export interface PackageType {
  id: number;
  package: string;
}

export interface Receipt {
  id: number;
  price: number;
  discount: number;
  quantityBought: number;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  name: string;
  quantity: string;
  foodTypes: FoodType[];
  image?: ImageSourcePropType;
  description: string;
  package?: PackageType;
  favourite?: boolean;
  price: number;
  priceHistory: Receipt[];
  taxPercent: number;
  created_at: Date;
  updated_at: Date;
}
