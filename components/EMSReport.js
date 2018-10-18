import React from 'react';
import { StyleSheet,
         Text,
         View } from 'react-native';

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
}

const styles = StyleSheet.create({
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
    }
})