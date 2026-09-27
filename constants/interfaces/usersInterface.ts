import { Product } from "./productInterface";

export interface AuthType {
  user?: User | null;
  guest?: Guest;
  setUser: React.Dispatch<User | null>;
  setGuest: React.Dispatch<Guest>;

};
export interface TypeObject {
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
  accessType: TypeObject;
  favouriteProducts: Product[];
  hatedProducts: Product[];
  address: Address;
  fitnessStats: FitnessStat[];
  created_at: Date;
  updated_at: Date;
  profilePic?: string;

  token: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;

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

export interface FitnessStat {
  id: number;
  weight: number;
  weightGoal: number;
  height: number;
  age: number;
  isMale: boolean;
  bodyFatPercentage: number;
  muscularMassPercentage: number;
  dailyCalories: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
}