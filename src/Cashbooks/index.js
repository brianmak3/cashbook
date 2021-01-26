import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import styles from './styles';
import commonStyles from '../Common/styles';
import Icon from '../Common/icon';
import Item from "./item";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import NewBook from './new';
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
import { Api, networkError } from '../functions';
import { EventsEmit } from '../events';
const Cashbooks = (props) => {
    const { navigation, User, Books, route, setByField } = props,
        { } = route.params,
        [sortBy, setSortBy] = useState(route.params.sortBy),
        [showModal, setShowModal] = useState(false),
        [loading, setLoading] = useState(true),
        [selectedBooks, setSelectedBooks] = useState(false),
        [searchVal, setSearchVal] = useState(''),
        fetchBooks = () => {
            Api({
                module: 'Books',
                action: 'fetch',
                subData: { userId: User._id }
            }).then(res => {
                setByField('Books', res);
                setLoading(false);
            }).catch(e => {
                setLoading(false);
                EventsEmit('toastMsg', { msg: networkError })
            })
        },
        deleteBooks = (all) => {
            var selected = all ? Books.map(book => book._id) : selectedBooks;
            Alert.alert('Delete cashbooks', 'Are you sure you want to delete ' + selectedBooks.length + ' cashbook' + (selectedBooks.length > 1 ? 's' : ''), [
                { text: 'No' },
                {
                    text: 'Yes',
                    onPress: () => Api({
                        module: 'Books',
                        action: 'delete',
                        subData: { selectedBooks: selected }
                    }).then(res => {
                        setByField('Books', Books.filter(book => res.indexOf(book._id) === -1));
                        EventsEmit('toastMsg', { msg: res.length + ' books have been deleted successfully.' })
                        setSelectedBooks(false)
                    }).catch(e => EventsEmit('toastMsg', { msg: networkError }))
                }
            ])
        },
        options = [
            { label: 'Select all', icon: 'list-outline', action: () => setSelectedBooks(Books.map(book => book._id)) },
            { label: 'Sort by ' + (sortBy === 'name' ? 'date' : 'name'), icon: 'reorder-three-outline', action: () => setSortBy(sortBy === 'name' ? 'dateCreated' : 'name') },
            {
                label: 'Delete all', icon: 'trash-outline', action: () => deleteBooks(true)
            },
        ]

    useEffect(() => {
        fetchBooks()
    }, [])
    return (
        <View style={styles.main}>
            <View style={commonStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.headerBtn}>
                    <Icon name={'chevron-back'} size={25} color={'grey'} />
                </TouchableOpacity>
                <View style={commonStyles.searchView}>
                    <Icon name={'search'} size={25} color={'grey'} />
                    <TextInput value={searchVal} onChangeText={(text) => setSearchVal(text)} clearButtonMode={'while-editing'} style={commonStyles.searchInput} placeholder={'Search'} placeholderTextColor={'grey'} />
                </View>
                {
                    Books.length && !selectedBooks ?
                        <Fragment>
                            <TouchableOpacity onPress={() => setShowModal(true)} style={commonStyles.headerBtn}>
                                <Icon name={'create-outline'} size={25} color={'grey'} />
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
                        </Fragment> :
                        selectedBooks ?
                            <Fragment>
                                <TouchableOpacity onPress={() => deleteBooks()} style={commonStyles.headerBtn}>
                                    <Icon name={'trash'} size={25} color={'grey'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedBooks(false)} style={commonStyles.headerBtn}>
                                    <Text style={commonStyles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </Fragment>
                            :
                            null
                }

            </View>
            <FlatList
                extraData={sortBy}
                ListEmptyComponent={
                    <View style={commonStyles.emptyView}>
                        {
                            loading ?
                                <ActivityIndicator color={'grey'} size={'large'} /> :
                                <Fragment>
                                    <Text style={commonStyles.emptyText}>No books available</Text>
                                    <Text onPress={() => setShowModal(true)} style={commonStyles.createNewBtn}>Create new book</Text>
                                </Fragment>
                        }
                    </View>
                }
                data={Books.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0)}
                contentContainerStyle={{ marginTop: 5, flexGrow: 1 }} renderItem={({ item }) => (
                    <Fragment>
                        {
                            !searchVal || searchVal && item.name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1 ?
                                <Item navigation={navigation} selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} item={item} /> :
                                null
                        }
                    </Fragment>
                )} keyExtractor={(item) => item._id} />
            <NewBook userId={User._id} Books={Books} setByField={setByField} showModal={showModal} setShowModal={setShowModal} />
        </View>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(Cashbooks)