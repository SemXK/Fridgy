import { primaryColor } from '@/constants/theme';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React from 'react';
import { Appearance } from 'react-native';

interface CFS {
  value: number | string;
  setValue: (value: string | number) => void;
  label: string;
  options?: string[];
  className?: string;
  textWidth?: string;
}

const ThemedSelectField = ({ value, setValue, label, options = [], className, textWidth }: CFS) => {
return (
<SegmentedControl
  values={options}
  selectedIndex={value as number}
  onChange={(event) => {
    setValue(event.nativeEvent.selectedSegmentIndex)
  }}
  tintColor={primaryColor[500]} // active segment color
  backgroundColor="transparent"
  style={{
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: primaryColor[500],
    backgroundColor: 'transparent',
  }}
  fontStyle={{
    color: Appearance.getColorScheme() !== 'dark' ? 'black' : 'white',
  }}
  activeFontStyle={{
    color: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
    fontWeight: '600',
  }}
/>
);
};

export default ThemedSelectField;
