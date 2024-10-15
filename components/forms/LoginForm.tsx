import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
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

export default function LoginForm(props: RegisterFormProps) {
    return (
        <View style={styles.formContainer}>
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
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxLeft}>
                    <CheckBox disabled={false} value={props.useUser.canRemember}
                    tintColors={{true: CONSTS.COLOR.PRIMARY}} onValueChange={(newValue) =>
                    props.useUser.setCanRemember(newValue)}/>
                    <Text style={styles.checkboxText} onPress={() =>
                        props.useUser.setCanRemember(!props.useUser.canRemember)}>
                        Se souvenir de moi
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Mot de passe oublié?</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        paddingVertical: CONSTS.SIZE.SM,
        marginBottom: CONSTS.SIZE.SM,
    },
    checkboxLeft: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    checkboxText: {
        fontSize: CONSTS.SIZE.MD,
        fontWeight: 'bold',
    },
    forgotText: {
        textDecorationLine: 'underline',
        borderBottomWidth: 1,
        borderBottomColor: CONSTS.COLOR.LIGHT,
        fontSize: CONSTS.SIZE.MD,
        marginLeft: CONSTS.SIZE.XXL,
    },
})