import { Discount } from '@/constants/interfaces/productInterface';
import React from 'react';
import { GestureResponderEvent, ImageBackground, TouchableOpacity, View } from 'react-native';
import WhiteButton from '../pressable/WhiteButton';
import ThemedText from '../ui/ThemedText';

interface Props {
  item: Discount,
  onPress: () => void
}

const DiscountMiniCard = (props: Props) => {

  // % Functions
  const handleFavouriteClick = (e: GestureResponderEvent, product: Discount) => {
    e.stopPropagation();
  }

  // * Display
  return (
    <TouchableOpacity
      className="relative w-full h-full aspect-square  rounded-xl justify-start "
      onPress={props.onPress}
    >
    <ImageBackground
      source={props.item.image}
      style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
      imageStyle={{ borderRadius: 16 }}
      resizeMode="cover"
    >
    </ImageBackground>

      {/* Descrizione Prodotto */}


      {/* Azioni Prodotto */}
      <View className="absolute top-0 w-full h-full rounded-xl bg-primary-500/75 flex flex-col items-center justify-between p-2">
        <View>
          <ThemedText
            darkModeDisabled
            font="Nunito-ExtraBold"
            textStyle="text-white text-center text-2xl "
            label={`Sconto fino al ${props.item.discount}%`}
          />
          <ThemedText
            darkModeDisabled
            font="Nunito-Regular"
            textStyle="text-white text-center text-lg p-2"
            label={`Su ${props.item.name}`}
          />
        </View>
        <WhiteButton
          onPress={() => {}}
          buttonText="Vedi ora!"
        />
      </View>
    </TouchableOpacity>
  )
}

export default DiscountMiniCard