import { User } from "@/constants/interfaces/usersInterface";
import { AxiosError, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";
import { Controller } from "./Controller";

interface Credentials {
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}
export interface AuthResponse {
  user: User;
  token: string;
  tokenType?: string;
  expiresIn?: number;
}

export abstract class AuthController extends Controller {
  static currentUser: User | null;
  static currentToken: string | null;
  static tokenType: string | undefined; // Maybe this isnt even needed
  static expiresIn: number | undefined; // Maybe this isnt even needed


  static register = async (credentials: Credentials): Promise<AxiosResponse<unknown, AuthResponse> | AxiosError> => {
    return await this.basicPostCall("register", credentials).then((res: AxiosResponse) => {
      if (res.status === 200) {
        const data = (res as AxiosResponse).data;
        SecureStore.setItem('authToken', data.token);

        this.currentUser = data.user;
        this.currentToken = data.token;
        return res as AxiosResponse<unknown, AuthResponse>;
      }
      else if (res.status === 422) {
        throw new AxiosError("Email already taken");
      }
      return res as AxiosResponse<unknown, AuthResponse> | AxiosError;
    })
  };
  static login = async (credentials: Partial<Credentials>): Promise<AxiosResponse<unknown, AuthResponse> | AxiosError> => {
    return await this.basicPostCall("login", credentials).then((res: AxiosResponse) => {
      if (res.status === 200) {
        const data = (res as AxiosResponse).data;
        SecureStore.setItem('authToken', data.token);
        this.currentUser = data.user;
        this.currentToken = data.token;
        this.tokenType = data.tokenType;
        this.expiresIn = data.expiresIn;
        return res as AxiosResponse<unknown, AuthResponse>;
      }
      else if (res.status === 401) {
        throw new AxiosError("Invalid Credentials");
      }
      return res as AxiosResponse<unknown, AuthResponse> | AxiosError;
    })
  };
  static me = async (): Promise<User> => {
    if(this.currentUser) {
      return this.currentUser;
    }
    else if(this.currentToken) {
      return await this.basicGetCall("me").then((res: AxiosResponse) => {
        if (res.status === 200) {
          const data = (res as AxiosResponse).data as AuthResponse;
          SecureStore.setItem('authToken', data.token);
          this.currentUser = data.user;
          this.currentToken = data.token;
          return data.user;
        }
        else if (res.status === 401){
          throw new AxiosError("Unauthorized");
        }
        throw new Error("Unexpected response");
      });
    }
    else {
      throw new Error ("Unauthorized");
    }
  }
}
