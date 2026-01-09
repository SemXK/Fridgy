import { Fridge } from '@/constants/interfaces/productInterface';
import React from 'react';
import { Text, View } from 'react-native';

interface FMCInterface {
  fridge: Fridge;
}
const FridgeMiniCard = (props: FMCInterface) => {
  return (
    <View>
      <Text>FridgeMiniCard</Text>
    </View>
  )
}

export default FridgeMiniCard