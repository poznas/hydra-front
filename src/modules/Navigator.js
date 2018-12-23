import JobMainScreen from '../screens/job/JobMainScreen'
import WikiMainScreen from '../screens/wiki/WikiMainScreen'
import LoginScreen from '../screens/LoginScreen'
import WikiCompanyScreen from '../screens/wiki/WikiCompanyScreen'
import SplashScreen from '../screens/SplashScreen'
import FormScreen from '../screens/wiki/FormScreen'
import wrapScreenWithContext from '../utils/wrapScreenWithContext'


import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import JobDetailsScreen from '../screens/job/JobDetailsScreen'
import ApplyScreen from '../screens/job/ApplyScreen'
import AddJobScreen from '../screens/job/AddJobScreen'

const WikiStackNavigator = createStackNavigator(
    {
      Main: {screen: wrapScreenWithContext(WikiMainScreen)},
      Detail: {screen: wrapScreenWithContext(WikiCompanyScreen)},
      Form: {screen: wrapScreenWithContext(FormScreen)}
    },
    {
      initialRouteName: 'Main'
    }
)

const JobStackNavigator = createStackNavigator(
    {
      Main: {screen: wrapScreenWithContext(JobMainScreen)},
      Detail: {screen: wrapScreenWithContext(JobDetailsScreen)},
      Form: {screen: wrapScreenWithContext(AddJobScreen)}
    },
    {
      initialRouteName: 'Main'
    }
)


const TabNavigator = createBottomTabNavigator(
    {
      Job: JobStackNavigator,
      Wiki: WikiStackNavigator,
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
