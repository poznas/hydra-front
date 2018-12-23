import {Button, View} from 'react-native'
import React, {Component} from 'react'
import {Google} from 'expo'
import axios from 'axios';

import {ANDROID_CLIENT, BASE_URL, IOS_CLIENT} from 'react-native-dotenv'

import Storage from '../modules/AsyncStorage'

class LoginScreen extends Component {

  signInWithGoogle = async () => {
    try {
      const googleLoginResponse = await Google.logInAsync({
        behavior: 'web',
        androidClientId: ANDROID_CLIENT,
        iosClientId: IOS_CLIENT,
        scopes: ['profile', 'email']
      });

      console.log(googleLoginResponse.type)
      console.log('\n')

      if (googleLoginResponse.type === 'success') {
        console.log('test')

        const url = [BASE_URL, '/auth/login'].join('');
        const params = {
          headers: {
            'X-ID-TOKEN': googleLoginResponse.idToken
          }
        }
        console.log('test')
        const response = await axios.get(url, params);

        const token = response.headers.authorization
        if (token) {
          console.log('calling store')
          console.log(token);
          await Storage.storeItem(token)
          console.log('called store')
          this.props.navigation.navigate('App', {token: token})
        }
      }

    } catch (e) {
      return {error: true};
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title={'LOGIN'}
          onPress={() => this.signInWithGoogle()}
        />
      </View>
    );
  }
}

export default LoginScreen;


