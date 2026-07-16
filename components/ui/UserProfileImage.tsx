import { Guest, User } from '@/constants/interfaces/usersInterface';
import React from 'react';
import { View } from 'react-native';

interface UserProfileInterface {
  user?: User;
  guest?: Guest;
}

const UserProfileImage = ({user, guest}: UserProfileInterface) => {
  return (
    <View className="rounded-full aspect-square w-1/6 bg-darkColor-900">
      
    </View>
  )
}

export default UserProfileImage