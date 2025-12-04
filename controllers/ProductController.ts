import { CartItemInterface, PaginatedResponse, Product, ProductType } from "@/constants/interfaces/productInterface";
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

  // % Cart
  static getCartItems = async (): Promise<CartItemInterface[] | AxiosError> => {
    return await this.authenticatedGetCall("products/get-cart")
    .then((res: AxiosResponse<CartItemInterface[]>) => {
      console.log("Status", res.status)
      if (res.status === 200) {
        const cartList: CartItemInterface[] = (res as AxiosResponse).data;
        return cartList;
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
    .catch((e) => {
      return e as AxiosError
    })
  };
  static addItemToCart = async (productId: number): Promise<CartItemInterface[] | AxiosError> => {
    return await this.authenticatedPostCall("products/add-to-cart", {productId})
    .then((res: AxiosResponse<CartItemInterface[]>) => {
      if (res.status === 200) {
        return res.data;
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: "+ res.status);
    })
    .catch((e) => {
      return e as AxiosError
    })
  };
  static removeItemFromCart = async (productId: number): Promise<CartItemInterface[] | AxiosError> => {
    return await this.authenticatedPostCall("products/remove-from-cart", {productId})
    .then((res: AxiosResponse<CartItemInterface[]>) => {
      if (res.status === 200) {
        return res.data;
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: "+ res.status);
    })
    .catch((e) => {
      return e as AxiosError
    })
  };
}