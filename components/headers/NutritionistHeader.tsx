import React from 'react';
import { View } from 'react-native';
import MenuButton from '../pressable/MenuButton';
import NotificationButton from '../pressable/NotificationButton';
import NutritionistInviteButton from '../pressable/NutritionistCodeButton';
import ThemedText from '../ui/ThemedText';

interface NutritionistPageInterface {
  title?: string;
  headerClass?: string;
}

const NutritionistPageHeader = (props: NutritionistPageInterface) => {
  // * Context

  return (
  <View className={"flex flex-row justify-between items-center px-4 py-3 " + props.headerClass}>
      <View className="flex flex-row  items-center">
        <MenuButton/>
        {props.title && 
          <ThemedText 
            label={props.title} 
            darkModeDisabled 
            font='Nunito-Bold'
            textStyle='text-3xl text-primary-500 '
          />
        }
      </View>
      <View className="flex flex-row">
        <NotificationButton />
        <NutritionistInviteButton />
      </View>
    </View>
  )
}

export default NutritionistPageHeader