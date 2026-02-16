import React from 'react';
import { View } from 'react-native';
import BackButton from '../pressable/BackButton';
import NotificationButton from '../pressable/NotificationButton';

const CartPageHeader = () => {
  // * Context

  return (
    <View className="flex flex-row justify-between ">
      <View className="flex flex-row gap-0 items-center justify-start">
        <View className="flex flex-row gap-0 items-center justify-start">
          <BackButton />
          {/* <MenuButton /> */}
        </View>
        {/* <ThemedText
          darkModeDisabled
          label="Il mio carrello"
          font="Nunito-ExtraBold"
          textStyle='text-xl text-primary-500'
        /> */}
      </View>

      <View className="flex flex-row">
        <NotificationButton />
      </View>
    </View>
  )
}

export default CartPageHeader