import { Product } from '@/constants/interfaces/productInterface'
import React from 'react'
import { Image, Text, TouchableOpacity, } from 'react-native'

interface Props {
  product: Product,
  onPress: () => void
}

const ProductMiniCard = (props: Props) => {
  return (
    <TouchableOpacity
      className="w-full h-24 bg-secondary-200 shadow-xl rounded-lg p-2 flex flex-row gap-2"
      onPress={props.onPress}
    >

      <Image
        className="w-1/3 h-full rounded-xl"
        source={props.product.image}
        resizeMode="cover"
      />
      <Text className="font-bold">{props.product.name}</Text>
    </TouchableOpacity>
  )
}

export default ProductMiniCard