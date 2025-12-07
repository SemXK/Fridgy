import { ProductType } from '@/constants/interfaces/productInterface';
import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
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
      className="relative w-24  bg-stone-100 dark:bg-darkColor-900 border-2 border-primary-500 rounded-xl p-2 justify-start "
      onPress={props.onPress}
    >
      {/* Descrizione Prodotto */}
      {/* <UrlImage
        source={props.item.image}
        className="w-1/2 h-1/2 self-center "
        width={65}
        height={65}
        resizeMode="contain"
      /> */}
      <ThemedText
        numberOfLines={1}
        darkModeDisabled
        font="Nunito-ExtraBold"
        textStyle=" text-primary-500 text-center "
        label={props.item.type}
      />

    </TouchableOpacity>
  )
}

export default ProductTypeMiniCard