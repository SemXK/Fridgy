import { styleShadows } from '@/constants/styles/style-shadows';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

interface CustomModalInterface {
  visible: boolean;
  onClose: () => void;
  ChildComponent: React.ComponentType<any>;
  animation?: 'fade' | 'none' | 'slide';
}

const CustomModal = ({
  visible,
  onClose,
  ChildComponent,
  animation = 'fade',
}: CustomModalInterface) => {
  return (
    <Modal
      animationType={animation}
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <BlurView
            intensity={50}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View style={styles.androidBackdrop} />
        )}

        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        <ChildComponent />
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  androidBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    ...styleShadows.shadow,
  },
});
