import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import type { ComponentProps } from 'react'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'


type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const FoodIconList: MaterialCommunityIconName[] = [
  'food-apple',
  'food-croissant',
  'food-hot-dog',
  'food-takeout-box',
  'food-steak'
]

const LoadingDuringPayment = (props : {status: boolean}) => {
  // * Static States 
  const [currentFoodIcon, setCurrentFoodIcon] = useState<MaterialCommunityIconName>(FoodIconList[4])
  const [currentIconCart, setCurrentIconCart] = useState<MaterialCommunityIconName>('cart-outline')

  // * Hooks
  useEffect( () => {
    cartIconAnimationInit()
    foodIconAnimationInit()

  }, [])
  useEffect(() => {
    if(props.status) {
      swapCartIcons()
    }
  }, [props.status])


  // * Animation States
  const cartIconSize = useSharedValue(1)
  const foodIconPositionY = useSharedValue(-150)
  const foodIconSize = useSharedValue(1)

  // * Animation Functions
  const iconProductScale = useAnimatedStyle(() => {
    return {
      transform: [{scale: cartIconSize.value}],
    }
  })
  const iconProductPosition = useAnimatedStyle(() => {
    return {
      top: foodIconPositionY.value,
      transform: [{scale: foodIconSize.value}],
    }
  })

  // * Animation Setup Functions
  const cartIconAnimationInit = () => {
    cancelAnimation(cartIconSize);

    cartIconSize.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 100 }),
        withDelay(600, 
          withTiming(.6, { duration:100 })
        ),
      ),
      -1,
      true
    );
  }
  const foodIconAnimationInit = () => {
    //  1* Reset Anims
    cancelAnimation(foodIconPositionY);
    cancelAnimation(foodIconSize);

    // 1* Size Animation
    foodIconSize.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 200 }),
        withDelay(200, 
          withTiming(0, { duration: 400 })
        )
      ),
      -1,
      true
    );

    // 1* Position Animation
    foodIconPositionY.value = 
    withRepeat(
      withDelay(400, 
        withTiming(0, {duration: 400}, () => {
          scheduleOnRN(changeFoodIcon);
        }),
      ),
      -1,
    )
  }
  const changeFoodIcon = () => {
    const randIcon = Math.floor(Math.random() * FoodIconList.length);
    setCurrentFoodIcon(FoodIconList[randIcon]);
  };
  
  // * Functions
  const changeCartIcon = () => {
    setCurrentIconCart('cart-check');
  };
  const swapCartIcons = () => {
    // 1* Eliminate all animations
    cancelAnimation(foodIconPositionY);
    cancelAnimation(foodIconSize);
    foodIconSize.value = 0

    // 1* Change cart icon into a checked cart
    cartIconSize.value =       
      withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 400 }, () => {
          scheduleOnRN(changeCartIcon)
        }),
        withTiming(1, { duration: 200 }),
      )

      // 1* After animations, route to fridge list
      setTimeout(() => {
        router.navigate('/(tabs)/(fridge-tab)')
      }, 4000)
  }

  return (
    <View className="bg-primary-500 w-screen h-screen items-center justify-center">

      <View className=" flex flex-column relative items-center">

        {/* Food Icon */} 
        <Animated.View className="absolute" style={[iconProductPosition]}>
          <MaterialCommunityIcons name={currentFoodIcon} color='white' size={40}/>
        </Animated.View>

        {/* Cart Icon */}
        <Animated.View style={[iconProductScale]}>
          <MaterialCommunityIcons name={currentIconCart} color='white' size={80}/>
        </Animated.View>
      </View>
    </View>
  )
}

export default LoadingDuringPayment