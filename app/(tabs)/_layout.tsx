import React, { useState } from 'react';
import { Text, View } from 'react-native';

import CustomFormField from '@/components/inputs/CustomFormField';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {

  // * inputs
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // * State settings
  const [visible, setVisible] = useState<boolean>(false)


  return (
    <SafeAreaView>
      <Text>Auth Layout</Text>
      <View className="w-screen self-center p-2"> 
        <CustomFormField
          value={email}
          setValue={setEmail}
          label="Email"
        />
        <CustomFormField
          value={password}
          setValue={setPassword}
          label="Password"
          secureTextEntry={visible}
          secureTextEntryChange={setVisible}
        />
      </View>
    </SafeAreaView>
  );
}
