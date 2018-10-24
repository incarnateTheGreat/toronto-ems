import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native';
import { List,
         ListItem } from 'native-base';

import { buildDateString, 
         isEmpty } from '../helpers/helpers';
import MenuNav from '../components/MenuNav';

export default class EMSReport extends Component {
    constructor() {
        super();

        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    render() {
		const { alarm_lev,
			beat,
			cross_streets,
			dispatch_time,
			event_num,
			event_type,
			prime_street,
			units_disp } = this.props.navigation.state.params.data;

		// Get Date String
		const dateString = buildDateString(dispatch_time, true);         

		return (
			<AppView>
				<MenuNav navigation={this.props.navigation} />
					<MapCard>
						<MapContainer>
							<MapViewContainer
								provider={PROVIDER_GOOGLE}
								initialRegion={this.state.region}
								ref={map => this.map = map}
							/>
						</MapContainer>
					</MapCard>
					<ScrollView>
						<InfoCard>
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
									{ !isEmpty(beat) && (
										<ListItem>
											<Details>
												<DetailsTitle>Beat:</DetailsTitle>
												<DetailsText>{beat}</DetailsText>
											</Details>
										</ListItem>
									)}
									{ !isEmpty(units_disp) && (
										<ListItem>
											<Details>
												<DetailsTitle>Units Dispatched:</DetailsTitle>
												<DetailsText>{units_disp}</DetailsText>
											</Details>
										</ListItem>
									)}
								</List>
						</InfoCard>
					</ScrollView>
			</AppView>
		)
	}
}

// Styled Components (Map)
const MapContainer = styled(View)`
	align-items: center;
	bottom: 0;
	justify-content: flex-end;
	left: 0;
	right: 0;
	position: absolute;
	top: 0;
`;

const MapViewContainer = styled(MapView)`
	bottom: 0;
	left: 0;
	right: 0;
	position: absolute;
	top: 0;
`;

const AppView = styled.View`
    display: flex;
    height: 100%;
`;

const MapCard = styled(View)`
    display: flex;
    height: 35%;
`;

const InfoCard = styled(View)`
    display: flex;
    background-color: #EBEBEB;
`;

// Styled Components (EMSReport)
const NewListItem = styled(ListItem)`
    align-items: flex-start;
    flex-direction: column;
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


const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffeb3b"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]