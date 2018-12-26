import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Context from '../modules/Context'

import Storage, { AUTH_TOKEN, USER_ID } from '../modules/AsyncStorage'
import { BackendConnector } from '../connectors/BackendConnector'
import { Styles } from '../Styles'

class SplashScreen extends Component {

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const token = await Storage.retrieveItem(AUTH_TOKEN)
      const userId = await Storage.retrieveItem(USER_ID)
      if (token) {
        await this.props.setToken(token)
        BackendConnector.token = token
        BackendConnector.userId = userId
        // FOR TESTING
        // await Storage.clear()
        this.props.navigation.navigate('App')
      } else {
        this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={Styles.formScreen}>
        <Text>Loading animation</Text>
      </View>
    )
  }
}

SplashScreen.contextType = Context

export default SplashScreen
