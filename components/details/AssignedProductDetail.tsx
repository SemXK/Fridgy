import { Product } from '@/constants/interfaces/productInterface'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import ThemedText from '../ui/ThemedText'
import UrlImage from '../ui/UrlImage'

const AssignedProductToFridgeDetail = (props: {product: Product}) => {
  return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          className=" rounded-xl h-24 flex flex-col items-center justify-center bg-darkColor-800"
        >
          <UrlImage source={props.product.image} resizeMode='contain'/>
        </TouchableOpacity>

        {/* Azioni Prodotto */}
        <View className="absolute bottom-0 right-0 rounded-tl-2xl rounded-br-2xl bg-primary-500 p-2" >
          <ThemedText font='Nunito-Italic' label={String(props.product.pivot?.quantity)} />
        </View>
      </>
  )
}

export default AssignedProductToFridgeDetail