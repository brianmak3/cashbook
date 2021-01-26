import { StyleSheet } from 'react-native';
import colors from '../Common/colors';
import font from '../Common/font';
export default StyleSheet.create({
    main: {
        flex: 1
    },
    cancelBtn: {
        color: '#0380CD',
        fontSize: font.h6
    },
    main0: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 10
    },
    title: {
        fontSize: font.h3,
        marginBottom: 10
    },
    label: {
        fontSize: font.medium,
        // color:'#494949',
        marginVertical: 10
    },
    calendaView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    },
    value: {
        fontSize: font.h9,
        color: '#494949',
        marginVertical: 10
    },
    cashInOut: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    typeView: {
        flexDirection: 'row',
        alignItems:'center'
    },
    saveBtn: {
        backgroundColor:colors.primary,
        justifyContent:'center',
        paddingVertical:15,
        borderRadius:30,
        marginVertical:30,
        flexDirection:'row'
    },
    saveText: {
        color:'#fff',
        fontSize:font.h6
    },
    textInput:{
        minHeight:50,
        borderBottomColor:'#CAC9C9',
        borderBottomWidth:0.5,
        fontSize: font.h9,
        color: '#494949',
        marginBottom:30
    }
})