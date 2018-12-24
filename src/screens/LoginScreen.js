import { Button, View } from 'react-native'
import React, { Component } from 'react'
import { Google } from 'expo'

import { ANDROID_CLIENT, IOS_CLIENT } from 'react-native-dotenv'

import Storage from '../modules/AsyncStorage'
import { LoginConnector } from '../connectors/LoginConnector'

class LoginScreen extends Component {

  signInWithGoogle = async () => {
    try {
      const googleLoginResponse = await Google.logInAsync({
        behavior: 'web',
        androidClientId: ANDROID_CLIENT,
        iosClientId: IOS_CLIENT,
        scopes: ['profile', 'email'],
      })

      console.log(googleLoginResponse.type)
      console.log('\n')

      if (googleLoginResponse.type === 'success') {
        const response = await LoginConnector.login(googleLoginResponse.idToken)
        const token = response.headers.authorization

        if (token) {
          console.log('calling store')
          console.log(token)
          await Storage.storeItem(token)
          console.log('called store')
          this.props.navigation.navigate('App', { token: token })
        }
      }

    } catch (e) {
      return { error: true }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title={'LOGIN'}
          onPress={() => this.signInWithGoogle()}
        />
      </View>
    )
  }
}

export default LoginScreen

