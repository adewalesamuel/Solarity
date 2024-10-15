import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { CONSTS } from '../constants'
import { Components } from '../components'
import { Hooks } from '../hooks'

export default function RegisterView() {
    const useUser = Hooks.useUser();

    const handleRegisterSubmit = () => {};
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>Bienvenu parmi nous !</Text>
            <Text style={styles.subTitle}>Merci de suivre les étapes pour vous connecter !</Text>
            <Components.RegisterForm useUser={useUser} isDisabled={useUser.isDisabled}
            handleFormSubmit={handleRegisterSubmit}/>
        </KeyboardAvoidingView>
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
})