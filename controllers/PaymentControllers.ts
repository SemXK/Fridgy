import { PaymentType } from "@/constants/interfaces/paymentInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class PaymentController extends Controller {

  static getPaymentTypes = async(): Promise<PaymentType[] | AxiosError> => {
        return await this.authenticatedGetCall("payments/payments-types")
        .then((res: AxiosResponse<PaymentType[]>) => {
          if (res.status === 200) {
            const paymentTypes = (res as AxiosResponse).data;
            return paymentTypes;
          }
          else if (res.status === 401) {
            throw new AxiosError("Invalid Credentials");
          }
          return new AxiosError("Unexpected response status: " + res.status);
        })
        .catch((e) => {
          return e as AxiosError
        })
  } 
}