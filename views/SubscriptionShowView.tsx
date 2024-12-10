/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Product from '../core/entities/Product';
import { ResponsePaginate } from '../core/types/services';
import Order from '../core/entities/Order';
import { ArrowLeftIcon, ArrowUturnRightIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import CustomText from '../components/CustomText';

export default function SubscriptionShowView() {
    let abortController = new AbortController();

    const { OrderService, ProductService } = Services;

    const errorHandler = useError();

    const [subscription, setSubscription] = useState<Order>();
    const [products, setProducts] = useState<Product[]>([]);
    const [page, _setPage] = useState(1);
    const [isLoading_1, setIsLoading_1] = useState(true);
    const [isLoading_2, setIsLoading_2] = useState(true);

    const init = useCallback(async () => {
        try {
            if (page === 1) {
                const orderResponse = await OrderService.getLatestSubscription(
                    abortController.signal);
                setSubscription(orderResponse.subscription as Order);
                setIsLoading_1(false);
            }

            const response =  await ProductService.getAll(
                {page:page, type: CONSTS.PRODUCT.SERVICE_TYPE},
                abortController.signal
            )
            const productResponse = response.products as ResponsePaginate<Product[]>;

            setProducts(productResponse.data);
            setIsLoading_2(false);
        } catch (error) {

            errorHandler.setError(error);
        } finally {
            setIsLoading_1(false);
            setIsLoading_2(false);
        }
    }, [page]);

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init]);
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
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
                        <Components.Loader isLoading={isLoading_1}>
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
                        </Components.Loader>
                    </View>
                    <View style={styles.cardContainer}>
                        <Components.TitleText>
                            Détail de l’offre {subscription?.product?.name}
                        </Components.TitleText>
                        <View style={styles.accordeon}>
                            <View style={styles.accordeonItem}>
                                <CustomText customStyle={styles.accordeonTitle}>
                                    Accès à des Produits à Prix Coûtant
                                </CustomText>
                                <ChevronRightIcon color={CONSTS.COLOR.PRIMARY}/>
                            </View>
                            <View style={styles.accordeonItem}>
                                <CustomText customStyle={styles.accordeonTitle}>
                                    Gestion Simplifiée des Abonnements
                                </CustomText>
                                <ChevronRightIcon color={CONSTS.COLOR.PRIMARY}/>
                            </View>
                            <View style={styles.accordeonItem}>
                                <CustomText customStyle={styles.accordeonTitle}>
                                    Tirage au Sort Annuel
                                </CustomText>
                                <ChevronRightIcon color={CONSTS.COLOR.PRIMARY}/>
                            </View>
                        </View>

                        <Components.TitleText>
                            Découvrez nos offres
                        </Components.TitleText>
                        <View style={styles.productListContainer}>
                            <Components.Loader isLoading={isLoading_2}>
                                {products.map((product, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Components.ButtonListItem>
                                                <View style={styles.buttonListItemLeft}>
                                                    <Components.SafeImage style={styles.productImage}
                                                    source={product.img_url as ImageSourcePropType | undefined}/>
                                                    <View>
                                                        <View style={styles.productInfoTop}>
                                                            <CustomText customStyle={{
                                                                fontSize: CONSTS.SIZE.LG,
                                                                color: CONSTS.COLOR.BLACK,
                                                            }}>{product.name}</CustomText>
                                                            <CustomText customStyle={styles.productPrice}>
                                                                {product.primary_price}€
                                                            </CustomText>
                                                        </View>
                                                        <CustomText>{product.details.slice(0,28).concat('...')}</CustomText>
                                                    </View>
                                                </View>
                                            </Components.ButtonListItem>
                                        </Fragment>
                                    )
                                })}
                            </Components.Loader>
                        </View>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        position: 'relative',
    },
    bgImg: {
        position: 'absolute',
        width: '100%',
        height: 460,
        top: 0,
        left: 0,
    },
    header: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        paddingTop: CONSTS.SIZE.XL,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
    subscriptionInfoContainer: {
        alignItems: 'center',
        paddingTop: 65,
        minHeight: 425,
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingBottom: CONSTS.SIZE.LG,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 68,
        color: CONSTS.COLOR.PRIMARY,
    },
    productName: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.WHITE,
        fontSize: CONSTS.SIZE.XL,
        marginBottom: CONSTS.SIZE.MD,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.PRIMARY,
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
        marginBottom: -40,
        marginTop: CONSTS.SIZE.LG,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: CONSTS.COLOR.WHITE,
        borderTopStartRadius: CONSTS.SIZE.XXL,
        borderTopRightRadius: CONSTS.SIZE.XXL,
        paddingTop: CONSTS.SIZE.XXL,
        paddingBottom: CONSTS.SIZE.LG,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
    accordeon: {
        marginTop: CONSTS.SIZE.SM,
        marginBottom: CONSTS.SIZE.XL,
    },
    accordeonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: CONSTS.COLOR.LIGHT,
        paddingVertical: CONSTS.SIZE.SM,
    },
    accordeonTitle: {
        color: CONSTS.COLOR.BLACK,
    },
    productListContainer: {
        marginTop: CONSTS.SIZE.MD,
    },
    buttonListItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: CONSTS.SIZE.LG,
    },
    buttonListItemText: {
        fontSize: CONSTS.SIZE.LG,
    },
    productImage: {
        width: 60,
        height: 60,
        marginLeft: (CONSTS.SIZE.SM * -1),
    },
    productInfoTop: {
        flexDirection: 'row',
        columnGap: CONSTS.SIZE.SM,
    },
    productPrice: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.PRIMARY,
        fontSize: CONSTS.SIZE.LG,
    }
})