import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Components } from '../components';
import { StyleSheet, View } from 'react-native';

export default function MainLayout(props: PropsWithChildren) {
    return (
        <SafeAreaView style={styles.container}>
            <View>{props.children}</View>
            <Components.MobileMenu />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
})