import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../Common/colors';
import font from '../Common/font';
import Icon from '../Common/icon';
import images from '../Common/images';
import commonStyles from '../Common/styles';

const SharedTo = (props) => {
    const { showModal, setShowModal } = props,
        comments = [
            { time: '12:30' },
            { time: '12:31' },
            { time: '12:32' },
            { time: '12:33' },
            { time: '12:34' },
            { time: '12:35' },
            { time: '12:36' },
            { time: '12:37' }
        ]
    return (
        <Modal isVisible={showModal} backdropOpacity={0.5} onBackButtonPress={() => setShowModal(false)} onBackdropPress={() => setShowModal(false)} style={styles.main}  >
            <View style={styles.main0}>
                <View style={styles.header}>
                    <Text style={styles.title}>Shared To</Text>
                    <TouchableOpacity style={commonStyles.headerBtn}>
                        <Text style={styles.deleteText}>Remove All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={styles.flatlist} data={comments} renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image style={styles.userImage} source={images.avatar} />
                        <View style={styles.userView}>
                            <Text style={styles.userName}>Brian Henry</Text>
                            <Text style={styles.contactText}>Email: brianworkss@gmail.com</Text>
                            <Text style={styles.contactText}>Phone: +254704251068</Text>
                            <Text style={styles.commentTime}>Date Shared {item.time}</Text>
                        </View>
                        <TouchableOpacity style={styles.removeAdd}>
                            <Text style={styles.deleteText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )} keyExtractor={(item) => item.time} />

            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    main: {
        margin: 0,
        justifyContent: 'flex-end',
        paddingHorizontal: 8
    },
    main0: {
        backgroundColor: '#fff',
        maxHeight: '75%',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    title: {
        fontSize: font.h6,
        color: '#7B7B7B',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    item:{
        flexDirection:'row',
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        alignItems:'center'
    },
    userView: {
        justifyContent: 'center',
        marginVertical: 8,
        marginLeft: 10,
        flex:1
    },
    userImage: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    userName: {
        fontWeight: 'bold',
        
        fontSize: font.h8
    },
    contactText:{
        marginVertical:3
    },
    removeAdd: {
        paddingBottom: 5
    },
    commentTime: {
        color: '#5D5D5D',
        fontSize: 13,
        marginTop:3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    deleteText: {
        color: '#B70303',
        fontSize: font.h8
    }
})
export default SharedTo;