import React from 'react';
import { Image, View } from 'react-native';
import ThemedText from '../ui/ThemedText';

interface LCDInterface {
  linkCode: string;
  onPress: () => void;
}

const LinkCodeDisplay = ({linkCode, onPress}: LCDInterface) => {

  // * Functions
  const onSharePress = (e) => {
    e.preventDefault()
  }
  return (
    <View className="dark:bg-darkColor-800 w-3/4 aspect-square rounded-xl items-center flex justify-between relative">

      <View className="w-full h-1/3 bg-primary-500 rounded-t-xl flex flex-row align-start justify-center">
        <Image
          className="w-1/2 -top-16 aspect-square"
          resizeMode='contain'
          source={require('@/assets/images/illustrations/invitation.png')}
        />
      </View>

      <View className="flex flex-col justify-between h-2/3 ">

        <View className="items-center flex flex-col justify-center h-1/3">
          <ThemedText label="Il tuo codice invito" font="Nunito-Bold" textStyle='text-2xl text-center' />
          <ThemedText label="Condividi il codice con i tuoi clienti per invitarli" />
        </View>

        <View className="items-center flex flex-col justify-center h-1/3">
          <ThemedText label={linkCode} font="Nunito-ExtraBold" textStyle='text-4xl' />
        </View>
      
        <View className="items-center flex flex-col justify-center h-1/3">
          {/* <PrimaryButton 
            rightIcon={<Ionicons name="share-social" size={20} color={primaryColor[500]} />}
            buttonText='Condividi' 
            mode="outlined" 
            buttonColor={primaryColor[500]} 
            onPress={onPress} 
          /> */}
        </View>

      </View>

    </View>
  )
}

export default LinkCodeDisplay