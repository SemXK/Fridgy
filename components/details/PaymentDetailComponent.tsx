import { PaymentType } from '@/constants/interfaces/paymentInterface';
import { primaryColor } from '@/constants/theme';
import { PaymentController } from '@/controllers/PaymentControllers';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import ThemedFormField from '../inputs/CustomFormField';
import PrimaryButton from '../pressable/PrimaryButton';
import PaymentTypeRadioCard from './PaymentTypeRadioCard';

const PaymentDetailComponent = () => {

  // * State
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [userName, setUserName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [savePayment, setSavePayment] = useState<boolean>(false)

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
    <View className="w-screen">
      { loading ?
        <View className="w-screen h-full  flex flex-row justify-center ">
          <ActivityIndicator animating size={24} color={primaryColor[500]} />
        </View>
        : 
        <View className="w-full px-4 flex gap-4">
          {/* Lista pagamenti disponibili */}
          <FlatList
            className="w-full"
            data={payments}
            keyExtractor={item => String(item.id)}
            numColumns={4}
            contentContainerStyle={{
              paddingHorizontal: 12, 
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
            renderItem={({ item }) => (
              <PaymentTypeRadioCard 
                paymentType={item}
              />
            )}
          />

          {/* Form Pagamento */}
          <View className="px-4  flex gap-4">

            <ThemedFormField
              value={userName}
              setValue={setUserName}
              label="Intestatario"
            />

            <ThemedFormField
              value={cardNumber}
              setValue={setCardNumber}
              label="Numero Carta"
            />

            <View className="flex flex-row justify-between ">

              <ThemedFormField
                value={expiry}
                setValue={setExpiry}
                label="Scadenza"
              />

              <ThemedFormField
                value={cvc}
                setValue={setCvc}
                label="CVC"
              />
            </View>

            {/* Tasto pagamento */}
            <PrimaryButton
              onPress={() => {}}
              buttonText='Procedi con il pagamento'
            />
          </View>

        </View>
      }

    </View>
  )
}

export default PaymentDetailComponent