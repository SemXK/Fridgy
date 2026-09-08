import { UserContext } from '@/app/_layout';
import { getEcho } from '@/scripts/LaravelEcho';
import { router, Stack } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';

const NutritionistLayout = () => {
  // % Context
  const { user } =  useContext(UserContext)
  
  // * State
  const [nutritionistWebSocket, setWs] = useState<any>(null);

  // £ Functions
  const setupWebSocket = async () => {
    console.log('Wss nutr Init:');
    const echo = await getEcho() as any;
    const channel = echo.channel(`nutritionist-channel-${user?.id}`)

    setWs(channel)
    channel.listen(`.NutritionistLinkAccept`, () => {
      
    })
  }

  // $ Effects
  useEffect(() => {
    if(!user) {
      router.navigate('/(auth)/sign-in')
    }
    setupWebSocket()

    return () => {
      nutritionistWebSocket?.stopListening(`nutritionist-channel-${user?.id}`);
      setWs(null)
    };

  }, [])

  return (
    <>
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