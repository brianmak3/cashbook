import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import commonStyles from '../Common/styles';
import Icon from '../Common/icon';
import styles from './styles';
import images from '../Common/images';
import { EventsEmit } from '../events'
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
import { Api, validateFields, returnUserImg, networkError } from '../functions';
const Profile = (props) => {
    const { navigation, User, logOut, setByField } = props,
        { goBack } = navigation,
        [inputs, setInputs] = useState([
            { label: 'Username', ref: useRef(), placeholder: 'Type username here', defaultValue: User.username },
            { label: 'Email', ref: useRef(), placeholder: 'Type email here', defaultValue: User.email },
            { label: 'Phone number', ref: useRef(), placeholder: 'Type phone number here', defaultValue: User.phone }
        ]),
        updateInfo = (backPage) => {
            const newUsername = inputs[0].value,
                newEmail = inputs[1].value,
                newPhone = inputs[2].value,
                { email, username, phone } = User
            if ((newUsername && newUsername !== username) || (newEmail && newEmail !== email) || (newPhone && newPhone !== phone)) {
                if (backPage)
                    Alert.alert('Profile update', 'Would you like to save the changes?', [
                        {
                            text: 'No',
                            onPress: () => goBack()
                        },
                        {
                            text: 'Yes',
                            onPress: () => sendUserData(true, { email: newEmail || email, phone: newPhone || phone, username: newUsername || username })
                        }
                    ])
                else
                    sendUserData(false,{ email: newEmail || email, phone: newPhone || phone, username: newUsername || username })
            }
            else
                goBack()
        },
        sendUserData = (backPage, data) => {
            const { email, username, phone } = data;
            if (!username || !email || !phone)
                updateField(!username ? 0 : !email ? 1 : 2, { error: 'This field cannot be empty.' })
            else if (username.length < 6)
                updateField(0, { error: 'Username cannot be less than 6 characters.' })
            else if (validateFields('email', email) !== true)
                updateField(1, { error: validateFields('email', email) })
            else if (validateFields('phone', phone) !== true)
                updateField(2, { error: validateFields('phone', phone) })
            else
                Api({
                    action: 'Signup',
                    module: 'Users',
                    user: { ...data, _id: User._id }
                }).then(res => {
                    const { success, error, index, user } = res;
                    if (error) {
                        updateField(index, { error })
                    } else {
                        if (backPage)
                            goBack();
                        EventsEmit('toastMsg', { msg: success })
                        setByField('User',{...User, ...user })
                    }
                }).catch(e => {
                    if (backPage)
                        goBack()
                    EventsEmit('toastMsg', { msg:  networkError})
                })
        },
        updateField = (index, obj) => {
            var Inputs = [...inputs];
            Inputs[index] = { ...Inputs[index], ...obj }
            setInputs(Inputs)
        }

    return (
        <View style={styles.main}>
            <View style={commonStyles.header}>
                {
                    User.username && <TouchableOpacity onPress={() => updateInfo(true)} style={commonStyles.headerBtn}>
                        <Icon name={'chevron-back'} size={25} color={'#505050'} />
                    </TouchableOpacity>
                }
                <Text style={commonStyles.title}>Profile</Text>
                <TouchableOpacity onPress={() => updateInfo()} style={commonStyles.headerBtn}>
                    <Text style={styles.cancelBtn}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollview}>
                <View style={styles.imageView}>
                    <View style={styles.imageView0}>
                        <Image style={styles.userImage} source={returnUserImg(User)} />
                    </View>
                    <TouchableOpacity style={styles.changePhotoBtn}>
                        <Icon name={'brush'} color={'#000'} size={18} />
                        <Text style={styles.changeText}>Change Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsView}>
                    <View >
                        {
                            inputs.map(({ label, value, ref, defaultValue, error }, index) => (
                                <View key={index} style={styles.detailsSubView}>
                                    <Text style={styles.label}>{label}</Text>
                                    {error ? <Text style={styles.error}>{error}</Text> : null}
                                    <View style={styles.inputBtn}>
                                        <TextInput
                                            onChangeText={(value) => updateField(index, { value, error: null })}
                                            value={value} ref={ref} disabled={true} style={styles.textInput} defaultValue={defaultValue} />
                                        <TouchableOpacity onPress={() => ref.current.focus()} style={styles.changeBtn} style={styles.changePhotoBtn}>
                                            <Icon name={'brush'} color={'#0383B4'} size={18} />
                                            <Text style={styles.changeText0}>Change</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <TouchableOpacity style={styles.logOut} onPress={() => logOut()}>
                        <Text style={styles.logOutText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(Profile);