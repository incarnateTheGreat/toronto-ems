import React from 'react';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';
import { Root } from "native-base";
import { Font } from "expo";
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
	Font.loadAsync({
		Roboto: require("native-base/Fonts/Roboto.ttf"),
		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
	});

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    return (
		<Root>
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
		</Root>
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
    flex: 1;
    flexDirection: column;
    paddingTop: ${Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight};
`;
