import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import colors from '../Common/colors';
import Icon from '../Common/icon';
import styles from './styles';
import commonStyles from '../Common/styles'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { numberWithCommas, formatDate, getDateTime } from '../functions';
import Radio from '../Common/radioButton';

const Item = (props) => {
    const { item, setShowModal, balance, final, deleteEntries, selected, setSelected, bookIndex, bookId, navigate } = props,
        { remark, date, amount, type, _id } = item,
        options = [
            { label: 'Edit', icon: 'brush', action: () => navigate('New', { bookId, _id, item, type: { label: type === 'revenue' ? 'Cash In' : 'Cash Out', value: type } }) },
            { label: 'Comments', icon: 'chatbubbles-outline', action: () => setShowModal(true) },
            { label: 'Delete', icon: 'trash-outline', action: () => deleteEntries(null, _id) },
        ],
        enabled = selected && selected.indexOf(_id) !== -1,
        selectDeselect = () => {
            if (selected)
                setSelected(enabled ? selected.filter(entry => entry !== _id) : [...selected, _id])
            else
                setSelected([_id])
        };
    return (
        <TouchableOpacity style={styles.row} onLongPress={selectDeselect} onPress={() => {
            if (selected)
                selectDeselect()
        }}>
            {selected ? <Radio enabled={enabled} /> : null}
            <View style={styles.col0}>
                <Text style={styles.date}>{getDateTime(date).date} {bookIndex}</Text>
                <Text style={styles.time}>{getDateTime(date).time}</Text>
                <Text style={styles.remark}>{remark}</Text>
            </View>
            <Text style={[styles.col1, { color: colors[type], fontSize: 15, marginRight: 20 }]}>{numberWithCommas(amount)}</Text>
            <View style={styles.col2}>
                <View>
                    <Text style={styles.balance}>{numberWithCommas(balance)}</Text>
                    {final && <Text style={styles.final}>Final</Text>}
                </View>
                <Menu>
                    <MenuTrigger style={styles.moreBtn}>
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
            </View>
        </TouchableOpacity>
    )
}
export default Item