import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native';
import Geocoder from 'react-native-geocoding';
import { List,
         ListItem } from 'native-base';

import { buildDateString,
		 validateCrossStreets, 
         isEmpty } from '../helpers/helpers';
import MenuNav from '../components/MenuNav';
import { LIST_OF_TORONTO_CODES } from '../constants/constants';

const FIRE_STATIONS = require('../data/firestationLocations.json');

export default class EMSReport extends Component {
    constructor() {
        super();

        this.state = {
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
			},
			markers: {
				coordinates: {
					latitude: null,
					longitude: null
				},
				title: null,
				description: null
			}
        }
	}
	
	componentDidMount() {		
		/*
			Priority goes as follows:
			1) If Cross Street is either blank or unusable, then,
			2) use Closest Station. If THIS is blank or unusable, then,
			3) do not show a Map.
		*/

		const { cross_streets,
				beat } = this.props.navigation.state.params.data;

		let searchAttr = null;

		// Init Geocoder.
		Geocoder.setApiKey('AIzaSyCnLLSYZgjSeCReaKlGAJJntl61AIYL81g');

		const closestStation = FIRE_STATIONS.find(station => beat === station.Beat);

		// Determine appropriate data to be used.
		if (validateCrossStreets(cross_streets)) {					
			searchAttr = cross_streets.includes('/') ? cross_streets.replace(' / ', ' and ') : cross_streets;
		} 
		
		// If the Cross Streets data isn't usable, then use the Beat Location.
		if (!searchAttr) {
			searchAttr = closestStation.Address;
		}

		Geocoder.from(`${searchAttr}, Toronto`).then(json => {
			const { lat, lng } = json.results.length > 0 ? json.results.shift().geometry.location : null;

			this.setState({
				region: {
					latitude: lat,
					longitude: lng,
					latitudeDelta: 0.0335,
                	longitudeDelta: 0.0335
				},
				marker: {
					coordinates: {
						latitude: lat,
						longitude: lng
					}
				}
			})
		}).catch(error => console.warn(error));
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
							{this.state.region.latitude && (
								<MapViewContainer
									enableZoomControl={true}
									initialRegion={this.state.region}
									provider={PROVIDER_GOOGLE}
									ref={map => this.map = map}
								>
									<MapView.Circle
										center={this.state.marker.coordinates}
										fillColor="rgba(128, 191, 255, 0.2)"
										radius={500}
										strokeWidth={2}
										strokeColor="#3399ff"
									/>
								</MapViewContainer>
							)}
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