import HomeScreen from '../screens/HomeScreen'
import FeedScreen from '../screens/FeedScreen'
import { createBottomTabNavigator } from 'react-navigation'

export default createBottomTabNavigator(
    {
      Home: {screen: HomeScreen},
      Feed: {screen: FeedScreen},
    },
    {
      initialRouteName: 'Home',
    }
);
