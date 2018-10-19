import React from 'react';
import styled from 'styled-components/native';
import { Image,
         StyleSheet } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <Container>
        <Image
            source={require('../assets/splash.png')}
            style={styles.image}
        />
      </Container>
    );
  }
}

// Styled Components

const Container = styled.View`
  align-items: center;
  background-color: #7EABCC;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const styles = StyleSheet.create({
  image: {
      resizeMode: 'contain',
      width: '75%'
  }
});
