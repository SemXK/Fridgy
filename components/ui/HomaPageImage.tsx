import React from 'react'
import { Image } from 'react-native'


const MainImage = () => {

  return (
    <Image
      className="h-1/3 w-full self-center rounded-xl"
      source={require("../../assets/images/pizza.jpg")}
      resizeMode='cover'
    />
  )
}

export default MainImage