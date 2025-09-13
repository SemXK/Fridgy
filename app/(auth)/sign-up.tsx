import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { register } from '@/lib/appwrite';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
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

      if(username && email && password){
        const res = await register(username, email, password)
        console.log("res: ", res)
      }
      else {
        console.log("Missing fields")
      }
    }
    catch(e: any) {
      setShowSnackbar(e.message)
    }
    setAuthLoading(false)
  }

  return (
    <View className="w-full ">

      <Snackbar
        className="absolute -bottom-8"

        onDismiss={() =>{}}
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
      <View className="p-4 flex gap-2 h-3/4"> 
        <Text 
          className="font-bold text-primary-500 text-xl text-center" 
        >
          Inserisci le credenziali per registrarti
        </Text>
        
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

        {/* Route */}
        <View className="flex-row self-center gap-2 ">
          <ThemedText label="Hai un account?"/>
          <Link href="/sign-in">
            <Text className="text-primary-600 underline">Accedi!</Text>
          </Link>
        </View>

      </View>

      {/* Buttons */}
      <View className="flex flex-row justify-center ">
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


