import React, { Component } from 'react';
import { View, Button, Icon } from 'react-native';
import { ScrollView } from 'react-native';
import MapView from 'react-native-maps';
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
			initialRegion: {
				latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
			},
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
				initialRegion: {
					latitude: lat,
					longitude: lng,
					latitudeDelta: 0.0335,
                	longitudeDelta: 0.0335
				},
				region: {
					latitude: lat,
					longitude: lng,
					latitudeDelta: 0.0335,
                	longitudeDelta: 0.0335
				},
				markers: {
					coordinates: {
						latitude: lat,
						longitude: lng
					}
				}
			})
		}).catch(error => console.warn(error));
	}

	onPressZoomIn() {
		this.setState({
			region: {
				latitude: this.state.region.latitude,
				longitude: this.state.region.longitude,
				latitudeDelta: this.state.region.latitudeDelta / 2,
				longitudeDelta: this.state.region.longitudeDelta / 2,
			},
			markers: {
				coordinates: {
					latitude: this.state.markers.coordinates.latitude,
					longitude: this.state.markers.coordinates.longitude
				}
			}
		})
	}

	onPressZoomOut() {
		this.setState({
			region: {
				latitude: this.state.region.latitude,
				longitude: this.state.region.longitude,
				latitudeDelta: this.state.region.latitudeDelta * 2,
				longitudeDelta: this.state.region.longitudeDelta * 2,
			},
			marker: {
				coordinates: {
					latitude: this.state.markers.coordinates.latitude,
					longitude: this.state.markers.coordinates.longitude
				}
			}
		})
	}

	onRegionChangeComplete(regionData) {
		this.setState({
			region: {
				latitude: regionData.latitude,
				longitude: regionData.longitude,
				latitudeDelta: regionData.latitudeDelta,
				longitudeDelta: regionData.longitudeDelta,
			}
		})
	}

	onPressToIncident() {
		this.setState({
			region: {
				latitude: this.state.initialRegion.latitude,
				longitude: this.state.initialRegion.longitude,
				latitudeDelta: this.state.initialRegion.latitudeDelta,
				longitudeDelta: this.state.initialRegion.longitudeDelta,
			}
		})
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
									region={this.state.region}
									onRegionChangeComplete={regionData => this.onRegionChangeComplete(regionData)}
									ref={map => this.map = map}
									showsTraffic={true}
									zoomEnabled={true}
								>
									<MapView.Circle
										center={this.state.markers.coordinates}
										fillColor="rgba(128, 191, 255, 0.2)"
										radius={500}
										strokeWidth={2}
										strokeColor="#3399ff" />
								</MapViewContainer>
							)}
							<ZoomButtonsContainer>
								<ZoomButtons
									accessibilityLabel="Zoom In"
									onPress={() => this.onPressZoomIn()}
									title="+" />
								<ZoomButtons
									accessibilityLabel="Zoom Out"
									onPress={() => this.onPressZoomOut()}
									title="-" />
							</ZoomButtonsContainer>
							<MarkerButtonsContainer>
								<MarkerButtons
									accessibilityLabel="Back to Incident"
									onPress={() => this.onPressToIncident()}
									title="O" />
							</MarkerButtonsContainer>
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

const ZoomButtonsContainer = styled(View)`
	flex: 1;
	flexDirection: column;
	left: 0;
	height: 90px;
	padding: 0 0 10px 10px;
	justifyContent: space-between;
	position: absolute;
`;

const ZoomButtons = styled(Button)``;

const MarkerButtonsContainer = styled(View)`
	flex: 1;
	flexDirection: column;
	right: 0;
	height: 90px;
	padding: 0 10px 10px 0;
	justifyContent: flex-end;
	position: absolute;
`;

const MarkerButtons = styled(Button)``;

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