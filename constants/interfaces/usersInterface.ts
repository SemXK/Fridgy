import { Product } from "./productInterface";

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;

  favouriteProducts: Product[];
  hatedProducts: Product[];

  created_at: Date;
  updated_at: Date;
}
