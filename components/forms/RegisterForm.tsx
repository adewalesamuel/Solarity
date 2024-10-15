import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { CONSTS } from '../../constants'
import { UseUser } from '../../core/hooks/UseUser'
import { FormProps } from '../../core/forms/FormProps'
import Input from '../Input'
import { Components } from '..'
import CheckBox from '@react-native-community/checkbox';

type RegisterFormProps =  FormProps & {
    useUser: UseUser
}

export default function RegisterForm(props: RegisterFormProps) {

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Input placeholder="Nom" keyboardType="default"
                inputMode="text" value={props.useUser.name} readOnly={props.isDisabled}
                onChange={(text) => props.useUser.setName(text)}/>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="E-mail" keyboardType="email-address"
                inputMode="text" value={props.useUser.email} readOnly={props.isDisabled}
                onChange={(text) => props.useUser.setEmail(text)}/>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Mot de passe" keyboardType="visible-password"
                inputMode="text" value={props.useUser.password} readOnly={props.isDisabled}
                isPassword={true} onChange={(text) => props.useUser.setPassword(text)}/>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Confirmer le mot de passe" keyboardType="visible-password"
                inputMode="text" value={props.useUser.password_confirmation} readOnly={props.isDisabled}
                isPassword={true} onChange={(text) => props.useUser.setPassword_confirmation(text)}/>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox disabled={false} value={props.useUser.hasAcceptedConditions}
                tintColors={{true: CONSTS.COLOR.PRIMARY}} onValueChange={(newValue) =>
                props.useUser.setHasAcceptedConditions(newValue)}/>
                <Text style={styles.checkboxText} onPress={() =>
                    props.useUser.setHasAcceptedConditions(!props.useUser.hasAcceptedConditions)}>
                    J’accepte le termes et conditions générales.
                </Text>
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
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: CONSTS.SIZE.SM,
        marginBottom: CONSTS.SIZE.SM,
    },
    checkboxText: {
        fontSize: CONSTS.SIZE.MD,
        fontWeight: 'bold',
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