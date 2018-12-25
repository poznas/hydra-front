import { ScrollView, View } from 'react-native'
import React, { Component } from 'react'
import { Button, FormInput, FormLabel } from 'react-native-elements'
import Picker from 'react-native-picker-select'
import { AVAILABLE_LANGUAGES } from '../../utils/constants'
import DatePicker from 'react-native-datepicker'
import uuid from 'uuid/v4'
import { BackendConnector } from '../../connectors/BackendConnector'
import { toUnixTimestamp } from '../../utils/DateTimeUtils'
import PropTypes from 'prop-types'

class AddJobScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      companyId: '',
      city: '',
      description: '',
      programmingLanguages: new Set(),
      minSalary: 0,
      maxSalary: 0,
      closingDate: '',
      companies: [],
    }
  }

  async componentDidMount() {
    const response = await BackendConnector.getCompanies()
    this.setState({
      companies: response.content.map((c) => {
        return {
          label: c.companyName,
          value: c.companyId,
        }
      }),
    })
  }

  addJob = async () => {
    this.state.programmingLanguages = Array.from(this.state.programmingLanguages)
    this.state.closingDate = toUnixTimestamp(this.state.closingDate)
    await BackendConnector.addJob(this.state)
    this.props.navigation.state.params.onReturn()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <ScrollView>
        <FormLabel>Job Title</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ title: text })}/>

        <FormLabel>Company</FormLabel>
        <Picker
          onValueChange={(companyId) => this.setState({ companyId: companyId })}
          items={this.state.companies}/>

        <FormLabel>City</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ city: text })}/>

        <FormLabel>Job Description</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ description: text })}/>

        <FormLabel>Minimal Salary</FormLabel>
        <FormInput
          keyboardType='number-pad'
          onChangeText={(text) => this.setState({ minSalary: text })}/>

        <FormLabel>Maximal Salary</FormLabel>
        <FormInput
          keyboardType='number-pad'
          onChangeText={(text) => this.setState({ maxSalary: text })}/>

        <FormLabel> Programming Languages </FormLabel>
        {this.renderLanguages()}

        <FormLabel>Closing Date</FormLabel>
        <DatePicker
          mode="date"
          format="YYYY-MM-DD"
          onDateChange={(date) => this.setState({ closingDate: date })}/>

        <Button title={'Add'} onPress={this.addJob}/>
      </ScrollView>
    )
  }

  renderLanguages = () => [
    this.renderSelectedLanguages(),
    this.renderLanguagePicker(undefined),
  ]

  renderSelectedLanguages = () =>
    Array.from(this.state.programmingLanguages).map((language) =>
      <View
        key={uuid()}
        style={languagePickerViewStyle}>
        {this.renderLanguagePicker(language)}
        <Button title={'delete'} onPress={() => {
          this.state.programmingLanguages.delete(language)
          this.setState(this.state)
        }}/>
      </View>)

  renderLanguagePicker = (selected) =>
    <Picker
      style={languagePickerStyle}
      key={uuid()}
      selectedValue={selected}
      onValueChange={(lang) => {
        this.state.programmingLanguages.delete(selected)
        this.state.programmingLanguages.add(lang)
        this.setState(this.state)
      }}
      items={AVAILABLE_LANGUAGES}/>
}

const languagePickerViewStyle = {
  flex: 1,
  flexDirection: 'row',
}

const languagePickerStyle = {
  flex: 1,
}

AddJobScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default AddJobScreen
