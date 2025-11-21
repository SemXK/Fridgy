import CustomSnackbar from '@/components/ui/CustomSnackbar';
import ThemedText from '@/components/ui/ThemedText';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { UserContext } from '../_layout';

const HomePage = () => {

  // * Context
  const user = useContext(UserContext);

  // * State
  const [showSnackbar, setShowSnackbar] = useState<string>("");

  // * lifecycle
  useEffect(() => {
  }, [])

  const handleTouch = ( ) => {
    setShowSnackbar("Messaggio")
  }

  // * Display
  return (
    <View onTouchEnd={() => handleTouch()} className="w-full h-screen p-4  flex gap-4 flex-row flex-wrap justify-between">
      {/* <MainImage /> */}
      <CustomSnackbar
        visible={!!showSnackbar} 
        message={showSnackbar} 
        duration={4000} 
        onDismiss={() => setShowSnackbar("")} 
      />
      <ThemedText  textStyle='text-white mt-20' label={'Utente Corrente: ' + user?.email} />
      {/* {productList.map(product =>
        <ProductMiniCard
          onPress={() => handlePress(product)}
          key={product.id}
          product={product}
        />
      )} */}
    </View>
  )
}

export default HomePage 