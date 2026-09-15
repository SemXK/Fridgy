import { DietDetail, NutritionistLinkCode } from "@/constants/interfaces/nutritionist";
import { CustomertPivot } from "@/constants/interfaces/pivots";
import { CreateDietPlanInterface } from "@/constants/interfaces/requestPayloads/nutritionistPayloads";
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
  static getCustomerDetail = async (customerId: string): Promise<CustomertPivot<User> | AxiosError> => {
    return await this.authenticatedGetCall(`nutritionist/get-client-detail/${customerId}`)
      .then((res: AxiosResponse<CustomertPivot<User>>) => {
        if (res.status === 200) {
          const customerDetail: CustomertPivot<User> = (res as AxiosResponse).data;
          return customerDetail;
        }
        return new AxiosError("Unexpected response status: " + res.status);
    });
  };
  static getDietList = async (secondUserId: number): Promise<DietDetail[] | AxiosError> => {
    return await this.authenticatedPostCall(`diet-plans/get-diet-list`, {secondUserId})
      .then((res: AxiosResponse<DietDetail[]>) => {
        if (res.status === 200) {
          const customerDetail: DietDetail[] = (res as AxiosResponse).data;
          return customerDetail;
        }
        return new AxiosError("Unexpected response status: " + res.status);
    });
  };
  static createDietPlan = async (payload: CreateDietPlanInterface): Promise<boolean | AxiosError> => {
    return await this.authenticatedPostCall(`nutritionist/create-diet-plan`, payload)
      .then((res: AxiosResponse<boolean>) => {
        if (res.status === 200) {
          return true
        }
        return new AxiosError("Unexpected response status: " + res.status);
    });
  };
}