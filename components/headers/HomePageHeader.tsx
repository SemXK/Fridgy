import React from 'react';
import { View } from 'react-native';
import CartButton from '../pressable/CartButton';
import MenuButton from '../pressable/MenuButton';
import NotificationButton from '../pressable/NotificationButton';
import ThemedText from '../ui/ThemedText';

interface HomePageInterface {
  title?: string;
}

const HomePageHeader = (props: HomePageInterface) => {
  // * Context

  return (
    <View className="flex flex-row justify-between items-center h-8">
      <View className="flex flex-row  items-center">
        <MenuButton/>
        {props.title && 
          <ThemedText 
            label={props.title} 
            darkModeDisabled 
            font="Nunito-ExtraBold"
            textStyle='text-3xl text-primary-500 '
          />
        }
      </View>
      <View className="flex flex-row">
        <NotificationButton />
        <CartButton />
      </View>
    </View>
  )
}

export default HomePageHeader