import { ImageSourcePropType } from "react-native";

export interface CartItemInterface {
  product?: Product;
  productId: number;
  quantity: number;
  userId: number;

}
export interface ProductType {
  id: number;
  type: string; // latticini, carne, verdure ec...
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
  image?: ImageSourcePropType;
  description: string;
  price: number;
  taxPercent: number;

  priceHistory: Receipt[];
  productTypes: ProductType[];
  created_at: Date;
  updated_at: Date;
}
