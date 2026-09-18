export interface CreateDietPlanInterface {
  name: string;
  description: string;
  linkedRelationshipId: number;
}
export interface DailyMealsPayload {
  secondUserId: number;
  dietId: number;
  dayOfWeek: number;
}

export interface CreateMealPayload {
  description: string;
  quantity: number;
  mealTypeId: number;
  productId: number;
  dietId: number;
  dayOfWeek: number;
}