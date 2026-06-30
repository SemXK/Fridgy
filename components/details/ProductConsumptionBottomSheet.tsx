import { useFridge } from '@/app/(tabs)/(fridge-tab)/_layout';
import { Product } from '@/constants/interfaces/productInterface';
import { ProductController } from '@/controllers/ProductController';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ConsumeProductAnimated from '../animatedComponents/ConsumeProductAnimated';
import PrimaryButton from '../pressable/PrimaryButton';

interface ConsumingProduct {
  product: Product;
}


const ProductConsumptionBottomSheet = (props: ConsumingProduct) => {
  // £ Context
  const { fridgeLoading, getFridgeDetail } = useFridge()

  // * States
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentQuantityRecorder, setCurrentQuantityRecorder] = useState<number | string>(0);    //Current %, used for UI display
  const [prevQuantity, setPrevQuantity] = useState<number>(0);    //Previous %, used for the API payload
  
  // * Animated States
  const actionsOpacity = useSharedValue(1);

  // ? Gestures
  const animatedActionsOpacity = useAnimatedStyle(() => {
    return{
      opacity: actionsOpacity.value
    }
  })

  // $ Functions
  /**
   * Focuses on one of the items, while keeping in memory the quantity of it before any edits
   * @param index the array index of the pressed item
   */
  const onPressItem = (index: number) => {
    setSelectedIndex(index);
    // The consumed element is at 100%
    if(index < props.product.pivot.quantity) {
      setPrevQuantity(props.product.quantity)
    }
    // Thge consumed item was already consumed partially
    else {
      const consumeIndex = index - props.product.pivot.quantity
      setPrevQuantity(props.product.pivotConsumption?.[consumeIndex]?.quantity || 0)
    }
  };
  const handleConsumeProduct = async () => {
    // console.log({
    //   productId: props.product.id,
    //   fridgeId: props.product.pivot.fridgeId,
    //   quantity: currentQuantityRecorder,
    //   prevQuantity,
    // })
    await ProductController.consumeProduct({
      productId: props.product.id,
      fridgeId: props.product.pivot.fridgeId,
      quantity: currentQuantityRecorder as number,
      prevQuantity,
    }).then(() => {
      console.log("Saved")
      getFridgeDetail(String(props.product.pivot.fridgeId))
      setSelectedIndex(null)
    }).catch((e) => {
      console.log({e: e.message})
    })
  }

  // % Event Listeners
  useEffect(() => {
    actionsOpacity.value = withTiming(selectedIndex != null ? 1 : 0, {duration: 200})
  }, [selectedIndex])

  // 1! Display da fare con flastlist 
  return (
    
    <View className="flex flex-col p-4  h-[80%]">

      {/* Product Icons */}

      <View className="flex flex-row gap-4 flex-wrap items-center justify-center h-full">
        {/* Full Products */}
        {
          Array(props.product.pivot?.quantity)
          .fill({})
          .map((_, i) => {
            const isSelected = selectedIndex === i;
            const isHidden = selectedIndex !== null && !isSelected;

            if (!isHidden) {
              return (
                <ConsumeProductAnimated 
                  key={i} 
                  onTouch={() => {onPressItem(i)}}
                  isSelected={isSelected}
                  isHidden={isHidden}
                  product={props.product}
                  selectedIndex={selectedIndex}
                  setCurrentQuantityRecorder={setCurrentQuantityRecorder}
                />
              );
            }
            else {
            }
          })
        }

        {/* Cosnumed Products */}
        {
          props.product.pivotConsumption?.map((pivot, i) => {
            const index = i + props.product.pivot?.quantity 
            const isSelected = selectedIndex === index;
            const isHidden = selectedIndex !== null && !isSelected;
            if (!isHidden || pivot.quantity !== 0) {
              return (
                <ConsumeProductAnimated 
                  key={index} 
                  onTouch={() => {onPressItem(index)}}
                  isSelected={isSelected}
                  isHidden={isHidden}
                  product={props.product}
                  selectedIndex={selectedIndex}
                  quantityConsumed={pivot.quantity}
                  setCurrentQuantityRecorder={setCurrentQuantityRecorder}
                />
              );
            }
            else {
            }
          })
        }


      </View>

      {/* Actions for selected product */}
      <Animated.View 
        className="flex flex-row justify-between"
        style={animatedActionsOpacity}
        >
        <PrimaryButton 
          buttonText="Annulla"
          mode="outlined"
          onPress={() => setSelectedIndex(null)}
        />
        <PrimaryButton 
          buttonText="Consuma"
          onPress={handleConsumeProduct}
        />
      </Animated.View>
    </View>
  )
}

export default ProductConsumptionBottomSheet