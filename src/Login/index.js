import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import images from '../Common/images';
import { Api, validateFields } from '../functions';
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
import styles from './styles';
const Login = (props) => {
    const { setByField } = props,
        [phone, setPhone] = useState(''),
        [logginIn, setLoggingIn] = useState(false),
        handleLogging = () => {
            if (validateFields('phone', phone) === true) {
                setLoggingIn(true);
                Api({
                    module: 'Users',
                    action: 'Login',
                    user: { phone }
                }).then(res => {
                    setLoggingIn(false);
                    setByField('User', res);
                }).catch(e => {
                    setLoggingIn(false);
                })
            }
            else
                Alert.alert('Invalid Phone number', 'Please enter a valid phone number', [
                    {
                        text: 'Ok',
                    }
                ])
        };
    return (

        <ScrollView contentContainerStyle={styles.ScrollView} keyboardShouldPersistTaps="always">
            <View style={styles.main}>
                <Image source={images.logo} style={styles.logo} />
                <TextInput onChangeText={(text => setPhone(text))} style={styles.phoneInput} value={phone} placeholder={'Enter your phone number'} />
                <TouchableOpacity disabled={logginIn} onPress={handleLogging} style={styles.button}>

                    <Text style={styles.contineText}> {logginIn ? 'Logging In' : 'Continue'} </Text>
                    {logginIn && <ActivityIndicator color={'#fff'} />}
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(Login)