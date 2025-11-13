import { Product } from '@/constants/interfaces/productInterface'
import { primaryColor } from '@/constants/theme'
import React from 'react'
import { GestureResponderEvent, Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ThemedText from '../ui/ThemedText'

interface Props {
  product: Product,
  onPress: () => void
}

const ProductMiniCard = (props: Props) => {

  // * Functions
  const goToDetail = (product: Product, e: GestureResponderEvent) => {
    e.stopPropagation();
    console.log("Dettaglio: ", product.id)
  }

  // * Display
  return (
    <TouchableOpacity
      className="w-full h-full aspect-square  relative shadow-xl rounded-lg  flex flex-col"
      onPress={props.onPress}
    >

      <Image
        className="absolute -top-4 z-10 h-2/5 self-center aspect-square rounded-xl"
        source={props.product.image as ImageSourcePropType}
        width={100}
        height={100}
        resizeMode="contain"
      />

      {/* Descrizione Prodotto */}
      <View className="absolute bottom-0 bg-primary-500/20 rounded-xl h-3/4 py-4 px-2 w-full ">
        <ThemedText
          font="Nunito-ExtraBold"
          textStyle="text-2xl text-primary-500"
          label={props.product.name}
        />

        {/* Descrizione Prodotto */}
        <View className="flex flex-row ">
          <ThemedText label='Quantità: ' font='Nunito-Italic' textStyle='color-primary-500' />
          <ThemedText label={`${props.product.quantity}`} />
        </View>

        {/* Tipo di prodotto */}
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

        {/* Azioni Prodotto */}
        <View className="flex flex-row justify-end  ">
          <TouchableOpacity
            activeOpacity={.1}
            className="rounded-full"
            onPress={(e) => goToDetail(props.product, e)}
          >
            <IconButton
              background={primaryColor[500]}
              icon="chevron-right"
              iconColor={primaryColor[500]}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>


    </TouchableOpacity>
  )
}

export default ProductMiniCard