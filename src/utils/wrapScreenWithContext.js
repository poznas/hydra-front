import { Context } from '../modules/Context'
import React from 'react'
import SplashScreen from '../screens/SplashScreen'

const WrapScreenWithContext = (ComponentToBeLoaded) => (props) => {
  return (
      <Context.Consumer>{
        context => (<ComponentToBeLoaded {...context} {...props} />)
      }
      </Context.Consumer>
  )
}

export default WrapScreenWithContext
