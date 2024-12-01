import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewProps } from "react-native";
import { CONSTS } from "../constants";

type LoaderProps = ViewProps & {
    isLoading: boolean,
}
export default function Loader(props: LoaderProps) {
    return (
        <View style={styles.container}>
            {props.isLoading ?
                <ActivityIndicator color={CONSTS.COLOR.PRIMARY} size={28}/> :
                props.children
            }
        </View>
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