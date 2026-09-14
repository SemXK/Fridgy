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
  name: string;
  quantity: number;
  uma: string | null;
  mealTypeId: number;
  productId: number;
  dietId: number;
  timesPerWeek: number | null;
  created_at: Date;
  updated_at: Date;
}