import { Guest, User } from '@/constants/interfaces/usersInterface';
import React from 'react';
import { View } from 'react-native';
import UrlImage from './UrlImage';

interface UserProfileInterface {
  user?: User;
  guest?: Guest;
}

const UserProfileImage = ({user, guest}: UserProfileInterface) => {
  return (
    <View className="rounded-full aspect-square w-1/6 dark:bg-darkColor-900 bg-white">
        <UrlImage source={user?.profilePic|| ''} resizeMode='cover' className="flex-1 rounded-full aspect-square" />
    </View>
  )
}

export default UserProfileImage