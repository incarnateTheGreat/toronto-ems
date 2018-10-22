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
                <NewHeader>
                    <Left>
                        <Button transparent>
                            <NewIcon name='menu' 
                                  onPress={() => dispatch(DrawerActions.toggleDrawer())} />
                        </Button>
                    </Left>
                    <NewBody>
                        <HeaderText>Toronto EMS</HeaderText>
                    </NewBody>
                    <Right />
                </NewHeader>
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

const NewHeader = styled(Header)`
    background-color: #094573;
`;

const NewIcon = styled(Icon)`
    color: #FFF;
`;

const NewBody = styled(Body)`
    flex: 2;
`;