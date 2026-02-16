import { Brand } from "@/constants/interfaces/productInterface";
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
      else if (res.status === 422) {
        throw new AxiosError("Email already taken");
      }
      return res as AxiosResponse<Brand[]> | AxiosError;
    })
  }
}