import { User } from "../usersInterface";

export interface OauthTokenCollection {
  androidClientId: string;
  iosClientId: string;
  webClientId: string;
}

export interface GoogleAuthPayload {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}

export interface GoogleSignInResponse {
  currentUser: User;
  refreshToken: string;
  token: string;
}