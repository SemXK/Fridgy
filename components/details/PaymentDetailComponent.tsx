import { PaymentType } from '@/constants/interfaces/paymentInterface';
import { primaryColor } from '@/constants/theme';
import { PaymentController } from '@/controllers/PaymentControllers';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import PaymentTypeRadioCard from './PaymentTypeRadioCard';

const PaymentDetailComponent = () => {

  // * State
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // * lifecycle
  useEffect(() => {
    setLoading(true)
    PaymentController.getPaymentTypes()
    .then((pays) => {
      setPayments(pays as PaymentType[])
    })
    .catch(e => console.log(e))
    .finally(() => {
      setLoading(false);
    })
  }, []) 
  
  return (
    <View>
      { loading ?
        <View className="w-full h-full  flex flex-row justify-center ">
          <ActivityIndicator animating size={24} color={primaryColor[500]} />
        </View>
        : 
        <View className="px-4">
          <FlatList
            className="w-full h-4/5"
            data={payments}
            keyExtractor={item => String(item.id)}
            numColumns={1}
            contentContainerStyle={{
              paddingHorizontal: 12, 
              paddingBottom: 100,
              gap: 12,
            }}
            renderItem={({ item }) => (
              <PaymentTypeRadioCard 
                paymentType={item}
              />
            )}
          />
          <PrimaryButton
            onPress={() => {}}
            buttonText='Procedi con il pagamento'
          />

        </View>
      }

    </View>
  )
}

export default PaymentDetailComponent