import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;

const DiscountSwiper = () => {
  return (
    <View style={{ width: screenWidth | 20, height: 200 }}>
      <Swiper
        style={{}}
        showsPagination={true}   // optional
        loop={false}             // optional
      >
        <View
          style={{
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FECACA', // bg-rose-100
          }}
        >
          <Text>Hello Swiper</Text>
        </View>

        <View
          style={{
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FECACA',
          }}
        >
          <Text>Beautiful</Text>
        </View>

        <View
          style={{
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FECACA',
          }}
        >
          <Text>And simple</Text>
        </View>
      </Swiper>
    </View>
  );
};

export default DiscountSwiper;
