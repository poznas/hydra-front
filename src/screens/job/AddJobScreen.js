import { View } from 'react-native'
import React, { Component } from 'react'
import { Button, FormInput, FormLabel } from 'react-native-elements'
import Picker from 'react-native-picker-select'
import { AVAILABLE_LANGUAGES } from '../../utils/constants'
import { Styles } from '../../Styles'

class AddJobScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobDescription: '',
      language1: '',
      language2: '',
      language3: '',
      minSalary: '',
      maxSalary: '',
    }
  }

  render() {
    return (
      <View style={Styles.formScreen}>

        <FormLabel>Job Description</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ jobDescription: text })}/>

        <FormLabel>Minimal Salary</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ minSalary: text })}/>

        <FormLabel>Maximal Salary</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ maxSalary: text })}/>

        <FormLabel> Programming Languages </FormLabel>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({ language1: value })
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_LANGUAGES}/>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({ language2: value })
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_LANGUAGES}/>
        <Picker onValueChange={(value) => {
          console.log(value)
          this.setState({ language3: value })
          console.log(`${value} has been selected`)
        }} items={AVAILABLE_LANGUAGES}/>

        <Button onPress={console.log('')}/>
      </View>
    )
  }
}

export default AddJobScreen
