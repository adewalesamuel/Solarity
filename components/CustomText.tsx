import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { CONSTS } from '../constants';

type CustomTextProps = TextProps & {
    customStyle?: TextStyle
}

export default function CustomText(props: CustomTextProps) {
    const style: TextStyle = {
        color: CONSTS.COLOR.TEXT_BASE,
        ...props?.customStyle,
    }

    return <Text {...props} style={style}>{props.children}</Text>
}