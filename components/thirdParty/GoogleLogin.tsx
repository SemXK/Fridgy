import { OauthTokenCollection } from "@/constants/interfaces/oauth";
import { AuthController } from "@/controllers/AuthController";
import * as AuthSession from 'expo-auth-session';
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { View } from "moti";
import { useEffect } from "react";
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

  useEffect(() =>{ signIn() }, [])
  // % Functions
  const signIn = async () => {
    const result = await promptAsync();
    // console.log("uri", request?.redirectUri);
    // console.log("red",AuthSession.makeRedirectUri());
    // const result = 
    //   {
    //     'type' :'success',
    //     'error' :null,
    //     'url' :'com.xsemxkx.fridgy:/oauthredirect?state=3G81HN12kg&iss=https://accounts.google.com&code=4/0AXEQxIAqmIJx1wbicb8hHcjhrZ3umMhYI6dMuewZ_OJN_WmtBWeJg-0PLudpn-AHx6UL_Q&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent',
    //     'params' :
    //     {
    //       'state' :'3G81HN12kg',
    //       'iss' :'https://accounts.google.com',
    //       'code' :'4/0AXEQxIAqmIJx1wbicb8hHcjhrZ3umMhYI6dMuewZ_OJN_WmtBWeJg-0PLudpn-AHx6UL_Q',
    //       'scope' :'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    //       'authuser' :'0',
    //       'prompt' :'consent',
    //     },
    //     'authentication' :null,
    //     'errorCode' :null,
    //   }
    if (result?.type === "success") {
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: oauthTokenCollection.webClientId,
          code: result.params.code,
          redirectUri: AuthSession.makeRedirectUri(),
          extraParams: {
            code_verifier: request?.codeVerifier ?? "",
          },
        },
        Google.discovery
      );
      console.log(tokenResponse)
      await AuthController.verifyOauthSigninToken(tokenResponse.idToken as string)
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