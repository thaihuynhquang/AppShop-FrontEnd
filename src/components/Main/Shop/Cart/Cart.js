import React, { Component } from 'react';
import {
    Navigator,
} from 'react-native';
import CartView from './CartView';
import ProductDetail from '../ProductDetail/ProductDetail';

export default class Cart extends Component {
    renderScene(route, navigator) {
        const { cartArray } = this.props;
        switch (route.name) {
            case 'CART_VIEW':
                return <CartView navigator={navigator} cartArray={cartArray} />;
            case 'PRODUCT_DETAIL':
                return <ProductDetail navigator={navigator} product={route.product}/>;
        }

    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'CART_VIEW' }}
                renderScene={this.renderScene.bind(this)}
            />
        );
    };
}
