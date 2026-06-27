import { Product } from '@/constants/interfaces/productInterface'
import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import ThemedText from '../ui/ThemedText'
import UrlImage from '../ui/UrlImage'

/**
 * Product Card shown in the fridge detail, 
 */

const AssignedProductToFridgeDetail = (props: {
  product: Product,
  itemsPerColumns: number,
  onPressFunc: (prod: Product) => void
}) => {

  // % Style variables
  const productOpacity = useSharedValue<number>(0)
  const productOpacityStyle = useAnimatedStyle(() => ({
    opacity: productOpacity.value
  }))


  // * Lifecycle
  useEffect(() => {
    productOpacity.value = withTiming(props.itemsPerColumns === 4 ? 0 : 1, {
      duration: 400
    })
  }, [productOpacity, props.itemsPerColumns])

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          justifyContent: props.itemsPerColumns === 4 ? 'center' : 'flex-start',
        }}
        onPress={() => props.onPressFunc(props.product)}
        className="rounded-xl h-24 w-full flex gap-4 flex-row items-center justify-center bg-white dark:bg-darkColor-800 px-2"
      >
        <View >
          <UrlImage source={props.product.image} resizeMode='contain' />
        </View>
        {
          props.itemsPerColumns !== 4 &&
          <Animated.View
            style={[productOpacityStyle]}
            className="flex items-start flex-1"
          >
            <ThemedText
              darkModeDisabled
              font='Nunito-Bold'
              textStyle=" text-primary-500 line-clamp-1  text-center text-xl"
              label={props.product.name}
            />
            {
              props.itemsPerColumns === 1 &&
              <ThemedText
                font="Nunito-Light"
                textStyle='text-balance line-clamp-2'
                label={props.product.description || 'Nessuna descrizione al prodotto'}
              />
            }
          </Animated.View>
        }

      </TouchableOpacity>

      {/* Azioni Prodotto */}
      <View className="absolute bottom-0 right-0 rounded-tl-xl rounded-br-xl bg-primary-500 p-2" >
        <ThemedText font='Nunito-Italic' darkModeDisabled textStyle='text-white' label={String(props.product.pivot?.quantity)} />
      </View>


    </>
  )
}

export default AssignedProductToFridgeDetail