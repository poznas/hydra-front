import { View } from 'react-native'
import React, { Component } from 'react'
import { Button, ListItem } from 'react-native-elements'
import uuid from 'uuid/v4'
import TouchableScale from 'react-native-touchable-scale'
import { BackendConnector } from '../connectors/BackendConnector'

class WikiEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upVotes: 0,
      downVotes: 0,
      upVotedAlready: false,
      downVotedAlready: false
    }
  }

  componentWillMount() {
    this.setState(
      { upVotes: this.props.upVotes, downVotes: this.props.downVotes })
  }

  vote = async (id, value) => {
    if (value === 'UP') {
      if (!this.state.upVotedAlready) {
        if (this.state.downVotedAlready) {
          this.setState({
            upVotes: this.state.upVotes + 1,
            downVotes: this.state.downVotes - 1,
            upVotedAlready: true,
            downVotedAlready: false
          })
        }
        else {
          this.setState({ upVotes: this.state.upVotes + 1, upVotedAlready: true })
        }
      }
    } else {
      if (!this.state.downVotedAlready) {
        if (this.state.upVotedAlready) {
          this.setState({
            upVotes: this.state.upVotes - 1,
            downVotes: this.state.downVotes + 1,
            downVotedAlready: true,
            upVotedAlready: false
          })
        } else {
          this.setState({ downVotes: this.state.downVotes + 1, downVotedAlready: true })
        }
      }
    }
    const data = {
      informationId: id,
      vote: value
    }
    await BackendConnector.voteWikiInfo(data)
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <ListItem
          key={uuid()}
          title={this.props.title}
          subtitle={this.props.subtitle}
          rightTitle={Number(this.props.ratio).toFixed(2)}
          subtitleNumberOfLines={6}
          component={TouchableScale}
          hideChevron={true}
        />
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Button buttonStyle={{ backgroundColor: 'green', width: 60 }}
                  onPress={() => this.vote(this.props.id, 'UP')}
                  icon={{
                    type: 'font-awesome',
                    name: 'thumbs-up',
                    color: 'white'
                  }}
                  title={this.state.upVotes.toString()}/>
          <Button buttonStyle={{ backgroundColor: 'red', width: 60 }}
                  onPress={() => this.vote(this.props.id, 'DOWN')}
                  icon={{
                    type: 'font-awesome',
                    name: 'thumbs-down',
                    color: 'white'
                  }}
                  title={this.state.downVotes.toString()}
          />
        </View>
      </View>
    )
  }
}

export default WikiEntry

