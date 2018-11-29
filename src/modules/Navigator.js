import HomeScreen from '../screens/HomeScreen'
import FeedScreen from '../screens/FeedScreen'
import LoginScreen from '../screens/LoginScreen'
import WikiScreen from '../screens/WikiScreen'
import SplashScreen from '../screens/SplashScreen'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'

const StackNavigator = createStackNavigator(
    {
      Main: {screen: FeedScreen},
      Detail: {screen: WikiScreen}
    },
    {
      initialRouteName: 'Main'
    }
)
const TabNavigator = createBottomTabNavigator(
    {
      Home: {screen: HomeScreen},
      Feed: StackNavigator,
    },
    {
      initialRouteName: 'Feed',
    }
);


export default createSwitchNavigator(
    {
      App: TabNavigator,
      Login: LoginScreen,
      Splash: SplashScreen,
    },
    {
      initialRouteName: 'Splash'
    }
)
