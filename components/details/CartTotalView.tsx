import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';


interface CartTotalInterface {
  total: number;
  onPress: () => void;
}

const CartTotalView = (props: CartTotalInterface) => {

  return (
    <View  className="flex flex-row justify-between items-center p-8">

      {/* Totale */}
      <View className="flex flex-col items-end gap-2">
        <ThemedText label="Totale" font='Nunito-ExtraLight' textStyle='text-2xl' />
        <ThemedText 
          label={props.total.toLocaleString("de-DE", { style: "currency", currency: "EUR" })} 
          font='Nunito-Bold' 
          textStyle='text-4xl'
          />

      </View>

      {/* Button */}
      <PrimaryButton
        buttonText="Ordina ora"
        onPress={props.onPress}
      />


    </View>
  )

}

export default CartTotalView