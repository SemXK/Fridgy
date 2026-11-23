import { UserContext } from '@/app/_layout'
import BackButtonHeader from '@/components/headers/BackButtonHeader'
import ThemedFormField from '@/components/inputs/CustomFormField'
import PrimaryButton from '@/components/pressable/PrimaryButton'
import TopSnackbar from '@/components/ui/SnackbarComponent'
import ThemedText from '@/components/ui/ThemedText'
import { SnackbarStatus } from '@/constants/enums/common'
import { User } from '@/constants/interfaces/usersInterface'
import { AuthController } from '@/controllers/AuthController'
import { router } from 'expo-router'
import { View } from 'moti'
import React, { useContext, useState } from 'react'
import { Keyboard } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const UpdateUserInfo = () => {
  // $Context
  const { user, setUser } =  useContext(UserContext)

  // * States
  const [username, setUsername] = useState<string>(user?.username || '')
  const [name, setName] = useState<string>(user?.name || '')
  const [surname, setSurname] = useState<string>(user?.surname || '')
  const [email, setEmail] = useState<string>(user?.email || '')
  const [mobilePhone, setMobilePhone] = useState<string>(user?.mobilePhone ? String(user?.mobilePhone) : "")
  const [profilePic, setProfilePic] = useState<string>("")

  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)

  // £ Functions
  const HandleSaveInfo = async () => {
    if(!name || !surname || !username ) {
      setBarStatus(SnackbarStatus.Warning);
      setShowSnackbar("Compila tutti i campi")
    }
    else {
      await AuthController.updateUser({
        name, 
        surname,
        username,
        mobilePhone: Number(mobilePhone)
      }).then((res) => {
        const response  = res as User
        setBarStatus(SnackbarStatus.Success);
        setShowSnackbar("Hai aggiornato il tuo profilo")

        setUser(response)
        console.log({response})
        router.navigate('/(tabs)/(profile-tab)')
      })
    }
  }

  return (
    <View className="min-h-screen relative" onTouchEnd={() => Keyboard.isVisible() ??  Keyboard.dismiss()}>

      <SafeAreaView>
        <ScrollView className="p-4 h-full">
        <BackButtonHeader />

          <ThemedText label='Modifica Utente' darkModeDisabled textStyle='text-white text-2xl' font="Nunito-Bold" />

          <View className="flex flex-col gap-4">
            <ThemedFormField 
              label='Nome'
              value={name}
              setValue={setName}
            />

            <ThemedFormField 
              label='Cognome'
              value={surname}
              setValue={setSurname}
            />

            <ThemedFormField 
              label='Username'
              value={username}
              setValue={setUsername}
            />

            <ThemedFormField 
              label='Telefono'
              value={mobilePhone as string}
              keyboardType="phone-pad"
              rightIcon='phone'
              setValue={setMobilePhone}
            />

            {/* <ThemedFormField 
              label='E-mail'
              value={email}
              keyboardType="email-address"
              rightIcon='email'
              setValue={setEmail}
            /> */}

          </View>

        </ScrollView>
      </SafeAreaView>

        <View className="absolute bottom-8 w-full p-8">
          <PrimaryButton onPress={HandleSaveInfo} buttonText='Salva' />
        </View>

        {/* Snackbar */}
        <TopSnackbar
          status={barStatus}
          message={showSnackbar} 
          onHide={() => setShowSnackbar('')} 
        />

    </View>
  )
}

export default UpdateUserInfo