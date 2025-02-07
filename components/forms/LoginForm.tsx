import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { CONSTS } from '../../constants'
import Input from '../Input'
import { Components } from '..'
import CheckBox from '@react-native-community/checkbox';
import { Hooks } from '../../hooks'
import { FormProps } from '../../core/types/forms'
import CustomText from '../CustomText'
import { UseUser } from '../../core/types/hooks/UseUser'
import { Utils } from '../../utils'

type RegisterFormProps =  FormProps & {
    useUser: UseUser
}

export default function LoginForm(props: RegisterFormProps) {
    const forgotPassworUrl = `${process.env.APP_HOST_URL}/motdepasse-oublie`;
    const errorHandler = Hooks.useError();

    const handleForgotPress = async () => {
        try {
            await Linking.openURL(forgotPassworUrl)
            .catch(err => Utils.Toaster.error(err));
        } catch (error) {
            errorHandler.setError(error);
        }
    }
    return (
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Input placeholder="E-mail" keyboardType="email-address"
                inputMode="text" value={props.useUser.email} readOnly={props.isDisabled}
                onChange={(text: string) => props.useUser.setEmail(text)}/>
            </View>
            <View style={styles.inputContainer}>
                <Input placeholder="Mot de passe" keyboardType="visible-password"
                inputMode="text" value={props.useUser.password} readOnly={props.isDisabled}
                isPassword={true} onChange={(text: string) => props.useUser.setPassword(text)}/>
            </View>
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxLeft}>
                    <CheckBox value={props.useUser.canRemember} boxType="square"
                    tintColors={{true: CONSTS.COLOR.PRIMARY}}
                    onValueChange={(newValue) => props.useUser.setCanRemember(newValue)} />
                    <CustomText customStyle={styles.checkboxText} onPress={() =>
                        props.useUser.setCanRemember(!props.useUser.canRemember)}>
                        Se souvenir de moi
                    </CustomText>
                </View>
                <TouchableOpacity onPress={handleForgotPress}>
                    <CustomText customStyle={styles.forgotText}>Mot de passe oublié?</CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Components.PrimaryButton onClick={props.handleFormSubmit} 
                isDisabled={props.isDisabled}>
                    Continuer
                </Components.PrimaryButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    inputContainer: {
        width: '100%',
        paddingVertical: CONSTS.SIZE.SM,
        marginBottom: CONSTS.SIZE.SM,
    },
    checkboxContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: CONSTS.SIZE.SM,
        marginBottom: CONSTS.SIZE.SM,
    },
    checkboxLeft: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    checkboxText: {
        fontWeight: 'bold',
        fontSize: CONSTS.SIZE.MD,
        marginLeft: CONSTS.SIZE.SM,
    },
    forgotText: {
        textDecorationLine: 'underline',
        textDecorationColor: CONSTS.COLOR.BLACK,
        borderBottomColor: CONSTS.COLOR.LIGHT,
        fontSize: CONSTS.SIZE.MD,
    },
})