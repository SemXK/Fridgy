import axios from "axios";
import * as Keychain from 'react-native-keychain';

export abstract class Controller {
  static baseUrl: string = `${process.env.EXPO_PUBLIC_BACKEND_URL}`;

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
      return error;
    }
  };
  static basicPostCall = async (apiPath: string, payload: unknown) => {
    try {
      return await axios.post(`${this.baseUrl}/${apiPath}`, payload);
    } 
    catch (error: any) {
      return error;
    }
  };

  // * Authenticated API calls
  static authenticatedGetCall = async (apiPath: string) => {
    const token = this.getAuthToken();
    console.log({token})
    if(token) {
      try {
        return await axios.get(
          `${this.baseUrl}/${apiPath}`,
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        );
      } 
      catch (error: any) {
        return error;
      }
    }
    else {
      console.log("Error: no token")
      // throw new Error("Unauthorized")
    }
  };
}
