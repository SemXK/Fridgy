import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { login } from '@/lib/appwrite';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';


export default function SignIn() {
  // * inputs
  const [username, setUsername] = useState<string>("username")
  const [password, setPassword] = useState<string>("password")

  // * State settings

  const [showSnackbar, setShowSnackbar] = useState<string>("")

  const [visible, setVisible] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  // & Functions
  const handleRegister = async () => {
    setAuthLoading(true)
    try {

      if (username && password) {
        const res: any = await login(username, password)
        const currentUser = {
          id: res.$id,
          email: res.email,
          username: res.email
        }
        console.log("currentUser", currentUser)
      }
      else {
        setShowSnackbar("Compila tutti i campi")
      }
    }
    catch (e: any) {
      console.log("e", e.message)
    }
    setAuthLoading(false)
  }

  return (
    <View className="w-full ">

      <Snackbar
        className="absolute bottom-0"
        onDismiss={() => { }}
        visible={!!showSnackbar}
        action={{
          label: 'Ok',
          onPress: () => {
            setShowSnackbar("");
          }
        }}
      >
        Testo
      </Snackbar>

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
              value={username}
              setValue={setUsername}
              label="Username"
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


