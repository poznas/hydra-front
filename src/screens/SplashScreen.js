
import { AsyncStorage, Text, View } from 'react-native'
import React, { Component } from 'react'


import Storage from '../modules/AsyncStorage'
const AUTH_TOKEN = 'authToken'

class SplashScreen extends Component {

  async componentDidMount() {
    try {
      const token = await Storage.retrieveItem(AUTH_TOKEN);
      console.log(token, 'splash')
      if (token) {
        console.log('token exists')
        // FOR TESTING
        // await Storage.clear()
        this.props.navigation.navigate('App', {token: token})
      } else {
        this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading animation</Text>
        </View>
    );
  }
}

export default SplashScreen;
