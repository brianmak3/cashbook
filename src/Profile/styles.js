import { StyleSheet } from 'react-native';
import font from '../Common/font';
export default StyleSheet.create({
    main: {
        flex: 1
    },
    scrollview: {
        flexGrow: 1
    },
    imageView: {
        flex: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsView: {
        flex: 70
    },
    detailsSubView: {
        backgroundColor: '#fff',
        marginHorizontal: 5,
        borderRadius: 10,
        padding: 10,
        paddingTop:15,
        marginBottom: 10
    },
    imageView0: {
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor: '#fff',
        shadowColor: '#B8B7B7',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    userImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        resizeMode: 'cover'
    },
    changePhotoBtn: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems:'center'
    },
    changeText: {
        fontSize: font.h8
    },
    label: {
        fontSize: font.h9,
        fontWeight: 'bold',
        marginVertical: 5
    },
    inputBtn: {
        flexDirection: 'row',
        borderTopColor:'#DDDDDD',
        borderTopWidth:0.5,
        marginTop:10
    },
    textInput: {
        flex: 1,
        alignItems:'center',
        fontSize: font.h9,
        color:'#676767'
    },
    changeText0:{
        color:'#0383B4'
    },
    cancelBtn: {
        color: '#0380CD',
        fontSize: font.h6
    },
    error:{
        color:'red',
        fontSize:15
    },
    logOut:{
        backgroundColor:'#fff',
        paddingVertical:20,
        alignItems:'center'
    },
    logOutText:{
        fontSize:17,
        color:'red'
    }
})