import {Text, View} from 'react-native'
import React, {Component} from 'react'
import Context from '../modules/Context'


import Storage from '../modules/AsyncStorage'

const AUTH_TOKEN = 'authToken'

class SplashScreen extends Component {

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const token = await Storage.retrieveItem(AUTH_TOKEN);
      if (token) {
        await this.props.setToken(token);
        // FOR TESTING
        await Storage.clear()
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading animation</Text>
      </View>
    );
  }
}

SplashScreen.contextType = Context;

export default SplashScreen;
