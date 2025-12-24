import { primaryColor } from '@/constants/theme';
import { CardField } from '@stripe/stripe-react-native';
import React from 'react';
import { Appearance, View } from 'react-native';

const StripeCardInput = () => {
  const isDark = Appearance.getColorScheme() === 'dark';
  const stripeColors = {
    text: isDark ? '#FFFFFF' : '#000000',
    primary: primaryColor['500'],
    background: '#00000000',
  };
  return (
    <View className="mt-4">

      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: 'Numero carta',
          expiration: 'MM/AA',
          cvc: 'CVC',
        }}
        cardStyle={{
          backgroundColor: stripeColors.background,
          textColor: stripeColors.text,
          placeholderColor: stripeColors.primary,
          borderColor: stripeColors.primary,
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 16,
        }}
        style={{
          height: 55,
        }}
      />
    </View>
  );
};

export default StripeCardInput;
