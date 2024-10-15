import React, { PropsWithChildren } from 'react';
import ToastManager from 'toastify-react-native';

export default function AppLayout(props: PropsWithChildren) {
    return (
        <>
            <ToastManager />
            {props.children}
        </>
    )
}