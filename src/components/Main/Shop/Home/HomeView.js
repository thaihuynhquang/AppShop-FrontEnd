/**
 * HomeView component
 * - render màn hình trang chủ chứa cardview loại sản phẩm và danh sách sản phẩm nổi bật.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import Category from './Category';
import TopProduct from './TopProduct';

export default class HomeView extends Component {
    render() {
        const { types, topProducts } = this.props;
        return (
            <ScrollView style={styles.container}>
                <Category navigator={this.props.navigator} types={types} />
                <TopProduct navigator={this.props.navigator} topProducts={topProducts}/>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFDFDF',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});