import { StyleSheet } from 'react-native';
import colors from './colors';
import font from './font';
export default StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        shadowColor: 'lightgrey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    headerBtn:{
        paddingHorizontal:5,
        paddingVertical:15
    },
    moreHeaderView:{
        flexDirection:'row'
    },
    h1: {
        color: colors.primary,
        fontSize: font.h1
    },
    searchView: {
        flex: 1,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        fontSize: font.h6,
        paddingHorizontal: 5
    },
    viewMoreText:{
        fontSize:font.h9,
        color: colors.link
    },
    sharedToView:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
    },
    sharedTo:{
        fontSize:font.h8,
        fontWeight:'bold'
    },
    title:{
        flex:1,
        fontSize:font.h2,
        marginLeft:10,
        color:'#505050'
    },
    radioMain:{
        width:60,
        borderColor:colors.primary,
        alignItems:'center',
        justifyContent:'center',
        marginRight:5
    },
    option:{
        flexDirection:'row',
        paddingLeft:10,
        paddingVertical:15,
        alignItems:'center'
    },
    optionText:{
        fontSize: font.medium
    },
    emptyView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyText:{
        fontSize:30,
        color:'grey',
        marginBottom:20
    },
    createNewBtn:{
        fontSize:17,
        color:'#038FC8'
    },
    cancelText: {
        color: '#0476D5',
        fontSize: font.h9
    },
    dateIcon:{
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
    },
    dateInput: {
        borderColor:'#fff',
        alignItems:'flex-start',
        marginLeft:40
    },
    dateText:{
        fontSize: font.h9,
        color: '#494949'
    },
    dateView:{
        flex:1,
        borderBottomColor:'#CAC9C9',
        borderBottomWidth:0.5,
        marginBottom:30,
        paddingBottom:5
    }
})