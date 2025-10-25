export interface FoodType {
  id: number;
  type: string; // latticini, carne, verdure ec...
}

export interface PackageType {
  id: number;
  package: string;
}

export interface Product {
  id: number;
  name: string;
  quantity: string;
  foodTypes: FoodType[];
  image?: string;
  package?: PackageType;
  created_at: Date;
  updated_at: Date;
}
