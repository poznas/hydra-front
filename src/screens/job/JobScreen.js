import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BackendConnector } from '../../connectors/BackendConnector'
import List from 'react-native-elements/src/list/List'
import uuid from 'uuid/v4'
import ListItem from 'react-native-elements/src/list/ListItem'
import { Styles } from '../../Styles'
import ActionButton from 'react-native-action-button'

class JobScreen extends Component {
  constructor() {
    super()
    this.state = {
      jobs: [],
    }
  }

  async triggerRefresh() {
    const response = await BackendConnector.getJobs()
    this.setState({ jobs: response.content })
  }

  async componentDidMount() {
    await this.triggerRefresh()
  }

  renderList = (jobs) =>
    jobs.map((job) =>
      <ListItem
        key={uuid()}
        title={job.title}
        subtitle={job.companyName + ', ' + job.city}
        rightTitle={job.minSalary + ' - ' + job.maxSalary}
        onPress={() => this.props.navigation.navigate('Detail', { job: job })}
      />)

  render() {
    return (
      <View style={Styles.listScreen}>
        <ScrollView>
          <List>
            {this.renderList(this.state.jobs)}
          </List>
        </ScrollView>
        <ActionButton
          buttonColor={'#0067ea'}
          onPress={() => this.props.navigation.navigate('Form', {
            onReturn: this.triggerRefresh.bind(this),
          })}
        />
      </View>
    )
  }
}

JobScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default JobScreen
