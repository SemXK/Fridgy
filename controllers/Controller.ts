import axios from "axios";
import * as SecureStore from "expo-secure-store";

export abstract class Controller {
  static baseUrl: string = `${process.env.EXPO_PUBLIC_BACKEND_URL}`;

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
  static authenticatedGetCall = async (apiPath: string,) => {
    const token = SecureStore.getItem('authToken');
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
