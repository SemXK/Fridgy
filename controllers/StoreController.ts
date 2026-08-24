import { Store } from "@/constants/interfaces/store";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export abstract class StoreController extends Controller {
  /**
   * get personal stores
   */
  static getStoreTypes = async (): Promise<Store[] | AxiosError> => {
    return await this.authenticatedGetCall("producer/store/list").then((res: AxiosResponse<Store[]>) => {
      if (res.status === 200) {
        const storeList: Store[] = (res as AxiosResponse).data;
        return storeList;
      }
      throw new AxiosError("Unexpected response status: " + res.status);
    });
  };
  /**
   * Creates ( Updates a store, given a Store object
   * @param payload Store Item
   * @returns the created / updated store
   */
  static setStore = async (payload: FormData): Promise<Store | AxiosError> => {
    console.log({...payload, profileImage: payload.get('profileImage')})
    return await this.authenticatedPostCall("producer/store/set", payload).then((res: AxiosResponse<Store>) => {
      if (res.status === 200) {
        const newStore: Store = (res as AxiosResponse).data;
        return newStore;
      }
      throw new AxiosError("Unexpected response status: " + res.status);
    });
  };
}