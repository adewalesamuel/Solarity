/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { Layouts } from '../layouts';
import { ScrollView } from 'react-native';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';
import Product from '../core/entities/Product';

export default function AssuranceView() {
    const abortController = new AbortController();

    const useOrder = Hooks.useOrder();
    const useProduct = Hooks.useProduct();
    const errorHandler = useError();

    const init = useCallback(async () => {
        useOrder.setIsDisabled(true);

        try {
            const response = await useProduct.getProduct(
                CONSTS.PRODUCT.SOLARITY_ASSURE_SLUG, abortController.signal);
            const product = response.product as Product;

            useOrder.setProduct_id(product.id);
            useOrder.setAmount(product.primary_price);
            useOrder.setType(CONSTS.ORDER.TYPES.SUBSCRIPTION);
            useOrder.setQuantity(1);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useOrder.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    },[init])

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Components.TitleText>
                        ASsurance View
                    </Components.TitleText>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )

}