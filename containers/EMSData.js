import React from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components/native';
import { Toast } from "native-base";
import { ListView,
         RefreshControl,
         ScrollView,
         View } from 'react-native';

import EMSReportList from '../components/EMSReportList';
import { SERVER_PATH } from '../constants/constants';
import { buildDateString } from '../helpers/helpers';

const parseString = require('react-native-xml2js').parseString;

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
        axios(SERVER_PATH)
            .then(res => res.data)
            .then(res => {
                parseString(res, { trim: true, explicitArray: false }, (err, results) => {
                    const updateTimeStamp = buildDateString(results.tfs_active_incidents.update_from_db_time, true);
                    const data = results.tfs_active_incidents.event;
                    data.sort((a, b) => new Date(b.dispatch_time) - new Date(a.dispatch_time)).reverse();
                    
                    this.setState({
                        data: this.state.data.cloneWithRows(data),
                        isLoading: false,
                        refreshing: false,
                        updateTimeStamp
                    });
                });
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    refreshing: false
                }, () => {
                    Toast.show({
                        buttonText: "Okay",
                        duration: 10000,
                        text: "Sorry. We cannot connect to the server. Try again later.",
                        type: "warning"
                    });
                })
            })
    }

    renderRow(data, sectionID, rowID) {
        return (
            <EMSReportList navigation={this.props.navigation} data={data} />
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
                {this.state.updateTimeStamp && (
                    <View>
                        <Timestamp>
                            {this.state.updateTimeStamp ? `Updated: ${this.state.updateTimeStamp}` : null}
                        </Timestamp>
                    </View>
                )}
                <ListView
                    dataSource={this.state.data}
                    renderRow={this.renderRow.bind(this)}
                />
            </ScrollView>
        )
    }
}

// Styled Components
const Timestamp = styled.Text`
    background-color: #165788;
    color: #fff;
    font-weight: bold;
    padding: 10px;
`;