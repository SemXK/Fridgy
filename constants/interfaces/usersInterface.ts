import { Product } from "./productInterface";

export interface AuthType {
  user?: User;
  guest?: Guest;
};
export interface UserAccessType {
  id: number;
  type: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  accessTypeId: number;
  accessType: UserAccessType;
  favouriteProducts: Product[];
  hatedProducts: Product[];
  address: Address;
  created_at: Date;
  updated_at: Date;
}

export interface Guest {
  id: number;
  guestId: string;
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  via: string;
  comune: string;
  regione: string;
  stato: string;
}