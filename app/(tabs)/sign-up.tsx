import CustomFormField from '@/components/inputs/CustomFormField';
import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';



export default function SignUp() {
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
    <View className="w-full">
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
      <View className="flex-row self-center gap-2">
        <ThemedText label="Non hai un account?"/>
        <Link href="/sign-in">
          <ThemedText label="Registrati!" textStyle="text-primary-600 underline"/>
        </Link>
      </View>

      {/* Buttons */}
      <View className="items-center w-full">
        <PrimaryButton
          buttonText='Registrati'
          onPress={handleRegister}
        />
      </View>
    </View>
  )
}


