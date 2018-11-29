import HomeScreen from '../screens/HomeScreen'
import WikiMainScreen from '../screens/WikiMainScreen'
import LoginScreen from '../screens/LoginScreen'
import WikiCompanyScreen from '../screens/WikiCompanyScreen'
import SplashScreen from '../screens/SplashScreen'
import FormScreen from '../screens/FormScreen'

import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'

const StackNavigator = createStackNavigator(
    {
      Main: {screen: WikiMainScreen},
      Detail: {screen: WikiCompanyScreen},
      Form: {screen: FormScreen}
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
