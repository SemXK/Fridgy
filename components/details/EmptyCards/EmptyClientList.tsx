import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { darkColor } from '@/constants/theme';
import React from 'react';
import { Appearance, Image, View } from 'react-native';

interface ECLInterface{
  onPress: () => void;
}

const EmptyClientList = ({onPress}: ECLInterface) => {
  return (
    <View className="bg-primary-500 rounded-lg p-4 flex flex-row justify-between gap-8">
      <Image
        className="w-1/4 h-32"
        resizeMode='contain'
        source={require('@/assets/images/illustrations/empty_clients.png')}
      />
      <View className="w-2/3 flex flex-col justify-between">
        <View>
          <ThemedText darkModeDisabled textStyle='text-white text-xl' font="Nunito-Bold" label="Non hai Clienti" />
          <ThemedText darkModeDisabled textStyle='text-white'  label="Crea in tuo codice invito e invita i tuoi Clienti" />
        </View>
        <PrimaryButton onPress={onPress} buttonText="Crea Codice Invito" buttonColor={Appearance.getColorScheme() === 'dark' ? darkColor[900] : 'white'}/>
      </View>
    </View>
  )
}

export default EmptyClientList