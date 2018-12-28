import { Linking, ScrollView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BackendConnector } from '../../connectors/BackendConnector'
import { appliersViewStyle } from './ReferralDetailsScreen'
import { Avatar, Button, SocialIcon } from 'react-native-elements'
import { Styles } from '../../Styles'

class ReferralApplicationsScreen extends Component {
  constructor() {
    super()
    this.state = {
      applications: [],
    }
  }

  async componentDidMount() {
    const referralId = this.props.navigation.getParam('referralId', {})
    const applications = await BackendConnector.getReferralApplications(referralId)
    this.setState({ applications: applications })
  }

  render() {
    return (
      <ScrollView>
        {this.state.applications.map((app) =>
          <View key={app.applicationId} style={appliersViewStyle}>
            <Avatar rounded medium source={{ uri: app.userImageUrl }}/>
            <Text style={Styles.subtitleText}>{app.username}</Text>
            <SocialIcon type={'github'} onPress={() => Linking.openURL(app.githubUrl)}/>
            <SocialIcon type={'linkedin'} onPress={() => Linking.openURL(app.linkedinUrl)}/>
            <Button title={'CV'} onPress={() => Linking.openURL(app.cvUrl)}/>
          </View>)}
      </ScrollView>
    )
  }

}

ReferralApplicationsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ReferralApplicationsScreen
