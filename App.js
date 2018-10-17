import React from 'react';
import { Platform,
         StyleSheet,
         View } from 'react-native';

import Header from './components/Header'
import EMSData from './components/EMSData'
import Splash from './components/Splash'

export default class App extends React.Component {
  constructor() {
    super();

    this.state ={
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View>
            <Splash />
          </View>
        ) : (
          <View style={styles.thing}>
            <Header />
            <EMSData />
          </View>
        )}
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
  thing: {
      display: 'flex',
      height: '100%'
  }
});
