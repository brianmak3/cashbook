import { StyleSheet } from 'react-native';
import colors from '../Common/colors';
import font from '../Common/font';
export default StyleSheet.create({
    main: {
        flex: 1
    },
    bookView: {
        backgroundColor: '#fff',
        
        flexDirection:'row',
        flex:1
    },
    mainView:{
        backgroundColor:'#fff',
        marginBottom: 5,
        flexDirection:'row',
        alignItems:'center',
        padding: 10
    },
    nameDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bookName: {
        fontSize: font.h4,
        fontWeight: 'bold',
        marginVertical: 5
    },
    dateCreated: {
        fontSize: font.small,
        color: '#525152'
    },
    totalCash: {
        color: '#525152',
    },
    cashValue: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 2,
        alignItems: 'center'
    },
    balance: {
        fontSize: font.h5
    },
    sharedTo: {
        borderTopColor: '#D7D7D7',
        borderTopWidth: 0.5,
        marginTop: 2,
        paddingVertical: 10
    },
    sharedToText: {
        marginVertical: 2,
        color:'#5D5D5D',
        fontWeight:'bold'
    },
    circular: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    initials:{
        color:'#fff'
    }
})