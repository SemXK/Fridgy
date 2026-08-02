import { Brand } from "@/constants/interfaces/productInterface";
import { UserAccessType } from "@/constants/interfaces/usersInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class FieldController extends Controller {

  /**
   * Calls api to get the full brand list registered in the application
   */
  static getBrandList = async (): Promise<AxiosResponse<Brand[]> | AxiosError> => {
    return await this.basicGetCall("field/get-brand-list" ).then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res as AxiosResponse<Brand[]>;
      }
      return res as AxiosResponse<Brand[]> | AxiosError;
    })
  }

  /**
   * Calls api to get the full brand list registered in the application
   */
  static getAccessTypes = async (): Promise<UserAccessType[] | AxiosError> => {
    return await this.basicGetCall("field/get-access-types" ).then((res: AxiosResponse) => {
      if (res.status === 200) {
        return res.data as UserAccessType[];
      }
      throw new Error("Error during access type fetching");
    })
  }
}