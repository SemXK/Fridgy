import { Text } from 'react-native'
import { Button } from 'react-native-paper'

interface ButtonInterface {
  onPress: () => void,
  buttonText:  string,
  className?: string
}

const PrimaryButton = ({onPress, buttonText, className}: ButtonInterface) => {
  return (
    <Button 
      mode="elevated"
      buttonColor='#0284c7'
      textColor='white'
      onPress={onPress}
      className={className}
      >
      <Text>{buttonText}</Text>
    </Button>
  )
}

export default PrimaryButton