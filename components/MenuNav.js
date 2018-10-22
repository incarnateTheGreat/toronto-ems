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
                <Header noRight='true' style={{ backgroundColor: '#094573' }}>
                    <Left>
                        <Button transparent>
                            <Icon style={{ color: '#FFF' }}
                                  name='menu' 
                                  onPress={() => dispatch(DrawerActions.toggleDrawer())} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 2 }}>
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
    display: flex;
    font-weight: bold;
    font-size: 26px;
`;