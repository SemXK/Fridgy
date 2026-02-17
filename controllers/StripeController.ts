// controllers/StripeController.ts
import { SetupIntentResponse } from "@/constants/interfaces/stripeInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class StripeController extends Controller {
  static paymentInitObject = {};

  static createPaymentIntent = async (
    amount: number,
    currency: string = "usd",
    metadata?: Record<string, any>,
  ): Promise<SetupIntentResponse | AxiosError> => {
    const payload = {
      amount,
      currency,
      metadata,
    };
    return await this.authenticatedPostCall("payments/create-payment-intent", payload)
      .then((res: AxiosResponse<SetupIntentResponse>) => {
        if (res.status === 200 || res.status === 201) {
          // console.log("api", res)
          return res.data as SetupIntentResponse;
        } else if (res.status === 401) {
          throw new AxiosError("Unauthorized", "401");
        }
        return new AxiosError(`Unexpected status: ${res.status}`);
      })
      .catch((e: any) => {
        if (e.isAxiosError) {
          throw new AxiosError(e.message, "401");
        }
        return new AxiosError(e.message || "Payment intent creation failed");
      });
  };

  static getPublicKey = async (): Promise<string> => {
    return await this.authenticatedGetCall("payments/stripe-public-key").then((res: AxiosResponse<string>) => {
      return res.data;
    });
  };
}
