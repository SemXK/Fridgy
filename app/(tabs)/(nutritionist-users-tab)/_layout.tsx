import { UserContext } from '@/app/_layout';
import HomePageHeader from '@/components/headers/HomePageHeader';
import { getEcho } from '@/scripts/LaravelEcho';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NutritionistLayout = () => {
  // % Context
  const { user } =  useContext(UserContext)
  
  // * State
  const [ws, setWs] = useState<any>(null);

  // £ Functions
  const setupWebSocket = async () => {
    console.log('Wss nutr Init:');
    const echo = await getEcho() as any;
    const channel = echo.channel('nutritionist-channel')

    setWs(channel)
    channel
    .listen(`.NutritionistLinkAccept`, (res: any) => {
      console.log("Websocket nutritionist", res)
    })
    // setWs(echo.listen(`nutritionist-chanel-${user?.id}`))
  }

  // $ Effects
  useEffect(() => {
    if(!user) {
      router.navigate('/(auth)/sign-in')
    }
    setupWebSocket()

    return () => {
      ws?.stopListening('nutritionist-channel');
      setWs(null)
    };

  }, [])

  return (
    <SafeAreaView>
      
      {/* * Auth Header */}
      <HomePageHeader />

      <Text>NutritionistLayout</Text>
    </SafeAreaView>
  )
}

export default NutritionistLayout