import { primaryColor } from '@/constants/theme';
import React from 'react';
import { Appearance, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CFFTextArea {
  value: string;
  setValue: (value: string) => void;
  label: string;
  mode?: 'flat' | 'outlined';
  className?: string;
  textWidth?: string;
  numberOfLines?: number;
}

const ThemedTextArea = ({
  value,
  setValue,
  label,
  mode,
  className,
  textWidth,
  numberOfLines = 4,
}: CFFTextArea) => {
  return (
    <View className={'relative ' + (textWidth || '')}>
      <TextInput
        label={<Text className="text-primary-500">{label}</Text>}
        value={value}
        onChangeText={setValue}
        mode={mode || 'outlined'}
        multiline
        numberOfLines={numberOfLines}
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
          minHeight: numberOfLines * 24,
        }}
        contentStyle={{
          textAlignVertical: 'top', // important for Android
        }}
        theme={{
          roundness: 10,
          colors: {
            background:
              Appearance.getColorScheme() === 'light' ? 'white' : 'black',
          },
        }}
      />
    </View>
  );
};

export default ThemedTextArea;
