import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import { Styles } from '../../Styles'

class JobDetailsScreen extends Component {

  render() {
    const job = this.props.navigation.getParam('job', {})
    return (
      <View style={Styles.detailsScreen}>
        <Text style={Styles.titleText}>{job.title}</Text>
        <Text style={Styles.subtitleText}>{job.companyName + ', ' + job.city}</Text>
        <Text style={Styles.subtitleText}>{job.minSalary + ' - ' + job.maxSalary}</Text>
        <Text style={Styles.headerText}>Job description:</Text>
        <Text style={Styles.normalText}>{job.description}</Text>
        <Text style={Styles.headerText}>Programming languages:</Text>
        <Text style={Styles.normalText}>{job.programmingLanguages.join(', ')}</Text>
        <View style={Styles.bottom}>
          <Button title={'Create referral'} onPress={() => this.props.navigation.navigate('Main')}/>
        </View>
      </View>
    )
  }
}

JobDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default JobDetailsScreen
