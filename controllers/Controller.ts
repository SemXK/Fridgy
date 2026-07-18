import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export abstract class Controller {

  static baseUrl: string = `${
    Constants.deviceName !== "sdk_gphone64_x86_64" ? process.env.EXPO_PUBLIC_BACKEND_URL : process.env.EXPO_PUBLIC_EMULATOR_BACKEND_URL
  }`;

  // * Secure store auth tokens
  protected static getAuthToken = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    return token ?? null;
  };
  protected static setAuthToken = async (token: string) => {
    await SecureStore.setItemAsync("authToken", token);
  };
  protected static deleteAuthToken = async () => {
    await SecureStore.deleteItemAsync("authToken");
  };

  protected static getRefreshToken = async () => {
    const token = await SecureStore.getItemAsync("refreshToken");
    return token ?? null;
  };
  protected static setRefreshToken = async (token: string) => {
    await SecureStore.setItemAsync("refreshToken", token);
  };
  protected static deleteRefreshToken = async () => {
    await SecureStore.deleteItemAsync("refreshToken");
  };

  protected static getGuestToken = async () => {
    const token = await SecureStore.getItemAsync("guestId");
    return token ?? null;
  };
  protected static setGuestToken = async (token: string) => {
    await SecureStore.setItemAsync("guestId", token);
  };
  protected static deleteGuestToken = async () => {
    await SecureStore.deleteItemAsync("guestId");
  };

  // * Generic API calls
  static basicGetCall = async (apiPath: string) => {

    try {
      return await axios.get(`${this.baseUrl}/${apiPath}`);
    } 
    catch (error: any) {
      throw error;
    }
  };
  static basicPostCall = async (apiPath: string, data: unknown, config?: AxiosRequestConfig) => {
    try {
      return await axios.post(`${this.baseUrl}/${apiPath}`, data, {
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  };

  // * Authenticated API calls
  static authenticatedGetCall = async (apiPath: string) => {
    const token = await this.getAuthToken();
    const guestId = await this.getGuestToken();
    if (token || guestId) {
      try {
        return await axios.get(`${this.baseUrl}/${apiPath}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Guest-Token": guestId,
          },
        });
      } catch (error: any) {
        return error;
      }
    } else {
      throw new Error("Errore Generico Controller");
    }
  };
  static authenticatedPostCall = async (apiPath: string, payload: unknown) => {
    const token = await this.getAuthToken();
    const guestId = await this.getGuestToken();

    if (token || guestId) {
      try {
        // FIXED: axios.post expects (url, data, config)
        return await axios.post(`${this.baseUrl}/${apiPath}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Guest-Token": guestId,
          },
        });
      } catch (error: any) {
        return error;
      }
    } else {
      throw new Error("Unauthorize sd");
    }
  };
  static authenticatedPutCall = async (apiPath: string, payload: unknown) => {
    const token = await this.getAuthToken();
    const guestId = await this.getGuestToken();

    if (token || guestId) {
      try {
        return await axios.put(`${this.baseUrl}/${apiPath}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Guest-Token": guestId,
          },
        });
      } catch (error: any) {
        return error;
      }
    } else {
      throw new Error("Unauthorize sd");
    }
  };
  static authenticatedDeleteCall = async (apiPath: string) => {
    const token = await this.getAuthToken();
    const guestId = await this.getGuestToken();

    if (token || guestId) {
      try {
        return await axios.delete(`${this.baseUrl}/${apiPath}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Guest-Token": guestId,
          },
        });
      } catch (error: any) {
        return error;
      }
    } else {
      throw new Error("Unauthorize sd");
    }
  };
}
