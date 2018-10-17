import React from 'react';
import { Image,
         StyleSheet,
         View } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require('../assets/logo2.png')}
            style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center'
  },
  image: {
      resizeMode: 'contain',
      width: '75%'
  }
});
