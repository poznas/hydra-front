
import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'

class LoginScreen extends Component {
  render() {
    console.log(this.props);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>LoginScreen</Text>
          <Button
              title={'Dzien dobry panie Poznanski'}
              onPress={() => this.props.navigation.navigate('App')}
          />
        </View>
    );
  }
}
export default LoginScreen;
