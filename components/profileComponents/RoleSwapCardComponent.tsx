import { accessTypeArray } from '@/constants/arrays/accessTypeArray';
import { UserAccessType } from '@/constants/interfaces/usersInterface';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import ThemedText from '../ui/ThemedText';
import UrlImage from '../ui/UrlImage';

interface RoleSwapInterface {
  accessType: UserAccessType;
  onPress: (accessTypeId: number) => Promise<void>;
  disabled: boolean;
  currentActiveType: number;
}

const RoleSwapCardComponent = ({accessType, onPress, disabled, currentActiveType}: RoleSwapInterface) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7} 
      className={
        "aspect-square rounded-xl p-4 justify-start flex-1 gap-4 " +  
        "bg-stone-100 dark:bg-darkColor-900"
      }
      onPress={ () => onPress(accessType.id)}
      disabled={disabled}
    >
        <UrlImage
          source={accessTypeArray[accessType.id - 1]}
          width={100}
          height={100}
        />
      <ThemedText label={accessType.type } textStyle='text-center ' font="Nunito-ExtraBold" />
    </TouchableOpacity>
  )
}

export default RoleSwapCardComponent