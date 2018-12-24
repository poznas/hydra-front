import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import { Styles } from '../../Styles'

class JobDetailsScreen extends Component {
  render() {
    return (
      <View style={Styles.formScreen}>
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
