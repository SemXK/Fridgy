import { primaryColor } from '@/constants/theme';
import React from 'react';
import { View } from 'react-native';
import PrimaryIconButton from '../pressable/PrimaryIconButton';
import ThemedText from '../ui/ThemedText';

interface StoreDetailPageInterface {
  title?: string;
  headerClass?: string;
}

const StoreDetailHeader = (props: StoreDetailPageInterface) => {
  return (
    <View className={"flex flex-row justify-between items-center px-4 py-3 " + props.headerClass}>
      <View className="flex flex-row  items-center">
        <PrimaryIconButton 
          className='self-center'
          onPress={() => {}} 
          iconSpecs={{
            name: "chevron-left",
            color: primaryColor[500],
            size: 32
          }}
        />
        {props.title && 
          <ThemedText 
            label={props.title} 
            darkModeDisabled 
            font='Nunito-Bold'
            textStyle='text-3xl text-primary-500 '
          />
        }
      </View>
      {/* <View className="flex flex-row">
        <NotificationButton />
      </View> */}
    </View>
  )
}

export default StoreDetailHeader