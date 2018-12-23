import { ScrollView, View } from 'react-native'
import React, { Component } from 'react'
import CustomListItem from '../../components/CustomListItem'
import { Button, Header, List, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import axios from 'axios'
import uuid from 'uuid/v4'

import { BASE_URL } from 'react-native-dotenv'

class WikiScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      opinions: [],
      returned: false,
    }
  }

  async triggerRefresh() {
    console.log('trigerred refresh')
    const url = [BASE_URL, '/wiki/recruitment/info/entries'].join('')
    const data = { companyIds: [this.state.item.companyId] }
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'GET',
        Authorization: this.props.token
      }
    }
    console.log(this.state.item, 'this.state.item from trigger ref')
    const response = await axios.post(url, data, params)
    const opinions2 = response.data.content
    console.log(opinions2, 'axios ops')
    this.setState({ opinions: opinions2 })

  }

  async componentWillMount() {
    const item = this.props.navigation.getParam('item', {})
    // console.log(item.companyId, 'compid');
    // console.log('mounting');
    const url = [BASE_URL, '/wiki/recruitment/info/entries'].join('')
    const data = { companyIds: [item.companyId] }
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'GET',
        Authorization: this.props.token
      }
    }
    const response = await axios.post(url, data, params)
    const opinions = response.data.content
    console.log(opinions, 'axios opinions')
    this.setState({ item: item, opinions: opinions })
  }

  renderItem(item) {
    return (< CustomListItem
        key={uuid()}
        title={item.username}
        subtitle={item.content}
        id = {item.id}
        upvotes = {item.upVotes}
        downvotes = {item.downVotes}
        ratio = {item.authorReliabilityRatio}
        token = {this.props.token}
    />)
  }

  renderList = (items) => {
    return items.map((p) => (
        this.renderItem(p)
    ))
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Header
              centerComponent={{
                text: this.state.item.companyName,
                style: { color: '#fff' }
              }}
              backgroundColor={'#000000'}
          />
          <ScrollView>
            <List>
              {this.renderList(this.state.opinions)}
            </List>
          </ScrollView>
          <Button
              icon={{ type: 'font-awesome', name: 'plus-circle' }}
              onPress={() => this.props.navigation.navigate('Form', {
                companyId: this.state.item.companyId,
                onReturn: this.triggerRefresh.bind(this)
              })}
              backgroundColor={'#000000'}
          />
        </View>
    )
  }
}

export default WikiScreen
