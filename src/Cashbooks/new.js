import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../Common/colors';
import font from '../Common/font';
import commonStyles from '../Common/styles';
import { EventsEmit } from '../events';
import { Api, networkError } from '../functions';

const New = (props) => {
    const { showModal, setShowModal, userId, setByField, bookIndex, Books, book } = props,
        { _id } = book || {},
        [name, setName] = useState(book?.name),
        [saving, setSaving] = useState(),
        saveBook = () => {
            if (name) {
                setSaving(true)
                Api({
                    module: 'Books',
                    action: 'create',
                    subData: book ? { name, _id } : { name, createdBy: userId, dateCreated: Date.now() }
                }).then(res => {
                    setSaving(false)
                    setName('');
                    //if updating should be done here
                    if (!book)
                        setByField('Books', [...Books, res])
                    else {
                        var books = [...Books];
                        books[bookIndex] = { ...books[bookIndex], ...res }
                        setByField('Books', books)
                    }
                    setShowModal(false);
                    EventsEmit('toastMsg', { msg: 'Successfully '+(book?'updated':'created')+' book ' + name })
                }).catch(e => {
                    setSaving(false)
                    EventsEmit('toastMsg', { msg: networkError })
                })
            }

        }
    return (
        <Modal isVisible={showModal} backdropOpacity={0.5} onBackButtonPress={() => setShowModal(false)} onBackdropPress={() => setShowModal(false)} style={styles.main}  >
            <View style={styles.main0}>
                <View style={styles.header}>
                    <Text style={styles.title}>{book ? 'Update' : 'Create New'} Cashbook</Text>
                    <TouchableOpacity onPress={() => setShowModal(false)} style={commonStyles.headerBtn}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Name</Text>
                <TextInput value={name} onChangeText={text => setName(text)} style={styles.textInput} placeholderTextColor={'#878686'} placeholder={'Type name of cashbook'} />
                <TouchableOpacity disabled={saving || !name?.trim()} onPress={saveBook} style={styles.saveBtn}>
                    <Text style={styles.saveText}> {saving ? 'Saving' : book ? 'Update' : 'Save'}</Text>
                    {saving ? <ActivityIndicator color={'#fff'} /> : null}
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    main: {
        margin: 0,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    main0: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: font.h5
    },
    cancelText: {
        color: '#0476D5',
        fontSize: font.h9
    },
    label: {
        color: '#5D5D5D',
        fontSize: font.h9
    },
    textInput: {
        marginVertical: 15,
        fontSize: font.medium,
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 0.5,
        padding: 5
    },
    saveBtn: {
        marginVertical: 20,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        width: '50%',
        alignSelf: 'center',
        flexDirection:'row'
    },
    saveText: {
        color: '#fff',
        fontSize: font.h9

    }

})
export default New;