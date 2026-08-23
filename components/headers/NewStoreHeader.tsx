import React from 'react';
import { View } from 'react-native';
import BackButton from '../pressable/BackButton';
import ThemedText from '../ui/ThemedText';
interface NewStoreInterface {
  title?: string;
  headerClass?: string;
}
const NewStoreHeader = (props: NewStoreInterface) => {
  return (
  <View className={"flex flex-row justify-between items-center py-4 " + props.headerClass}>
      <View className="flex flex-row  items-center">
        <BackButton />
        {props.title && 
          <ThemedText 
            label={props.title} 
            darkModeDisabled 
            font='Nunito-Bold'
            textStyle='text-3xl text-primary-500 '
          />
        }
      </View>
    </View>
  )
}

export default NewStoreHeader