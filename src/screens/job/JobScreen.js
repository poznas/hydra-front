import {Text, View} from 'react-native'
import {Button} from 'react-native-elements'
import React, {Component} from 'react'

class JobScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Tutaj beda joby</Text>
        <Button title={'Add Job'} onPress={() => this.props.navigation.navigate('Form')}/>
      </View>
    );
  }
}

export default JobScreen;
