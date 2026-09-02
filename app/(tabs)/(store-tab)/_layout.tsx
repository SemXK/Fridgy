import { UserContext } from '@/app/_layout';
import { AccessTypeEnum } from '@/constants/enums/accessType';
import { Store } from '@/constants/interfaces/store';
import { router, Stack } from 'expo-router';
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';


export const StoreContext = createContext<{
  storeDetail: Store | null;
  setStoreDetail: Dispatch<SetStateAction<Store | null>>
}>({} as any)

export const useFridge = () => useContext(StoreContext)

const StoreLayout = () => {
  // $ Context
  const { user } = useContext(UserContext);

  // * States
  const [storeDetail, setStoreDetail] = useState<Store | null>(null); // Tracks the current store across all store screens

  // % Effects
  useEffect(() =>{
    if(user?.accessType.id !== AccessTypeEnum.Produttore) {
      router.navigate('/(auth)')
    }
  }, [])

  // * Display
  return (
    <StoreContext.Provider value={{
      storeDetail, setStoreDetail
    }}>

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </StoreContext.Provider>

  )
}

export default StoreLayout
