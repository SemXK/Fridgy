import { UserContext } from '@/app/_layout';
import { AccessTypeEnum } from '@/constants/enums/accessType';
import { router, Stack } from 'expo-router';
import React, { useContext, useEffect } from 'react';

const NutritionistLayout = () => {
  const { user } =  useContext(UserContext)
  
  useEffect(() => {
    if(user?.accessTypeId !== AccessTypeEnum.Nutrizionista) {
      router.navigate('/(tabs)')
    }
  }, [])

  return (
    < >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
    </>
  )
}

export default NutritionistLayout