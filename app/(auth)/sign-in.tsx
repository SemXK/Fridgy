import 'react-native-reanimated';

import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import CustomSnackbar from '@/components/ui/CustomSnackbar';
import ThemedText from '@/components/ui/ThemedText';
import { AuthController } from '@/controllers/AuthController';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';


export default function SignIn() {
  // * inputs
  const [email, setEmail] = useState<string>("sems@gmailss.com")
  const [password, setPassword] = useState<string>("Password123!")

  // * State settings

  const [showSnackbar, setShowSnackbar] = useState<string>("")

  const [visible, setVisible] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  // & Functions
  const handleRegister = async () => {
    setAuthLoading(true)
    if (email && password) {
      await AuthController
        .login({ email, password})
        .then(() => {
          router.navigate('/(tabs)/Home');
        })
        .catch(e => {
          setShowSnackbar(e.message)
        })
    }
    else {
      setShowSnackbar("Compila tutti i campi")
    }
    setAuthLoading(false)
  }

  return (
    <View className="w-full ">
      <CustomSnackbar
        visible={!!showSnackbar} 
        message={showSnackbar} 
        onDismiss={() => setShowSnackbar("")} 
      />
      <View className="p-4 flex flex-col justify-between h-3/4">
        {/* Header + Fields */}
        <View>
          <ThemedText
            font='Nunito-ExtraBold'
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
              secureTextEntry={!visible}
              secureTextEntryChange={setVisible}
            />
          </View>
        </View>

        {/* Actions + Router */}
        <View className="flex flex-col justify-center items-center gap-4">
          <PrimaryButton
            mode="text"
            isLoading={authLoading}
            buttonText='Accedi'
            className="w-1/2"
            onPress={handleRegister}
          />

          <View className="flex-row self-center gap-2 ">
            <ThemedText font='Nunito-Light' textStyle='text-stone-400 dark:text-stone-500' label="Non hai un accounts?" />
            <Link href="/sign-up">
              <ThemedText darkModeDisabled font='Nunito-Bold' label="Registrati" textStyle="text-primary-500 underline" />
            </Link>
          </View>
        </View>
      </View>

    </View>
  )
}


