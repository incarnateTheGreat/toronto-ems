import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Body,
         Button,
         Header, 
         Left, 
         Icon, 
         Right } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

export default class MenuNav extends React.Component {
    render() {
        const { dispatch } = this.props.navigation;

        return (
            <View>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' onPress={() => dispatch(DrawerActions.toggleDrawer())} />
                        </Button>
                    </Left>
                    <Body>
                        <HeaderText>Toronto EMS</HeaderText>
                    </Body>
                    <Right />
                </Header>
            </View>
        )
    }
}

// Styled Components
const HeaderText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 26px;
`;