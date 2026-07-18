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
  static currentToken: string | undefined;
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
      throw new Error ("Unauthorized s");
    }
  }
  static logout = async () => {
    if(this.currentUser) {
      return await this.authenticatedGetCall("logout").then((res: AxiosResponse) => {
        if (res.status === 200) {
          this.deleteAuthToken()
          this.deleteRefreshToken()
          this.deleteGuestToken()
          this.currentUser = undefined;
          this.currentGuest = undefined;
          this.currentToken = undefined;
          return true;
        }
        else if (res.status === 401){
          throw new AxiosError("Unauthorized");
        }
        throw new Error("Unexpected response");
      });
    }
  }

  /**
   * Creates a guest session using the passed token 
   * @param guestId the token used to create a guest session
   */
  static createGuestSession = async (guestId: string) => {
    return await this.basicPostCall("init-guest-session", {guestId})
    .then((res: AxiosResponse<Guest>) => {

      if (res.status === 200) {
        this.currentGuest = res.data
      }

    })
    .catch((e) => {
      console.log({initGuestSessionError: e})
    })
  }
  /**
   * Get's user's guest session or creates a new one
   * @returns guest The guest session
   */
  static sessionInit = async () => {
    if(this.currentGuest) return this.currentGuest
    // 1* Get Current Guest Session token
    let guestId = await SecureStore.getItemAsync("guestId");

    // 1* Create guest session token if missing
    if (!guestId) {
      guestId = Crypto.randomUUID();
      await SecureStore.setItemAsync("guestId", guestId);
      return await this.createGuestSession(guestId)
    }

    // 1* Get Token's Session (or creates one if missing)
    else {

      // 1* Create Guest Token
      return await this.basicGetCall(`guest-session/${guestId}`)
      .then(async (res: AxiosResponse<Guest>) => {

        // 2* Current Session Found
        if (res.status === 200) {
          this.currentGuest = res.data
        }

      })
      .catch(async () => {
          await this.createGuestSession(guestId as string)
      })
    }
  }
}
