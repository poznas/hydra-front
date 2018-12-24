import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
import React, { Component } from 'react'
import { BackendConnector } from '../../connectors/BackendConnector'
import Header from 'react-native-elements/src/header/Header'
import List from 'react-native-elements/src/list/List'
import uuid from 'uuid/v4'
import ListItem from 'react-native-elements/src/list/ListItem'
import { Styles } from '../../Styles'

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
      />)

  render() {
    return (
      <View style={Styles.listScreen}>
        <Header
          centerComponent={{
            text: 'Jobs',
            style: { color: '#fff' },
          }}
          backgroundColor={'#000000'}
        />
        <ScrollView>
          <List>
            {this.renderList(this.state.jobs)}
          </List>
        </ScrollView>
        <Button
          icon={{ type: 'font-awesome', name: 'plus-circle' }}
          onPress={() => this.props.navigation.navigate('Form', {
            onReturn: this.triggerRefresh.bind(this),
          })}
          backgroundColor={'#000000'}
        />
      </View>
    )
  }
}

JobScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default JobScreen
