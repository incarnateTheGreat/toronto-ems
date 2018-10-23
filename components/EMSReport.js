import React from 'react';
import styled from 'styled-components/native';
import { Card,
         Content,
         List,
         ListItem } from 'native-base';

import { buildDateString, 
         isEmpty } from '../helpers/helpers';

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
        const dateString = buildDateString(dispatch_time, true);

        return (
            <ListContainer>
                <Content padder>
                    <NewCard>
                        <List>
                            { !isEmpty(event_type) && (
                                <NewListItem>
                                    <ListContainerHeadline>{event_type}</ListContainerHeadline>
                                    { !isEmpty(prime_street) ? 
                                        <Details>
                                            <DetailsTitle>Postal Code/Primary Street:</DetailsTitle>
                                            <DetailsText>{prime_street}</DetailsText>
                                        </Details> : null 
                                    }
                                </NewListItem>
                            )}
                            { !isEmpty(dispatch_time) && (
                                <ListItem>
                                    <Details>
                                        <DetailsTitle>Dispatch time:</DetailsTitle>
                                        <DetailsText>{dateString}</DetailsText>
                                    </Details>
                                </ListItem>
                            )}
                            { !isEmpty(cross_streets) && (
                                <ListItem>
                                    <Details>
                                        <DetailsTitle>Cross Streets:</DetailsTitle>
                                        <DetailsText>{cross_streets}</DetailsText>
                                    </Details>
                                </ListItem>
                            )}
                            { !isEmpty(alarm_lev) && (
                                <ListItem>
                                    <Details>
                                        <DetailsTitle>Alarm Level:</DetailsTitle>
                                        <DetailsText>{alarm_lev}</DetailsText>
                                    </Details>
                                </ListItem>
                            )}
                            { !isEmpty(event_num) && (
                                <ListItem>
                                    <Details>
                                        <DetailsTitle>Event Number:</DetailsTitle>
                                        <DetailsText>{event_num}</DetailsText>
                                    </Details>
                                </ListItem>
                            )}
                        </List>
                    </NewCard>
                </Content>
            </ListContainer>
        )
    }
}

// Styled Components
const ListContainer = styled.View`
    background-color: transparent;
`;

const NewListItem = styled(ListItem)`
    align-items: flex-start;
    flex-direction: column;
`;

const NewCard = styled(Card)`
    background-color: #EBEBEB;
`;

const ListContainerHeadline = styled.Text`
    font-size: 26px;
    font-weight: bold;
    padding: 0 0 10px;
`;

const Details = styled.View`
    flex: 1;
    flex-direction: row;
`;

const DetailsTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const DetailsText = styled.Text`
    font-size: 16px;
    flex: 1;
    flex-shrink: 1;
    padding: 0 0 0 5px;
`;