
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class FormScreen extends Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={(text) => console.log(text)}/>
          <FormValidationMessage>Error message</FormValidationMessage>
        </View>
    );
  }
}

export default FormScreen;
