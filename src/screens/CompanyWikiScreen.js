
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

class CompanyWikiScreen extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const item = this.props.navigation.getParam('item', {});
    console.log(item);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> {item.description} </Text>
        </View>
    );
  }
}

export default CompanyWikiScreen;
