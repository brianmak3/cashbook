import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../Common/icon';
import styles from './styles';
import commonStyles from '../Common/styles'
import colors from '../Common/colors';
import UserComponent from './user';
const List = (props) => {
    const { navigation } = props,
        { navigate } = navigation,
        buttons = ['list', 'person'],
        fetchActivities = ()=>{

        },
        activities = [],
        users = [
            { name: 'Brian Henry', image: '' },
            { name: 'David Wainaina dsfdfgdf sdfgsdfgdfgdf dfg', image: '' },
            { name: 'James Karanja', image: '' },
            { name: 'Kelcin Kamaru', image: '' },
            { name: 'Henry Onyancha', image: '' }
        ]
        useState(()=>{

        },[])
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
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <TouchableOpacity style={styles.lastCashbookView} onPress={() => navigation.navigate('Details')}>
                    <View style={styles.lastMore}>
                        <Text style={styles.text0}>Last Cahsbook</Text>
                        <Icon name={'ellipsis-vertical'} size={25} color={'grey'} />
                    </View>
                    <Text style={styles.text1}>Thunes</Text>
                    <Text style={styles.text2}>Ksh 50,000</Text>
                    <Text style={styles.text3}>Expenditure</Text>
                </TouchableOpacity>
                <View style={styles.lastCashbookView}>
                    <Text style={styles.text0}>Recent activites</Text>
                    {
                        activities.map(({ book, date, amount, type, remark }, index) => (
                            <View key={index} style={styles.activityView}>
                                <Icon name={'wallet-outline'} color={'grey'} size={30} />
                                <View style={styles.details}>
                                    <Text style={styles.book}> {book}</Text>
                                    <Text style={styles.date}> {date}</Text>
                                    <Text numberOfLines={1} style={styles.comment}> {remark}</Text>
                                </View>
                                <Text style={[styles.amount, { color: colors[type] }]}>{type === 'expenditure' ? ' - ' : '+'} Ksh {amount}</Text>
                            </View>
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
export default List