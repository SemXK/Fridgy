import { Fridge } from '@/constants/interfaces/productInterface';
import { primaryColor } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../pressable/PrimaryButton';
import PrimaryIconButton from '../pressable/PrimaryIconButton';
import ThemedText from '../ui/ThemedText';

interface FMCInterface {
  fridge: Fridge;
  callbackFunction?: () => void;
}
const FridgeMiniCard = (props: FMCInterface) => {

  // * Static states
  const [showModal, setShowModal] = useState<boolean>(false)
  
  // * functions
  const handlePressDetail = ()  => {
    const url: any = `/(tabs)/(fridge-tab)/${String(props.fridge.id)}`
    router.navigate(url);
  }
  const deleteFridge = async () => {
    const fridgeId = props.fridge.id;
    setShowModal(true)
    // ProductController.deleteFridge(fridgeId).then(() => {
    //   props.callbackFunction?.()
    // })
    // .catch(e => {console.log(e.message)})
  }

  // * display
  return (
    <View className="bg-primary-600 pt-4 rounded-xl h-48 relative">

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(!showModal)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Title */}
      <View className="px-4 flex flex-row justify-between items-center -top-2" >
        <ThemedText font='Nunito-ExtraBold' textStyle='text-2xl'  label={props.fridge.name} />
        <PrimaryIconButton iconSpecs={{name: 'delete-forever', color: 'white', size: 24}} onPress={deleteFridge}/>
      </View>

      {/* Info Fridge */}
      <View className="bg-stone-100 dark:bg-darkColor-900 h-48 p-2  rounded-lg">

        <View className="flex flex-row">
          <MaterialCommunityIcons
            name="fridge-outline"
            size={80}
            color={primaryColor[500]}
          />
          <View className="flex">
            <ThemedText textStyle='text-xl' label={props.fridge.description} />
            {/* Descrizione */}
            <View className="flex flex-row items-center">
              <ThemedText  textStyle='text-xl'  label="Ultima Modifica: " />
              <ThemedText font='Nunito-ExtraLight' textStyle=''  label={ new Date(props.fridge.updated_at).toLocaleDateString('it-IT')} />
            </View>
          </View>

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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
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