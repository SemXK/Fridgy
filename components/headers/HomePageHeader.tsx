import { UserContext } from '@/app/_layout';
import { AuthType } from '@/constants/interfaces/usersInterface';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import CartButton from '../pressable/CartButton';
import MenuButton from '../pressable/MenuButton';
import NotificationButton from '../pressable/NotificationButton';
import ThemedText from '../ui/ThemedText';

const HomePageHeader = () => {
  // * Context
  const {user, guest} = useContext<AuthType>(UserContext)  // Può essere User o Guest
  useEffect(() => {
    console.log({user})
  }, [])
  return (
    <View className="flex flex-row justify-between p-4">
      <View className="flex flex-row items-center"> 
        <MenuButton />
        <ThemedText textStyle='text-primary-500' label={user ? user.name : guest?.guestId}/>
      </View>

      <View className="flex flex-row">
        <NotificationButton />
        <CartButton />
      </View>
    </View>
  )
}

export default HomePageHeader