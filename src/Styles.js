import { StyleSheet } from 'react-native'

export const Styles = StyleSheet.create({
  listScreen: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  detailsScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 16,
  },
  scrollDetailsScreen: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleText: {
    fontSize: 20,
  },
  subtitleText: {
    fontSize: 18,
  },
  headerText: {
    marginTop: 16,
    fontSize: 16,
  },
  normalText: {
    fontSize: 12,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})
