import React from 'react'
import {View} from 'react-native'

import {FormInput, FormLabel} from 'react-native-elements'

class ApplyReferralScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      github: '',
      linkedIn: '',
      cv: ''
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FormLabel>Github nickname</FormLabel>
        <FormInput onChangeText={(text) => this.setState({github: text})}/>

        <FormLabel>LinkedIn</FormLabel>
        <FormInput onChangeText={(text) => this.setState({linkedIn: text})}/>

        <FormLabel>CV</FormLabel>
        <FormInput onChangeText={(text) => this.setState({cv: text})}/>

      </View>
    );
  }
}

export default ApplyReferralScreen;


