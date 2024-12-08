/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Product from '../core/entities/Product';
import { ResponsePaginate } from '../core/types/services';
import Order from '../core/entities/Order';
import { ArrowLeftIcon, ArrowUturnRightIcon } from 'react-native-heroicons/outline';
import CustomText from '../components/CustomText';

export default function SubscriptionShowView() {
    let abortController = new AbortController();

    const { OrderService, ProductService } = Services;

    const errorHandler = useError();

    const [subscription, setSubscription] = useState<Order>();
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pageLength, setPageLength] = useState(1);

    const init = useCallback(async () => {
        try {
            if (page === 1) {
                const orderResponse = await OrderService.getLatestSubscription(
                    abortController.signal);
                setSubscription(orderResponse.subscription as Order);
            }

            const productResponse =  await ProductService.getAll(
                {page:page, type: CONSTS.PRODUCT.SERVICE_TYPE},
                abortController.signal
            )
            const responsePaginate = productResponse.products as ResponsePaginate<Product[]>;

            setProducts(responsePaginate.data);
            setPageLength(responsePaginate.last_page);
        } catch (error) {

            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();
        // return () => abortController.abort();
    }, [init]);
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}>
                    <ImageBackground source={require('../assets/images/subscription-bg.jpg')}
                    style={styles.bgImg} resizeMode="cover"/>
                    <View style={styles.header}>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <ArrowLeftIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <ArrowUturnRightIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                    </View>
                    <View style={styles.subscriptionInfoContainer}>
                        <Text style={styles.price}>{subscription?.amount}€</Text>
                        <Text style={styles.productName}>{subscription?.product?.name}</Text>
                        <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                            Vous êtes inscrits à l’abonnement
                        </CustomText>
                        <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                            {subscription?.product?.name} {subscription?.product?.primary_period} mois
                        </CustomText>
                        <Pressable style={styles.buttonContainer}>
                            <View style={styles.buttonInnerContainer}>
                                <CustomText>Upgrade Now -20% </CustomText>
                                <CustomText customStyle={styles.buttonTextRight}>
                                    Solarity+ Duo
                                </CustomText>
                            </View>
                        </Pressable>
                        <Image style={styles.mainImg} source={require('../assets/images/solar-panel.png')} />
                    </View>
                    <View style={styles.cardContainer}>

                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 460,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: CONSTS.SIZE.XL,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
    subscriptionInfoContainer: {
        alignItems: 'center',
        paddingTop: 65,
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingBottom: CONSTS.SIZE.LG,
    },
    price: {
        color: CONSTS.COLOR.PRIMARY,
        fontSize: 68,
        fontWeight: 'bold',
    },
    productName: {
        color: CONSTS.COLOR.WHITE,
        fontSize: CONSTS.SIZE.XL,
        fontWeight: 'bold',
        marginBottom: CONSTS.SIZE.MD,
    },
    buttonContainer: {
        width: '100%',
        marginTop: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.PRIMARY,
        alignItems: 'center',
    },
    buttonInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTextRight: {
        fontWeight: 'bold',
    },
    mainImg: {
        zIndex: 10,
        width: 330,
        height: 120,
        marginTop: CONSTS.SIZE.XL,
        marginBottom: -40,
    },
    cardContainer: {
        backgroundColor: CONSTS.COLOR.WHITE,
        borderTopStartRadius: CONSTS.SIZE.XXL,
        borderTopRightRadius: CONSTS.SIZE.XXL,
        flex: 1,
    },
})