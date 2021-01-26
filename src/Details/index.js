import React, { Fragment, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Alert } from 'react-native';
import colors from '../Common/colors';
import Icon from '../Common/icon';
import commonStyles from '../Common/styles';
import styles from './styles';
import ListItem from './item';
import UserComponent from '../Home/user';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import CommentModal from './comments';
import NewBook from '../Cashbooks/new';
import SharedTo from './sharedTo';
import { useEffect } from 'react';
import { Api, getIndex, networkError, numberWithCommas } from '../functions';
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
import { EventsEmit } from '../events';
const Details = (props) => {
    const { navigation, route, Books, setByField } = props,
        { navigate, goBack } = navigation,
        { bookId } = route.params,
        [showModal, setShowModal] = useState(false),
        [showModal0, setShowModal0] = useState(false),
        [showModal1, setShowModal1] = useState(false),
        [selected, setSelected] = useState(false),
        bookIndex = getIndex(Books, '_id', bookId),
        book = Books[bookIndex],
        [loading, setLoading] = useState(true),
        { activities } = book,
        actionBtns = [
            { label: 'Cash In', icon: 'arrow-up', type: 'revenue', bg: colors.revenue },
            { label: 'Cash Out', icon: 'arrow-down', type: 'expenditure', bg: '#B9041C' }
        ],
        users = [
            { name: 'Brian Henry', image: '' },
            { name: 'David Wainaina dsfdfgdf sdfgsdfgdfgdf dfg', image: '' },
            { name: 'James Karanja', image: '' },
            { name: 'Kelcin Kamaru', image: '' },
            { name: 'Henry Onyancha', image: '' }
        ],
        deleteEntries = (all, entryId) => {
            Alert.alert('Delete entries', 'Are you sure you want to delete ' + (all ? 'all' : entryId ? 1 : selected.length) + ' ' + (selected.length > 1 || all ? ' entries' : ' entry') + ' for this book?', [
                { text: 'No' },
                {
                    text: 'Yes',
                    onPress: () => Api({
                        module: 'Entries',
                        action: 'delete',
                        subData: { selected: entryId ? [entryId] : all ? activities.map(a => a._id) : selected }
                    }).then(res => {
                        var activities = Books[bookIndex].activities.filter(entry => res.indexOf(entry._id) == -1),
                            books = [...Books];
                        books[bookIndex] = { ...books[bookIndex], activities }
                        setByField('Books', books)
                        setSelected(false)
                        EventsEmit('toastMsg', { msg: 'Successfully deleted the ' + (res.length) + ' ' + (res.length === 1 ? 'entry' : 'entries') });
                    }).catch(e => {
                        EventsEmit('toastMsg', { msg: networkError });
                        alert(e)
                    })
                }
            ])
        },
        options = [
            { label: 'Edit name', icon: 'brush', action: () => setShowModal0(true) },
            activities?.length > 0? { label: 'Export excel', icon: 'download-outline', action: () => alert('cool') }:null,
            activities?.length > 0? { label: 'Make PDF', icon: 'document-text-outline', action: () => alert('cool') }:null,
            { label: 'Share', icon: 'share-social', action: () => setShowModal1(true) },
            activities?.length > 0? { label: 'Clear all entries', icon: 'trash-bin', action: () => deleteEntries(true) }:null,
            {
                label: 'Delete book', icon: 'trash-outline', action: () => Alert.alert('Delete book', 'Are you sure you want to delete this book?',
                    [
                        { text: 'No' },
                        {
                            text: 'Yes', onPress: () => Api(
                                {
                                    module: 'Books',
                                    action: 'delete',
                                    subData: { selectedBooks: [bookId] }
                                }
                            ).then(() => {
                                setByField('Books', Books.filter(book => book._id !== bookId))
                                goBack();
                                EventsEmit('toastMsg', { msg: 'Book ' + book.name + ' has been deleted.' });
                            }).catch(e => EventsEmit('toastMsg', { msg: networkError }))
                        }
                    ])
            }
        ].filter(a=>a !== null),
        getEntries = () => {
            Api({
                module: 'Entries',
                action: 'fetch',
                subData: { bookId }
            }).then(res => {
                //results returned from the server
                var books = [...Books];
                books[bookIndex] = { ...books[bookIndex], activities: res }
                setByField('Books', books)
                setLoading(false)
            }).catch(e => {
                setLoading(false)
            })
        },
        data = book.activities?.reverse() || []
    useEffect(() => {
        getEntries()
    }, [])
    return (
        <View style={styles.main}>
            <View style={commonStyles.header}>
                <TouchableOpacity onPress={() => goBack()} style={commonStyles.headerBtn}>
                    <Icon name={'chevron-back'} size={25} color={'grey'} />
                </TouchableOpacity>
                <View style={commonStyles.searchView}>
                    <Icon name={'search'} size={25} color={'grey'} />
                    <TextInput clearButtonMode={'while-editing'} style={commonStyles.searchInput} placeholder={'Search'} placeholderTextColor={'grey'} />
                </View>
                {
                    selected ?
                        <Fragment>
                            <TouchableOpacity onPress={() => deleteEntries()} style={commonStyles.headerBtn}>
                                <Icon name={'trash'} size={25} color={'grey'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelected(false)} style={commonStyles.headerBtn}>
                                <Text style={commonStyles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </Fragment> :
                        <Fragment>
                            <TouchableOpacity >
                                <Icon name={'filter'} size={25} color={'grey'} />
                            </TouchableOpacity>
                            <Menu>
                                <MenuTrigger style={commonStyles.headerBtn}>
                                    <Icon name={'ellipsis-vertical'} size={25} color={'grey'} />
                                </MenuTrigger>
                                <MenuOptions>
                                    {
                                        options.map(({ label, action, icon }, index) => (
                                            <MenuOption style={commonStyles.option} key={index} onSelect={action}>
                                                <Icon name={icon} size={25} color={'grey'} />
                                                <Text style={commonStyles.optionText}>{label}</Text>
                                            </MenuOption>
                                        ))
                                    }
                                </MenuOptions>
                            </Menu>
                        </Fragment>}
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)}
                contentContainerStyle={styles.FlatList}
                ListEmptyComponent={
                    <View style={commonStyles.emptyView}>
                        {
                            loading ?
                                <ActivityIndicator color={'grey'} size={'large'} /> :
                                <Fragment>
                                    <Text style={commonStyles.emptyText}>No entries available</Text>
                                    <Text onPress={() => navigate('New', { type: { label: 'Cash In', value: 'revenue' }, bookId })} style={commonStyles.createNewBtn}>Create new entry</Text>
                                </Fragment>
                        }
                    </View>
                }
                ListHeaderComponent={
                    <Fragment>
                        <Text style={styles.bookName}>{book.name}</Text>
                        <View style={styles.listHeader}>
                            {
                                actionBtns.map(({ label, icon, bg, type }, index) => (
                                    <View key={index} style={[index === 0 && styles.boundary, styles.listHeaderView]}>
                                        <Icon name={icon} color={bg} size={25} />
                                        <View>
                                            <Text style={styles.totalText}>Total {label}</Text>
                                            <Text style={styles.amount}>Ksh {numberWithCommas(activities ? activities.map(a => type === a.type ? a.amount : 0).reduce((a, b) => a + b, 0) : 0)}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={commonStyles.sharedToView}>
                            <Text style={commonStyles.sharedTo}>Shared to</Text>
                            <TouchableOpacity onPress={() => setShowModal1(true)}>
                                <Text style={commonStyles.viewMoreText}>View all </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                users.map((user) => (
                                    <UserComponent key={user.name} user={user} />
                                ))
                            }
                        </ScrollView>
                        <View style={styles.cols}>
                            <Text style={styles.col0}>Details </Text>
                            <Text style={styles.col1}>Amount (ksh)</Text>
                            <Text style={styles.col2}>Balance (ksh)</Text>
                        </View>
                    </Fragment>
                }
                renderItem={({ item, index }) => (
                    <ListItem
                        item={item}
                        bookId={bookId}
                        selected={selected}
                        deleteEntries={deleteEntries}
                        setSelected={setSelected}
                        navigate={navigate}
                        balance={index === data.length - 1 ? item.amount : (data.map((a, index0) => (a.type === 'revenue') && index0 + 1 > index ? a.amount : 0).reduce((a, b) => a + b) - data.map((a, index0) => (a.type === 'expenditure') && index0 + 1 > index ? a.amount : 0).reduce((a, b) => a + b))} final={index === 0} setShowModal={setShowModal}
                    />
                )} keyExtractor={item => item._id} />
            <View>
                {activities?.length ? <Text style={styles.showingEntries}>Showing {activities.length} emtries</Text> : null}
                <View style={styles.actionBtns}>
                    {
                        actionBtns.map(({ icon, label, type, bg }, index) => (
                            <TouchableOpacity onPress={() => navigate('New', { type: { label, value: type }, bookId })} key={index} style={[styles.actionBtn, { backgroundColor: bg }]}>
                                <Icon name={icon} color={'#fff'} size={25} />
                                <Text style={styles.actBtnText}>{label}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <CommentModal showModal={showModal} setShowModal={setShowModal} />
            <SharedTo showModal={showModal1} setShowModal={setShowModal1} />
            <NewBook book={book} Books={Books} bookIndex={bookIndex} setByField={setByField} showModal={showModal0} setShowModal={setShowModal0} />
        </View>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(Details)