
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import React, { Component } from 'react'

class JobMainScreen extends Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Tutaj beda referrale</Text>
          <Button title={'Add Ref'} onPress={() => this.props.navigation.navigate('Form')}/>
        </View>
    );
  }
}

export default JobMainScreen;
