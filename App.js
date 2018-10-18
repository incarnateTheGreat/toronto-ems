import React from 'react';
import { Platform,
         StyleSheet,
         View } from 'react-native';
import styled from 'styled-components/native';

import EMSData from './containers/EMSData';
import Header from './components/Header';
import Splash from './components/Splash';

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
      <AppContainer>
        {this.state.isLoading ? (
          <View>
            <Splash />
          </View>
        ) : (
          <AppView>
            <Header />
            <EMSData />
          </AppView>
        )}
      </AppContainer>
    );
  }
}

// Styled Components
const AppContainer = styled.View`
    background-color: #7EABCC;
    flex: 1;
    flexDirection: column;
    paddingTop: ${Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight};
`;

const AppView = styled.View`
    display: flex;
    height: 100%;
`;
