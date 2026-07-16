import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import CartButton from '../pressable/CartButton';
import MenuButton from '../pressable/MenuButton';
import ThemedText from '../ui/ThemedText';

interface ProfilePageInterface {
  title?: string;
  headerClass?: string;
}

const ProfilePageHeader = (props: ProfilePageInterface) => {
  // * Context

  return (
  <View className={"flex flex-row justify-between items-center px-4 py-3 " + props.headerClass}>
      <View className="flex flex-row  items-center">
        <MenuButton iconColor='white'/>
        {props.title && 
          <ThemedText 
            label={props.title} 
            darkModeDisabled 
            font='Nunito-Bold'
            textStyle='text-3xl text-primary-500 '
          />
        }
      </View>
      <View className="flex flex-row">
        <TouchableOpacity
          onPress={() => console.log('pressed')}
          // onPressIn={handlePressIn}
          // onPressOut={handlePressOut}
        >
          <IconButton
            icon="account-settings"
            size={20}
            iconColor="white"
          />
        </TouchableOpacity>
        <CartButton iconColor='white'/>
      </View>
    </View>
  )
}

export default ProfilePageHeader