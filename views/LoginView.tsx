import { StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { CONSTS } from '../constants'
import { Components } from '../components'
import { Hooks } from '../hooks'
import { Utils } from '../utils'
import { Layouts } from '../layouts'
import { Services } from '../services'
import {
    NavigationProp,
    ParamListBase,
    RouteProp,
    useNavigation,
    useRoute,
  } from '@react-navigation/native';
import CustomText from '../components/CustomText'

type LoginRouteParams = Partial<{
    from: string,
    success: boolean,
}> | undefined;
export default function LoginView() {
    let abortController = new AbortController();
    const {Toaster, Auth} = Utils;

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<ParamListBase> = useRoute();
    const params: LoginRouteParams = route.params;

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
                JSON.stringify(payload), abortController.signal
            );

            await Auth.setUser(response?.user);
            await Auth.setSessionToken(response?.token);

            navigation.navigate('Dashboard');
        } catch (error: any) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    };

    const init = useCallback(() => {
        if (params?.from === 'Registration' && params.success === true) {
            Toaster.success('Votre compte a été crée avec success\nVeuillez vous connecter');
        }
    }, [Toaster, params?.from, params?.success])

    useEffect(() => {
        init();
    })

    return (
        <Layouts.AppLayout>
            <KeyboardAvoidingView style={styles.container}>
                <Components.TitleText>Bienvenu !</Components.TitleText>
                <CustomText customStyle={styles.subTitle}>
                    Merci de suivre les étapes pour vous connecter !
                </CustomText>
                <Components.LoginForm useUser={useUser} isDisabled={useUser.isDisabled}
                handleFormSubmit={handleLoginSubmit}/>
                <View style={styles.lineContainer}>
                    <View style={styles.horiontalLine} />
                    <CustomText>ou</CustomText>
                    <View style={styles.horiontalLine} />
                </View>
                <View style={styles.registerContainer}>
                    <CustomText customStyle={styles.registerText}>
                        Vous n'avez pas encore de compte ?
                    </CustomText>
                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <CustomText customStyle={styles.registerLink}>
                            Inscrivez-vous maintenant
                        </CustomText>
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