import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import styles from './styles';
import commonStyles from '../Common/styles';
import Icon from '../Common/icon';
import Radio from '../Common/radioButton';
import DatePicker from 'react-native-datepicker'
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
import { Api, getIndex, networkError, returnDate, formatDate, getDateTime } from '../functions';
import { EventsEmit } from '../events';

const radios = [{ label: 'Cash In', value: 'revenue' }, { label: 'Cash Out', value: 'expenditure' }];

const New = (props) => {
    const { navigation, route, User, Books, setByField } = props,
        { goBack } = navigation,
        { bookId, type, _id, item } = route.params,
        [recordType, setType] = useState(type),
        [saving, setSaving] = useState(),
        bookIndex = getIndex(Books, '_id', bookId),
        initialInputs = {
            byId: User._id,
            date: returnDate(_id ? item.date : Date.now()),
            remark: _id ? item.remark : '',
            amount: _id ? item.amount + '' : '',
            bookId
        },
        [inputs, setInputs] = useState(initialInputs),
        submit = () => {
            setSaving(true)
            subData = { ...inputs, type: recordType.value, amount: parseInt(inputs.amount), date: formatDate(inputs.date), _id }
            Api({
                action: 'create',
                module: 'Entries',
                subData
            }).then(res => {
                var books = [...Books], activities, entryIndex;
                if (!_id)
                    activities = books[bookIndex].activities ? [...books[bookIndex].activities, res] : [res];
                else {
                    entryIndex = getIndex(Books[bookIndex].activities, '_id', _id)
                    activities = [...Books[bookIndex].activities];
                    activities[entryIndex] = { ...activities[entryIndex], ...res }

                }
                books[bookIndex] = { ...books[bookIndex], activities };
                setByField('Books', books)
                setSaving(false);
                setInputs(initialInputs);
                EventsEmit('toastMsg', { msg: 'Entry has been successfully ' + (_id ? 'updated' : 'created') + '' })
                if (_id)
                    goBack()
            }).catch(e => {
                setSaving(false)
                EventsEmit('toastMsg', { msg: networkError })
            })
        }
    return (
        <View style={styles.main}>
            <View style={commonStyles.header}>
                <TouchableOpacity onPress={() => goBack()} style={commonStyles.headerBtn}>
                    <Icon name={'chevron-back'} size={25} color={'grey'} />
                </TouchableOpacity>
                <Text style={commonStyles.title}>New</Text>
                <TouchableOpacity onPress={() => goBack()} style={commonStyles.headerBtn}>
                    <Text style={styles.cancelBtn}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main0}>
                    <Text style={styles.title}>{recordType.label}</Text>
                    <Text style={styles.label}>Date</Text>
                    <View style={styles.calendaView}>
                        <DatePicker
                            style={commonStyles.dateView}
                            date={inputs.date}
                            mode="datetime"
                            placeholder="select date"
                            format="MMM D, YYYY HH:mm"
                            minDate={returnDate(1262296800000)}
                            maxDate={returnDate(Date.now())}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: commonStyles.dateIcon,
                                dateInput: commonStyles.dateInput,
                                dateText: commonStyles.dateText,
                            }}
                            onDateChange={(date) => setInputs({ ...inputs, date })}
                        />
                    </View>
                    <View style={styles.cashInOut}>
                        {
                            radios.map(({ label, value }, index) => (
                                <TouchableOpacity onPress={() => setType({ label, value })} key={index} style={styles.typeView}>
                                    <Radio enabled={recordType.value === value} />
                                    <Text style={styles.label}>{label}</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </View>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput placeholder={'Type amount here'} onChangeText={(amount) => setInputs({ ...inputs, amount })} keyboardType={'numeric'} placeholderTextColor={'#494949'} style={styles.textInput} value={inputs.amount} />
                    <Text style={styles.label}>Remark</Text>
                    <TextInput placeholder={'Type a remark here'} value={inputs.remark} onChangeText={(remark) => setInputs({ ...inputs, remark })} placeholderTextColor={'#494949'} style={styles.textInput} />
                    <TouchableOpacity onPress={submit} disabled={!inputs.amount || !inputs.remark?.trim()} style={styles.saveBtn}>
                        <Text style={styles.saveText}>{saving ? 'Saving' : _id ? 'Update' : 'Save'} </Text>
                        {saving ? <ActivityIndicator color={'#fff'} /> : null}
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(New)