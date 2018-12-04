import { Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Button, Header, List, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import axios from 'axios'
import uuid from 'uuid/v4'

import {BASE_URL} from 'react-native-dotenv'

class WikiScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: {},
      opinions: [],
      returned: false,
    }
  }

  async triggerRefresh(){
    console.log('trigerred refresh')
    const url = [BASE_URL, '/wiki/recruitment/info/entries'].join('')
    const params = {
      body: { companyIds: [this.state.item.companyId] },
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }
    }
    const response = await axios.get(url, params);
    const opinions2 = response.data.content
    this.setState({opinions: opinions2})

  }

  async componentWillMount(){
    console.log('mounting');
    const item = this.props.navigation.getParam('item', {})
    const url = [BASE_URL, '/wiki/recruitment/info/entries'].join('')
    const params = {
      body: { companyIds: [item.companyId] },
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }
    }
    const response = await axios.get(url, params);
    const opinions = response.data.content
    this.setState({item: item, opinions: opinions})
  }

  renderItem(item) {
    return (< ListItem
        key={uuid()}
        title={item.username}
        subtitle={item.content}
        subtitleNumberOfLines={6}
        component={TouchableScale}
        roundAvatar
        avatar={{ uri: item.userImageUrl }}
    />)
  }


  renderList = (items) => {
    return items.map((p) => (
        this.renderItem(p)
    ))
  }

  render() {
    const returned = this.props.navigation.getParam('returned', )
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Header
              centerComponent={{ text: this.state.item.companyName, style: { color: '#fff' } }}
              backgroundColor={'#000000'}
          />
          <ScrollView>
          <List>
            {this.renderList(this.state.opinions)}
          </List>
          </ScrollView>
          <Button
              icon={{type:'font-awesome', name: 'plus-circle'}}
              onPress={() => this.props.navigation.navigate('Form', {companyId: this.state.item.companyId, onReturn: this.triggerRefresh.bind(this)})}
              backgroundColor={'#000000'}
          />
        </View>
    );
  }
}

export default WikiScreen;
