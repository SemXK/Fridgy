import { OauthContext } from '@/app/_layout';
import { primaryColor } from '@/constants/theme';
import React, { useContext, useEffect, useRef } from 'react';
import {
  Appearance,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

interface TGI {
  value: string | number;
  setValue: (value: string) => void;
  label: string;
  multiline?: boolean;
  outputPoint: (lat: number, lng: number) => void
}

const ThemedGeolocationInput = ({
  value,
  setValue,
  label,
  multiline,
  outputPoint
}: TGI) => {

  const oauthContext = useContext(OauthContext) as { webAutocompleteKey?: string } | null;
  const webAutocompleteKey = oauthContext?.webAutocompleteKey ?? '';

  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const isDark = Appearance.getColorScheme() === 'dark';
  const textColor = isDark ? 'white' : 'black';
  const backgroundColor = isDark ? 'black' : 'white';

  useEffect(() => { 
    placesRef.current?.setAddressText(String(value ?? ''));
  }, [value]);

  return (
    <View className="relative w-full">
      {/* Floating label */}
      <View
        pointerEvents="none"
        style={[
          styles.labelContainer,
          {
            backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            {
              color: primaryColor[500],
            },
          ]}
        >
          {label}
        </Text>
      </View>

      <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder=""
        textInputProps={{
          value: String(value ?? ''),
          onChangeText: setValue,
          multiline,
          placeholderTextColor: primaryColor[500],
        }}
        fetchDetails
        debounce={400}
        onPress={(data, details) => {
          setValue(data.description);
          outputPoint(details?.geometry?.location?.lat as number, details?.geometry?.location?.lng as number)
        }}
        query={{
          key: webAutocompleteKey,
          language: 'en',
        }}
        styles={{
          container: {
            width: '100%',
            flex: 0,
          },

          textInputContainer: {
            width: '100%',
            padding: 0,
            backgroundColor: 'transparent',
          },

          textInput: {
            width: '100%',
            height: 56,
            paddingHorizontal: 15,
            paddingTop: 4,
            paddingBottom: 4,

            borderWidth: 1,
            borderColor: primaryColor[500],
            borderRadius: 10,

            fontSize: 16,
            color: textColor,
            backgroundColor: 'transparent',
          },

          listView: {
            width: '100%',
            backgroundColor,
            borderColor: primaryColor[500],
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 10,
            marginTop: 4,
          },

          row: {
            backgroundColor,
            paddingVertical: 12,
            paddingHorizontal: 15,
          },

          description: {
            color: textColor,
          },

          separator: {
            backgroundColor: isDark ? '#333' : '#e5e5e5',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },

  textInputContainer: {
    padding: 0,
    backgroundColor: 'transparent',
  },

  input: {
    height: 56,
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom: 4,

    borderWidth: 1,
    borderColor: primaryColor[500],
    borderRadius: 10,

    fontSize: 16,
  },

  labelContainer: {
    position: 'absolute',
    zIndex: 10,

    left: 12,
    top: -8,

    paddingHorizontal: 5,
  },

  label: {
    fontSize: 12,
  },
});

export default ThemedGeolocationInput;
