import React from 'react';
import { View } from 'react-native';
import LineGraph, { CWCInterface } from '../thirdParty/LineGraph';
import ThemedText from '../ui/ThemedText';



const CustomerWeightComponent = ({dataList, periodList}: CWCInterface) => {
  return (
    <View>
      <ThemedText
        label="Massa corporea"
        darkModeDisabled
        textStyle='text-primary-500 text-xl mb-4'
        font="Nunito-Bold"
      />
      <View className="w-full h-48 rounded-xl bg-stone-200 dark:bg-darkColor-800 items-center justify-center ">
  
        <LineGraph 
          horizontalData={periodList} 
          verticalData={dataList} 
          padding={24}
        />
      </View>
    </View>
  )
}

export default CustomerWeightComponent