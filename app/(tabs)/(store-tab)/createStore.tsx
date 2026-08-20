import { Map } from "@maplibre/maplibre-react-native";
import React from 'react';

const createStore = () => {
  return (
     <Map mapStyle="https://demotiles.maplibre.org/style.json" />
    // <View>
    //   <View className="bg-slate-900 h-2/3 w-screen">

    //   </View>
    //   <CreateNewStoreComponent onClose={() => null}/>
    // </View>
  )
}

export default createStore