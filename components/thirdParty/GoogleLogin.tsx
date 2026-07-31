import { OauthTokenCollection } from "@/constants/interfaces/oauth";
import { AuthController } from "@/controllers/AuthController";
import * as AuthSession from 'expo-auth-session';
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { View } from "moti";
import PrimaryButton from "../pressable/PrimaryButton";

WebBrowser.maybeCompleteAuthSession();
const DevelopmentMode = Constants.executionEnvironment === "storeClient"
export interface GoogleLoginInterface {
  oauthTokenCollection: OauthTokenCollection
}

export default  function  GoogleLogin({ oauthTokenCollection }: GoogleLoginInterface) {
const redirectUri = DevelopmentMode ? 
    `https://auth.expo.io/@${Constants.expoConfig?.owner}/${Constants.expoConfig?.slug}`
    : AuthSession.makeRedirectUri({
        scheme: Constants.expoConfig?.scheme as string,
      });

  // ? Working Mobile build signin
  const [request, response, promptAsync] =
    Google.useAuthRequest({
      androidClientId: oauthTokenCollection.androidClientId,
      iosClientId: oauthTokenCollection.iosClientId,
      webClientId: oauthTokenCollection.webClientId,
      scopes: ["openid", "profile", "email"],
    });

  // ? Force Web Signin
  // const [request, response, promptAsync] =
  //   Google.useAuthRequest({
  //     clientId: oauthTokenCollection.webClientId,
  //     scopes: ["profile", "email"],
  //     redirectUri
  //   });

  // % Functions
  const signIn = async () => {
    const result = await promptAsync();
    console.log(result)

    if (result.type === "success") {
      const { code } = result.params;
      await AuthController.verifyOauthSigninToken(code)
        .then((res: any) => {
          if (res.status === 200) router.navigate('/(tabs)/Home')
        })
    }
  };

  return (
    <View className="w-full">
      { 
        !DevelopmentMode && 
        <PrimaryButton
          // isLoading={authLoading}
          buttonText="Login con Google"
          onPress={signIn}
        />
      }

    </View>
  );
}