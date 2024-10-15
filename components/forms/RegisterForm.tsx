import { View, StyleSheet } from 'react-native'
import React from 'react'
import { CONSTS } from '../../constants'
import { UseUser } from '../../core/hooks/UseUser'
import { FormProps } from '../../core/forms/FormProps'
import Input from '../Input'
import { Components } from '..'

type RegisterFormProps =  FormProps & {
    useUser: UseUser
}

export default function RegisterForm(props: RegisterFormProps) {
  return (
    <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <Input placeholder="E-mail"
            inputMode="text" value={props.useUser.email} readOnly={props.isDisabled}
            onChange={(text) => props.useUser.setEmail(text)}/>
        </View>
        <View style={styles.inputContainer}>
            <Input placeholder="Mot de passe"
            inputMode="text" value={props.useUser.password} readOnly={props.isDisabled}
            onChange={(text) => props.useUser.setPassword(text)}/>
        </View>
        <View style={styles.inputContainer}>
            <Input placeholder="Confirmer le mot de passe"
            inputMode="text" value={props.useUser.password_confirmation} readOnly={props.isDisabled}
            onChange={(text) => props.useUser.setPassword_confirmation(text)}/>
        </View>
        <View style={styles.inputContainer}>
            <Components.PrimaryButton onClick={props.handleFormSubmit} isDisabled={props.isDisabled}>
                Continuer
            </Components.PrimaryButton>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    inputContainer: {
        width: '100%',
        paddingVertical: CONSTS.SIZE.SM,
        marginBottom: CONSTS.SIZE.SM,
    },
    inputItem: {
        paddingVertical: CONSTS.SIZE.SM,
        paddingHorizontal: CONSTS.SIZE.MD,
        borderColor: CONSTS.COLOR.SECONDARY,
        borderWidth: 1,
        borderRadius: '5px',
        fontSize: CONSTS.SIZE.LG,
    },
})