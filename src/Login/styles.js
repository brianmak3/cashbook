import { StyleSheet } from 'react-native';
import colors from '../Common/colors';
import font from '../Common/font';
export default StyleSheet.create({
    main:{
        flex:1,
         justifyContent:'space-around',
        alignItems:'center',
    },
    ScrollView:{
        flexGrow:1,
    },
    logo:{
        height:150,
        width:150,
        borderRadius:10,
        resizeMode:'contain'
    },
    phoneInput:{
        height:50,
        width:'85%',
        borderColor:colors.inputBorderColor,
        borderWidth:1,
        borderRadius:15,
        fontSize:font.medium,
        paddingHorizontal: 15
    },
    button:{
        backgroundColor:colors.primary,
        borderRadius:25,
        paddingHorizontal:60,
        paddingVertical:15,
        flexDirection:'row'
    },
    contineText:{
        color: colors.text,
        fontSize: font.medium
    }
})