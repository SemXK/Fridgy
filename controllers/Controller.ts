import axios from "axios";
import Constants from "expo-constants";
import * as Keychain from 'react-native-keychain';
import { AuthController } from "./AuthController";

export abstract class Controller {
  static baseUrl: string = `${
    Constants.deviceName !== 'sdk_gphone64_x86_64' ? 
    process.env.EXPO_PUBLIC_BACKEND_URL
    :
    process.env.EXPO_PUBLIC_EMULATOR_BACKEND_URL
  }`;

  // * Secure store auth tokens
  protected static getAuthToken = async() => {
    const creds = await Keychain.getInternetCredentials("authToken");
    return creds ? creds.password : null;
  }
  protected static setAuthToken = async(token: string) => {
    await Keychain.setInternetCredentials(
      "authToken",     
      "jwt",            
      token,          
      { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
    );
  }
  protected static getRefreshToken = async() => {
    const creds = await Keychain.getInternetCredentials("refreshToken");
    return creds ? creds.password : null; 
  }
  protected static setRefreshToken = async(token: string) => {
    await Keychain.setInternetCredentials(
      "refreshToken",
      "refresh",
      token,
      { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY }
    );
  }

  // * Generic API calls
  static basicGetCall = async (apiPath: string,) => {
    try {
      return await axios.get(`${this.baseUrl}/${apiPath}`);
    } 
    catch (error: any) {
      throw  error;
    }
  };
  static basicPostCall = async (apiPath: string, data: unknown) => {
    try {
      return await axios.post(`${this.baseUrl}/${apiPath}`,data);
    } 
    catch (error: any) {
      throw  error;
    }
  };

  // * Authenticated API calls
  static authenticatedGetCall = async (apiPath: string) => {
    const token = this.getAuthToken();
    const guestId = await AuthController.sessionGetId()
    if(token) {
      try {
        return await axios.get(
          `${this.baseUrl}/${apiPath}`,
          {headers: {
            'Authorization': `Bearer ${token}`,
            'Guest-Token': guestId
          }}
        );
      } 
      catch (error: any) {
        return error;
      }
    }
    else {
      throw new Error("Unauthorized")
    }
  };
}
