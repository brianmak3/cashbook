import React from 'react';
import { View, Text } from 'react-native';
import Login from '../Login';
import styles from './styles';
import List from './list';
import Profile from '../Profile';
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
const Home = (props) => {
    const { navigation, User } = props;
    return (
        <View style={styles.main}>
            {
                !User ?
                    <Login/> :
                    !User.username ?
                        <Profile  navigation={navigation}  /> :
                        <List navigation={navigation} />

            }
        </View>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(Home)