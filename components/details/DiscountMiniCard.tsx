import { Discount } from '@/constants/interfaces/productInterface';
import React from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
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
      className="relative w-full h-full aspect-square bg-stone-100 dark:bg-stone-900 rounded-xl justify-start "
      onPress={props.onPress}

    >
      {/* Descrizione Prodotto */}
      <Image
        className="w-full h-full self-center aspect-square rounded-xl absolute "
        source={props.item.image as ImageSourcePropType}
        width={160}
        height={160}
        resizeMode="cover"
      />

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