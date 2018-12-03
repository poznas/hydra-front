import HomeScreen from '../screens/HomeScreen'
import WikiMainScreen from '../screens/WikiMainScreen'
import LoginScreen from '../screens/LoginScreen'
import WikiCompanyScreen from '../screens/WikiCompanyScreen'
import SplashScreen from '../screens/SplashScreen'
import FormScreen from '../screens/FormScreen'
import wrapScreenWithContext from '../utils/wrapScreenWithContext'


import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'

const StackNavigator = createStackNavigator(
    {
      Main: {screen: wrapScreenWithContext(WikiMainScreen)},
      Detail: {screen: wrapScreenWithContext(WikiCompanyScreen)},
      Form: {screen: FormScreen}
    },
    {
      initialRouteName: 'Main'
    }
)
const TabNavigator = createBottomTabNavigator(
    {
      Home: {screen: HomeScreen},
      Wiki: StackNavigator,
    },
    {
      initialRouteName: 'Wiki',
    }
);

export default createSwitchNavigator(
    {
      App: TabNavigator,
      Login: LoginScreen,
      Splash: wrapScreenWithContext(SplashScreen),
    },
    {
      initialRouteName: 'Splash'
    }
)
