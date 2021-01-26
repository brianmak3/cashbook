import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import colors from "../Common/colors";
import font from "../Common/font";
import { getInitialLetters, getRandom } from "../Common/functions";
import { getDateTime } from "../functions";
import Radio from '../Common/radioButton';
import styles from './styles';
const Item = (props) => {
    const { item, navigation, selectedBooks,   setSelectedBooks } = props,
        { name, dateCreated, sharedTo, totalCashIn, totalCashOut, _id } = item,
        cashDiff = totalCashIn - totalCashOut,
        enabled = selectedBooks && selectedBooks.indexOf(_id) !== -1,
        selectDeselect = () => {
            if (selectedBooks)
                setSelectedBooks(enabled ? selectedBooks.filter(book => book !== _id) : [...selectedBooks, _id])
            else
                setSelectedBooks([_id])
        };

    return (
        <TouchableWithoutFeedback onPress={() => {
            if(selectedBooks)
            selectDeselect()}
            } >
            <View style={styles.mainView} >
                {selectedBooks ? <Radio enabled={enabled} /> : null}
                <TouchableOpacity onLongPress={selectDeselect} onPress={() => navigation.navigate('Details', { bookId: _id })} style={styles.bookView}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.nameDate}>
                            <Text style={styles.bookName}>{name}</Text>
                            <Text style={styles.dateCreated}> {getDateTime(dateCreated).dateStr}</Text>
                        </View>
                        <View style={styles.cashValue}>
                            <Text style={styles.totalCash}>Total cash in</Text>
                            <Text style={{}}>Ksh {totalCashIn}</Text>
                        </View>
                        <View style={styles.cashValue}>
                            <Text style={styles.totalCash}>Total cahs out </Text>
                            <Text style={{}}>Ksh {totalCashOut}</Text>
                        </View>
                        <View style={styles.cashValue}>
                            <Text style={styles.balance}>Balance</Text>
                            <Text style={{ fontSize: font.h6, color: colors.revenue }}> + Ksh {cashDiff}</Text>
                        </View>

                        {
                            sharedTo?.length ? <View style={styles.sharedTo}>
                                <Text style={styles.sharedToText}>Shared with</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {

                                        sharedTo.map((user, index) => (
                                            <View key={index} style={[styles.circular, { backgroundColor: colors.userColors[getRandom(0, colors.userColors.length - 1)] }]}>
                                                <Text style={styles.initials}>{getInitialLetters(user.name)}</Text>
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View> :
                                null
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default Item