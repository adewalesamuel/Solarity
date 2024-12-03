import { StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { CONSTS } from '../constants'
import { Components } from '../components'
import { Hooks } from '../hooks'
import { Layouts } from '../layouts'
import { Services } from '../services'
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
  } from '@react-navigation/native';
import CustomText from '../components/CustomText';

export default function RegisterView() {
    let abortController = new AbortController();

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const errorHandler = Hooks.useError();
    const useUser = Hooks.useUser();

    const handleRegisterSubmit = async () => {
        useUser.setIsDisabled(true);

        try {
            if (!useUser.hasAcceptedConditions) {
                const error = new Error()
                error.message = "Vous devez accepter les conditions d'utilsation";

                return errorHandler.setError(error);
            }

            const payload = {
                name: useUser.name,
                email: useUser.email,
                password: useUser.password,
                password_confirmation: useUser.password_confirmation,
            }

            await Services.AuthService.register(
                JSON.stringify(payload), abortController.signal);

            navigation.navigate('Login', {from: 'Registration', success: true});
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    };
    return (
        <Layouts.AppLayout>
            <KeyboardAvoidingView style={styles.container}>
                <Components.TitleText>Bienvenu parmi nous !</Components.TitleText>
                <CustomText customStyle={styles.subTitle}>
                    Merci de suivre les étapes pour vous connecter !
                </CustomText>
                <Components.RegisterForm useUser={useUser} isDisabled={useUser.isDisabled}
                handleFormSubmit={handleRegisterSubmit}/>
                <View style={styles.lineContainer}>
                    <View style={styles.horiontalLine} />
                    <CustomText>ou</CustomText>
                    <View style={styles.horiontalLine} />
                </View>
                <View style={styles.loginContainer}>
                    <CustomText customStyle={styles.loginText}>Vous avez déjà un compte ?</CustomText>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <CustomText customStyle={styles.loginLink}>Connectez-vous maintenant</CustomText>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
        backgroundColor: CONSTS.COLOR.WHITE,
        height: '100%',
    },
    subTitle: {
        fontSize: CONSTS.SIZE.MD,
        marginBottom: CONSTS.SIZE.XXL,
    },
    lineContainer: {
        marginVertical: CONSTS.SIZE.XXL,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    horiontalLine: {
        width: '48%',
        borderBottomWidth: 1,
        borderBottomColor: CONSTS.COLOR.LIGHT,
    },
    loginContainer: {
        width: '100%',
    },
    loginText: {
        textAlign: 'center',
    },
    loginLink: {
        textAlign: 'center',
        color: CONSTS.COLOR.PRIMARY,
        fontWeight: 'bold',
    },
})