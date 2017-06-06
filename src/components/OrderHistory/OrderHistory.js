import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image, Dimensions, ScrollView, ActivityIndicator,
} from 'react-native';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';

import backSpecial from '../../media/appIcon/backs.png';

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { arrOrder: [] };
    }
    componentDidMount() {
        getToken()
            .then(token => getOrderHistory(token))
            .then(resJSON => {
                this.setState({ arrOrder: [...resJSON] });
            })
            .catch(err => console.log(err));
    }
    goBacktoMain() {
        this.props.navigator.pop();
    }
    render() {
        const { wrapper, header, headerTitle, backIconStyle, body, orderRow } = styles;
        const { arrOrder } = this.state;
        const IndicatorJSX = (
            <ActivityIndicator
                animating
                color="#2ABB9C"
                style={[styles.centering, { height: 80 }]}
                size="large"
            />
        );
        const OrdersJSX = (
            <ScrollView>
                {arrOrder.map(e => (
                    <View style={orderRow} key={e.id}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
                            <Text style={{ color: '#2ABB9C' }}>ORD{e.id}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>OrderTime:</Text>
                            <Text style={{ color: '#C21C70' }}>{e.date_order}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Status:</Text>
                            <Text style={{ color: '#2ABB9C' }}>{e.status ? "pending" : "complete"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Total:</Text>
                            <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{e.total}$</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
        return (
            <View style={wrapper}>
                <View style={header}>
                    <View />
                    <Text style={headerTitle}>Order History</Text>
                    <TouchableOpacity onPress={this.goBacktoMain.bind(this)}>
                        <Image source={backSpecial} style={backIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    {!arrOrder.length ? IndicatorJSX : OrdersJSX}
                </View>
            </View>
        );
    }
}

//{arrOrder.length ? OrdersJSX : IndicatorJSX}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6' },
    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        margin: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});