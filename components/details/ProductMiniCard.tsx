import { UserContext } from '@/app/_layout'
import { Product } from '@/constants/interfaces/productInterface'
import React, { useContext } from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, } from 'react-native'

interface Props {
  product: Product,
  onPress: () => void
}

const ProductMiniCard = (props: Props) => {
  const user = useContext(UserContext);
  return (
    <TouchableOpacity
      className="w-full h-24 bg-secondary-200 shadow-xl rounded-lg p-2 flex flex-row gap-2"
      onPress={props.onPress}
    >

      <Image
        className="w-1/3 h-full rounded-xl"
        source={props.product.image as ImageSourcePropType}
        resizeMode="cover"
      />
      <Text style={{ fontFamily: 'Nunito-ExtraBold' }} className="">{props.product.name} {user?.name}</Text>

    </TouchableOpacity>
  )
}

export default ProductMiniCard