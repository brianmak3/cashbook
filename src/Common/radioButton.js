import React from 'react';
import { View, Text } from 'react-native';
import colors from './colors';
import Icon from './icon';
import styles from './styles';
const Radio = (props) => {
    const { enabled } = props;
    return (
        <View style={styles.radioMain}>
                <Icon name={enabled?'checkmark-circle-outline':'ellipse-outline'} size={28} color={colors.primary}/>
        </View>
    )
}
export default Radio