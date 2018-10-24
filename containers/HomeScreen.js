import React from 'react';
import styled from 'styled-components/native';

import MenuNav from '../components/MenuNav';
import EMSData from './EMSData';

export default class HomeScreen extends React.Component {
  render() {      
    return (
        <AppView>
            <MenuNav navigation={this.props.navigation} />
            <EMSData navigation={this.props.navigation} />
        </AppView>
    );
  }
}

// Styled Components
const AppView = styled.View`
    display: flex;
    height: 100%;
    margin: 0;
`;
