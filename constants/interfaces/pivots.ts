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
