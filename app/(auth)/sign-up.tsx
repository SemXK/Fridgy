import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { register } from '@/lib/appwrite';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';



export default function SignUp() {
  // * inputs
  const [username, setUsername] = useState<string>("username")
  const [email, setEmail] = useState<string>("email@gmail.com")
  const [password, setPassword] = useState<string>("password")

  // * State settings

  const [showSnackbar, setShowSnackbar] = useState<string>("")

  const [visible, setVisible] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  // & Functions
  const handleRegister = async () => {
    setAuthLoading(true)
    try {

      if (username && email && password) {
        const res = await register(username, email, password)
        console.log("res: ", res)
      }
      else {
        console.log("Missing fields")
      }
    }
    catch (e: any) {
      setShowSnackbar(e.message)
    }
    setAuthLoading(false)
  }

  return (
    <View className="w-full ">

      <Snackbar
        className="absolute -bottom-8"

        onDismiss={() => { }}
        visible={!!showSnackbar}
        action={{
          label: 'Ok',
          onPress: () => {
            setShowSnackbar("");
          }
        }}
      >
        {showSnackbar}
      </Snackbar>
      {/* fields */}
      <View className="p-4 flex flex-col justify-between h-3/4">
        {/* Header + fields */}
        <View>

          <ThemedText
            font='Nunito-ExtraBold'
            darkModeDisabled
            label="Registrati"
            textStyle="text-primary-500 text-4xl text-center"
          />
          <ThemedText
            font='Nunito-Light'
            label="Crea il tuo account"
            textStyle="text-lg text-stone-400 dark:text-stone-600 text-center"
          />
          <View className="gap-4">
            <CustomFormField
              value={username}
              setValue={setUsername}
              label="Username"
            />
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

        {/* Actions è Route */}
        <View>
          {/* Buttons */}
          <View className="flex flex-col justify-center items-center gap-4">

            <PrimaryButton
              mode="text"
              isLoading={authLoading}
              buttonText='Registrati'
              className="w-1/2"
              onPress={handleRegister}
            />
          </View>

          {/* Route */}
          <View className="flex-row self-center gap-2 ">
            <ThemedText font='Nunito-Light' textStyle='text-stone-400 dark:text-stone-500' label="Hai un accounts?" />
            <Link href="/sign-in">
              <ThemedText darkModeDisabled font='Nunito-Bold' label="Accedi" textStyle="text-primary-500 underline" />
            </Link>
          </View>
        </View>
      </View>

    </View>
  )
}


