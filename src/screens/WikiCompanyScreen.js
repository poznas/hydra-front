import { Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Button, Header, List, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

const list = [
  {
    name: 'Daniel Poznanski',
    avatar_url: 'https://polki.pl/foto/4_3_SMALL/pocieszny-maluch-czy-odwazny-obronca-poznaj-charakterystyke-jamnika-i-dowiedz-sie-jak-sie-nim-opiekowac-2389522.jpg',
    description: 'Poznas bardzo lubi tam pracowac 10/10'
  },
  {
    name: 'Józef Piłsudski',
    avatar_url: 'https://pbs.twimg.com/profile_images/639599645925076994/7Egv8qXQ.jpg',
    description: 'Difference between LinkedList and ArrayList \n What type of Sets exist in Java \n What is inheritance \n What is encapsulation \n What are abstract classes \n What is an interface'
  },
  {
    name: 'Roman Dmowski',
    avatar_url: 'https://pbs.twimg.com/profile_images/639599645925076994/7Egv8qXQ.jpg',
    description: 'Difference between LinkedList and ArrayList \n What type of Sets exist in Java \n What is inheritance \n What is encapsulation \n What are abstract classes \n What is an interface'
  },
  {
    name: 'Tadeusz Kosciuszko',
    avatar_url: 'https://pbs.twimg.com/profile_images/639599645925076994/7Egv8qXQ.jpg',
    description: 'Difference between LinkedList and ArrayList \n What type of Sets exist in Java \n What is inheritance \n What is encapsulation \n What are abstract classes \n What is an interface'
  },
  {
    name: 'Michal Dziedzic4',
    avatar_url: 'https://pbs.twimg.com/profile_images/639599645925076994/7Egv8qXQ.jpg',
    description: 'Difference between LinkedList and ArrayList \n What type of Sets exist in Java \n What is inheritance \n What is encapsulation \n What are abstract classes \n What is an interface'
  },
  {
    name: 'Bartosz Śliwa',
    avatar_url: 'https://static1.squarespace.com/static/573b62e9746fb941c1458dcd/t/58bf1f27d1758e5d0c580379/1488921550603/who-we-are.jpg',
    description: 'Michas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10\nMichas bardzo lubi tam pracowac 10/10'
  },
  {
    name: 'Ole Pierdole',
    avatar_url: 'https://vignette.wikia.nocookie.net/pokemon/images/2/21/001Bulbasaur.png/revision/latest?cb=20140328190757',
    description: 'Michas bardzo lubi tam pracowac 10/10'
  },
]


class WikiScreen extends Component {
  constructor(props){
    super(props);
  }

  renderItem(item) {
    return (< ListItem
        key={item.name}
        title={item.name}
        subtitle={item.description}
        subtitleNumberOfLines={6}
        component={TouchableScale}
        roundAvatar
        avatar={{ uri: item.avatar_url }}
    />)
  }

  renderList = (items) => {
    return items.map((p) => (
        this.renderItem(p)
    ))
  }

  render() {
    const item = this.props.navigation.getParam('item', {});
    console.log(item);
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Header
              centerComponent={{ text: item.name, style: { color: '#fff' } }}
              backgroundColor={'#000000'}
          />
          <ScrollView>
          <List>
            {this.renderList(list)}
          </List>
          </ScrollView>
          <Button
              icon={{type:'font-awesome', name: 'plus-circle'}}
              onPress={() => this.props.navigation.navigate('Form')}
              backgroundColor={'#000000'}
          />
        </View>
    );
  }
}

export default WikiScreen;
