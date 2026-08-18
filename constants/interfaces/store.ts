import { UserAccessType } from "./usersInterface";

export interface Store {
  id: number;
  name: string;
  profile: string | null;
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