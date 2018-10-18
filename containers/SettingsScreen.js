import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content } from 'native-base';
import styled from 'styled-components/native';

import MenuNav from '../components/MenuNav';

export default class SettingsScreen extends Component {
    render() {
        return (
            <AppView>
                <MenuNav navigation={this.props.navigation} />
                <Content>
                    <Text>Settings!</Text>
                </Content>
            </AppView>
        )
    }
}

// Styled Components
const AppView = styled.View`
    display: flex;
    height: 100%;
`;