import { User } from '@/constants/interfaces/usersInterface';
import React from 'react';
import { Text, View } from 'react-native';

interface CCCInterface {
  customer: User;
}

const CustomerCardComponent = ({customer}: CCCInterface) => {
  return (
    <View>
      <Text>CustomerCardComponent</Text>
    </View>
  )
}

export default CustomerCardComponent