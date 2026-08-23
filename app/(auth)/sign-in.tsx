import 'react-native-reanimated';

import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import GoogleLogin from '@/components/thirdParty/GoogleLogin';
import TopSnackbar from '@/components/ui/SnackbarComponent';
import ThemedText from '@/components/ui/ThemedText';
import { SnackbarStatus } from '@/constants/enums/common';
import { AuthController } from '@/controllers/AuthController';
import { AxiosError } from 'axios';
import { Link, router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { OauthContext } from '../_layout';

export default function SignIn() {
  // & Context
  const  oauthTokenCollection  = useContext(OauthContext);

  // * inputs
  const [email, setEmail] = useState<string>("consumatore@swantech.it")
  const [password, setPassword] = useState<string>("")

  // * State settings
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)


  // & Functions
  const handleRegister = async () => {
    setAuthLoading(true)
    if (email && password) {
      await AuthController
        .login({ email, password})
        .then(() => {
          setBarStatus(SnackbarStatus.Success)
          setShowSnackbar('Benvenuto')
          router.navigate('/(tabs)/Home');
        })
        .catch((e: AxiosError) => {
          setBarStatus(SnackbarStatus.Error)
          setShowSnackbar(e.message)
        })
    }
    else {
      setBarStatus(SnackbarStatus.Warning)
      setShowSnackbar('Compila tutti i campi')
    }
    setAuthLoading(false)
  }

  const signIn = async () => {
    // console.log({ oauthTokenCollection })
    // await promptAsync().then((resp: any) => {
    //   console.log({resp})
    // })
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <View className="w-full ">
      <View className="p-4 flex flex-col justify-between h-3/4">
        {/* Header + Fields */}
        <View>
          <ThemedText
            font='Nunito-Bold'
            darkModeDisabled
            label="Benvenuto"
            textStyle="text-primary-500 text-4xl text-center"
          />
          <ThemedText
            font='Nunito-Light'
            label="Accedi al tuo account"
            textStyle="text-lg text-stone-400 dark:text-stone-600 text-center"
          />
          <View className="gap-4">

            <CustomFormField
              value={email}
              setValue={setEmail}
              label="Email"
            />
            <CustomFormField
              value={password}
              setValue={setPassword}
              label="Password"
              secureTextEntry={!showPass}
              secureTextEntryChange={setShowPass}
            />
          </View>
        </View>

        {/* Actions + Router */}
        <View className="flex flex-col justify-center items-center gap-4 mb-20">
          {
            oauthTokenCollection && 
            <GoogleLogin
              oauthTokenCollection={oauthTokenCollection}
            />
          }

          <View className="w-full">
            <PrimaryButton
              isLoading={authLoading}
              buttonText='Accedi'
              onPress={handleRegister}
            />
          </View>

          <View className="flex-row self-center gap-2 ">
            <ThemedText font='Nunito-Light' textStyle='text-stone-400 dark:text-stone-500' label="Non hai un accounts?" />
            <Link href="/sign-up">
              <ThemedText darkModeDisabled font='Nunito-Bold' label="Registrati" textStyle="text-primary-500 underline" />
            </Link>
          </View>

        </View>

        {/* Snackbar */}
        <TopSnackbar 
          status={barStatus}
          message={showSnackbar} 
          onHide={() => setShowSnackbar('')} 
        />
      </View>

    </View>
  )
}


