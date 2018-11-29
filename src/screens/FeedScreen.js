import { StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Constants } from 'expo'

import { List, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableScale from 'react-native-touchable-scale'

const list = [
  {
    name: 'Ailleron',
    avatar_url: 'https://pbs.twimg.com/profile_images/662280254598221826/lWkOHSpc.png',
    description: 'Poznas bardzo lubi tam pracowac 10/10'
  },
  {
    name: 'Schibsted',
    avatar_url: 'data:image/png;base64,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',
    description: 'Michas bardzo lubi tam pracowac 10/10'
  },
]

class FeedScreen extends Component {


  constructor(props) {
    super(props)
    this.renderPerson = this.renderPerson.bind(this)
    this.renderPeople = this.renderPeople.bind(this)
  }

  onPress = (item) => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('Detail', {item: item})
  }

  renderPerson(item) {
    return (< ListItem
        key={item.name}
        title={item.name}
        subtitleNumberOfLines={3}
        rightIcon={{uri: item.avatar_url}}
        onPress={() => this.onPress(item)}
        component={TouchableScale}
        roundAvatar
        chevronColor={'red'}
        avatar={{ uri: item.avatar_url }}
    />)
  }

  renderPeople = () => {
    return list.map((p) => (
        this.renderPerson(p)
    ))
  }
qq
  render() {
    return (
        <View>
        <List>
          {this.renderPeople()}
        </List>
          <Button
              icon={
                <Icon
                    name='arrow-right'
                    size={15}
                    color='white'
                />
              }
              title='BUTTON WITH RIGHT ICON'
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black'
  }
})
export default FeedScreen
