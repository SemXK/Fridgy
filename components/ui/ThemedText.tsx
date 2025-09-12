import React from 'react';
import { Text } from 'react-native';

const ThemedText = ({label, textStyle}:any) => {

  return (
    <Text
      style={{fontFamily: 'Nunito'}}
      className={"text-black dark:text-white " + textStyle}>
      {label}
    </Text>
  )
}

export default ThemedText