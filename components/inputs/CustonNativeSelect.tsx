import { primaryColor } from "@/constants/theme";
import React, { useState } from "react";
import {
  Appearance,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import ThemedText from "../ui/ThemedText";

interface Option<T> {
  label: string;
  value: T;
}

interface NativeSelectProps {
  value: number;
  onValueChange: (value: number) => void;
  options: Option<number>[];
  placeholder?: string;
  style?: object;
}

const NativeSelect = ({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  style,
}: NativeSelectProps) => {
  const [visible, setVisible] = useState(false);
  const [tempValue, setTempValue] = useState<number | null>(value);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const openPicker = () => {
    setTempValue(value);
    setVisible(true);
  };

  const confirmSelection = () => {
    if (tempValue !== null) onValueChange(tempValue);
    setVisible(false);
  };

  return (
    <View style={[styles.container, style]}>

      {/* Inactive Select Display */}
      <TouchableOpacity style={styles.button} onPress={openPicker}>
        <ThemedText
          textStyle="text-primary-500 text-xl align-center"
          darkModeDisabled
          label={selectedLabel || placeholder}
        />
        {/* <Text >{selectedLabel || placeholder}</Text> */}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View className="bg-white dark:bg-stone-900 rounded-t-xl">

            {/* * Actionc */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <ThemedText label="Annulla" font="Nunito-Bold"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmSelection}>
                <ThemedText label="Scegli" darkModeDisabled textStyle="text-primary-500" font="Nunito-Bold"/>
              </TouchableOpacity>
            </View>

            {/* Display options */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    tempValue === item.value && styles.selectedOption,
                  ]}
                  activeOpacity={.8}
                  onPress={() => setTempValue(item.value)}
                >
                  <ThemedText
                    label={item.label}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NativeSelect;

const styles = StyleSheet.create({
  container: { width: "100%" },
  button: {
    padding: 12,
    height: 48,
    borderWidth: 1,
    color: primaryColor[500],
    borderColor: primaryColor[500],
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },
  pickerContainer: {
    backgroundColor: Appearance.getColorScheme() === 'dark' ? 'black' : 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: Platform.OS === "ios" ? 300 : 350,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: primaryColor[500],
  },
  option: { padding: 16 },
  optionText: { fontSize: 16 },
  selectedOption: { backgroundColor: primaryColor[500] },
});
