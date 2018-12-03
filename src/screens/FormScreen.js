import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class FormScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      recruitmentType: '',
      language: '',
      content: '',
    }
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FormLabel>Recruitment Type</FormLabel>
          <FormInput onChangeText={(text) => this.setState({recruitmentType: text})}/>
          <FormLabel>Programming Language</FormLabel>
          <FormInput onChangeText={(text) => this.setState({language: text})}/>
          <FormLabel>Content</FormLabel>
          <FormInput onChangeText={(text) => this.setState({content: text})}/>
          {/*<FormValidationMessage>Error message</FormValidationMessage>*/}
        </View>
    );
  }
}

export default FormScreen;
