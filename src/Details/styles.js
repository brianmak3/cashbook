import { StyleSheet } from 'react-native';
import font from '../Common/font';
export default StyleSheet.create({
    main: {
        flex: 1
    },
    FlatList: {
        flexGrow: 1,
    },
    actionBtns: {
        flexDirection: 'row',
    },
    actionBtn: {
        flex: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        alignItems: 'center'
    },
    actBtnText: {
        color: '#fff',
        fontSize: font.h6,
        fontWeight: 'bold',
        marginLeft: 10
    },
    showingEntries: {
        padding: 5,
        color: 'grey',
        backgroundColor: '#fff',
        fontWeight: 'bold'
    },
    listHeader: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
    },
    listHeaderView: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    totalText: {
        color: '#737373',
        marginBottom: 5
    },
    amount: {
        fontSize: font.h6
    },
    boundary: {
        borderRightColor: 'lightgrey',
        borderRightWidth: 0.5
    },
    cols: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5
    },
    col0: {
        flex: 48,
        color: 'grey',
        fontSize: font.h7
    },
    col1: {
        flex: 22,
        color: 'grey',
        fontSize: font.h7,
        textAlign: 'center'
    },
    col2: {
        flex: 30,
        textAlign: 'center',
        color: 'grey',
        fontSize: font.h7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    row: {
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    moreBtn: {
        paddingLeft: 15,
        paddingVertical: 10,
        paddingRight:5
    },
    date: {
        color: 'grey',
        fontSize: font.h7,
        paddingBottom: 5
    },
    time: {
        color: 'grey',
        fontSize: font.h7,
        paddingBottom: 10
    },
    remark: {
        fontWeight: 'bold',
        lineHeight: 20,
        fontSize: font.h7
    },
    balance: {
        fontSize: font.h8,
        marginBottom: 2
    },
    final: {
        color: 'grey'
    },
    bookName:{
        backgroundColor:'#fff',
        paddingLeft:20,
        fontSize:20,
        marginBottom:5
    }
})