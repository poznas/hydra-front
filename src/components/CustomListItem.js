import {View} from 'react-native'
import React, {Component} from 'react'
import {Button, ListItem} from 'react-native-elements'
import uuid from 'uuid/v4'
import TouchableScale from 'react-native-touchable-scale'
import axios from 'axios'
import {BASE_URL} from 'react-native-dotenv'

class CustomListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upvotes: 0,
      downvotes: 0,
      upvotedAlready: false,
      downvotedAlready: false
    }
  }

  componentWillMount() {
    this.setState(
      {upvotes: this.props.upvotes, downvotes: this.props.downvotes})
  }

  vote = async (id, value) => {
    if (value === 'UP') {
      if (!this.state.upvotedAlready) {
        if (this.state.downvotedAlready) {
          this.setState({
            upvotes: this.state.upvotes + 1,
            downvotes: this.state.downvotes - 1,
            upvotedAlready: true,
            downvotedAlready: false
          })
        }
        else {
          this.setState({upvotes: this.state.upvotes + 1, upvotedAlready: true})
        }
      }
    } else {
      if (!this.state.downvotedAlready) {
        if (this.state.upvotedAlready) {
          this.setState({
            upvotes: this.state.upvotes - 1,
            downvotes: this.state.downvotes + 1,
            downvotedAlready: true,
            upvotedAlready: false
          })
        } else {
          this.setState({downvotes: this.state.downvotes + 1, downvotedAlready: true})
        }
      }
    }


    const url = [BASE_URL, '/wiki/recruitment/info/vote'].join('')
    const data = {
      informationId: id,
      vote: value
    }
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }
    }
    await axios.post(url, data, params)
  }

  render() {
    return (
      <View style={{flex: 1,}}>
        <ListItem
          key={uuid()}
          title={this.props.title}
          subtitle={this.props.subtitle}
          rightTitle={this.props.ratio.toString()}
          subtitleNumberOfLines={6}
          component={TouchableScale}
          hideChevron={true}
        />
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Button buttonStyle={{backgroundColor: 'green', width: 60}}
                  onPress={() => this.vote(this.props.id, 'UP')}
                  icon={{
                    type: 'font-awesome',
                    name: 'thumbs-up',
                    color: 'white'
                  }}
                  title={this.state.upvotes.toString()}/>
          <Button buttonStyle={{backgroundColor: 'red', width: 60}}
                  onPress={() => this.vote(this.props.id, 'DOWN')}
                  icon={{
                    type: 'font-awesome',
                    name: 'thumbs-down',
                    color: 'white'
                  }}
                  title={this.state.downvotes.toString()}
          />
        </View>
      </View>
    )
  }
}

export default CustomListItem

