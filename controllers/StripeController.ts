// controllers/StripeController.ts
import { SetupIntentResponse } from "@/constants/interfaces/stripeInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

// * Setup
// const { initPaymentSheet, presentPaymentSheet } = useStripe();
// const initializePaymentSheet = async () => {
//   const { paymentIntent, ephemeralKey, customer } = 
//     await api.post('/setup-payment-sheet');
  
//   await initPaymentSheet({
//     merchantDisplayName: "Your App",
//     customerId: customer,
//     customerEphemeralKeySecret: ephemeralKey,
//     paymentIntentClientSecret: paymentIntent,
//     allowsDelayedPaymentMethods: false,
//   });
// };
// const openPaymentSheet = async () => {
//   const { error } = await presentPaymentSheet();
//   if (error) {
//     Alert.alert('Error', error.message);
//   } else {
//     Alert.alert('Success', 'Payment confirmed!');
//   }
// };

export abstract class StripeController extends Controller {
  static paymentInitObject = {}

  static createPaymentIntent = async (
    amount: number,
    currency: string = "usd",
    metadata?: Record<string, any>
  ): Promise<SetupIntentResponse | AxiosError> => {
    return await this.authenticatedPostCall("payments/create-payment-intent", {
      amount,
      currency,
      metadata
    })
    .then((res: AxiosResponse<SetupIntentResponse>) => {
      if (res.status === 200 || res.status === 201) {
        console.log("api", res)
        return res.data as SetupIntentResponse;
      }
      else if (res.status === 401) {
        throw new AxiosError("Unauthorized", "401");
      }
      return new AxiosError(`Unexpected status: ${res.status}`);
    })
    .catch((e: any) => {
      if (e.isAxiosError) {
        throw new AxiosError(e.message, "401");;
      }
      return new AxiosError(e.message || "Payment intent creation failed");
    });
  };
  // static setupPaymentSheet = async (
  //   amount?: number,
  //   currency: string = "usd"
  // ): Promise<PaymentIntentResponse | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/setup-payment-sheet", {
  //     amount,
  //     currency
  //   })
  //   .then((res: AxiosResponse<PaymentIntentResponse>) => {
  //     if (res.status === 200) {
  //       return res.data;
  //     }
  //     throw new AxiosError(`Setup failed: ${res.status}`);
  //   })
  //   .catch((e: any) => {
  //     return e.isAxiosError ? e : new AxiosError(e.message);
  //   });
  // };
  // static createSetupIntent = async (): Promise<SetupIntentResponse | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/create-setup-intent", {})
  //     .then((res: AxiosResponse<SetupIntentResponse>) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Setup intent failed: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static getPaymentMethods = async (): Promise<PaymentMethod[] | AxiosError> => {
  //   return await this.authenticatedGetCall("stripe/payment-methods")
  //     .then((res: AxiosResponse<{ data: PaymentMethod[] }>) => {
  //       if (res.status === 200) {
  //         return res.data.data;
  //       }
  //       throw new AxiosError(`Failed to get payment methods: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static attachPaymentMethod = async (paymentMethodId: string): Promise<any | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/attach-payment-method", {
  //     payment_method_id: paymentMethodId
  //   })
  //     .then((res: AxiosResponse) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Attachment failed: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static detachPaymentMethod = async (paymentMethodId: string): Promise<any | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/detach-payment-method", {
  //     payment_method_id: paymentMethodId
  //   })
  //     .then((res: AxiosResponse) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Detachment failed: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static setDefaultPaymentMethod = async (paymentMethodId: string): Promise<any | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/set-default-payment-method", {
  //     payment_method_id: paymentMethodId
  //   })
  //     .then((res: AxiosResponse) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Set default failed: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static confirmPayment = async (
  //   paymentIntentId: string,
  //   paymentMethodId: string
  // ): Promise<any | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/confirm-payment", {
  //     payment_intent_id: paymentIntentId,
  //     payment_method_id: paymentMethodId
  //   })
  //     .then((res: AxiosResponse) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Confirmation failed: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static getPaymentIntent = async (paymentIntentId: string): Promise<any | AxiosError> => {
  //   return await this.authenticatedGetCall(`stripe/payment-intent/${paymentIntentId}`)
  //     .then((res: AxiosResponse) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Failed to get intent: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
  // static createCustomerPortalSession = async (returnUrl: string): Promise<{ url: string } | AxiosError> => {
  //   return await this.authenticatedPostCall("stripe/create-portal-session", {
  //     return_url: returnUrl
  //   })
  //     .then((res: AxiosResponse<{ url: string }>) => {
  //       if (res.status === 200) {
  //         return res.data;
  //       }
  //       throw new AxiosError(`Portal session failed: ${res.status}`);
  //     })
  //     .catch((e: any) => {
  //       return e.isAxiosError ? e : new AxiosError(e.message);
  //     });
  // };
}