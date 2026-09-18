import { TypeObject } from "./usersInterface";

export interface ProductToFridgePivot {
  id: number;
  fridgeId: number;
  productId: number;
  quantity: number;   // Numero di prodotti interi (4 cartoni di latte)
}
export interface ConsumedProductToFridgePivot {
  id: number;
  fridgeId: number;
  productId: number;
  quantity: number;   // quantità rimasta (250ml di latte)
  created_at: Date;
  updated_at: Date;
}
export interface UserToStorePivot {
  userId: number;
  storeId: number;
  accessTypeId: number;
  accessType: TypeObject; 
}

interface NutritionistToCustomerPivot {
  id: number;
  customerId: number;
  nutritionistId: number;
  created_at: Date;
  updated_at: Date;
}

export type NutritionistPivot<T > = T & {
  nutritionistPivot: NutritionistToCustomerPivot
}
export type CustomertPivot<T> = T & {
  customerPivot: NutritionistToCustomerPivot
}
