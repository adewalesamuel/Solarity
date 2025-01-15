/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { Layouts } from '../layouts';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';
import Product from '../core/entities/Product';
import TitleText from '../components/TitleText';
import CustomText from '../components/CustomText';

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
                <View style={styles.container}>
                    <ImageBackground style={styles.bgImg} resizeMode="cover"
                    source={require('../assets/images/family-bg.jpg')}/>
                    <View style={styles.top}>
                        <View style={styles.priceContainer}>
                            <TitleText customStyle={styles.price}>
                                {parseInt(String(useProduct?.primary_price ?? 0), 10)}€
                            </TitleText>
                            <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                                seulement
                            </CustomText>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.bottomCard} showsVerticalScrollIndicator={false}>
                        <TitleText>
                            Panneaux solaires protégés, énergie assurée ...
                        </TitleText>
                        <CustomText>Pour seulement 2€ de plus,</CustomText>
                        <CustomText>
                            assurez vos panneaux solaires contre les aléas
                            de la météo, le vol et les incendies.
                        </CustomText>
                    </ScrollView>
                </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    bgImg: {
        position: 'absolute',
        width: '100%',
        height: 260,
        top: 0,
        left: 0,
        zIndex: 0,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 80,
        paddingHorizontal: CONSTS.SIZE.XL,
        marginBottom: CONSTS.SIZE.XXL * -1,
    },
    priceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: CONSTS.COLOR.BLACK,
    },
    price: {
        fontSize: 42,
        color: CONSTS.COLOR.PRIMARY,
        marginBottom: CONSTS.SIZE.SM * -1,
    },
    bottomCard: {
        height: '100%',
        paddingHorizontal: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingVertical: CONSTS.SIZE.XL,
        borderTopLeftRadius: CONSTS.SIZE.XXL,
        borderTopRightRadius: CONSTS.SIZE.XXL,
    },
})