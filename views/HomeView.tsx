import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


export default function HomeView() {
    const bgImg = require('../assets/images/home-bg.jpg');
    const logoImg = require('../assets/images/logo.png');

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    return (
        <Layouts.AppLayout>
            <View style={styles.container}>
                <ImageBackground source={bgImg} style={styles.bgImg} resizeMode="cover"/>
                <View style={styles.logoContainer}>
                    <Image source={logoImg} style={styles.logoImg} />
                </View>

                <View style={styles.card}>
                    <Components.PrimaryButton
                    onClick={() => navigation.navigate('Login')} isDisabled={false}>
                        Continuez avec votre mail
                    </Components.PrimaryButton>
                    <View style={{marginVertical: CONSTS.SIZE.XXL}} />
                    <View style={{marginVertical: CONSTS.SIZE.XXL}} />
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Vous n'avez pas encore de compte ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                            <Text style={styles.registerLink}>Inscrivez-vous maintenant</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        position: 'relative',
        height: '100%',
        backgroundColor: CONSTS.COLOR.BLACK,
        justifyContent: 'flex-end',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        flex: 1,
    },
    logoImg: {
        width: 254,
        height: 36,
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '78%',
    },
    card: {
        backgroundColor: CONSTS.COLOR.WHITE,
        borderTopLeftRadius: CONSTS.SIZE.XXL,
        borderTopRightRadius: CONSTS.SIZE.XXL,
        paddingHorizontal: CONSTS.SIZE.XL,
        paddingTop: CONSTS.SIZE.XL,
        paddingBottom: CONSTS.SIZE.XXL,
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
        marginBottom: CONSTS.SIZE.LG,
        fontWeight: 'bold',
    },
});
