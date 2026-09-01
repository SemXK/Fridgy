import { primaryColor } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import PrimaryIconButton from '../pressable/PrimaryIconButton';
import ThemedText from '../ui/ThemedText';

interface StoreDetailPageInterface {
  title?: string;
  headerClass?: string;
  mapsPress: () => void;
}

const StoreDetailHeader = (props: StoreDetailPageInterface) => {
  return (
    <View className={"flex flex-row justify-between items-center px-4 py-3 " + props.headerClass}>
      <View className="flex flex-row  items-center">
        <PrimaryIconButton 
          className='self-center'
          onPress={() => router.back()} 
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
        <PrimaryIconButton 
          className='self-center'
          onPress={props.mapsPress} 
          iconSpecs={{
            name: "map-marker",
            color: primaryColor[500],
            size: 32
          }}
        />
    </View>
  )
}

export default StoreDetailHeader