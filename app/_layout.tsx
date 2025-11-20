import { currentUser } from '@/constants/interfaces/fakeData';
import { User } from '@/constants/interfaces/usersInterface';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { createContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import "react-native-gesture-handler";
import 'react-native-reanimated';
import './global.css';


// % Default startup functions
SplashScreen.preventAutoHideAsync();
export const UserContext = createContext<User | null>(null);

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


  //  * Auth
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    setUser(currentUser);
  }, [])

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="transparent"
      />
      <UserContext value={user}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>

        </ThemeProvider>
      </UserContext>

    </>
  );
}
