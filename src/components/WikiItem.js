import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class SingleItem extends React.Component {

  state = {
    imageUri: '',
    title: ''
  };

  constructor(props){
    super(props);
  }

  sendToEvent = () => {
    console.log('sending to event');
    console.log(this.props.navigation);
    console.log('success');
    // this.props.navigation.navigate('Event', {item: this.props.item.item});
  };

  render() {
    return(
        <TouchableOpacity onPress={()=>this.sendToEvent()} style={styles.itemContainer}>

          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.itemName}>
              Daniel Poznanski mistrz swiata i okolic
              {/*{this.props.item.item.title}*/}
            </Text>
            {/*<Icons labels={this.props.item.item.labels} />*/}
          </View>

        </TouchableOpacity>);
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    // borderWidth: 8,
    // borderRadius: 20,
    // margin: 20,
    // borderColor: 'blue',

  },
  itemContainer: {
    height: 60,
    display: 'flex',
    borderRadius: 10,
    marginTop: 5,
    width: 300,
    opacity: 0.95,
  },
  itemName: {
    height: 60,
    lineHeight: 60,
    flex: 1,
    backgroundColor: 'red',
  },

});

