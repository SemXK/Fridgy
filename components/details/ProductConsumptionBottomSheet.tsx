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

interface ConsumingProduct {
  product: Product;
}


const SelectedItemDimension = 256;
const UnselectedItemDimension = 98

const ProductConsumptionBottomSheet = (props: ConsumingProduct) => {

  // * States
  const [productIcon, setProductIcon] = useState<React.ComponentProps<typeof MaterialCommunityIcons>['name']>('food')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [percentage, setPercentage] = useState(100);

  // * Animated States
  const fillPercentage = useSharedValue(100);
  const isActive = useSharedValue(false);
  const startTime = useSharedValue(0);

  // ? Gestures
  const pan = Gesture.Pan()
    .onBegin(() => {
      startTime.value = Date.now();
      isActive.value = false;
    })
    .onUpdate((e) => {
      const heldLongEnough = Date.now() - startTime.value > 200;
      if (!heldLongEnough) return;

      const sensitivity = 0.35; // tune this
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
      scheduleOnRN(setPercentage, Math.round(fillPercentage.value - 10))
  });

  const animatedProductUsageStyle = useAnimatedStyle(() => {
    return {
      height: `${100 - fillPercentage.value}%`,
    };
  });



  // $ Functions
  const onPressItem = (index: number) => {
    // setSelectedIndex(prev => (prev === index ? null : index));
    setSelectedIndex(index);
  };

  // % Event Listeners
  useEffect(() => {
    setProductIcon(productTypeToIcon(props.product.productTypes[0].type))
  }, [props])

  // 1! Display da fare con flastlist (2026)
  return (
    <GestureDetector gesture={pan}>

      <View className="flex flex-row gap-4 flex-wrap p-4 items-center justify-center h-full">
        {Array(props.product.pivot?.quantity)
          .fill({})
          .map((_, i) => {
            const isSelected = selectedIndex === i;
            const isHidden = selectedIndex !== null && !isSelected;

            if (!isHidden) {
              return (
                <View
                  key={i}
                  onTouchEnd={() => {
                    onPressItem(i)
                  }}
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
                      label={`${percentage}%`}
                      textStyle="text-2xl"
                    />
                  </View>
                </View>
              );
            }
            else {
            }
          })}
      </View>

      
    </GestureDetector>

  )
}

export default ProductConsumptionBottomSheet