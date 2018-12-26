import { Button, View } from 'react-native'
import React, { Component } from 'react'
import { Google } from 'expo'

import { ANDROID_CLIENT, IOS_CLIENT } from 'react-native-dotenv'

import Storage, { AUTH_TOKEN, USER_ID } from '../modules/AsyncStorage'
import { LoginConnector } from '../connectors/LoginConnector'
import { Styles } from '../Styles'
import { BackendConnector } from '../connectors/BackendConnector'

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
        const userId = response.headers['x-user-id']

        if (token) {
          console.log('calling store')
          await Storage.storeItem(AUTH_TOKEN, token)
          await Storage.storeItem(USER_ID, userId)
          BackendConnector.token = token
          BackendConnector.userId = userId
          console.log('called store')
          this.props.navigation.navigate('App')
        }
      }

    } catch (e) {
      return { error: true }
    }
  }

  render() {
    return (
      <View style={Styles.formScreen}>
        <Button
          title={'LOGIN'}
          onPress={() => this.signInWithGoogle()}
        />
      </View>
    )
  }
}

export default LoginScreen

