import { darkColor } from '@/constants/theme';
import React from 'react';
import { Appearance, Image, View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';

interface ESCInterface {
  onPress: () => void;
}

const EmptyStoreCard = (props: ESCInterface) => {
  return (
    <View className="bg-primary-500 rounded-lg p-4 flex flex-row justify-between gap-8">
      <Image
        className="w-1/4 h-32"
        resizeMode='contain'
        source={require('../../assets/images/illustrations/empty_store.png')}
      />
      <View className="w-2/3 flex flex-col justify-between">
        <View>
          <ThemedText darkModeDisabled textStyle='text-white text-xl' font="Nunito-Bold"  label="IL tuo negozio è vuoto"></ThemedText>
          <ThemedText darkModeDisabled textStyle='text-white'  label="Aggiungi prodotti al tuo negozio e inizia a guadagnare"></ThemedText>
        </View>
        <PrimaryButton onPress={props.onPress} buttonText="Aggiungi Prodotti" buttonColor={Appearance.getColorScheme() === 'dark' ? darkColor[900] : 'white'}/>
      </View>
    </View>
  )
}

export default EmptyStoreCard