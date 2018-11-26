import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Google } from 'expo'

import {IOS_CLIENT, ANDROID_CLIENT} from 'react-native-dotenv'

class LoginScreen extends Component {

  signInWithGoogle = async() => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: ANDROID_CLIENT,
        iosClientId: IOS_CLIENT,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success'){
        console.log('succ')
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
