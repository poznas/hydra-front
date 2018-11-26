import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Google } from 'expo'
import axios from 'axios';

import {BASE_URL, IOS_CLIENT, ANDROID_CLIENT} from 'react-native-dotenv'

class LoginScreen extends Component {

  signInWithGoogle = async() => {
    try {
      const googleLoginResponse = await Google.logInAsync({
        behavior: 'web',
        androidClientId: ANDROID_CLIENT,
        iosClientId: IOS_CLIENT,
        scopes: ['profile', 'email']
      });

      console.log(googleLoginResponse.type);
      console.log('\n');

      if (googleLoginResponse.type === 'success'){
        console.log(googleLoginResponse.idToken);
        // TODO skonczyc, jak Poznas naprawi

        // const url = [BASE_URL, '/auth/login'].join('');
        // const params = {
        //   headers: {
        //     'X-ID-TOKEN': googleLoginResponse.idToken
        //   }
        // }
        //
        // const hydraLoginResponse = await axios.post(url, {}, params);
        // console.log(hydraLoginResponse);
        this.props.navigation.navigate('App');
      }

    } catch(e) {
      return {error: true};
    }
  }

  render() {
    // console.log(IOS_CLIENT);
    // console.log(ANDROID_CLIENT);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>LoginScreen</Text>
          <Button
              title={'Dzien dobry panie Poznanski'}
              onPress={() => this.signInWithGoogle()}
              // onPress={() => this.props.navigation.navigate('App')}
          />
        </View>
    );
  }
}
export default LoginScreen;
