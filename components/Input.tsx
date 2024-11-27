import { TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { CONSTS } from '../constants'
import { InputProps } from '../core/types/forms'

export default function Input(props: InputProps) {
  return (
    <TextInput style={styles.inputItem} placeholder={props.placeholder} autoCapitalize="none"
    value={props.value} readOnly={props.readOnly} keyboardType={props.keyboardType}
    secureTextEntry={props.isPassword ? true : false} autoCorrect={false}
    onChangeText={props.onChange} placeholderTextColor={CONSTS.COLOR.SECONDARY}/>
  )
}

const styles = StyleSheet.create({
    inputItem: {
        width: '100%',
        color: CONSTS.COLOR.TEXT_BASE, 
        paddingVertical: CONSTS.SIZE.SM,
        borderColor: CONSTS.COLOR.LIGHT,
        borderWidth: 0,
        borderBottomWidth: 1,
        fontSize: CONSTS.SIZE.MD,
    },
})