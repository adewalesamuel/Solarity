import React, { PropsWithChildren } from 'react';
import Toastable from 'react-native-toastable';
import { CONSTS } from '../constants';

export default function AppLayout(props: PropsWithChildren) {
    return (
        <>
            <Toastable
                statusMap={{
                    success: CONSTS.COLOR.SUCCESS_SOFT,
                    danger: 'red',
                    warning: 'orange',
                    info: CONSTS.COLOR.INFO_SOFT,
                }}
            />
            {props.children}
        </>
    )
}
