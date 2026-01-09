import { darkColor } from '@/constants/theme';
import React from 'react';
import { Image, View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';

interface EFLCInterface{
  onPress: () => void;
}

const EmptyFridgeListComponent = (props: EFLCInterface) => {
  return (
    <View className="bg-primary-500 rounded-lg p-4 flex flex-row justify-between gap-8">
      <Image
        className="w-1/4 h-32"
        resizeMode='contain'
        source={require('../../assets/images/illustrations/emptyFridge.png')}
      />
      <View className="w-2/3 flex flex-col justify-between">
        <View>
          <ThemedText darkModeDisabled textStyle='text-white text-xl'  label="Non hai Inventari"></ThemedText>
          <ThemedText darkModeDisabled textStyle='text-white'  label="Crea un frigo e inizia ad organizzare i tuoi alimenti"></ThemedText>
        </View>
        <PrimaryButton onPress={props.onPress} buttonText="Crea Frigorifero" buttonColor={darkColor[900]}/>
      </View>
    </View>
  )
}

export default EmptyFridgeListComponent