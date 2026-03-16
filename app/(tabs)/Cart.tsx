import AssignProductToFridgeDetail from '@/components/details/AssignProductToFridgeDetail'
import CartTotalView from '@/components/details/CartTotalView'
import ProductCartItem from '@/components/details/ProductCartItem'
import CartPageHeader from '@/components/headers/CartPageHeader'
import BottomSheetComponent from '@/components/ui/BottomSheet'
import LoadingDuringPayment from '@/components/ui/LoadingDuringPayment'
import TopSnackbar from '@/components/ui/SnackbacComponent'
import ThemedText from '@/components/ui/ThemedText'
import { SnackbarStatus } from '@/constants/enums/common'
import { StripeWebhookResponses } from '@/constants/enums/stripePayment'
import { PaymentContextInterface } from '@/constants/interfaces/paymentInterface'
import { CartContextInterface } from '@/constants/interfaces/productInterface'
import { StripeController } from '@/controllers/StripeController'
import { useFocusEffect } from '@react-navigation/native'
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext, PaymentWebsocketContext } from '../_layout'

const CartComponent = () => {
  // * Context
  const { cart, setCart } = useContext(CartContext) as CartContextInterface;
  const { paymentChannel } = useContext(PaymentWebsocketContext) as PaymentContextInterface;

  // * States
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [isDisplayingProducts, setIsDisplayingProducts] = useState<boolean>(false);
  const [showPaymentLoading, setShowPaymentLoading] = useState<boolean>(false)
  const [paymentSuccessfull, setPaymentSuccessful] = useState<boolean>(false)

  // * Hooks
  useEffect(() => {
    // % Websocket for paymnet statuses
    (paymentChannel as any)?.listen(
      '.PaymentCompletion',
      (e: {message: StripeWebhookResponses}) => {
        console.log(e)
        switch(e.message) {
          case StripeWebhookResponses.ChargeSucceeded:
            setShowPaymentLoading(true)
            return

          case StripeWebhookResponses.ChargeUpdated:
            setPaymentSuccessful(true)
            setCart([]) 
            return
        }
        return
      }
    )

    calculateCartPrice()
  }, [cart])
  useFocusEffect(
    useCallback(() => {
      setShowPaymentLoading(false);
      setPaymentSuccessful(false);
    }, [])
  );

  // * Functions
  const calculateCartPrice = () => {
    let total = 0;
    if(cart) {
      cart.forEach((ci) => {
        total += ci.quantity * ci.product?.price
      });
      setCartTotal(total);
    }
  }
  const stripeSheetInit = async () => {
    setLoading(true);
    try {
      // * Crea PaymentIntent lato backend
      const res: any = await StripeController.createPaymentIntent(cartTotal * 100, 'eur');
      const { clientSecret } = res;
      if (!clientSecret) {
        setSnackbarMessage('Pagamenti Momentaneamente non disponibili');
        return;
      }

      // * Inizializza PaymentSheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'SORDI',
        allowsDelayedPaymentMethods: false,
        style: 'automatic',
        returnURL: process.env.EXPO_PUBLIC_REDIRECT_TO_CART

      });

      if (initError) {
        setSnackbarMessage(initError.message);
        return;
      }

      // * Mostra PaymentSheet
      const ans = await presentPaymentSheet();
      if (ans.error) {
        // utente chiude sheet
        if (ans.error.code === 'Canceled') {
          setSnackbarMessage('Hai annullato il pagamento');
        }
        return;
      }

      // * Pagamento con successo
    } 
    catch (err: any) {
      setSnackbarMessage('Qualcosa è andato storto');
    } 
    finally {
      setLoading(false);
    }
  }
  const assignProductsToFridge = async() => {
    // ? TODO: Assengazione dei prodotti appena acquistati in uno dei frigoriferi
  }

  // * Display
  return (
    <>
    {
      !showPaymentLoading ?
      <>
            {/* Snackbar */}
        <TopSnackbar
          visible={!!snackbarMessage}
          message={snackbarMessage}
          onHide={() => setSnackbarMessage('')}
          status={SnackbarStatus.Warning}
        />

        {/* Cart component */}
        <SafeAreaView>

          {/* Header */}
          <View className="w-full " >
            <CartPageHeader />
          </View>

          {/* Lista */}
          <FlatList
            className="w-full h-4/5"
            data={cart}
            keyExtractor={item => String(item.productId)}
            numColumns={1}
            ListEmptyComponent={
            <View className="w-full h-full flex flex-row justify-center ">
              <ThemedText 
                darkModeDisabled 
                font='Nunito-Italic'
                textStyle='text-stone-400' 
                label="Il tuo carrello è vuoto" 
              />
            </View>
            }
            contentContainerStyle={{
              paddingHorizontal: 12, // padding on left/right of whole list
              paddingBottom: 100,
              gap: 12
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 6, // half of the gap, so two items sum to 12px
                  borderRadius: 40,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              >
                <ProductCartItem cartItem={item} />
              </View>
            )}
          />

          {/* Tasto acquista */}
          {
            cartTotal ?
              <View className="h-1/5 border-t-2 border-darkColor-800">
                {
                  !loading ?
                  <CartTotalView 
                    total={cartTotal || 0} 
                    onPress={stripeSheetInit}
                  />
                  :
                  <ActivityIndicator size="large"  />
                }
              </View>
            : 
            null
          }

        {/* Assegnazione prodotti post acquisto */}
        {
          isDisplayingProducts && 
          <BottomSheetComponent
            height={0.8}
            onClose={assignProductsToFridge}
            ShownComponent={AssignProductToFridgeDetail}
          />
        }

        </SafeAreaView>
      </>
      :
      <LoadingDuringPayment status={paymentSuccessfull}/>
    }

    </>

  )
}

export default CartComponent