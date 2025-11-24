import { ProductType } from '@/constants/interfaces/productInterface';
import React from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import ThemedText from '../ui/ThemedText';

interface Props {
  item: ProductType,
  onPress: () => void
}

const ProductTypeMiniCard = (props: Props) => {

  // % Functions
  const handleFavouriteClick = (e: GestureResponderEvent, product: ProductType) => {
    e.stopPropagation();

  }

  // * Display
  return (
    <TouchableOpacity
      className="relative w-full h-full  bg-stone-100 dark:bg-stone-900 rounded-xl p-4 justify-start "
      onPress={props.onPress}
    >
      {/* Descrizione Prodotto */}
      <Image
        className="w-3/4 h-3/4 self-center  rounded-xl "
        source={props.item.image as ImageSourcePropType}
        width={200}
        height={200}
        resizeMode="contain"
      />
      <ThemedText
        darkModeDisabled
        font="Nunito-ExtraBold"
        textStyle=" text-primary-500 line-clamp-1"
        label={props.item.type}
      />

    </TouchableOpacity>
  )
}

export default ProductTypeMiniCard