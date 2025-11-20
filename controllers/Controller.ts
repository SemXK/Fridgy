import axios from "axios";

export abstract class Controller {
  static baseUrl: string = `${process.env.EXPO_PUBLIC_BACKEND_URL}`;

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
}
