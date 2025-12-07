import { Guest, User } from "@/constants/interfaces/usersInterface";
import { AxiosError, AxiosResponse } from "axios";
import * as Crypto from 'expo-crypto';
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
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export abstract class AuthController extends Controller {
  static currentUser: User | undefined;
  static currentGuest: Guest | undefined;
  static currentToken: string | null;
  static tokenType: string | undefined; // Maybe this isnt even needed
  static expiresIn: number | undefined; // Maybe this isnt even needed

  static register = async (credentials: Credentials): Promise<AxiosResponse<unknown, AuthResponse> | AxiosError> => {
    return await this.basicPostCall("register", credentials).then((res: AxiosResponse) => {
      if (res.status === 200) {
        const data = (res as AxiosResponse).data;
        this.setAuthToken(data.token)
        this.setRefreshToken(data.refreshToken)
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
        this.setAuthToken(data.token)
        this.setRefreshToken(data.refreshToken)
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
    else if(this.currentToken || await this.getAuthToken()) {
      return await this.authenticatedGetCall("me").then((res: AxiosResponse) => {
        if (res.status === 200) {
          const data = (res as AxiosResponse).data as AuthResponse;
          this.setAuthToken(data.token)
          this.setRefreshToken(data.refreshToken)
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

  // * Offline Session functions
  static createSession = async (guestId: string) => {
    return await this.basicPostCall("init-guest-session", {guestId}).then((res: AxiosResponse<Guest>) => {
      if (res.status === 200) {
        this.currentGuest = res.data
      }
    })
  }
  static sessionInit = async () => {
    try {

      // 1* unique guest id from phone's storage
      let guestId = await SecureStore.getItemAsync("guestId");

      // 1* Create guest session
      if (!guestId) {
        guestId = Crypto.randomUUID();
        await SecureStore.setItemAsync("guestId", guestId as string);
        
        // 2* api create guest 
        this.createSession(guestId as string)
        
      }

      // 1* Get guest session
      else {
        return await this.basicGetCall(`guest-session/${guestId}`).then((res: AxiosResponse<Guest>) => {
          if (res.status === 200) {
            this.currentGuest = res.data
          }
          else {
            // 2* api create guest 
            sessionStorage.removeItem("guestId")
            guestId = Crypto.randomUUID();
            this.createSession(guestId)
          }
        })
      }
      return this.currentGuest
    } 
    catch (err) {
      // Caso che compare solo nei test: Tabella migrata
      await SecureStore.deleteItemAsync("guestId")
      console.log("Error getting guest id, guest id deleted", err);
    }
  }
  static sessionGetId = async (): Promise<string | null>  => {
    return await SecureStore.getItemAsync("guestId") ;
  }

}
