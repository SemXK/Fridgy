import * as ImagePicker from "expo-image-picker";
import { UserAccessType } from "./usersInterface";

export interface Store {
  id: number;
  name: string;
  address: string;
  profileImage: string | null;
  lat: number;
  lng: number;
  created_at: string;
  updated_at: string;
  pivot: {
    userId: number;
    storeId: number;
    accessTypeId: number;
    accessType: UserAccessType; 
  }
}

export interface CreateStorePayload {
  id?: number;
  name: string;
  address: string;
  profileImage: ImagePicker.ImagePickerAsset | null;
  lat: number;
  lng: number;
}