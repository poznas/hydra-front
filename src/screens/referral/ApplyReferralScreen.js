import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { Button, FormInput, FormLabel } from 'react-native-elements'
import { Styles } from '../../Styles'
import { BackendConnector } from '../../connectors/BackendConnector'

class ApplyReferralScreen extends Component {
  constructor() {
    super()
    this.state = {
      githubUrl: '',
      linkedinUrl: '',
      cvUrl: '',
      referralId: 0,
    }
  }

  async componentDidMount() {
    const referralId = this.props.navigation.getParam('referralId', {})
    this.setState({ referralId: referralId })
  }

  async apply() {
    await BackendConnector.applyForReferral(this.state)
    this.props.navigation.state.params.onReturn()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={Styles.formScreen}>
        <FormLabel>Github URL</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ githubUrl: text })}/>

        <FormLabel>LinkedIn URL</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ linkedinUrl: text })}/>

        <FormLabel>CV download URL</FormLabel>
        <FormInput onChangeText={(text) => this.setState({ cvUrl: text })}/>

        <Button title={'Apply'} onPress={this.apply.bind(this)}/>
      </View>
    )
  }
}

ApplyReferralScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ApplyReferralScreen

