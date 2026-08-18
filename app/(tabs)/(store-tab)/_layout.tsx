import { UserContext } from '@/app/_layout';
import { AccessTypeEnum } from '@/constants/enums/accessType';
import { router, Slot } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

const StoreLayout = () => {
  // $ Context
  const { user } = useContext(UserContext);

  // * Effects
  useEffect(() =>{
    if(user?.accessType.id !== AccessTypeEnum.Produttore) {
      router.navigate('/(auth)')
    }
  }, [])
  return (
    <View>
      <Slot />
    </View>
  )
}

export default StoreLayout
