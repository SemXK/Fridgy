import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { login } from '@/lib/appwrite';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
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

      if(username && password){
        const res:any = await login(username, password)
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
    catch(e: any) {
      console.log("e", e.message)
    }
    setAuthLoading(false)
  }

  return (
    <View className="w-full ">

      <Snackbar
        className="absolute bottom-0"
        onDismiss={() =>{}}
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
      {/* fields */}
      <View className="p-4 flex gap-2 h-3/4"> 
        <Text 
          className="font-bold text-primary-500 text-xl text-center" 
        >
          Inserisci le credenziali e registrati
        </Text>
        
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

        {/* Route */}
        <View className="flex-row self-center gap-2 ">
          <ThemedText label="Non hai un accounts?"/>
          <Link href="/sign-up">
            <Text className="text-primary-600 underline">Registrati!</Text>
          </Link>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex flex-row justify-center h-auto">
        <PrimaryButton
          mode="text"
          isLoading={authLoading}
          buttonText='Registrati'
          className="w-1/2"
          onPress={handleRegister}
        />
      </View>
    </View>
  )
}


