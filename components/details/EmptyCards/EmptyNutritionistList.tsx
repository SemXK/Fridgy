import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { darkColor } from '@/constants/theme';
import React from 'react';
import { Appearance, Image, View } from 'react-native';

interface ECLInterface{
  onPress: () => void;
}

const EmptyNutritionistList = ({onPress}: ECLInterface) => {
  return (
    <View className="bg-primary-500 rounded-lg p-4 flex flex-row justify-between gap-8">
      <Image
        className="w-1/4 h-32"
        resizeMode='contain'
        source={require('@/assets/images/illustrations/empty_nutritionist_list.png')}
      />
      <View className="w-2/3 flex flex-col justify-between">
        <View>
          <ThemedText darkModeDisabled textStyle='text-white text-xl' font="Nunito-Bold" label="Non stai seguendo Diete" />
          <ThemedText darkModeDisabled textStyle='text-white'  label="Inserisci il codice invito del tuo nutrizionista per accedere ai piani alimentari" />
        </View>
        <PrimaryButton onPress={onPress} buttonText="Inserisci Codice Invito" buttonColor={Appearance.getColorScheme() === 'dark' ? darkColor[900] : 'white'}/>
      </View>
    </View>
  )
}

export default EmptyNutritionistList