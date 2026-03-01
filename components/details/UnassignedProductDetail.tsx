import { UnassignedProduct } from '@/constants/interfaces/productInterface'
import * as Haptics from 'expo-haptics'
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
  onDragOverFridge?: (fridgeId: number) => void // Callback for when dragging over a fridge
  onDropOnFridge?: (productId: number, fridgeId: number) => void,
  fridgePositions?: any,
  onDragStart?: any,
  onDragPosition?: any,
}

const UnassignedProductDetail = (props: UPD) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const isDragging = useSharedValue(false)
  const contextX = useSharedValue(0)
  const contextY = useSharedValue(0)

  // Function to check if current position is over any fridge
  const checkDragOverFridges = (x: number, y: number) => {
    'worklet'
    // This will be called from the UI thread, but we need to find fridge elements
    // We'll use scheduleOnRN to call a function that checks DOM/frame positions
    if (props.onDragOverFridge) {
      console.log({x, y})
    }
  }

  // Wrap haptic in scheduleOnRN since it can't be called from UI thread
  const triggerHaptic = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
  }

  // Long press gesture with haptic feedback
  const longPressGesture = Gesture.LongPress()
    .minDuration(300) // 500ms long press
    .onStart(() => {
      scheduleOnRN(triggerHaptic)
      isDragging.value = true
    })
    .onEnd(() => {
      isDragging.value = false
    })

  // Drag gesture
  const dragGesture = Gesture.Pan()
    .onStart(() => {
      console.log("pan start ")
      contextX.value = translateX.value
      contextY.value = translateY.value
    })
    .onUpdate((event) => {
      if (isDragging.value || true) {
        translateX.value = contextX.value + event.translationX
        translateY.value = contextY.value + event.translationY
        
        // Check if we're dragging over any fridge
        if (props.onDragOverFridge) {
          const absoluteX = event.absoluteX
          const absoluteY = event.absoluteY
          checkDragOverFridges(absoluteX, absoluteY)
        }
      }
    })
    .onEnd(() => {
      if (isDragging.value) {
        // Return to original position with spring animation
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        })
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        })
        isDragging.value = false
      }
    })

  // Use Sequence instead of Race for better control
  const composedGesture = Gesture.Race(longPressGesture, dragGesture)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    zIndex: isDragging.value ? 9999 : 1,
    elevation: isDragging.value ? 20 : 1,
    // Don't use absolute positioning as it breaks the layout
  }))

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={animatedStyle} className="relative w-[20%]">

        <TouchableOpacity 
          activeOpacity={0.7}
          className=" rounded-xl aspect-square flex flex-col items-center justify-center bg-darkColor-800"
        >
          
          <UrlImage source={props.unassignedProduct.product.image} resizeMode='contain'/>
        </TouchableOpacity>

        {/* Azioni Prodotto */}
        <View className="absolute bottom-0 right-0 rounded-tl-2xl rounded-br-2xl bg-primary-500 p-2" >
          <ThemedText font='Nunito-Italic' label={String(props.unassignedProduct.quantity)} />
        </View>

      </Animated.View>
    </GestureDetector>
  )
}

export default UnassignedProductDetail