import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import { CONSTS } from '../constants';
import CustomText from './CustomText';

type CustomTitleProps = TextProps & {
    customStyle?: TextStyle
}

export default function TitleText(props: CustomTitleProps) {
    const style: TextStyle = {
        fontWeight: 'bold',
        fontSize: CONSTS.SIZE.XL,
        marginBottom: CONSTS.SIZE.XS,
        color: CONSTS.COLOR.BLACK,
        ...props?.customStyle,

    }
    return (<CustomText {...props} customStyle={style}>{props.children}</CustomText>)
}