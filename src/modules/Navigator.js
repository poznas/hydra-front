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
import CreateReferralScreen from '../screens/referral/CreateReferralScreen'
import ReferralDetailsScreen from '../screens/referral/ReferralDetailsScreen'
import ReferralApplicationsScreen from '../screens/referral/ReferralApplicationsScreen'

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
    Detail: JobDetailsScreen.navigatorProps,
    Form: {
      screen: wrapScreenWithContext(AddJobScreen),
      navigationOptions: { headerTitle: 'Add Job' },
    },
    ReferralForm: {
      screen: wrapScreenWithContext(CreateReferralScreen),
      navigationOptions: { headerTitle: 'Add Referral' },
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
    Detail: {
      screen: wrapScreenWithContext(ReferralDetailsScreen),
      navigationOptions: { headerTitle: 'Referral' },
    },
    JobDetail: JobDetailsScreen.navigatorProps,
    Applications: {
      screen: wrapScreenWithContext(ReferralApplicationsScreen),
      navigationOptions: { headerTitle: 'Applications' },
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
