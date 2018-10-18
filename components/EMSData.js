import React from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { ListView,
         RefreshControl,
         StyleSheet, 
         ScrollView,
         View,
         Text } from 'react-native';

const parseString = require('react-native-xml2js').parseString;
const URL = 'https://www.toronto.ca/data/fire/livecad.xml';

export default class EMSData extends React.Component {
    constructor() {
        super();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: ds,
            isLoading: true,
            refreshing: false,
            updateTimeStamp: null
        }
    }
    fetchData() {
        axios(URL)
            .then(res => res.data)
            .then(res => {
                parseString(res, { trim: true, explicitArray: false }, (err, results) => {
                    const updateTimeStamp = this.buildDateString(results.tfs_active_incidents.update_from_db_time);
                    const data = results.tfs_active_incidents.event;
                    data.sort((a, b) => new Date(b.dispatch_time) - new Date(a.dispatch_time)).reverse();
                    
                    this.setState({
                        data: this.state.data.cloneWithRows(data),
                        refreshing: false,
                        updateTimeStamp
                    }, () => {
                        if (this.state.isLoading) {
                            this.setState({ isLoading: false });
                        }
                    });
                });
            })
            .catch(e => {
                console.log('Err:', e);
            })
    }

    check24Time(time, measurement) {
        if (measurement === 'hours') {
            return time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : `${time.getUTCHours()}`;
        } else if (measurement === 'minutes') {
            return time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
        } else if (measurement === 'seconds') {
            return time.getSeconds() < 10 ? `0${time.getSeconds()}` : `${time.getSeconds()}`;
        }

        return time;
    }

    buildDateString(dispatch_time) {
        const dateTime = new Date(dispatch_time.replace(' ','T') + 'Z');
        const hours = this.check24Time(dateTime, 'hours');
        const minutes = this.check24Time(dateTime, 'minutes');
        const seconds = this.check24Time(dateTime, 'seconds');
        return `${hours}.${minutes}.${seconds}`;
    }

    renderRow(obj, sectionID, rowID) {
        const { alarm_lev,
                beat,
                cross_streets,
                dispatch_time,
                event_num,
                event_type,
                prime_street,
                units_disp } = obj;

        // Get Date String
        const dateString = this.buildDateString(dispatch_time);
        
        // Alternate background of sections.
        // const bgColor = rowID % 2 === 0 ? '#7EABCC' : 'transparent';
        const style = [
            styles.listContainer, 
            // {'backgroundColor': bgColor}
        ];

        return (
            <View style={style}>
                { event_type ? <Text style={styles.listContainer_headerText}>{event_type}</Text> : null }
                { prime_street || prime_street === '' ? 
                    <View style={styles.listContainer_details}>
                        <Text style={styles.listContainer_title}>Postal Code/Primary Street:</Text>
                        <Text style={styles.listContainer_text}>{prime_street}</Text>
                    </View> : null }
                { dispatch_time ? 
                    <View style={styles.listContainer_details}>
                        <Text style={styles.listContainer_title}>Dispatch time:</Text>
                        <Text style={styles.listContainer_text}>{dateString}</Text>
                    </View> : null }
                { cross_streets ? 
                    <View style={styles.listContainer_details}>
                        <Text style={styles.listContainer_title}>Cross Streets:</Text>
                        <Text style={styles.listContainer_text}>{cross_streets}</Text>
                    </View> : null }
                { alarm_lev ? 
                    <View style={styles.listContainer_details}>
                        <Text style={styles.listContainer_title}>Alarm Level:</Text>
                        <Text style={styles.listContainer_text}>{alarm_lev}</Text>
                    </View> : null }
                { event_num ? 
                <View style={styles.listContainer_details}>
                    <Text style={styles.listContainer_title}>Event Number:</Text>
                    <Text style={styles.listContainer_text}>{event_num}</Text>
                </View> : null }
            </View>
        )
    }

    onRefresh() {
        this.setState({ refreshing: true }, () => {            
            this.fetchData();
        });
    }

    refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
            />
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <ScrollView
                refreshControl={this.refreshControl()}
            >
                <Spinner
                    animation='fade'
                    visible={this.state.isLoading}
                />
                <View>
                    <Text style={styles.timestamp}>
                        {this.state.updateTimeStamp ? `Updated: ${this.state.updateTimeStamp}` : null}
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.data}
                    renderRow={this.renderRow.bind(this)}
                    style={styles.listView} 
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroller: {
        display: 'flex',
        height: '100%'
    },
    loader: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center'
    },
    paragraph: {
        paddingTop: 10,
        paddingBottom: 10
    },
    listContainer: {
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10,
        width: '100%'
    },
    listContainer_details: {
        flex: 1,
        flexDirection: 'row'
    },
    listContainer_title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    listContainer_text: {
        color: '#fff',
        fontSize: 16,
        paddingLeft: 5
    },
    listContainer_headerText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    restaurantName: {
        fontWeight: 'bold'
    },
    timestamp: {
        backgroundColor: '#165788',
        color: '#fff',
        fontWeight: 'bold',
        padding: 10
    },
    listView: {
        paddingBottom: 75
    }
})