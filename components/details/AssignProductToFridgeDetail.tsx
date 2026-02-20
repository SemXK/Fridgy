import { Controller } from '@/controllers/Controller'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import ThemedText from '../ui/ThemedText'

const AssignProductToFridgeDetail = () => {
  const token = async () => {
    await Controller.sessionGetId().then(res => console.log(res))
  }
  useEffect(() => {
    token()
  }, [])
  return (
    <View>
      <ThemedText label="Prodotti non assegnati" />
    </View>
  )
}

export default AssignProductToFridgeDetail