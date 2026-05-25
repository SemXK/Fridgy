import { AgendaFridgeAction } from '@/constants/interfaces/common'
import { Slot } from 'expo-router'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

// ? General Frudge Context
const FridgeContext = createContext<{
  filter: string
  setFilter: (v: string) => void
  fridgeAgendaProps: AgendaFridgeAction[] | null,
  setFridgeAgendaProps: Dispatch<SetStateAction<AgendaFridgeAction[]  | null>>
}>({} as any)
export const useFridge = () => useContext(FridgeContext)

// ? Component
const FridgeLayout = () => {

  // % States
  const [filter, setFilter] = useState<string>("");
  const [fridgeAgendaProps, setFridgeAgendaProps] = useState<AgendaFridgeAction[]  | null>(null); // List of actions, displayed in the agenda bottomsheet

  // * Display
  return (
    <FridgeContext.Provider value={{ 
      filter, 
      setFilter, 
      fridgeAgendaProps, 
      setFridgeAgendaProps  
      }}>
      {/* <SafeAreaView className="h-screen w-screen relative bg-white dark:bg-black "> */}
        {/* * Auth Header */}
        {/* <HomePageHeader title="Il mio inventario"/> */}

        {/* Children Components */}
        <Slot />

      {/* </SafeAreaView> */}
    </FridgeContext.Provider>

  )
}

export default FridgeLayout