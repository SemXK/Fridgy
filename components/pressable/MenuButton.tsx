import { primaryColor } from '@/constants/theme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

interface MenuButtonInterface {
  iconColor?: string;
}

const MenuButton = ({
  iconColor
}: MenuButtonInterface) => {
  return (
    <TouchableOpacity
      onPress={(e) => {}}
      activeOpacity={.1}
      >
      <IconButton
        icon="menu"
        size={20}
        iconColor={iconColor ?? primaryColor[500]}
      />
    </TouchableOpacity>
  )
}

export default MenuButton