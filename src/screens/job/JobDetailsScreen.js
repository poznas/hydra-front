import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button } from 'react-native-elements'

class JobDetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>REACT NATIVE BLABLABLA</Text>
        <Text>20000 PLN</Text>
        <Text>Job Description</Text>
        <Text>Bla bla bla, fajna praca jest, 10/10</Text>
        <Button title={'TODO: -> CreateReferralScreen'} onPress={() => this.props.navigation.navigate('')}/>
      </View>
    )
  }
}

export default JobDetailsScreen
