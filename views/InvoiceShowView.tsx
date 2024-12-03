/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import AppLayout from '../layouts/AppLayout'
import MainLayout from '../layouts/MainLayout'
import { StyleSheet, View } from 'react-native'
import { CONSTS } from '../constants'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import { useError } from '../hooks/useError'
import { Hooks } from '../hooks'
import { Components } from '../components'
import Order from '../core/entities/Order'

type InvoiceRouteParams = Partial<{
    id: number,
    number: string,
}> | undefined;
export default function InvoiceShowView() {
    let abortController = new AbortController();

    const errorhandler = useError();
    const useInvoice = Hooks.useInvoice();
    const route: RouteProp<ParamListBase> = useRoute();
    const params: InvoiceRouteParams = route.params;

    const init = useCallback(async() => {
        useInvoice.setIsDisabled(true);

        try {
            await useInvoice.getInvoice(
                params?.number as string, abortController.signal);
        } catch (error) {
            errorhandler.setError(error);
        } finally {
            useInvoice.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init])

    return (
        <AppLayout>
            <MainLayout>
                <View style={styles.container}>
                    <Components.CustomText>
                        InvoiceDetail view {(useInvoice?.order as Order )?.amount ?? '--'}
                    </Components.CustomText>
                </View>

            </MainLayout>
        </AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        height: '100%',
        paddingHorizontal: CONSTS.SIZE.MD,
    },
})