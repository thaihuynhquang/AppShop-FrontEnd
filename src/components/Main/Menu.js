/**
 * Menu component
 * - navigation giữa lịch sử mua hàng, thay đổi thông tin đơn hàng, đăng xuất, đăng nhập.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import profileIcon from '../../media/temp/profile.png';

import global from '../global';
import saveToken from '../../api/saveToken';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        global.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(user) {
        this.setState({ user });
    }
    onSignOut(user) {
        this.setState({user: null});
        saveToken('');
    }
    gotoAuthentication() {
        this.props.navigator.push({ name: 'Authentication' });
    }
    gotoChangeInfo() {
        this.props.navigator.push({ name: 'ChangeInfo', user: this.state.user });
    }
    gotoOrderHistory() {
        this.props.navigator.push({ name: 'OrderHistory' });
    }
    render() {
        const {
            container, profile, btnStyle, btnText, btnSignInStyle,
            btnTextSignIn, loginContainer, usernameTitle
        } = styles;
        const { user } = this.state;
        const logoutJSX = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={btnStyle} onPress={this.gotoAuthentication.bind(this)}>
                    <Text style={btnText}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={loginContainer}>
                <Text style={usernameTitle}>{user ? user.name : ''}</Text>
                <View>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.gotoOrderHistory.bind(this)}>
                        <Text style={btnTextSignIn}>Lịch Sử Đơn Hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.gotoChangeInfo.bind(this)}>
                        <Text style={btnTextSignIn}>Thay Đổi Thông Tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.onSignOut.bind(this)}>
                        <Text style={btnTextSignIn}>Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        );
        const mainJSX = user ? loginJSX : logoutJSX;
        return (
            <View style={container}>
                <Image source={profileIcon} style={profile} />
                {mainJSX}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnStyle: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 60
    },
    btnText: {
        color: '#34B089',
        fontFamily: 'Avenir',
        fontSize: 13
    },
    btnSignInStyle: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 180,
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: '#34B089',
        fontFamily: 'Avenir',
        fontSize: 13
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    usernameTitle: {
        color: '#fff',
        fontFamily: 'Avenir',
        fontSize: 15
    }
});