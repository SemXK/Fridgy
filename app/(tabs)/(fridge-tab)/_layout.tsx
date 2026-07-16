import { AgendaFridgeAction } from '@/constants/interfaces/common'
import { Fridge } from '@/constants/interfaces/productInterface'
import { ProductController } from '@/controllers/ProductController'
import { router, Slot } from 'expo-router'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

// ? General Frudge Context
const FridgeContext = createContext<{
  fridgeDetail: Fridge | null;
  setFridgeDetail: Dispatch<SetStateAction<Fridge | null>>
  fridgeAgendaProps: AgendaFridgeAction[] | null,
  setFridgeAgendaProps: Dispatch<SetStateAction<AgendaFridgeAction[]  | null>>,
  getFridgeDetail: (id: string) => void,
  fridgeLoading: boolean,
  setFridgeLoading: Dispatch<SetStateAction<boolean>>
}>({} as any)

export const useFridge = () => useContext(FridgeContext)

// ? Component
const FridgeLayout = () => {

  // % States
  const [fridgeDetail, setFridgeDetail] = useState<Fridge | null>(null); 
  const [fridgeAgendaProps, setFridgeAgendaProps] = useState<AgendaFridgeAction[]  | null>(null); // List of actions, displayed in the agenda bottomsheet
  const [fridgeLoading, setFridgeLoading] = useState<boolean>(false);

  // $ functions
  const getFridgeDetail = async (fridgeId: string) => {
    setFridgeLoading(true)
    await ProductController.getFridgeDetail(Number(fridgeId))
      .then((res) => {
        const fridge = res as Fridge
        setFridgeDetail(fridge)
      })
      .catch((e) => {
        router.navigate('/(tabs)/Home')
      })
      .finally(() => {
        setFridgeLoading(false)
      })
  }

  // * Display
  return (
    <FridgeContext.Provider value={{ 
      fridgeDetail,
      setFridgeDetail,
      fridgeAgendaProps, 
      setFridgeAgendaProps,
      getFridgeDetail,
      fridgeLoading,
      setFridgeLoading
      }}>
      {/* <SafeAreaView className="h-screen w-screen relative bg-white dark:bg-black "> */}
        {/* * Auth Header */}

        {/* Children Components */}
        <Slot />
      {/* </SafeAreaView> */}
    </FridgeContext.Provider>

  )
}

export default FridgeLayout