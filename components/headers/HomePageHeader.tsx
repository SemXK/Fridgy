import React from 'react';
import { View } from 'react-native';
import CartButton from '../pressable/CartButton';
import MenuButton from '../pressable/MenuButton';
import NotificationButton from '../pressable/NotificationButton';

const HomePageHeader = () => {
  // * Context

  return (
    <View className="flex flex-row justify-between p-4">
      <MenuButton />
      <View className="flex flex-row">
        <NotificationButton />
      <CartButton />
      </View>
    </View>
  )
}

export default HomePageHeader