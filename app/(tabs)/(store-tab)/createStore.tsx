import React from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  type Region,
} from 'react-native-maps';

const INITIAL_REGION: Region = {
  latitude: 41.8902,
  longitude: 12.4922,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const CreateStore = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      initialRegion={INITIAL_REGION}
      showsCompass={false}
      showsTraffic={false}
      showsBuildings
      zoomEnabled
      scrollEnabled
      rotateEnabled
      pitchEnabled={false}
    />
  );
};

export default CreateStore;
