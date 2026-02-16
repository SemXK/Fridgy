import { Product } from '@/constants/interfaces/productInterface';
import React from 'react';
import { View } from 'react-native';
import BackButton from '../pressable/BackButton';
import CartButton from '../pressable/CartButton';
import HeartButton from '../pressable/HeartButton';
import ThemedText from '../ui/ThemedText';

interface ProductHeaderInterface {
  title?: string;
  product?: Product
}

const ProductDetailHeader = (props: ProductHeaderInterface) => {
  // * Context

  return (
    <View className="flex flex-row justify-between items-center h-8">
      <View className="flex flex-row  items-center">
        <BackButton/>
        {props.title && 
          <ThemedText 
            label={props.title} 
            darkModeDisabled 
            font="Nunito-ExtraBold"
            textStyle='text-3xl text-primary-500 '
          />
        }
      </View>
      <View className="flex flex-row">
        <HeartButton />
        <CartButton />
      </View>
    </View>
  )
}

export default ProductDetailHeader