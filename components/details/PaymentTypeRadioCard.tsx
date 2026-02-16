import { PaymentType } from '@/constants/interfaces/paymentInterface'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import UrlImage from '../ui/UrlImage'

interface PaymentRadioInterface {
  paymentType: PaymentType
}

const PaymentTypeRadioCard = (props: PaymentRadioInterface) => {
  return (
    <TouchableOpacity className="flex flex-row gap-4 h-20 border-2 border-stone-500/10 rounded-lg p-2 mx-3">
      <UrlImage 
        className="aspect-square h-full self-center"
        width={50}
        height={50}
        resizeMode='contain'
        source={props.paymentType.logo}
      />
      {/* Titolo è+ iban */}
      {/* <View className="flex flex-col gap-1 items-start">
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
      </View> */}
    </TouchableOpacity>
  )
}

export default PaymentTypeRadioCard