import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import type { ButtonProps } from '../core/forms/FormProps'
import { CONSTS } from '../constants'

export default function PrimaryButton(props: ButtonProps) {
    return (
        <Pressable style={styles.container} onPress={props.onClick} disabled={props.isDisabled}>
            <Text style={styles.text}>
                {props.isDisabled ? 'Chargement...' : props.children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.PRIMARY,
    },
    text: {
        textAlign: 'center',
        fontSize: CONSTS.SIZE.MD,
        color: CONSTS.COLOR.BLACK,
    },
})