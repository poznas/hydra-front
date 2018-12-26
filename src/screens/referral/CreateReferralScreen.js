import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Button, FormInput, FormLabel } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { toUnixTimestamp } from '../../utils/DateTimeUtils'
import { BackendConnector } from '../../connectors/BackendConnector'

class CreateReferralScreen extends Component {
  constructor() {
    super()
    this.state = {
      jobId: 0,
      description: '',
      referralBonus: 0,
      referralBonusPercentage: 0.0,
      closingDate: 0,
      job: {},
    }
  }

  async componentDidMount() {
    const job = this.props.navigation.getParam('job', {})
    this.setState({ job: job, jobId: job.jobId })
  }

  addReferral = async () => {
    this.state.closingDate = toUnixTimestamp(this.state.closingDate)
    await BackendConnector.addReferral(this.state)
    this.props.navigation.goBack()
    this.props.navigation.navigate('Referral')
  }

  render() {
    return (
      <ScrollView>
        <FormLabel>Referral Description</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ description: text })}/>

        <FormLabel>Referral Bonus</FormLabel>
        <FormInput
          keyboardType='number-pad'
          onChangeText={(text) => this.setState({ referralBonus: text })}/>

        <FormLabel>Referral Bonus Percentage</FormLabel>
        <FormInput
          keyboardType='decimal-pad'
          onChangeText={(text) => this.setState({ referralBonusPercentage: text })}/>

        <FormLabel>Closing Date</FormLabel>
        <DatePicker
          mode="date"
          format="YYYY-MM-DD"
          maxDate={new Date(this.state.job.closingDate * 1000)}
          onDateChange={(date) => this.setState({ closingDate: date })}/>

        <Button title={'Add'} onPress={this.addReferral}/>
      </ScrollView>
    )
  }

}

CreateReferralScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default CreateReferralScreen
