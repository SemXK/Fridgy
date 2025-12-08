import { PaymentType } from '@/constants/interfaces/paymentInterface'
import React from 'react'
import { View } from 'react-native'
import ThemedText from '../ui/ThemedText'
import UrlImage from '../ui/UrlImage'

interface PaymentRadioInterface {
  paymentType: PaymentType
}

const PaymentTypeRadioCard = (props: PaymentRadioInterface) => {
  return (
    <View className="flex flex-row gap-4 h-16 border-2 border-stone-500 rounded-lg p-2">
      <UrlImage 
        className="aspect-square h-full self-center"
        width={80}
        height={80}
        resizeMode='contain'
        source={props.paymentType.logo}
      />
      <View className="flex flex-col gap-1 items-start">
        <ThemedText
          label={props.paymentType.name}
          font='Nunito-Bold'
          textStyle='text-2xl'
        />        
        <ThemedText
          darkModeDisabled
          label={props.paymentType.iban}
          textStyle='text-stone-400 text-sm'
        />
      </View>
    </View>
  )
}

export default PaymentTypeRadioCard