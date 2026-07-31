import CartPageHeader from '@/components/headers/CartPageHeader';
import RoleSwapComponent from '@/components/profileComponents/RoleSwapComponent';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoleOptionStepper = () => {
  const handleSubmit = useCallback(() => {
    console.log('submitted');
  }, [])

  const handlePrevStep = useCallback((prevStep: number) => {
    console.log('navigate to:', prevStep);
  }, []);

  const handleNextStep = useCallback((nextStep: number) => {
    console.log('navigate to:', nextStep);
  }, []);

  return (
    <SafeAreaView>
      <CartPageHeader />

      <RoleSwapComponent />
    </SafeAreaView>
  );
};

export default RoleOptionStepper