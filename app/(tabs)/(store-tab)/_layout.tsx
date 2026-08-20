import { UserContext } from '@/app/_layout';
import { AccessTypeEnum } from '@/constants/enums/accessType';
import { router, Stack } from 'expo-router';
import React, { useContext, useEffect } from 'react';

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
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  )
}

export default StoreLayout
