import React, {Component} from 'react';
import { FlatList } from 'react-native';
import Item from './WikiItem'


export default class List extends React.Component {
  constructor(props){
    super(props)

  }

  renderItem = (item) => <Item navigation={this.props.navigation} item={item} />;

  assingItem = (item) => {
    console.log(item);
    return item.toString();
  }
  // onEndReachedCalledDuringMomentum = false;
  // onEndReached = () => {
  //   if (!this.onEndReachedCalledDuringMomentum) {
  //     this.props.onEndReached();
  //     this.onEndReachedCalledDuringMomentum = true;
  //   }
  // };


  render(){
    return(
        <FlatList
            data={[1,2,3]}
            style={{flex:1}}
            containterStyle={{marginBottom: 20, backgroundColor: 'blue'}}
            renderItem={this.renderItem}
            keyExtractor={this.assingItem}
        />
    )
  }

}
