import { OauthTokenCollection } from "@/constants/interfaces/oauth";
import * as AuthSession from 'expo-auth-session';
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { View } from "moti";
import { useEffect } from "react";
import PrimaryButton from "../pressable/PrimaryButton";

WebBrowser.maybeCompleteAuthSession();

export interface GoogleLoginInterface {
  oauthTokenCollection: OauthTokenCollection
}

export default  function  GoogleLogin({ oauthTokenCollection }: GoogleLoginInterface) {
const redirectUri =
  Constants.executionEnvironment === "storeClient"
    ? `https://auth.expo.io/@${Constants.expoConfig?.owner}/${Constants.expoConfig?.slug}`
    : AuthSession.makeRedirectUri({
        scheme: Constants.expoConfig?.scheme as string,
      });

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      // clientId: oauthTokenCollection.webClientId,
      androidClientId: oauthTokenCollection.androidClientId,
      iosClientId: oauthTokenCollection.iosClientId,
      webClientId: oauthTokenCollection.webClientId,
      scopes: ["openid", "profile", "email"],
      // redirectUri
    });

  useEffect(() => {
    console.log("GOOGLE REQUEST", request);
  }, [request]);

  useEffect(() => {
    console.log("GOOGLE RESPONSE", JSON.stringify(response, null, 2));
  }, [response]);
  // % Functions
  const signIn = async () => {
    const result = await promptAsync();

    if (result.type === "success") {
      const { code } = result.params;

      console.log("AUTH CODE", code);
    }
  };

  return (
    <View className="w-full">
      <PrimaryButton
        // isLoading={authLoading}
        buttonText={redirectUri}
        onPress={signIn}
      />
    </View>
  );
}