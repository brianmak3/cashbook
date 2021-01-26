import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../Common/colors';
import font from '../Common/font';
import Icon from '../Common/icon';
import images from '../Common/images';
import commonStyles from '../Common/styles';

const Comments = (props) => {
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
        <Modal isVisible={showModal} backdropOpacity={0.5} onBackButtonPress={()=>setShowModal(false)} onBackdropPress={()=>setShowModal(false)} style={styles.main}  >
            <View style={styles.main0}>
                <View style={styles.header}>
                    <Text style={styles.title}>Comments</Text>
                    <TouchableOpacity style={commonStyles.headerBtn}>
                        <Text style={styles.deleteText}>Delete All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={styles.flatlist} data={comments} renderItem={({ item }) => (
                    <View>
                        <View style={styles.userView}>
                            <Image style={styles.userImage} source={images.avatar} />
                            <Text style={styles.userName}>Brian Henry</Text>
                        </View>
                        <View style={styles.commentView}>
                            <Text style={styles.commentText}>
                                Sgdsdfg df gs dog. Dog d fog d fog d fog. Dog d fog ds fog dsfgdfg s dog. Seth dogs g df g dog d fads fg dogs g dog df g df g dog. Dog. Seth df g dsfgsdfgsdfgsbfbsdgiagdgkugsdkfkugiudgfiuidggaudbgsidfhghshiughsihdfghshdifughsidfhghsidfhgiushfdighiusdhfgiuhsdifhg
                            </Text>
                            <Text style={styles.commentTime}>{item.time}</Text>
                        </View>
                    </View>
                )} keyExtractor={(item) => item.time} />
                <View style={styles.footer}>
                    <TextInput minHeight={45} maxHeight={120} multiline={true} style={styles.textInput} placeholder={'Aa'} />
                    <TouchableOpacity style={styles.sendButton}>
                        <Icon name={'send-sharp'} color={'#fff'} size={20} />
                    </TouchableOpacity>
                </View>
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
    flatlist: {

    },
    textInput: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#ADACAC',
        borderRadius: 10,
        padding: 10
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sendButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    userView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
    },
    userImage: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: font.h8
    },
    commentView: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    commentText: {
        color: '#434242',
        fontSize: font.h7
    },
    commentTime: {
        textAlign: 'right',
        color: '#5D5D5D',
        fontSize: 11
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'

    },
    deleteText: {
        color: '#B70303',
        fontSize: font.h8
    }
})
export default Comments;