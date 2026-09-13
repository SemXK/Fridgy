import PrimaryButton from '@/components/pressable/PrimaryButton';
import ThemedText from '@/components/ui/ThemedText';
import { darkColor } from '@/constants/theme';
import React from 'react';
import { Appearance, Image, ImageSourcePropType, View } from 'react-native';


interface GECInterface{
  title: string;
  message: string;
  image: ImageSourcePropType;
  buttonText?: string
  onPress?: () => void;
}

const GenericEmptyCardComponent = ({title, message, image, buttonText, onPress}: GECInterface) => {
  return (
    <View className="bg-primary-500 rounded-lg p-4 flex flex-row justify-between gap-8">
      <Image
        className="w-1/4 h-32"
        resizeMode='contain'
        source={image}
      />
      <View className="w-2/3 flex flex-col justify-between">
        <View>
          <ThemedText darkModeDisabled textStyle='text-white text-xl' font="Nunito-Bold" label={title}></ThemedText>
          <ThemedText darkModeDisabled textStyle='text-white'  label={message}></ThemedText>
        </View>
        {
          onPress ?
          <PrimaryButton onPress={onPress} buttonText={buttonText || 'Press'} buttonColor={Appearance.getColorScheme() === 'dark' ? darkColor[900] : 'white'}/>
          :
          <></>
        }
      </View>
    </View>
  )
}

export default GenericEmptyCardComponent