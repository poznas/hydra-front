import JobScreen from '../screens/job/JobScreen'
import LoginScreen from '../screens/LoginScreen'
import WikiCompanyScreen from '../screens/wiki/WikiCompanyScreen'
import WikiScreen from '../screens/wiki/WikiScreen'
import SplashScreen from '../screens/SplashScreen'
import AddWikiInfoScreen from '../screens/wiki/AddWikiInfoScreen'
import wrapScreenWithContext from '../utils/wrapScreenWithContext'

import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import JobDetailsScreen from '../screens/job/JobDetailsScreen'
import AddJobScreen from '../screens/job/AddJobScreen'
import ReferralScreen from '../screens/referral/ReferralScreen'

const WikiStackNavigator = createStackNavigator(
  {
    Main: { screen: wrapScreenWithContext(WikiCompanyScreen) },
    Detail: { screen: wrapScreenWithContext(WikiScreen) },
    Form: { screen: wrapScreenWithContext(AddWikiInfoScreen) },
  },
  {
    initialRouteName: 'Main',
  }
)

const JobStackNavigator = createStackNavigator(
  {
    Main: {
      screen: wrapScreenWithContext(JobScreen),
      navigationOptions: { headerTitle: 'Jobs' },
    },
    Detail: {
      screen: wrapScreenWithContext(JobDetailsScreen),
      navigationOptions: ({ navigation }) => {
        return {
          title: navigation.getParam('job', {}).title,
        }
      },
    },
    Form: {
      screen: wrapScreenWithContext(AddJobScreen),
      navigationOptions: { headerTitle: 'Add Job' },
    },
  },
  {
    initialRouteName: 'Main',
  }
)

const ReferralStackNavigator = createStackNavigator(
  {
    Main: {
      screen: wrapScreenWithContext(ReferralScreen),
      navigationOptions: { headerTitle: 'Referral' },
    },
  },
  {
    initialRouteName: 'Main',
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Wiki: WikiStackNavigator,
    Job: JobStackNavigator,
    Referral: ReferralStackNavigator,
  },
  {
    initialRouteName: 'Wiki',
  }
)

export default createSwitchNavigator(
  {
    App: TabNavigator,
    Login: LoginScreen,
    Splash: wrapScreenWithContext(SplashScreen),
  },
  {
    initialRouteName: 'Splash',
  }
)
