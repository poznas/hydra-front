import { ScrollView, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import axios from 'axios'

import { Header, List, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

import {BASE_URL} from 'react-native-dotenv'

class WikiMainScreen extends Component {

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderList = this.renderList.bind(this)
    this.state = {
      token: '',
      list: [],
    }
  }

  async componentWillMount() {
    console.log(this.props.token, 'this props are important')
    const url = [BASE_URL, '/wiki/recruitment/info/entries'].join('')

    const params = {
      headers: {
        'Authorization': this.props.token
      }
    }
    try {
      const response = await axios.get(url, params)
      console.log(response.data, 'data')
      this.setState({
        token: this.props.token,
        list: response.data.content,
      })
    } catch (e) {
      console.log(e)
    }
  }

  onPress = (item) => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('Detail', { item: item })
  }

  renderItem(item) {
    return (< ListItem
        key={item.authorId}
        title={item.companyName}
        onPress={() => this.onPress(item)}
        component={TouchableScale}
        roundAvatar
        chevronColor={'red'}
    />)
  }

  renderList = () => {
    console.log(this.state)
    return this.state.list.map((p) => (
    // return list.map((p) => (
        this.renderItem(p)
    ))
  }

  render() {
    console.log(this.state.token, 'im token')
    return (
        <View style={styles.container}>
          <Header
              centerComponent={{ text: 'Companies', style: { color: '#fff' } }}
              backgroundColor={'#000000'}
          />
          <ScrollView>
            <List>
              {this.renderList()}
            </List>
          </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
})
export default WikiMainScreen
