import * as ImagePicker from "expo-image-picker";
import { Product } from "./productInterface";
import { User, UserAccessType } from "./usersInterface";

export interface Store {
  id: number;
  name: string;
  address: string;
  rating: number;
  profileImage: string | null;
  lat: number;
  lng: number;
  created_at: string;
  updated_at: string;
  userPivot: {
    userId: number;
    storeId: number;
    accessTypeId: number;
    accessType: UserAccessType; 
  }
  reviews?: Review[]
  reviewsCount?: number;
  productList?: Product[]
  productListCount?: number;
}
export interface Review {
  id: number;
  text: string;
  rating: number;
  reviewerId: number;
  reviewer: User;
  created_at: string;
  updated_at: string;
}

export interface CreateStorePayload {
  id?: number;
  name: string;
  address: string;
  profileImage: ImagePicker.ImagePickerAsset | null;
  lat: number;
  lng: number;
}