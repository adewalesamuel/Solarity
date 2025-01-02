import React, { PropsWithChildren } from 'react';
import { CONSTS } from '../constants';
import { View } from 'react-native';

type BadgeProps = PropsWithChildren & {
    color: string,
    borderColor?: string,
    paddingH: number,
    paddingV: number,
}
export default function BadgeIcon (props: BadgeProps) {
    const container = {
        paddingHorizontal: props.paddingH,
		paddingVertical: props.paddingV,
		borderRadius: CONSTS.SIZE.XXL,
		backgroundColor: props.color,
        borderColor: props?.borderColor ?? 'transparent',
        borderWidth: 1,
	}
    return (
        <View style={container}>
            {props.children}
        </View>
    );
}
