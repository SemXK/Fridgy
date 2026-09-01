import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface MCI {
  lat: number;
  lng: number;
}
const MapsCard = ( {lat, lng}: MCI) => {
  return (
    <View className="h-full w-full ">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ 
            flex: 1,
            borderRadius: 10
          }}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsCompass={false}
          showsTraffic={false}
          showsBuildings
          zoomEnabled
          scrollEnabled
          rotateEnabled
          pitchEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
          />
        </MapView>
    </View>
  )
}

export default MapsCard