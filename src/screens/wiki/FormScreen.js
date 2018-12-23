import {View} from 'react-native'
import React, {Component} from 'react'
import axios from 'axios'

import {BASE_URL} from 'react-native-dotenv'
import {Button, FormInput, FormLabel} from 'react-native-elements'
import Picker from 'react-native-picker-select'
import {AVAILABLE_LANGUAGES, AVAILABLE_RECRUITMENT_TYPES} from '../../utils/constants'

class FormScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companyId: '',
      recruitmentType: '',
      language: 'initial value',
      content: '',
      onReturn: {}
    }
  }

  componentWillMount() {
    const companyId = this.props.navigation.getParam('companyId', '')
    console.log(this.props.navigation, 'nav')
    // const refreshState = this.props.navigation.getParam('onReturn', () => console.log('couldnt find param'))
    console.log(companyId)
    this.setState({companyId: companyId})
  }

  addInfo = async () => {
    const url = [BASE_URL, '/wiki/recruitment/info/add'].join('')
    const body = {
      companyId: this.state.companyId,
      recruitmentType: this.state.recruitmentType,
      content: this.state.content,
      programmingLanguage: this.state.language
    }
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }
    }
    console.log(body)
    console.log(url)
    console.log(params)
    console.log('from has been sent')
    await axios.post(url, body, params).catch(err => console.log(err))
    this.props.navigation.state.params.onReturn()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <FormLabel>Language</FormLabel>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({language: value})
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_LANGUAGES}/>

        <FormLabel>Form of recruitment</FormLabel>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({recruitmentType: value})
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_RECRUITMENT_TYPES}/>

        <FormLabel>Content</FormLabel>
        <FormInput onChangeText={(text) => this.setState({content: text})}/>

        <Button onPress={this.addInfo}/>
      </View>
    )
  }
}

export default FormScreen
