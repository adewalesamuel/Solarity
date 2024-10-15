import { Text, StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { CONSTS } from '../constants'
import { Components } from '../components'
import { Hooks } from '../hooks'
import { Utils } from '../utils'
import { Layouts } from '../layouts'
import { Services } from '../services'
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
  } from '@react-navigation/native';


export default function LoginView() {
    let abortController = new AbortController();
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const {Auth} = Utils;
    const errorHandler = Hooks.useError();
    const useUser = Hooks.useUser();


    const handleLoginSubmit = async () => {
        useUser.setIsDisabled(true);

        try {
            const payload = {
                email: useUser.email,
                password: useUser.password,
            }

            const response: any = await Services.AuthService.login(
                JSON.stringify(payload), abortController.signal);

            await Auth.setUser(response?.user);
            await Auth.setSessionToken(response.token);

            navigation.navigate('Dashboard');
        } catch (error: any) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    };
    return (
        <Layouts.AppLayout>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>Bienvenu !</Text>
                <Text style={styles.subTitle}>
                    Merci de suivre les étapes pour vous connecter !
                </Text>
                <Components.LoginForm useUser={useUser} isDisabled={useUser.isDisabled}
                handleFormSubmit={handleLoginSubmit}/>
                <View style={styles.lineContainer}>
                    <View style={styles.horiontalLine} />
                    <Text>ou</Text>
                    <View style={styles.horiontalLine} />
                </View>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Vous n'avez pas encore de compte ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <Text style={styles.registerLink}>Inscrivez-vous maintenant</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
        backgroundColor: CONSTS.COLOR.WHITE,
        height: '100%',
    },
    title: {
        fontSize: CONSTS.SIZE.XL,
        marginBottom: CONSTS.SIZE.XS,
        color: CONSTS.COLOR.BLACK,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: CONSTS.SIZE.MD,
        marginBottom: CONSTS.SIZE.XXL,
    },
    lineContainer: {
        marginVertical: CONSTS.SIZE.XXL,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    horiontalLine: {
        width: '48%',
        borderBottomWidth: 1,
        borderBottomColor: CONSTS.COLOR.LIGHT,
    },
    registerContainer: {
        width: '100%',
    },
    registerText: {
        textAlign: 'center',
    },
    registerLink: {
        textAlign: 'center',
        color: CONSTS.COLOR.PRIMARY,
        fontWeight: 'bold',
    },
})