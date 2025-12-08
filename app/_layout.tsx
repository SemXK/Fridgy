import { CartContextInterface, CartItemInterface } from '@/constants/interfaces/productInterface';
import { AuthType, Guest, User } from '@/constants/interfaces/usersInterface';
import { AuthController } from '@/controllers/AuthController';
import { ProductController } from '@/controllers/ProductController';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { createContext, useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import "react-native-gesture-handler";
import './global.css';


// % Default startup functions
SplashScreen.preventAutoHideAsync();
export const UserContext = createContext<AuthType>({});
export const CartContext = createContext<CartContextInterface>({cart:[]});

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
  }, [])

  // % Font loader
  if (!loaded && !error) {
    return null;
  }

  // % User Loader
  if(!user && !guest) {
    return null
  }

  return (
    <>
      <StatusBar
        barStyle={Appearance.getColorScheme() === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={Appearance.getColorScheme() === 'light' ? 'white' : 'black'}
      />
      <UserContext value={{user, guest}}>
        <CartContext value={{cart, setCart}}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

            <Stack initialRouteName="(tabs)">
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>

          </ThemeProvider>
        </CartContext>
      </UserContext>
    </>
  );
}
