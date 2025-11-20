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
}

export abstract class AuthController extends Controller {
  static currentUser: User | null;
  static currentToken: string | null;

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
  static me = async (): Promise<void> => {
    return await this.basicGetCall("me").then((res: AxiosResponse) => {
      if (res.status === 200) {
        const data = (res as AxiosResponse).data;
        SecureStore.setItem('authToken', data.token);
        this.currentUser = data.user;
        this.currentToken = data.token;
      }
      else if (res.status === 401){
        throw new AxiosError("Generic error");
      }

    })
  }
}
