import React from 'react';
import { View, Text } from 'react-native';
import colors from '../Common/colors';
import { getRandom, getInitialLetters } from '../Common/functions';
import styles from './styles'
const User = (props) => {
    const { user } = props,
        { name } = user;
    return (
        <View style={styles.userView}>
            <View style={[styles.circularView, { backgroundColor: colors.userColors[getRandom(0, colors.userColors.length - 1)] }]}>
                <Text style={styles.initials}>{getInitialLetters(name)}</Text>
            </View>
            <Text numberOfLines={2} style={styles.userName}>{name}</Text>
        </View>
    )
}
export default User