import { Context } from '../modules/Context'
import React from 'react'

const WrapScreenWithContext = (ComponentToBeLoaded) => (props) => {
  return (
    <Context.Consumer>{
      context => (<ComponentToBeLoaded {...context} {...props} />)
    }
    </Context.Consumer>
  )
}

export default WrapScreenWithContext
