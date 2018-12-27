import { ScrollView, View } from 'react-native'
import React, { Component } from 'react'
import { BackendConnector } from '../../connectors/BackendConnector'
import PropTypes from 'prop-types'
import { Styles } from '../../Styles'
import { List, ListItem } from 'react-native-elements'

class ReferralScreen extends Component {
  constructor() {
    super()
    this.state = {
      referrals: [],
    }
  }

  async triggerRefresh() {
    const response = await BackendConnector.getReferrals({})
    this.setState({ referrals: response.content })
  }

  async componentDidMount() {
    await this.triggerRefresh()
  }

  renderList = (referrals) =>
    referrals.map((referral) =>
      <ListItem
        key={referral.referralId}
        roundAvatar
        avatar={{ uri: referral.userImageUrl }}
        title={referral.title}
        subtitle={referral.companyName + ', ' + referral.city}
        rightTitle={getBonusPart(referral)}
        rightTitleStyle={referralBonusPartStyle}
        onPress={() => this.props.navigation.navigate('Detail', { referral: referral })}
      />)

  render() {
    return (
      <View style={Styles.listScreen}>
        <ScrollView>
          <List>
            {this.renderList(this.state.referrals)}
          </List>
        </ScrollView>
      </View>
    )
  }

}

ReferralScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ReferralScreen

const referralBonusPartStyle = {
  color: '#00e11b',
  fontStyle: 'italic',
}

export const getBonusPart = (referral) =>
  '+' + (referral.referralBonus * referral.referralBonusPercentage).toFixed(0)

