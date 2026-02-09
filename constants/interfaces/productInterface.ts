import { ImageSourcePropType } from "react-native";

// * Generic interfaces
export interface PaginatedResponse<T>{
  currentPage: number;
  data: T[],
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  links: string[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// * Context Interface
export interface CartContextInterface {
  cart: CartItemInterface[];
  setCart?: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
}

// * Table interfaces
export interface CartItemInterface {
  id: number;
  product: Product;
  productId: number;
  quantity: number;

}
export interface ProductType {
  id: number;
  image: string;
  type: string; // latticini, carne, verdure ec...
}
export interface Receipt {
  id: number;
  price: number;
  productId: number;
  created_at: string;  
  updated_at: string;
}
export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  brand: Brand;
  quantity: number;
  uma: string;
  itemsNumber?: number;

  price: number;
  pricePerUma?: number;
  taxPercent: number;

  prices: Receipt[];
  productTypes: ProductType[];
  created_at: string;
  updated_at: string;
}
export interface Discount {
  id: number;
  discount: number;
  name: string;
  image?: ImageSourcePropType;
}
export interface Fridge {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  product_list: Product[];
}
export interface Brand {
  id: number;
  name: string
}
// * Payload
export interface CreateProductPayload {
  name: string,
  description: string,
  brandId: string,
  quantity: string,
  uma: string | number,
  price: string,
  taxPercent: number,
  image: string,
}