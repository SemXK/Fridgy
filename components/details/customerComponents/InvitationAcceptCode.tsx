import PrimaryButton from '@/components/pressable/PrimaryButton';
import TopSnackbar from '@/components/ui/SnackbarComponent';
import ThemedText from '@/components/ui/ThemedText';
import { SnackbarStatus } from '@/constants/enums/common';
import { primaryColor } from '@/constants/theme';
import { ConsumerController } from '@/controllers/ConsumerController';
import { useRef, useState } from 'react';
import {
  Image,
  TextInput,
  View,
} from 'react-native';

interface IACInterface {
  onLinkAccepted: () => void;
}

const CODE_LENGTH = 6;

const InvitationAcceptCode = ({onLinkAccepted}: IACInterface) => {
  // * States
  const [invitationCode, setInvitationCode] = useState('');

  const [showSnackbar, setShowSnackbar] = useState<string>("")
  const [barStatus, setBarStatus] = useState<SnackbarStatus>(SnackbarStatus.Info)
  // % Refs
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // $ Functions
  const handleChange = (text: string, index: number) => {
    const char = text.slice(-1);
    const codeArray = invitationCode.padEnd(CODE_LENGTH, '').split('');
    codeArray[index] = char;
    const newCode = codeArray.join('').slice(0, CODE_LENGTH);
    setInvitationCode(newCode);

    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      !invitationCode[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleAccept = () => {
    if (invitationCode.length !== CODE_LENGTH) {
      return;
    }
    acceptInvitationCode(invitationCode);
  };
  const acceptInvitationCode = async(invitationCode: string) => {
    await ConsumerController.acceptInviteCode(invitationCode)
      .then(() => {
        onLinkAccepted()
      })
      .catch((e: Error) => {
        setShowSnackbar(e.message)
        setBarStatus(SnackbarStatus.Error)
      })
  }
  return (
    <View className="dark:bg-darkColor-800 bg-white rounded-xl w-3/4 aspect-square items-center flex justify-between relative">

      <View className="w-full h-1/3 bg-primary-500 rounded-t-xl flex flex-row align-start justify-center">
        <Image
          className="w-1/2 -top-16 aspect-square"
          resizeMode="contain"
          source={require('@/assets/images/illustrations/invitation.png')}
        />
      </View>

      <View className="flex flex-col justify-between h-2/3 w-full px-6">

        <View className="items-center flex flex-col justify-center h-1/3">
          <ThemedText
            label="Il tuo codice invito"
            font="Nunito-Bold"
            textStyle="text-2xl text-center"
          />

          <ThemedText
            label="Condividi il codice con i tuoi clienti per invitarli"
          />
        </View>

        <View className="h-1/3 w-full items-center justify-center">

          <View className="flex-row justify-between w-full">
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={invitationCode[index] ?? ''}
                onChangeText={(text) => handleChange(text.toUpperCase(), index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                maxLength={1}
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
                textAlign="center"
                className="border-2 border-gray-300 rounded-lg w-11 h-14 text-xl font-bold dark:text-white dark:border-gray-600"
              />
            ))}
          </View>

        </View>

        <View className="items-center flex flex-col justify-center h-1/3">
          <PrimaryButton
            buttonText="Accetta Invito"
            textStyle="text-white"
            buttonColor={primaryColor[500]}
            onPress={handleAccept}
          />
        </View>

      </View>

      {/* Snackbar */}
      <TopSnackbar
        status={barStatus}
        message={showSnackbar} 
        onHide={() => setShowSnackbar('')} 
      />

    </View>
  );
};

export default InvitationAcceptCode;