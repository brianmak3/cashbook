import { StyleSheet } from 'react-native';
import colors from '../Common/colors';
import font from '../Common/font';
export default StyleSheet.create({
    main:{
        flex:1
    },

    lastCashbookView:{
        margin:15,
        backgroundColor:'#fff',
        borderRadius:10,
        padding:15,
        shadowColor: 'lightgrey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
  
    text0:{
        fontSize: font.h7,
        color:colors.smallColor,
        fontWeight:'bold'
    },
    text1:{
        fontSize:font.h4,
        paddingVertical:5,
    },
    text2:{
        fontSize:font.h1
    },
    text3:{
        textAlign:'right',
        color:colors.smallColor
    },
    lastMore:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    book:{
        fontSize: font.h5
    },
    activityView:{
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center'
    },
    amount:{
        textAlign:'right',
        fontSize: font.h7
    },
    date:{
        color:'grey',
        marginVertical:5
    },
    details:{
        flex:1
    },
    viewMore:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        paddingVertical:20,
        borderTopColor:'#CFD0CF',
        borderTopWidth:0.5
    },
    arrowIcon:{
        textAlign:'right',
        flex:1
    },
    
    circularView:{
        height:70,
        width:70,
        borderRadius: 35,
        marginBottom:8,
        justifyContent:'center',
        alignItems:'center'
    },
    userView:{
        padding:15,
        alignItems:'center',
        width:100,
        marginHorizontal:5
    },
    initials:{
        color:'#fff',
        fontWeight:'bold'
    },
    userName:{
        textAlign:'center'
    }
   
})