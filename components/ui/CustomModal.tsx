import { styleShadows } from '@/constants/styles/style-shadows';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

interface CustomModalInterface {
  visible: boolean;
  onClose: () => void;
  ChildComponent: React.ComponentType<any>;
  animation?:  "fade" | "none" | "slide";
}

const CustomModal = ({
  visible,
  onClose,
  ChildComponent,
  animation = "fade"

}: CustomModalInterface) => {
  return (
    <Modal
      animationType={animation}
      transparent={true}
      visible={visible}
      className='relative'
      onRequestClose={onClose}>
      <BlurView intensity={50} tint="default" style={styles.centeredView} >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <ChildComponent />
      </BlurView>
    
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
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
    ...styleShadows.shadow
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
