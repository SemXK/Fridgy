import { productTypeToIcon } from '@/constants/enums/productTypeEnum';
import { Product } from '@/constants/interfaces/productInterface';
import { darkColor, primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import ThemedText from '../ui/ThemedText';

interface ConsumeProductInterface {
  onTouch: () => void,
  isSelected: boolean,
  isHidden: boolean,
  product: Product,
  selectedIndex: number | null,
  quantityConsumed?: number,
  setCurrentQuantityRecorder: React.Dispatch<React.SetStateAction<number | string>>,
}

const SelectedItemDimension = 256;
const UnselectedItemDimension = 98

const ConsumeProductAnimated = ({
  onTouch,
  isSelected,
  isHidden,
  product,
  selectedIndex,
  quantityConsumed,
  setCurrentQuantityRecorder,
}: ConsumeProductInterface) => {

  // * States
  const [productIcon, setProductIcon] = useState<React.ComponentProps<typeof MaterialCommunityIcons>['name']>('food')
  const [productQuantityRemained, setProductQuantityRemained] = useState<string | number>(quantityConsumed ? quantityConsumed : product.quantity);

  // * Animated States
  const fillPercentage = useSharedValue(quantityConsumed ? quantityConsumed * 100 / product.quantity  : 100);
  const isActive = useSharedValue(false);
  const startTime = useSharedValue(0);

  // £ Animation functions
  const pan = Gesture.Pan()
    .onBegin(() => {
      startTime.value = Date.now();
      isActive.value = false;
    })
    .onUpdate((e) => {
      const heldLongEnough = Date.now() - startTime.value > 200;
      if (!heldLongEnough) return;
      if (selectedIndex == null) return;
      const sensitivity = 0.35; 
      const verticalPos = e.translationY

      // Scroll Up
      if (verticalPos > 0) {
        fillPercentage.value =
          Math.max(0, 100 - e.translationY * sensitivity)
      }

      // Scroll Up
      else {
        fillPercentage.value =
          Math.min(100, 100 - e.translationY * sensitivity)
      }
      let newPercentage: string | number = fillPercentage.value * product.quantity / 100
      if(newPercentage < 1) {
        newPercentage = newPercentage.toFixed(2)
      }
      else {
        newPercentage = Math.floor(newPercentage)
      }
      scheduleOnRN(setProductQuantityRemained, newPercentage)
  });

  // % Events
  useEffect(() => {
    setProductIcon(productTypeToIcon(product.productTypes[0].type))
  }, [product.productTypes])

  useEffect(() => {
    setCurrentQuantityRecorder(productQuantityRemained);
  }, [productQuantityRemained, setCurrentQuantityRecorder])

  // ? Animations
  const animatedProductUsageStyle = useAnimatedStyle(() => {
    return {
      height: `${100 - fillPercentage.value}%`,
    };
  });

  return (
    <GestureDetector gesture={pan}>

      <View
        onTouchEnd={onTouch}
        style={[{
          opacity: isHidden ? 0 : 1,
          width: isSelected ? SelectedItemDimension : UnselectedItemDimension,
          height: isSelected ? SelectedItemDimension : UnselectedItemDimension,
          top: 0
        },
        ]}
      >
        {/* Background */}
        <MaterialCommunityIcons
          name={productIcon}
          size={isSelected ? SelectedItemDimension : UnselectedItemDimension}
          color={primaryColor[500]}
        />

        {/* Fill */}
        <Animated.View
          style={[{
            overflow: "hidden",
            position: "absolute",
            top: 0
          },
            animatedProductUsageStyle
          ]}
        >
          <MaterialCommunityIcons
            name={productIcon}
            size={isSelected ? SelectedItemDimension : UnselectedItemDimension}
            color={darkColor[800]}
          />
        </Animated.View>

        {/* Text */}
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: "50%",
          }}
        >
          <ThemedText
            label={`${productQuantityRemained} ${product.uma}`}
            textStyle="text-2xl"
          />
        </View>
      </View>
    </GestureDetector>

  )
}

export default ConsumeProductAnimated