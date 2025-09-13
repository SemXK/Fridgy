import { primaryColor } from '@/constants/theme'
import { ActivityIndicator, Text } from 'react-native'
import { Button } from 'react-native-paper'

interface ButtonInterface {
  onPress: () => void,
  buttonText:  string,
  className?: string,
  isLoading?: boolean,
  mode?: "text" | "elevated" | "outlined" | "contained" | "contained-tonal"
}

const PrimaryButton = ({onPress, buttonText, className, isLoading, mode}: ButtonInterface) => {
  return (
    <Button 
      mode="outlined"
      buttonColor={!isLoading ? primaryColor[500] : "#d5d5d5"}
      disabled={isLoading}
      textColor='white'
      onPress={onPress}
      className={className}
      >
      {
        isLoading ?
        <ActivityIndicator size={16} color="#ffffff" />
        :
        <Text>{buttonText}</Text>
      }
    </Button>
  )
}

export default PrimaryButton