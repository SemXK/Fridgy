import { UserContext } from '@/app/_layout';
import { AccessTypeEnum } from '@/constants/enums/accessType';
import { router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

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
      <Text>StoreLayout</Text>
    </View>
  )
}

export default StoreLayout
