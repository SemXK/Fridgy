import { NutritionistLinkCode } from "@/constants/interfaces/nutritionist";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class NutritionistController extends Controller {
  // % Inviti
  static createInviteCode = async (): Promise<NutritionistLinkCode | AxiosError> => {
    return await this.authenticatedGetCall("nutritionist/create-invite-code").then((res: AxiosResponse<NutritionistLinkCode>) => {
      if (res.status === 200) {
        const linkCode: NutritionistLinkCode = (res as AxiosResponse).data;
        return linkCode;
      }
      return new AxiosError("Unexpected response status: " + res.status);
    });
  };
}