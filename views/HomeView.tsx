import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';


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
                        <CustomText customStyle={styles.registerText}>
                            Vous n'avez pas encore de compte ?
                        </CustomText>
                        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                            <CustomText customStyle={styles.registerLink}>
                                Inscrivez-vous maintenant
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: CONSTS.COLOR.BLACK,
    },
    logoContainer: {
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
        width: '100%',
        height: '78%',
        top: 0,
        left: 0,
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
        fontWeight: 'bold',
        color: CONSTS.COLOR.PRIMARY,
        marginBottom: CONSTS.SIZE.LG,
    },
});
