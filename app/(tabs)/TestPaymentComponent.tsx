import ThemedFormField from '@/components/inputs/CustomFormField';
import { StripeController } from '@/controllers/StripeController';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestPaymentComponent = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>('');

  const openPaymentSheet = async () => {
    setLoading(true);
    try {
      // 1️⃣ Crea PaymentIntent lato backend
      const res: any = await StripeController.createPaymentIntent(1000, 'eur');
      const { clientSecret } = res;

      if (!clientSecret) {
        Alert.alert('Errore', 'ClientSecret mancante');
        return;
      }

      // 2️⃣ Inizializza PaymentSheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'SORDI',
        allowsDelayedPaymentMethods: false,
        style: 'automatic',
        // billingDetails: {
        //   name,
        // },
      });

      if (initError) {
        Alert.alert('Errore', initError.message);
        return;
      }

      // 3️⃣ Mostra PaymentSheet
      const ans = await presentPaymentSheet();
      console.log(ans);
      // if (presentError) {
      //   if (presentError.code === 'Canceled') return; // utente chiude sheet
      //   Alert.alert('Pagamento fallito', presentError.message);
      //   return;
      // }

    } 
    catch (err: any) {
      Alert.alert('Errore', err.message || 'Qualcosa è andato storto');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Test Payment</Text>

      {/* Campi NON sensibili */}
      <ThemedFormField label="Intestatario" value={name} setValue={setName} />

      <Text style={styles.hint}>Usa carta di test: 4242 4242 4242 4242</Text>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <Button title="Paga €10,00" onPress={openPaymentSheet} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000', // dark mode
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  loader: {
    marginVertical: 20,
  },
});

export default TestPaymentComponent;
