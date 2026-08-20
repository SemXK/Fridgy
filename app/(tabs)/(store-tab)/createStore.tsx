import CreateNewStoreComponent from '@/components/details/CreateNewStoreComponent'
import React from 'react'
import { View } from 'react-native'

const createStore = () => {
  return (
    <View>
      <View className="bg-slate-900 h-1/2 w-screen">

      </View>
      <CreateNewStoreComponent onClose={() => null}/>
    </View>
  )
}

export default createStore