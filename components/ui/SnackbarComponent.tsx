import { SnackbarStatus } from "@/constants/enums/common";
import React from "react";

import { primaryColor } from "@/constants/theme";
import { Portal, Snackbar } from "react-native-paper";
import ThemedText from "./ThemedText";


export interface TopSnackbarProps {
  message: string;
  onHide: () => void;
  duration?: number;
  status?: SnackbarStatus;
}


const TopSnackbar: React.FC<TopSnackbarProps> = ({
  message,
  onHide,
  status,
}) => {

  const getSnackbarColor = (): string => {
    switch (status) {
      case SnackbarStatus.Warning:
        return '#F59E0B'; // amber
      case SnackbarStatus.Info:
        return '#6366F1'; // indigo
      case SnackbarStatus.Success:
        return '#10B981'; // emerald
      case SnackbarStatus.Error:
        return '#F43F5E'; // rose
      default:
        return '#6366F1';
    }
  };
  if (!message) return null;
  const snackbarColor = getSnackbarColor();
  return (
    <Portal>
      <Snackbar
        visible={!!message}
        onDismiss={onHide}
        style={{
          alignSelf: 'center',
          marginHorizontal: 16,
          marginBottom: 16,
          width: '100%',
          backgroundColor: '#18181B',

          borderWidth: 1,
          borderColor: snackbarColor,
          borderRadius: 12,

          // Glow
          shadowColor: snackbarColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 8,
        }}
        action={{
          label: 'OK',
          textColor: primaryColor[500],
          onPress: onHide,
        }}
      >
        {<ThemedText label={message} /> as any}
      </Snackbar>
    </Portal>
  );
};



export default TopSnackbar;
