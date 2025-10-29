import { Product } from '@/constants/interfaces/productInterface'
import React from 'react'
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import ThemedText from '../ui/ThemedText'

interface Props {
  product: Product,
  onPress: () => void
}

const ProductMiniCard = (props: Props) => {
  return (
    <TouchableOpacity
      className="w-full h-full aspect-square  relative shadow-xl rounded-lg  flex flex-col"
      onPress={props.onPress}
    >

      <Image
        className="absolute -top-4 z-10 h-1/2 self-center aspect-square rounded-xl"
        source={props.product.image as ImageSourcePropType}
        width={100}
        height={100}
        resizeMode="contain"
      />

      <View className="absolute bottom-0 bg-primary-500/20 rounded-xl h-2/3 py-4 px-2 w-full ">
        <ThemedText
          font="Nunito-ExtraBold"
          textStyle="text-2xl text-primary-500"
          label={props.product.name}
        />

        <View className='flex flex-row flex-wrap gap-1'>

          {props.product.foodTypes.map((type) => {

            return (
              <ThemedText
                key={type.id}
                font="Nunito-Italic"
                label={type.type}
              />
              // <PillComponent
              //   key={type.id}
              //   textStyle='text-white line-clamp-1 text-center'
              //   containerClassName={`${type.color}`}
              //   label={type.type}
              // />
            )
          }

          )
          }
        </View>

        <View className="flex flex-row ">
          <ThemedText label='Quantità: ' font='Nunito-Italic' textStyle='color-primary-500' />
          <ThemedText label={`${props.product.quantity}`} />

        </View>
      </View>

    </TouchableOpacity>
  )
}

export default ProductMiniCard