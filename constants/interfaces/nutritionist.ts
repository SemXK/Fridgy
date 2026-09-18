import { Product } from "./productInterface";
import { TypeObject } from "./usersInterface";

export interface NutritionistLinkCode {
  id: number;
  linkCode: string;
  nutritionistId: number;
  expirationDate: Date;
  created_at: Date;
  updated_at: Date;
}

export interface DietDetail {
  id: number;
  name: string;
  description: string;
  linkedRelationshipId: number;
  public: boolean;
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
  meals: Meal[]
}

export interface Meal {
  id: number;
  quantity: number;
  description: string;
  uma: string | null;
  mealTypeId: number;
  productId: number;
  dietId: number;
  timesPerWeek: number | null;
  dayOfWeek: number;
  created_at: Date;
  updated_at: Date;
  product: Product;
  mealType?: TypeObject
}