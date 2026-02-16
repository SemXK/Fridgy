export interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
  customerId?: string;
  amount: number;
  currency: string;
  error?: string;
}
export interface PaymentSheetResponse {
  success: boolean;
  paymentIntentClientSecret?: string;
  setupIntentClientSecret?: string;
  ephemeralKey: string;
  customerId: string;
  paymentIntentId?: string;
  error?: string;
}
export interface PaymentMethod {
  id: string;
  object: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details?: {
    email?: string;
    name?: string;
  };
}
export interface PaymentStatus {
  success: boolean;
  status?: string;
  amount?: number;
  currency?: string;
  error?: string;
}
export interface SetupIntentResponse {
  clientSecret: string;
  setupIntentId: string;
}
export interface StripePaymentMetadata {
  order_id?: string;
  user_id?: string;
  subscription_id?: string;
  product_id?: string;
  [key: string]: any;
}
export interface StripePaymentType {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}