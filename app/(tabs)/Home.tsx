import ThemedText from '@/components/ui/ThemedText';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { UserContext } from '../_layout';

const HomePage = () => {

  // * Context
  const user = useContext(UserContext);

  // * lifecycle
  useEffect(() => {
  }, [])

  // * Display
  return (
    <View className="w-full h-screen p-4  flex gap-4 flex-row flex-wrap justify-between">
      {/* <MainImage /> */}
      <ThemedText textStyle='text-white' label={'Utente Corrente: ' + user?.email} />
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