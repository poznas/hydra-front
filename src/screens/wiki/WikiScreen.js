import {ScrollView, View} from 'react-native'
import React, {Component} from 'react'
import WikiEntry from '../../components/WikiEntry'
import {Button, Header, List} from 'react-native-elements'
import uuid from 'uuid/v4'

import {BackendConnector} from "../../connectors/BackendConnector"

class WikiScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company: {},
      wikiEntries: [],
      returned: false,
    }
  }

  async triggerRefresh() {
    console.log(this.state.company, 'this.state.company from trigger ref')
    const filters = {companyIds: [this.state.company.companyId]}
    const response = await BackendConnector.getWikiEntries(this.props.token, filters)
    this.setState({wikiEntries: response.content})
  }

  async componentWillMount() {
    const company = this.props.navigation.getParam('company', {})
    console.log(company)
    const filters = {companyIds: [company.companyId]}
    const response = await BackendConnector.getWikiEntries(this.props.token, filters)
    this.setState({company: company, wikiEntries: response.content})
  }

  renderItem(item) {
    return (< WikiEntry
      key={uuid()}
      title={item.username}
      subtitle={item.content}
      id={item.id}
      upVotes={item.upVotes}
      downVotes={item.downVotes}
      ratio={item.authorReliabilityRatio}
      token={this.props.token}
    />)
  }

  renderList = (items) => {
    return items.map((p) => (
      this.renderItem(p)
    ))
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Header
          centerComponent={{
            text: this.state.company.companyName,
            style: {color: '#fff'}
          }}
          backgroundColor={'#000000'}
        />
        <ScrollView>
          <List>
            {this.renderList(this.state.wikiEntries)}
          </List>
        </ScrollView>
        <Button
          icon={{type: 'font-awesome', name: 'plus-circle'}}
          onPress={() => this.props.navigation.navigate('Form', {
            companyId: this.state.company.companyId,
            onReturn: this.triggerRefresh.bind(this)
          })}
          backgroundColor={'#000000'}
        />
      </View>
    )
  }
}

export default WikiScreen
