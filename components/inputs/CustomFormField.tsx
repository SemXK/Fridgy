import { primaryColor } from '@/constants/theme';
import React from 'react';
import { Appearance, KeyboardTypeOptions, Text, TouchableOpacity, View } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';


interface CFF {
  value: string | number,
  setValue: (value: string) => void,
  label: string,
  secureTextEntry?: boolean,
  secureTextEntryChange?: (value: boolean) => void,
  mode?: "flat" | "outlined",
  className?: string,
  textWidth?: string,
  multiline?: boolean,
  keyboardType?: KeyboardTypeOptions
}

const ThemedFormField = ({ 
  value, 
  setValue, 
  label, 
  secureTextEntry = false, 
  secureTextEntryChange, 
  mode, 
  className, 
  textWidth, 
  multiline,
  keyboardType
}: CFF) => {
  return (
    <View className={"relative " + textWidth} >
      <TextInput
        label={<Text className="text-primary-500 ">{label}</Text>}
        value={value as string}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={setValue}
        mode={mode || 'outlined'}
        secureTextEntry={secureTextEntry}
        outlineColor={primaryColor[500]}
        activeOutlineColor={primaryColor[500]}
        placeholderTextColor={primaryColor[500]}
        textColor={Appearance.getColorScheme() === 'light' ? 'black' : 'white'}
        activeUnderlineColor={primaryColor[500]}
        outlineStyle={{ backgroundColor: 'transparent' }}
        className={className}
        style={{
          borderRadius: 10,
          backgroundColor: 'transparent',
        }}
        theme={{
          roundness: 10,
          colors: {
            background: Appearance.getColorScheme() === 'light' ? 'white' : 'black',
          },
        }}
      />
      {!!secureTextEntryChange &&
        <TouchableOpacity
          className="aspect-square w-12 absolute right-0 top-1/3"
          onPress={(e) => {
            e.stopPropagation()
            secureTextEntryChange(secureTextEntry)
          }}
        >
          <Icon
            source={secureTextEntry ? "eye" : "eye-off"}
            color={primaryColor[500]}
            size={24}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

export default ThemedFormField