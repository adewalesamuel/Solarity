import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewProps } from 'react-native';
import { CONSTS } from '../constants';

type LoaderProps = ViewProps & {
    isLoading: boolean,
}
export default function Loader(props: LoaderProps) {
    return (
        <>
            {props.isLoading ?
                <View style={styles.container}>
                        <ActivityIndicator color={CONSTS.COLOR.PRIMARY} size={28}/>
                </View>
            : props.children
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
})