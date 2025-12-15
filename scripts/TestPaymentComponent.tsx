import { SetupIntentResponse } from '@/constants/interfaces/stripeInterface';
import { StripeController } from '@/controllers/StripeController';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestPaymentComponent = () => {
  // * Hooks
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState<any>(null);
  const { confirmPayment, createPaymentMethod } = useStripe(); // Use useStripe instead

  const processPayment = async () => {
    setLoading(true);
    console.log(cardDetails);
    try {
      // Step 1: Create payment intent
      console.log('1. Creating payment intent...');
      const res = await StripeController.createPaymentIntent(1000, 'eur');
      const { clientSecret } = (res as SetupIntentResponse);
      
      // Step 2: Use a test card in CardField
      // In your CardField component, enter: 4242 4242 4242 4242
      // Exp: 12/34, CVC: 123, ZIP: 12345
      // Step 3: Confirm payment
      console.log('2. Confirming payment...');

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: 'test@example.com',
          },
        },
      });

      if (error) {
        console.log('Payment failed:', error.code, error.message);
        Alert.alert('Payment failed', error.message);
        return;
      }
      else {
        console.log('Payment success:', paymentIntent);
        Alert.alert('Test Success!', `Payment ID: ${paymentIntent?.id}`);
      }
      
    } 
    catch (error) {
      console.log('Exception:', error);
      Alert.alert('Error', 'Something went wrong');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Test Payment</Text>
      
      <CardField 
        placeholders={{
          number:'4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardField}
        onCardChange={setCardDetails}
      />
      
      <Text style={styles.hint}>Use test card: 4242 4242 4242 4242</Text>
      
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <Button
          title="Pay €10.00"
          onPress={processPayment}
          disabled={!cardDetails?.complete}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  cardField: {
    height: 50,
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
  },
  hint: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  loader: {
    marginVertical: 20,
  },
});

export default TestPaymentComponent;