import { darkColor } from '@/constants/theme';
import React from 'react';
import { Appearance, Image, View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';
interface ESLCInterface{
  onPress: () => void;
}

const EmptyStoreListComponent = (props: ESLCInterface) => {
  return (
    <View className="bg-primary-500 rounded-lg p-4 flex flex-row justify-between gap-8">
      <Image
        className="w-1/4 h-32"
        resizeMode='contain'
        source={require('../../assets/images/illustrations/noStores.png')}
      />
      <View className="w-2/3 flex flex-col justify-between">
        <View>
          <ThemedText darkModeDisabled textStyle='text-white text-xl'  label="Non hai Negozi"></ThemedText>
          <ThemedText darkModeDisabled textStyle='text-white'  label="Crea il tuo negozio per creare e gestire i tuoi prodotti"></ThemedText>
        </View>
        <PrimaryButton onPress={props.onPress} buttonText="Crea Negozio" buttonColor={Appearance.getColorScheme() === 'dark' ? darkColor[900] : 'white'}/>
      </View>
    </View>
  )
}

export default EmptyStoreListComponent