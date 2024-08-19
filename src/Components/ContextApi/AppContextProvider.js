import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
export const AppStateContext = React.createContext();
const AppContextProvider = (props) => {
    const contextValue={value: true}
  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  )
}

export default AppContextProvider

const styles = StyleSheet.create({})