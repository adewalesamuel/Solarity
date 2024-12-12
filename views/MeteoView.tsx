import { ImageBackground, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Layouts } from '../layouts';
import React from 'react';
import { CONSTS } from '../constants';
import { ArrowLeftIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';

export default function MeteoView() {
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                    <ImageBackground source={require('../assets/images/meteo-bg.png')}
                    style={styles.bgImg} resizeMode="cover"/>
                    <View style={styles.header}>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <ArrowLeftIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <QuestionMarkCircleIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: CONSTS.COLOR.BLACK,
        position: 'relative',
    },
    bgImg: {
        position: 'absolute',
        width: '100%',
        height: 600,
        top: 0,
        left: 0,
    },
    header: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        paddingTop: CONSTS.SIZE.XL,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
})