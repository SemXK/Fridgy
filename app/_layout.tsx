import { CartContextInterface, CartItemInterface } from '@/constants/interfaces/productInterface';
import { AuthType, Guest, User } from '@/constants/interfaces/usersInterface';
import { AuthController } from '@/controllers/AuthController';
import { ProductController } from '@/controllers/ProductController';
import { StripeController } from '@/controllers/StripeController';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AxiosError } from 'axios';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { createContext, useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import '../global.css';


// % Default startup functions
SplashScreen.preventAutoHideAsync();
export const UserContext = createContext<AuthType>({});
export const CartContext = createContext<CartContextInterface>({cart:[]});

// * BottomSheet portal
export const BottomSheetContext = createContext<any>(() => {});

export default function RootLayout() {

  // * theme
  const colorScheme = useColorScheme();

  // * Font 
  const [loaded, error] = useFonts({
    'Nunito-Black': require('../assets/fonts/Nunito-Black.ttf'),
    'Nunito-BlackItalic': require('../assets/fonts/Nunito-BlackItalic.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('../assets/fonts/Nunito-BoldItalic.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('../assets/fonts/Nunito-ExtraBoldItalic.ttf'),
    'Nunito-ExtraLight': require('../assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('../assets/fonts/Nunito-ExtraLightItalic.ttf'),
    'Nunito-Italic': require('../assets/fonts/Nunito-Italic.ttf'),
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-LightItalic': require('../assets/fonts/Nunito-LightItalic.ttf'),
    'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-MediumItalic': require('../assets/fonts/Nunito-MediumItalic.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('../assets/fonts/Nunito-SemiBoldItalic.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  //  * Auth (non obligatorio)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [guest, setGuest] = useState<Guest | undefined>(undefined)
  const [cart, setCart] = useState<CartItemInterface[]>([])
  const [stripePublicKey, setStripePublicKey] = useState<string>('')

  // * BottomSheet state
  const [sheet, setSheet] = useState({
    open: false,
    component: null as any,
    height: 0.6,
    onClose: () => {}
  });

  useEffect(() => {
    // # Momentaneamente non è obbligatorio
    // if(!user) {
    //   AuthController.me()
    //   .then((userResponse: User) => {
    //     setUser(userResponse);
    //   })
    // }
    // 1* Guest API (per ora gli utenti sono tutti guest)
    if(!guest) {
      AuthController.sessionInit().then((res) => {
        setGuest(AuthController.currentGuest);
      })
    }

    // 1* Cart API
    ProductController.getCartItems().then((res: CartItemInterface[] | AxiosError) => {
      if (!(res instanceof AxiosError)) {
        setCart(res);
      }
    })

    // 1* Stripe Public Key
    StripeController.getPublicKey().then((key: string) => {
      setStripePublicKey(key)
    })

    // 1* Websockets
    // getEcho();
  }, [])

  // % Font loader
  if (!loaded && !error) {
    return null;
  }

  // % User Loader
  if(!user && !guest) {
    return null
  }

  // % No Stripe Payment Keys
  if(!stripePublicKey) {
    return null
  }

  return (
    <>
      <StatusBar
        barStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={Appearance.getColorScheme() === 'light' ? 'white' : 'black'}
      />

      <BottomSheetContext.Provider value={setSheet}>
        <UserContext value={{user, guest}}>
          <CartContext value={{cart, setCart}}>
            <GestureHandlerRootView>

            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <PaperProvider>

                <StripeProvider
                  publishableKey={stripePublicKey}
                  >

                  {/* Main stack */}
                  <Stack initialRouteName="(tabs)">
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  </Stack>
                </StripeProvider>

                {/* Global Bottomsheet */}
                {sheet.open && (
                  <sheet.component
                    height={sheet.height}
                    onClose={() => sheet.onClose()}
                  />
                )}

              </PaperProvider>
            </ThemeProvider>

            </GestureHandlerRootView>

          </CartContext>
        </UserContext>
      </BottomSheetContext.Provider>
    </>
  );
}

