import React from 'react';
import styled from 'styled-components/native';

export default class Header extends React.Component {
    render() {
        return (
            <HeaderContainer>
                <HeaderText>Toronto EMS Reports</HeaderText>
            </HeaderContainer>
        )
    }
}

// Styled Components
const HeaderContainer = styled.View`
    background-color: #064e80;
    padding: 10px;
`;

const HeaderText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 26px;
`;