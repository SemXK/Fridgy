import { UnassignedProduct } from '@/constants/interfaces/productInterface'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import ThemedText from '../ui/ThemedText'
import UrlImage from '../ui/UrlImage'

interface UPD {
  unassignedProduct: UnassignedProduct
  onDragOverFridge?: (x: number, y: number) => void // Callback for when dragging over a fridge
  onDropOnFridge?: (productId: number) => void,
  fridgePositions?: any,
  onDragStart?: any,
  onDragPosition?: any,
}

const AnimatedUnassignedProductDetail = (props: UPD) => {

  // * Animation states
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const idDraggedItem = useSharedValue<number>(0)
  const contextX = useSharedValue(0)
  const contextY = useSharedValue(0)

  const checkDragOverFridges = (x: number, y: number) => {
    'worklet'
    if (props.onDragOverFridge) {
      scheduleOnRN(props.onDragOverFridge, x, y)
      
    }
  }
  const checkDropOnFridge = () => {
    'worklet'
    if (props.onDropOnFridge) {
      scheduleOnRN(props.onDropOnFridge, props.unassignedProduct.id)
    }
  }


  // * Gesture afunctions
  const dragGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value
      contextY.value = translateY.value
    })
    .onUpdate((event) => {
        translateX.value = contextX.value + event.translationX
        translateY.value = contextY.value + event.translationY
        
        // Check if we're dragging over any fridge
        if (props.onDragOverFridge) {
          const absoluteX = event.absoluteX
          const absoluteY = event.absoluteY
          checkDragOverFridges(absoluteX, absoluteY)
        }
    })
    .onEnd(() => {
        translateX.value = withSpring(0, {
          damping: 30,
          stiffness: 150,
        })
        translateY.value = withSpring(0, {
          damping: 30,
          stiffness: 150,
        })
        idDraggedItem.value = 0
        checkDropOnFridge()
    })

  // * Animation functions
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    zIndex: idDraggedItem.value ? 2 : 1,
    elevation: idDraggedItem.value ? 2 : 1,
  }))

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={animatedStyle} className="relative w-[22%]">

        <TouchableOpacity 
          activeOpacity={0.7}
          className=" rounded-xl aspect-square flex flex-col items-center justify-center bg-white dark:bg-darkColor-800"
        >
          <UrlImage source={props.unassignedProduct.product.image} resizeMode='contain'/>
        </TouchableOpacity>

        {/* Azioni Prodotto */}
        <View className="absolute bottom-0 right-0 rounded-tl-xl rounded-br-xl bg-primary-500 p-2" >
          <ThemedText font='Nunito-Italic' darkModeDisabled textStyle='text-white' label={String(props.unassignedProduct.quantity)} />
        </View>

      </Animated.View>
    </GestureDetector>
  )
}

export default AnimatedUnassignedProductDetail