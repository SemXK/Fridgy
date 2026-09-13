import { NutritionistLinkCode } from "@/constants/interfaces/nutritionist";
import { User } from "@/constants/interfaces/usersInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class NutritionistController extends Controller {
  static createInviteCode = async (): Promise<NutritionistLinkCode | AxiosError> => {
    return await this.authenticatedGetCall("nutritionist/create-invite-code").then((res: AxiosResponse<NutritionistLinkCode>) => {
      if (res.status === 200) {
        const linkCode: NutritionistLinkCode = (res as AxiosResponse).data;
        return linkCode;
      }
      return new AxiosError("Unexpected response status: " + res.status);
    });
  };
  /**
   * get current nutritionist's clients
   * @returns list of users
   */
  static getCustomerList = async (): Promise<User[] | AxiosError> => {
    return await this.authenticatedGetCall("nutritionist/get-client-list").then((res: AxiosResponse<NutritionistLinkCode>) => {
      if (res.status === 200) {
        const linkCode: User[] = (res as AxiosResponse).data;
        return linkCode;
      }
      return new AxiosError("Unexpected response status: " + res.status);
    });
  };
  static getCustomerDetail = async (customerId: string): Promise<User | AxiosError> => {
    return await this.authenticatedGetCall(`nutritionist/get-client-detail/${customerId}`)
      .then((res: AxiosResponse<NutritionistLinkCode>) => {
        if (res.status === 200) {
          const customerDetail: User= (res as AxiosResponse).data;
          return customerDetail;
        }
        return new AxiosError("Unexpected response status: " + res.status);
    });
  };
}