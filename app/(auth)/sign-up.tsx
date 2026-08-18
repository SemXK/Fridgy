import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import TopSnackbar from '@/components/ui/SnackbarComponent';
import ThemedText from '@/components/ui/ThemedText';
import { SnackbarStatus } from '@/constants/enums/common';
import { validatePassword } from '@/constants/functions/PasswordRegex';
import { AuthController } from '@/controllers/AuthController';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';



export default function SignUp() {
  // * inputs
  const [username, setUsername] = useState<string>("username")
  const [email, setEmail] = useState<string>("emailsss@gmail.com")
  const [password, setPassword] = useState<string>("password")
  const [confirmPassword, setConfirmPassword] = useState<string>(password)

  // * State settings
  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)

  // & Functions
  const handleRegister = async () => {
    setAuthLoading(true)
    const passInvalidMessage = validatePassword(password)
    if(passInvalidMessage) {
      setBarStatus(SnackbarStatus.Warning)
      setShowSnackbar(passInvalidMessage)
    }
    if(password !== confirmPassword) {
      setBarStatus(SnackbarStatus.Warning)
      setShowSnackbar("Le password non coincidono!")
    }
    else if (username && email && password && confirmPassword) {
      await AuthController
        .register({ username, email, password, confirmPassword })
        .then(() => {
          setBarStatus(SnackbarStatus.Success)
          setShowSnackbar('Benvenuto!')
          router.navigate('/(tabs)/Home');
        })
        .catch(e => {
          setBarStatus(SnackbarStatus.Error)
          setShowSnackbar(e.message)
        })
    }
    else {
      setBarStatus(SnackbarStatus.Warning)
      setShowSnackbar("Compila tutti i campi!")
    }
    setAuthLoading(false)
  }

  return (
    <View className="w-full">

      {/* fields */}
      <View className="p-4 flex flex-col justify-between h-3/4">
        {/* Header + fields */}
        <View>

          <ThemedText
            font='Nunito-Bold'
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
            <CustomFormField
              value={confirmPassword}
              setValue={setConfirmPassword}
              label="Conferma Password"
              secureTextEntry={!visible}
              secureTextEntryChange={setVisible}
            />

          </View>
        </View>

        {/* Actions è Route */}
        <View className="flex flex-col justify-center items-center gap-4  mb-20">

          <View className="w-full">

            <PrimaryButton
              isLoading={authLoading}
              buttonText='Registrati'
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