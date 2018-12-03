import React from 'react'
import { StyleSheet } from 'react-native'
import Navigator from './src/modules/Navigator'
import { ContextProvider } from './src/modules/Context'

export default class App extends React.Component {
  render() {
    return (
        <ContextProvider>
          <Navigator/>
        </ContextProvider>
    )
  }
}
