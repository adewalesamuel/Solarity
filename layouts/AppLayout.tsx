import React, { PropsWithChildren } from 'react';
import Toastable from 'react-native-toastable';

export default function AppLayout(props: PropsWithChildren) {
    return (
        <>
            <Toastable
                statusMap={{
                    success: 'green',
                    danger: 'red',
                    warning: 'orange',
                    info: 'lightblue',
                }}
            />
            {props.children}
        </>
    )
}
