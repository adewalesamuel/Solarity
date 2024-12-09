import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import { CONSTS } from '../constants';
import CustomText from './CustomText';

export default function TitleText(props: TextProps) {
    return (<CustomText customStyle={styles.title}>
        {props.children}
    </CustomText>)
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: CONSTS.SIZE.XL,
        marginBottom: CONSTS.SIZE.XS,
        color: CONSTS.COLOR.BLACK,
    },
})