import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Text, View } from 'react-native'
import { Styles } from '../../Styles'
import { Avatar, Icon } from 'react-native-elements'
import { getBonusPart } from './ReferralScreen'
import { BackendConnector } from '../../connectors/BackendConnector'
import { formatDate } from '../../utils/DateTimeUtils'

class ReferralDetailsScreen extends Component {
  constructor() {
    super()
    this.state = {
      referral: {},
      appliers: [],
    }
  }

  async componentDidMount() {
    const referral = this.props.navigation.getParam('referral', {})
    this.setState({ referral: referral })
    const appliers = await BackendConnector.getReferralAppliers(referral.referralId)
    this.setState({ appliers: appliers })
  }

  async showJobDetails(jobId) {
    const response = await BackendConnector.getJobs({ includeIds: [jobId] })
    this.props.navigation.navigate('JobDetail', { job: response.content[0] })
  }

  render() {
    const renderDetails = (referral) =>
      <ScrollView contentContainerStyle={Styles.formScreen}>
        <Avatar rounded medium source={{ uri: referral.userImageUrl }}/>
        <Text style={Styles.normalText}>{referral.username}</Text>
        <Text style={Styles.titleText}>{referral.title}</Text>
        <Text style={Styles.subtitleText}>{referral.companyName + ', ' + referral.city}</Text>
        <Icon name={'info'} onPress={() => this.showJobDetails(referral.jobId)}/>
        <Text style={Styles.headerText}>Referral description:</Text>
        <Text style={Styles.normalText}>{referral.description}</Text>
        <Text style={Styles.headerText}>Referral bonus: {referral.referralBonus}</Text>
        <Text style={Styles.headerText}>Your bonus part: {getBonusPart(referral)}</Text>
        <Text style={Styles.headerText}>Your bonus percentage: {referral.referralBonusPercentage}</Text>
        <Text style={Styles.headerText}>Closing date: {formatDate(referral.closingDate)}</Text>
        <Text style={Styles.headerText}>Already applied:</Text>
        {this.renderAppliers()}
      </ScrollView>
    return renderDetails(this.state.referral)
  }

  renderAppliers = () => this.state.appliers.map((applier) =>
    <View key={applier.id} style={appliersViewStyle}>
      <Avatar rounded small source={{ uri: applier.imageUrl }}/>
      <Text style={Styles.normalText}>{applier.username}</Text>
    </View>)

}

const appliersViewStyle = {
  margins: 16,
  alignItems: 'center',
  flexDirection: 'row',
}

ReferralDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ReferralDetailsScreen
