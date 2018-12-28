import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Text, View } from 'react-native'
import { Styles } from '../../Styles'
import { Avatar, Button, Icon } from 'react-native-elements'
import { getBonusPart } from './ReferralScreen'
import { BackendConnector } from '../../connectors/BackendConnector'
import { formatDate } from '../../utils/DateTimeUtils'

class ReferralDetailsScreen extends Component {
  constructor() {
    super()
    this.state = {
      referral: {},
    }
  }

  async triggerRefresh(referralId) {
    const appliers = await BackendConnector.getReferralAppliers(referralId)
    this.setState({ appliers: appliers })
  }

  async componentDidMount() {
    const referral = this.props.navigation.getParam('referral', {})
    this.setState({ referral: referral })
    await this.triggerRefresh(referral.referralId)
  }

  async showJobDetails(jobId) {
    const response = await BackendConnector.getJobs({ includeIds: [jobId] })
    this.props.navigation.navigate('JobDetail', { job: response.content[0] })
  }

  render() {
    const renderDetails = (referral) =>
      <ScrollView contentContainerStyle={Styles.scrollDetailsScreen}>
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
        {this.renderApplicationsButton(this.state.referral)}
        {this.renderApplyButton(this.state.referral)}
      </ScrollView>
    return renderDetails(this.state.referral)
  }

  renderAppliers = () => emptyIfNull(this.state.appliers).map((applier) =>
    <View key={applier.id} style={appliersViewStyle}>
      <Avatar rounded small source={{ uri: applier.imageUrl }}/>
      <Text style={Styles.normalText}>{applier.username}</Text>
    </View>)

  renderApplicationsButton = (referral) => referral.authorId === BackendConnector.userId ?
    <Button
      title={'Applications'}
      onPress={() => this.props.navigation.navigate('Applications', { referralId: referral.referralId })}/>
    : undefined

  renderApplyButton = (referral) => this.userCanApply(referral) ?
    <Button
      title={'Apply'}
      onPress={() => this.props.navigation.navigate('Apply', {
        referralId: referral.referralId,
        onReturn: async () => this.triggerRefresh(referral.referralId),
      })}/>
    : undefined

  userCanApply = (referral) =>
    this.state.appliers
    && !this.state.appliers.find(this.isCurrentUser)
    && referral.authorId !== BackendConnector.userId

  isCurrentUser = (applier) => applier.id === BackendConnector.userId
}

export const appliersViewStyle = {
  flex: 1,
  padding: 8,
  alignItems: 'center',
  flexDirection: 'row',
}

ReferralDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const emptyIfNull = (array) => array ? array : []

export default ReferralDetailsScreen
