import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import React from 'react';

export default function SearchInput(props: TextInputProps) {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.searchInput}
            placeholderTextColor={CONSTS.COLOR.TEXT_BASE}
            placeholder={props.placeholder} textContentType="name"
            autoCapitalize="none" value={props.value}
            onChangeText={props.onChangeText} />
            <MagnifyingGlassIcon style={styles.searchIcon}
            color={CONSTS.COLOR.BLACK} size={30} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        flex: 1,
    },
    searchInput: {
        borderWidth: 1,
        paddingRight: 60,
        color: CONSTS.COLOR.TEXT_BASE,
        borderColor: CONSTS.COLOR.LIGHT,
        paddingVertical: CONSTS.SIZE.MD,
        paddingLeft: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.XL,
    },
    searchIcon: {
        position: 'absolute',
        top: CONSTS.SIZE.MD,
        right: CONSTS.SIZE.XL,
    },
})