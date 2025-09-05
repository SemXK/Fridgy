import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';


interface CFF {
  value: string,
  setValue: (value: string) => void,
  label: string,
  secureTextEntry?: boolean,
  secureTextEntryChange?: (value:boolean) => void
}

const CustomFormField = ({value, setValue, label, secureTextEntry = false, secureTextEntryChange}:CFF) => {
  return (
    <View className="relative "
      style={Platform.OS === 'android' ? {elevation: 5, shadowColor: "#878787"} : ""}
    >
      <TextInput
        label={label}
        value={value}
        onChangeText={v => setValue(v)}
        mode='outlined'
        secureTextEntry={secureTextEntry}
        style={{
          backgroundColor:"transparent",
          padding: 0
        }}

      />
      {!!secureTextEntryChange && 
        <TouchableOpacity 
          className="aspect-square w-12 absolute right-0 top-1/3"
          onPress={(e) => {
            e.stopPropagation()
            secureTextEntryChange(!secureTextEntry)
          }}
        >
          <Icon
            source={secureTextEntry ? "eye" : "eye-off"}
            size={24}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

export default CustomFormField