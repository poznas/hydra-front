import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import { Styles } from '../../Styles'
import { formatDate } from '../../utils/DateTimeUtils'
import { BackendConnector } from '../../connectors/BackendConnector'
import wrapScreenWithContext from '../../utils/wrapScreenWithContext'

class JobDetailsScreen extends Component {
  constructor() {
    super()
    this.state = {
      job: {},
      enableCreateReferral: false,
    }
  }

  async componentDidMount() {
    const job = this.props.navigation.getParam('job', {})
    this.setState({ job: job })
    const filters = {
      authorIds: [BackendConnector.userId],
      jobIds: [job.jobId],
    }
    const isEmpty = (array) => !(array && array.length)
    const response = await BackendConnector.getReferrals(filters)
    if (isEmpty(response.content)) {
      this.setState({ enableCreateReferral: true })
    }
  }

  render() {
    return (
      <View style={Styles.detailsScreen}>
        <Text style={Styles.titleText}>{this.state.job.title}</Text>
        <Text style={Styles.subtitleText}>{this.state.job.companyName + ', ' + this.state.job.city}</Text>
        <Text style={Styles.subtitleText}>{this.state.job.minSalary + ' - ' + this.state.job.maxSalary}</Text>
        <Text style={Styles.headerText}>Job description:</Text>
        <Text style={Styles.normalText}>{this.state.job.description}</Text>
        <Text style={Styles.headerText}>Programming languages:</Text>
        <Text style={Styles.normalText}>{this.state.job.programmingLanguages ?
          this.state.job.programmingLanguages.join(', ') : ''}</Text>
        <Text style={Styles.headerText}>Closing date: {formatDate(this.state.job.closingDate)}</Text>
        {this.renderCreateReferralButton()}
      </View>
    )
  }

  renderCreateReferralButton = () =>
    this.state.enableCreateReferral ?
      <View style={Styles.bottom}>
        <Button
          title={'Create referral'}
          onPress={() => this.props.navigation.navigate('ReferralForm', { job: this.state.job })}/>
      </View>
      : undefined

  static navigatorProps = {
    screen: wrapScreenWithContext(JobDetailsScreen),
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.getParam('job', {}).title,
      }
    },
  }
}

JobDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default JobDetailsScreen
