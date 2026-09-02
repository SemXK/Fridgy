import { hexToRgba } from '@/constants/functions/HexToRgba'
import { StoredProduct } from '@/constants/interfaces/productInterface'
import { primaryColor } from '@/constants/theme'
import React from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import PrimaryIconButton from '../pressable/PrimaryIconButton'
import ThemedText from '../ui/ThemedText'
import UrlImage from '../ui/UrlImage'

interface PISInterface {
  product: StoredProduct
}
const ProductInStore = ({product}:PISInterface) => {
  return (
    <View className="rounded-xl h-24 w-full  justify-center bg-white dark:bg-darkColor-800 px-2">
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => onPressFunc(product)}
        className=" gap-4 flex flex-row items-center"
      >
        <View >
          <UrlImage source={product.image} resizeMode='contain' />
        </View>

          <Animated.View
            // style={[productOpacityStyle]}
            className="flex items-start flex-1 "
          >
            <ThemedText
              darkModeDisabled
              font='Nunito-Bold'
              textStyle=" text-primary-500 line-clamp-1  text-center text-xl"
              label={product.name}
            />

            <ThemedText
              style={{
                backgroundColor: hexToRgba(primaryColor[500], 0.5),
                borderRadius: 10,
                paddingHorizontal: 4
              }}
              font="Nunito-Light"
              textStyle='text-balance line-clamp-2'
              label={`${product.quantityInStore[0].quantity} Unità in negozio`}
            />

            <ThemedText
              font="Nunito-Light"
              textStyle='text-balance line-clamp-2'
              label={product.description || 'Nessuna descrizione al prodotto'}
            />



          </Animated.View>

        <PrimaryIconButton
          className='self-center'
          onPress={() => null} 
          iconSpecs={{
            name: "chevron-right",
            color: primaryColor[500],
            size: 24
          }}
        />
      </TouchableOpacity>


      {/* Azioni Prodotto */}
      {/* <View className="absolute bottom-0 right-0 rounded-tl-xl rounded-br-xl bg-primary-500 p-2" >
        <ThemedText font='Nunito-Italic' darkModeDisabled textStyle='text-white' label={String(product.pivot?.quantity + (product.pivotConsumption?.length || 0))} />
      </View> */}


    </View>
  )
}

export default ProductInStore