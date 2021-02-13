import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from '../Common/icon';
import styles from './styles';
import commonStyles from '../Common/styles'
import colors from '../Common/colors';
import UserComponent from './user';
import { Api, getEntryDate, getIndex, numberWithCommas } from '../functions';
import { Connect, mapDispatchToProps, mapStateToProps } from '../Redux';
const List = (props) => {
    const { navigation, User, setByField, Recent } = props,
        { navigate } = navigation,
        buttons = ['list', 'person'],
        [refreshing, setRefreshing] = useState(false),
        onRefresh = React.useCallback(() => {
            fetchActivities();
            setRefreshing(true)
        }, []),
        fetchActivities = () => {
            Api({
                module: 'Entries',
                action: 'getLastActivities',
                subData: { userId: User._id }
            }).then(data => {
                setByField('Recent', data)
                setRefreshing(false)
            }).catch(e => () => {
                setRefreshing(false)
            })
        },
        users = [
            { name: 'Brian Henry', image: '' },
            { name: 'David Wainaina dsfdfgdf sdfgsdfgdfgdf dfg', image: '' },
            { name: 'James Karanja', image: '' },
            { name: 'Kelcin Kamaru', image: '' },
            { name: 'Henry Onyancha', image: '' }
        ],
        lastEntry = Recent.activities.length && Recent.activities[0]
    useState(() => {
        //get last entries
        fetchActivities()
    }, [])
    return (
        <View style={styles.main}>
            <View style={commonStyles.header}>
                <Text style={commonStyles.h1}>Cashbook</Text>
                <View style={commonStyles.moreHeaderView}>
                    {
                        buttons.map(button => (
                            <TouchableOpacity key={button}
                                onPress={() => navigate(button === 'list' ? 'Cashbooks' : 'Profile', button === 'list' && { sortBy: 'name' })}
                                style={commonStyles.headerBtn}>
                                <Icon name={button} color={'grey'} size={25} />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={commonStyles.sharedToView}>
                    <Text style={commonStyles.sharedTo}>Shared to</Text>
                    <TouchableOpacity>
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
                <TouchableOpacity style={styles.lastCashbookView} onPress={() => navigation.navigate('Details', { bookId: lastEntry.bookId })}>
                    <View style={styles.lastMore}>
                        <Text style={styles.text0}>Last Cahsbook</Text>
                        <Icon name={'ellipsis-vertical'} size={25} color={'grey'} />
                    </View>
                    <Text style={styles.text1}>{Recent.books[getIndex(Recent.books, '_id', lastEntry.bookId)].name}</Text>
                    <Text style={styles.text2}>Ksh {numberWithCommas(lastEntry.amount)}</Text>
                    <Text style={styles.text3}>{lastEntry.type}</Text>
                </TouchableOpacity>
                <View style={styles.lastCashbookView}>
                    <Text style={styles.text0}>Recent activites</Text>
                    {
                        Recent.activities.map(({ date, amount, type, byId, userIndex = getIndex(Recent.users, '_id', byId), remark, bookId, bookIndex = getIndex(Recent.books, '_id', bookId) }, index) => (
                            <TouchableOpacity onPress={() => navigate('Details', { bookId: bookId })} key={index} style={styles.activityView}>
                                <Icon name={'wallet-outline'} color={'grey'} size={30} />
                                <View style={styles.details}>
                                    <Text style={styles.book}> {
                                        Recent.books[bookIndex].name
                                    }</Text>
                                    <Text style={styles.date}> {
                                        getEntryDate(date)
                                    }</Text>
                                    <Text numberOfLines={1} style={styles.comment}> {remark}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.amount, { color: colors[type] }]}>{type === 'expenditure' ? ' - ' : '+'} Ksh {amount}</Text>
                                    {User._id === byId ?<Text>{Recent.users[userIndex].username}</Text>:null}
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                    <TouchableOpacity style={styles.viewMore} onPress={() => navigate('Cashbooks', { sortBy: 'dateCreated' })}>
                        <Icon name={'list'} size={25} color={colors.link} />
                        <Text style={styles.viewMoreText}>View all cashbooks </Text>
                        <Text style={styles.arrowIcon}>
                            <Icon name={'chevron-forward-outline'} size={25} color={'grey'} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
export default Connect(mapStateToProps, mapDispatchToProps)(List)