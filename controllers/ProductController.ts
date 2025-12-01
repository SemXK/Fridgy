import { PaginatedResponse, Product, ProductType } from "@/constants/interfaces/productInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";


export abstract class ProductController extends Controller {
  static shopProducts: Product[] = [];

  // % Tipi prodotto
  static getProductTypes = async (): Promise<ProductType[] | AxiosError> => {
    return await this.basicGetCall("products/product-types").then((res: AxiosResponse<ProductType[]>) => {
      if (res.status === 200) {
        const productTypes: ProductType[] = (res as AxiosResponse).data;
        return productTypes;
      }
      return res;
    })
  };

  // % Prodotti
  static getShopProducts = async (textQuery?: string): Promise<Product[] | AxiosError> => {
    return await this.basicPostCall("products/shop-products", {textQuery})
    .then((res: AxiosResponse<Product[]>) => {
      if (res.status === 200) {
        const paginatedResponse: PaginatedResponse<Product> = (res as AxiosResponse).data;
        this.shopProducts = paginatedResponse.data;
        return paginatedResponse.data as Product[];
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return res as AxiosResponse<unknown, Product> | AxiosError;
    })
  };

}