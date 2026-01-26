import { Fridge } from '@/constants/interfaces/productInterface';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import ThemedText from '../ui/ThemedText';

interface FMCInterface {
  fridge: Fridge;
}
const FridgeMiniCard = (props: FMCInterface) => {

  // * functions
  const handlePressDetail = ()  => {
    // router.navigate(['(tabs)/(fridge-tab)/', props.fridge.id])
    router.navigate(`/(tabs)/productDetail/${props.fridge.id}`);
  }

  // * display
  return (
    <View className="bg-primary-600 pt-4 rounded-xl h-48 relative">
      <View className="px-4 pb-2">
        <ThemedText font='Nunito-ExtraBold' textStyle='text-xl'  label={props.fridge.name} />
      </View>
      <View className="bg-stone-100 dark:bg-darkColor-900 h-48 p-2  rounded-lg">
        <ThemedText   label={props.fridge.description} />

        {/* Descrizione */}
        <View className="flex flex-row">
          <ThemedText  textStyle=''  label="Ultima Modifica: " />
          <ThemedText font='Nunito-ExtraLight' textStyle=''  label={ new Date(props.fridge.updated_at).toLocaleDateString('it-IT')} />
        </View>

      {/* Actions */}
      <View className="absolute bottom-0 flex flex-row justify-end gap-2 w-full border-t-2 p-4 border-primary-500/10">

        <View className="w-1/3">
          <PrimaryButton onPress={handlePressDetail} buttonText="Dettaglio" />
        </View>
      </View>

      </View>


    </View>
  )
}

export default FridgeMiniCard


// 1! Ombre (per dopo)
// style={{
//   marginHorizontal: 6, 
//   backgroundColor: 'white',
//   borderRadius: 12,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 1 },
//   shadowOpacity: 0.15,
//   shadowRadius: 3,
//   elevation: 2,
// }}