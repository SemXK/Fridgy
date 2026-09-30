import { NutritionistLinkCode } from "@/constants/interfaces/nutritionist";
import { NutritionistPivot } from "@/constants/interfaces/pivots";
import { User } from "@/constants/interfaces/usersInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class ConsumerController extends Controller {
  /**
   * send code and check if it exists to accept nutritionist's invite
   * @param insertedCode 6 charachter code the nutritionist sent
   * @returns a boolean, whether the intitation succeded or not
   */
  static acceptInviteCode = async (insertedCode: string): Promise<boolean | undefined>  => {
    return await this.authenticatedPostCall("customer/accept-invite-code", {insertedCode})
      .then((res: AxiosResponse<NutritionistLinkCode>) => {
        switch(res.status) {
          case 200:
            return true;
          case 400:
            throw new Error("Hai già registrato questo nutrizionista!")
          case 404:
            throw new Error("Il codice non corrisponde a nessun account!")
        }
        // if (res.status === 200) {
        //   return true
        // }
        // else 
        // throw new AxiosError();
    });
  };
  /**
   * get current consumer's nutritionist who follow the former
   * @returns list of nutritionists
   */
  static getOwnNutritionistList = async (): Promise<User[] | AxiosError> => {
    return await this.authenticatedGetCall("customer/get-own-nutritionists")
    .then((res: AxiosResponse<User[]>) => {
      if (res.status === 200) {
        const linkCode: User[] = (res as AxiosResponse).data;
        return linkCode;
      }
      return new AxiosError("Unexpected response status: " + res.status);
    });
  };
  /**
   * get nutritionist detail with sufficient data for the customer
   */
  static getNutritionistDetail = async (nutritionistId: string): Promise<NutritionistPivot<User>> => {
    return await this.authenticatedGetCall(`customer/get-nutritionist-detail/${nutritionistId}`)
    .then((res: AxiosResponse<NutritionistPivot<User>>) => {
      if (res.status === 200) {
        const nutritionistDetail: NutritionistPivot<User> = (res as AxiosResponse).data;
        return nutritionistDetail;
      }
      else {
        throw new Error("Unexpected response status: " + res.status);
      }
    });
  };

}