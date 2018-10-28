import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Card,
         Content,
         List,
         ListItem } from 'native-base';

import { buildDateString,
         validateCrossStreets,
         isEmpty } from '../helpers/helpers';

export default class EMSReportList extends React.Component {
    navigate(data) {
        const { navigate } = this.props.navigation;
        navigate('Settings', { data });
    }

    getStreetData() {
        const { cross_streets,
                prime_street } = this.props.data;

        let searchAttr = null;

        // Determine appropriate data to be used.
		if (validateCrossStreets(cross_streets)) {					
			searchAttr = cross_streets.includes('/') ? cross_streets.replace(' / ', ' and ') : cross_streets;
		} else {
            searchAttr = prime_street;
        }

        return searchAttr;
    }
 
    render() {
        const { dispatch_time,
                event_num,
                event_type,
                prime_street } = this.props.data;

        // Get Date String
        const dateString = buildDateString(dispatch_time, true);         

        return (
            <TouchableOpacity key={event_num} onPress={() => this.navigate(this.props.data)}>
                <ListContainer>
                    <Content padder>
                        <NewCard pointerEvents="none">
                            <List>
                                { !isEmpty(event_type) && (
                                    <NewListItem>
                                        <ListContainerHeadline>{event_type}</ListContainerHeadline>
                                        <Details>
                                            <DetailsTitle>Area:</DetailsTitle>
                                            <DetailsText>{this.getStreetData()}</DetailsText>
                                        </Details> 
                                    </NewListItem>
                                )}
                            </List>
                        </NewCard>
                    </Content>
                </ListContainer>
            </TouchableOpacity>
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