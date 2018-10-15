import React from 'react';
import { Platform,
         StyleSheet,
         View } from 'react-native';

import Header from './components/Header'
import EMSData from './components/EMSData'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <EMSData />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7EABCC',
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  },
});
