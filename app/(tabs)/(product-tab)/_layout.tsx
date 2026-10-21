import { Stack } from 'expo-router'
import React from 'react'

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  )
}

export default ProductLayout