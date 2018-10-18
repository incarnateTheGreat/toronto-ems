import React from 'react';
import { StyleSheet,
         Text,
         View } from 'react-native';
import styled from 'styled-components/native';

import { buildDateString } from '../helpers/helpers';

export default class EMSReport extends React.Component {
    render() {
        const { alarm_lev,
            beat,
            cross_streets,
            dispatch_time,
            event_num,
            event_type,
            prime_street,
            units_disp } = this.props.data;

        // Get Date String
        const dateString = buildDateString(dispatch_time);

        return (
            <ListContainer>
                { event_type ? <Text style={styles.listContainer_headerText}>{event_type}</Text> : null }
                { prime_street || prime_street === '' ? 
                    <Details>
                        <DetailsTitle>Postal Code/Primary Street:</DetailsTitle>
                        <DetailsText>{prime_street}</DetailsText>
                    </Details> : null }
                { dispatch_time ? 
                    <Details>
                        <DetailsTitle>Dispatch time:</DetailsTitle>
                        <DetailsText>{dateString}</DetailsText>
                    </Details> : null }
                { cross_streets ? 
                    <Details>
                        <DetailsTitle>Cross Streets:</DetailsTitle>
                        <DetailsText>{cross_streets}</DetailsText>
                    </Details> : null }
                { alarm_lev ? 
                    <Details>
                        <DetailsTitle>Alarm Level:</DetailsTitle>
                        <DetailsText>{alarm_lev}</DetailsText>
                    </Details> : null }
                { event_num ? 
                <Details>
                    <DetailsTitle>Event Number:</DetailsTitle>
                    <DetailsText>{event_num}</DetailsText>
                </Details> : null }
            </ListContainer>
        )
    }
}

// Styled Components
const ListContainer = styled.View`
    border-bottom-width: ${StyleSheet.hairlineWidth};
    border-style: solid;
    padding: 10px;
    width: 100%;
`;

const Details = styled.View`
    flex: 1;
    flex-direction: row;
`;

const DetailsTitle = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
`;

const DetailsText = styled.Text`
    color: #FFF;
    font-size: 16px;
    padding: 0 0 0 5px;
`;

const styles = StyleSheet.create({
    listContainer_headerText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    restaurantName: {
        fontWeight: 'bold'
    }
})