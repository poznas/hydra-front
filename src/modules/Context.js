import React, {Component} from 'react'
import Storage from './AsyncStorage'

export const Context = React.createContext({
  token: '',
  setToken: () => {
  },
})

export class ContextProvider extends Component {

  constructor() {
    super()
    this.state = {
      token: '',
    }
  }

  setToken = (token) => {
    Storage.storeItem(token);
    console.log('setToken called');
    this.setState({token: token})
  }

  render() {
    return (
      <Context.Provider
        value={{
          token: this.state.token,
          setToken: this.setToken,
        }}
        children={this.props.children}
      />
    )
  }
}
