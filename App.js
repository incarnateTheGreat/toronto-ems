import React from 'react';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';
import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './containers/HomeScreen';
import SettingsScreen from './containers/SettingsScreen';
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
					<RouterNav />
				)
			}
		</AppContainer>
    );
  }
}

const RouterNav = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Settings: {
    screen: SettingsScreen
  }
});

// Styled Components
const AppContainer = styled.View`
    background-color: #7EABCC;
    flex: 1;
    flexDirection: column;
    paddingTop: ${Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight};
`;
