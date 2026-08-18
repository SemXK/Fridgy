import React from 'react';
import { View } from 'react-native';
import MenuButton from '../pressable/MenuButton';
import NotificationButton from '../pressable/NotificationButton';
import ThemedText from '../ui/ThemedText';
interface ProducerHeaderInterface {
  title?: string;
  headerClass?: string;
}
const ProducerHeader = (props: ProducerHeaderInterface) => {
  return (
  <View className={"flex flex-row justify-between items-center px-4 py-3 " + props.headerClass}>
      <View className="flex flex-row  items-center">
        <MenuButton />
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
      </View>
    </View>
  )
}

export default ProducerHeader