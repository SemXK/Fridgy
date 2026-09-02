import { PaginatedResponse, Product } from "@/constants/interfaces/productInterface";
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
    return await this.authenticatedPostCall("producer/store/set", payload).then((res: AxiosResponse<Store>) => {
      if (res.status === 200) {
        const newStore: Store = (res as AxiosResponse).data;
        return newStore;
      }
      throw new AxiosError("Unexpected response status: " + res.status);
    });
  };
  /**
   * get a paginated list of a store
   * @param storeId the id of the store that contains the products
   */
  static getStoresProducts = async (storeId: string): Promise<PaginatedResponse<Product> | AxiosError> => {
    return await this.authenticatedPostCall("producer/store/get-products", { storeId })
      .then((res: AxiosResponse<PaginatedResponse<Product>>) => {
        if (res.status === 200) {
          const newStore: PaginatedResponse<Product> = (res as AxiosResponse).data;
          return newStore;
        }
        throw new AxiosError("Unexpected response status: " + res.status);
    });
  };
  /**
   * Get Store Detail
   * @param storeId Store id to fetch
   * @returns the store
   */
  static getStoreDetail = async (storeId:string): Promise<Store | AxiosError> => {
    return await this.authenticatedGetCall(`producer/store/${storeId}`).then((res: AxiosResponse<Store>) => {
      if (res.status === 200) {
        const storeDetail: Store = (res as AxiosResponse).data;
        return storeDetail;
      }
      throw new AxiosError("Unexpected response status: " + res.status);
    });
  };
}