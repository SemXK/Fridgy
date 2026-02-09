import { CartItemInterface, CreateProductPayload, Fridge, PaginatedResponse, Product, ProductType } from "@/constants/interfaces/productInterface";
import { AxiosError, AxiosResponse } from "axios";
import { Controller } from "./Controller";

export interface ProductListHomePageResponse {
  latestProducts: PaginatedResponse<Product>;
  popularProducts: PaginatedResponse<Product>;
}

export abstract class ProductController extends Controller {

  // % Tipi prodotto
  static getProductTypes = async (): Promise<ProductType[] | AxiosError> => {
    return await this.basicGetCall("products/product-types").then((res: AxiosResponse<ProductType[]>) => {
      if (res.status === 200) {
        const productTypes: ProductType[] = (res as AxiosResponse).data;
        return productTypes;
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
  };

  // % Prodotti
  static getShopProducts = async (textQuery?: string): Promise<ProductListHomePageResponse | AxiosError> => {
    return await this.basicPostCall("products/shop-products", {textQuery})
    .then((res: AxiosResponse<Product[]>) => {
      if (res.status === 200) {

        const paginatedResponse: ProductListHomePageResponse = (res as AxiosResponse).data;
        return paginatedResponse;

      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
    .catch((e) => {return e})
  };
  static createProduct = async(product: CreateProductPayload): Promise<Product | AxiosError> => {
    return await this.basicPostCall("products/set-product", product)
    .then((res: AxiosResponse<Product>) => {
      if (res.status === 200) {
        return res.data
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
  };
  static getProduct = async(productId: number | string): Promise<Product | AxiosError> => {
    return await this.basicGetCall(`products/get-product/${productId}`)
    .then((res: AxiosResponse<Product>) => {
      if (res.status === 200) {
        return res.data
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
  }


  // % Cart
  static getCartItems = async (): Promise<CartItemInterface[] | AxiosError> => {
    return await this.authenticatedGetCall("products/get-cart")
    .then((res: AxiosResponse<CartItemInterface[]>) => {
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

  // % Inventario
  static getFridges = async (): Promise<Fridge[] | AxiosError> => {
    return await this.authenticatedGetCall("products/get-fridges")
    .then((res: AxiosResponse<CartItemInterface[]>) => {
      if (res.status === 200) {
        const fridgeList = (res as AxiosResponse).data;
        return fridgeList.fridges;
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
    .catch((e) => {
      throw e as AxiosError
    })
  };
  static createFridge = async (name: string, description: string): Promise<boolean| AxiosError> => {
    return await this.authenticatedPostCall("products/create-fridge", {name, description})
    .then((res: AxiosResponse<CartItemInterface[]>) => {
      if (res.status === 200) {
        return true
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return new AxiosError("Unexpected response status: " + res.status);
    })
    .catch((e) => {
      throw e as AxiosError
    })
  };
}