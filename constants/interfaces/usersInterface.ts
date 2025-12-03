import { Product } from "./productInterface";

export interface AuthType {
  user?: User;
  guest?: Guest;
};

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

export interface Guest {
  id: number;
  guestId: string;
  created_at: Date;
  updated_at: Date;
}