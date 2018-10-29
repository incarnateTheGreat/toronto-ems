import React from 'react';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';
import { Root } from "native-base";
import { Font } from "expo";
import { createDrawerNavigator,
         createStackNavigator } from 'react-navigation';

import HomeScreen from './containers/HomeScreen';
import EMSReport from './containers/EMSReport';
import Splash from './components/Splash';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
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

const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index];
  const outputOpacity = [0, 1];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });

  return {
    opacity: transition
  }
}

const SlideTransition = (index, position, width) => {
  const sceneRange = [index - 1, index];
  const outputChange = [width, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputChange
  });

  return {
    transform: [{ translateX: transition }]
  }
}

const NavigationConfig = () => {
  return {
    screenInterpolator: (screenProps) => {      
      const { position, scene, layout } = screenProps;
      const { initWidth } = layout;
      const index = scene.index;

      return SlideTransition(index, position, initWidth);
    }
  }
}

// const RouterNav = createDrawerNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Settings: {
//     screen: SettingsScreen
//   }
// }, {
//   transitionConfig: NavigationConfig
// });

const RouterNav = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Settings: {
    screen: EMSReport
  }
}, {
  headerMode: 'none',
  transitionConfig: NavigationConfig
})

// Styled Components
const AppContainer = styled(View)`
    flex: 1;
    flexDirection: column;
    paddingTop: ${Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight};
`;
