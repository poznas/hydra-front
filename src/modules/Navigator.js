import HomeScreen from '../screens/HomeScreen'
import FeedScreen from '../screens/FeedScreen'
import LoginScreen from '../screens/LoginScreen'
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'

const TabNavigator = createBottomTabNavigator(
    {
      Home: {screen: HomeScreen},
      Feed: {screen: FeedScreen},
    },
    {
      initialRouteName: 'Home',
    }
);


export default createSwitchNavigator(
    {
      App: TabNavigator,
      LoginScreen: LoginScreen,
    },
    {
      initialRouteName: 'LoginScreen',
    }
)
