import { primaryColor } from '@/constants/theme';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';


interface CFF {
  value: string,
  setValue: (value: string) => void,
  label: string,
  secureTextEntry?: boolean,
  secureTextEntryChange?: (value: boolean) => void,
  mode?: "flat" | "outlined"
}

const ThemedFormField = ({ value, setValue, label, secureTextEntry = false, secureTextEntryChange, mode }: CFF) => {
  return (
    <View className="relative ">
      <TextInput
        label={<Text className="text-primary-500">{label}</Text>}
        value={value}
        onChangeText={setValue}
        mode={mode || 'outlined'}
        secureTextEntry={secureTextEntry}
        outlineColor={primaryColor[500]}
        activeOutlineColor={primaryColor[500]}
        placeholderTextColor={primaryColor[500]}
        textColor="white"
        activeUnderlineColor={primaryColor[500]}
        style={{
          borderRadius: 100,
          backgroundColor: 'transparent'
        }}
        theme={{
          roundness: 100,
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

export default ThemedFormField