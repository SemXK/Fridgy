import { CartContext } from '@/app/_layout'
import { CartContextInterface } from '@/constants/interfaces/productInterface'
import { primaryColor } from '@/constants/theme'
import { router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ThemedText from '../ui/ThemedText'

const CartButton = () => {
  // * Context
  const { cart } = useContext(CartContext) as CartContextInterface;

  // * States
  const [cartCount, setCartCount] = useState<number>(0);

  // * lifecycle
  useEffect(() => {
    let count = 0;
    cart.forEach(c => count += c.quantity);
    setCartCount(count);
  }, [cart])

  // * Functions
  const handlePress = () => {
    router.navigate('/(tabs)/Cart');
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={.1}
      className="relative"
      >
      <IconButton
        icon="shopping"
        size={20}
        iconColor={primaryColor[500]}
      />
        {
          cartCount  ? 
          <View className="absolute bottom-2 right-2 aspect-square w-4 h-4 rounded-full bg-primary-500" >
            <ThemedText label={String(cartCount)} textStyle='text-xs text-center' />
          </View>
          :
          null
        }
    </TouchableOpacity>
  )
}

export default CartButton