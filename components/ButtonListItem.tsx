import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewProps } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';

export default function ButtonListItem(props: ViewProps & PressableProps) {

    return (
        <Pressable style={styles.container}>
            {props.children}
            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: CONSTS.COLOR.LIGHT,
        marginBottom: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingVertical: CONSTS.SIZE.LG,
    },
})