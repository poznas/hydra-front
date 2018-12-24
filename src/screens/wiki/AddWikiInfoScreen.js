import { View } from 'react-native'
import React, { Component } from 'react'

import { Button, FormInput, FormLabel } from 'react-native-elements'
import Picker from 'react-native-picker-select'
import { AVAILABLE_LANGUAGES, AVAILABLE_RECRUITMENT_TYPES } from '../../utils/constants'
import { BackendConnector } from '../../connectors/BackendConnector'

class AddWikiInfoScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companyId: '',
      recruitmentType: '',
      language: 'initial value',
      content: '',
      onReturn: {},
    }
  }

  componentWillMount() {
    const companyId = this.props.navigation.getParam('companyId', '')
    console.log(this.props.navigation, 'nav')
    console.log(companyId)
    this.setState({ companyId: companyId })
  }

  addInfo = async () => {
    const body = {
      companyId: this.state.companyId,
      recruitmentType: this.state.recruitmentType,
      content: this.state.content,
      programmingLanguage: this.state.language,
    }

    await BackendConnector.addWikiInfo(body)
    this.props.navigation.state.params.onReturn()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <FormLabel>Language</FormLabel>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({ language: value })
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_LANGUAGES}/>

        <FormLabel>Form of recruitment</FormLabel>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({ recruitmentType: value })
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_RECRUITMENT_TYPES}/>

        <FormLabel>Content</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ content: text })}/>

        <Button onPress={this.addInfo}/>
      </View>
    )
  }
}

export default AddWikiInfoScreen
