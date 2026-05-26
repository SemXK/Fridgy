import { useFridge } from '@/app/(tabs)/(fridge-tab)/_layout';
import { ProductController } from '@/controllers/ProductController';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import FridgeForm from '../forms/FridgeForm';
import PrimaryButton from '../pressable/PrimaryButton';

interface CNFCInterface {
  onClose: () => void
}

const EditFridgeComponent = (props: CNFCInterface) => {
  // £ Context
  const { fridgeDetail } = useFridge()


  // * Context
  const { fridgeId } = useLocalSearchParams<{ fridgeId: string }>()

  // * State
  const [name, setName] = useState<string>(fridgeDetail?.name || '');
  const [description, setDescription] = useState<string>(fridgeDetail?.description || '');

  // * Functions
  const handleEditFridge = async () => {
    if(name){
      await ProductController.editFridge(fridgeId, {name, description})
      .then((res) => {
        if(res) {
          props.onClose()
        }
      })
      .catch(e => {console.log("Edit Fridge Error: ", e)}) 
    }
  }

  // * Display
  return (
    <View className="flex flex-col justify-between gap-4 p-4 ">

      {/* Text Inputs */}
      <FridgeForm
        name={name} 
        description={description}  
        setName={setName} 
        setDescription={setDescription}  
      />

      {/* Actions */}
      <PrimaryButton onPress={handleEditFridge} textStyle='text-white' buttonText="Modifica Frigorifero"/>

    </View>
  )
}

export default EditFridgeComponent