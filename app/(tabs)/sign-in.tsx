import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';



export default function SignIn() {
  // * inputs
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // * State settings
  const [visible, setVisible] = useState<boolean>(false)

  // & Functions
  const handleRegister = async () => {
    if(username && email && password){
    }
  }

  return (
    <View className="w-full h-full">
      {/* fields */}
      <View className="p-4 flex gap-2"> 
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

      {/* Route */}
      <View className="flex-row self-center gap-2 ">
        <ThemedText label="Hai un account?"/>
        <Link href="/sign-up">
          <Text className="text-primary-600 underline">Accedi!</Text>
        </Link>
      </View>

      {/* Buttons */}
      <View className="flex flex-row justify-center ">
        <PrimaryButton
          buttonText='Accedi'
          className="w-1/2"
          onPress={handleRegister}
        />
      </View>
    </View>
  )
}


