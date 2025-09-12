import { getCurrentTheme } from '@/constants/theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';


interface CFF {
  value: string,
  setValue: (value: string) => void,
  label: string,
  secureTextEntry?: boolean,
  secureTextEntryChange?: (value:boolean) => void,
  mode?: "flat" | "outlined"
}

const CustomFormField = ({value, setValue, label, secureTextEntry = false, secureTextEntryChange, mode}:CFF) => {
  return (
    <View className="relative ">
      <TextInput
        label={label}
        value={value}
        onChangeText={v => setValue(v)}
        outlineColor="transparent"
        activeOutlineColor="transparent"
        mode={mode || 'outlined'}
        secureTextEntry={secureTextEntry}
        style={{
          padding: 0,
          shadowOpacity: 1,
          shadowColor: getCurrentTheme().shadowColor,
          elevation: 5,
          borderRadius: 50,
          backgroundColor: getCurrentTheme().primaryClearColor
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
            size={24}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

export default CustomFormField