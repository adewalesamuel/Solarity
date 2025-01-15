import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Components } from '../components';
import { StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';

export default function MainLayout(props: PropsWithChildren) {
    return (
        <SafeAreaView style={styles.container}>
            <View>{props.children}</View>
            <Components.MainMenu />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 68,
        backgroundColor: CONSTS.COLOR.WHITE,
    },
})