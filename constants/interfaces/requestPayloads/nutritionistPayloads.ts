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