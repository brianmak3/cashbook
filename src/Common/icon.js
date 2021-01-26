import React from 'react';
import { Text, Platform } from 'react-native';
import Iconn from 'react-native-vector-icons/Ionicons';
const platform = Platform.OS === 'android'?'md':'ios'
function Icon (props){
    const { size, name, color } = props;
    return(
        <Text> <Iconn name={platform+['-'+name]} size={size} color={color} /> </Text>
    )
}
export default Icon;