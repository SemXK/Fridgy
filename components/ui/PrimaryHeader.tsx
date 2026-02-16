import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { Text, View } from "react-native"

const PrimaryHeader = (props: BottomTabHeaderProps) => {
  return (
    <View className="w-full h-24 items-end flex flex-row  justify-between p-4 bg-primary-500/10">
      <Text>Tasto indietro</Text>
      <Text>Tasto Account</Text>
    </View>
  )
}

export default PrimaryHeader