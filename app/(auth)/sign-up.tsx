import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';



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

  // & Functions
  const handleRegister = async () => {
    setAuthLoading(true)
    // if (username && email && password && confirmPassword) {
    //   await AuthController
    //     .register({ username, email, password, confirmPassword })
    //     .then((data) => {
    //       router.navigate('/(tabs)/Home');
    //     })
    //     .catch(e => {
    //       setShowSnackbar(e.message)
    //     })

    // }
    // else {
    //   setShowSnackbar("Compila tutti i campi")
    // }
    // setAuthLoading(false)
  }

  return (
    <View className="w-full">

      {/* SnackBar */}
      <Snackbar
        className="absolute top-0"
        onDismiss={() => {}}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});