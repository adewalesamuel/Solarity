/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useCallback, useEffect } from 'react'
import AppLayout from '../layouts/AppLayout'
import MainLayout from '../layouts/MainLayout'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { CONSTS } from '../constants'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import { useError } from '../hooks/useError'
import { Hooks } from '../hooks'
import { Components } from '../components'
import CustomText from '../components/CustomText'
import { Utils } from '../utils'
import { CheckBadgeIcon } from 'react-native-heroicons/outline'

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
                params?.number as string, abortController.signal
            );
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
                <ScrollView style={styles.container}>
                    <Components.Loader isLoading={useInvoice.isDisabled}>
                        <Components.InvoiceCardHeader canShowButton={false} canShowImage={false}
                        price={useInvoice.order?.amount} number={useInvoice.number}/>
                        <View style={{...styles.invoiceRow, marginTop: (60 * -1)}}>
                            <View style={styles.companyAddress}>
                                <Components.CustomText>10 Chemin de Chalezeau</Components.CustomText>
                                <Components.CustomText>45340 - Montliard</Components.CustomText>
                                <Components.CustomText>France</Components.CustomText>
                            </View>
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo} source={require('../assets/images/logo-light.png')}/>
                            </View>
                        </View>
                        <View style={styles.invoiceRow}>
                            <View style={styles.userInfo}>
                                <Components.CustomText customStyle={styles.userInfoTitle}>
                                    Facture pour
                                </Components.CustomText>
                                <Components.CustomText customStyle={styles.userName}>
                                    {useInvoice.order?.user?.name}
                                </Components.CustomText>
                                <Components.CustomText>
                                    {useInvoice.order?.user?.address}
                                </Components.CustomText>
                                <Components.CustomText>
                                    {useInvoice.order?.user?.street}
                                </Components.CustomText>
                                <Components.CustomText>
                                    {useInvoice.order?.user?.city}
                                </Components.CustomText>
                            </View>
                            <View style={styles.orderInfo}>
                                <View style={styles.orderInfoRow}>
                                    <CustomText customStyle={styles.orderInfoLabel}>
                                        Date:
                                    </CustomText>
                                    <CustomText>
                                        {Utils.Date.styleDate(new Date(useInvoice.date), 'medium')}
                                    </CustomText>
                                </View>
                                <View style={styles.orderInfoRow}>
                                    <CustomText customStyle={styles.orderInfoLabel}>
                                        Paiement:
                                    </CustomText>
                                    <CustomText>
                                        {Utils.Order.isOrderPaid(useInvoice.order?.status) ?
                                            <View style={styles.orderStatus}>
                                                <CheckBadgeIcon color={CONSTS.COLOR.SUCCESS} size={15} key={1}/>
                                                <CustomText>Recu</CustomText>
                                            </View>
                                            :
                                            <View style={styles.orderStatus}>
                                                <CheckBadgeIcon color={CONSTS.COLOR.DANGER} size={15} key={2}/>
                                                <CustomText>Impayé</CustomText>
                                            </View>
                                        }
                                    </CustomText>
                                </View>
                                <View style={styles.orderInfoRow}>
                                    <CustomText customStyle={styles.orderInfoLabel}>
                                        Carte N°:
                                    </CustomText>
                                    <CustomText>
                                        ****{useInvoice.order?.user?.pm_last_four}
                                    </CustomText>
                                </View>
                            </View>
                        </View>
                        {useInvoice.order?.product &&
                            <Components.InvoiceProductItem product={useInvoice.order.product} />
                        }
                        {useInvoice.order?.products &&
                            <>
                                {useInvoice.order.products.map((product, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Components.InvoiceProductItem product={product} />
                                        </Fragment>
                                    )
                                })}
                            </>
                        }
                        <View style={styles.totalContainer}>
                            <View style={styles.totalRow}>
                                <CustomText customStyle={styles.totalLabel}>
                                    Montant HT:
                                </CustomText>
                                <CustomText customStyle={styles.totalValue}>
                                    {useInvoice.order?.amount}€
                                </CustomText>
                            </View>
                            <View style={styles.totalRow}>
                                <CustomText customStyle={styles.totalLabel}>
                                    T.V.A:
                                </CustomText>
                                <CustomText customStyle={styles.totalValue}>
                                    0.00€
                                </CustomText>
                            </View>
                            <View style={styles.totalRow}>
                                <CustomText customStyle={styles.lastTotalLabel}>
                                    TOTAL:
                                </CustomText>
                                <CustomText customStyle={styles.lastTotalValue}>
                                    {useInvoice.order?.amount}€
                                </CustomText>
                            </View>
                        </View>
                    </Components.Loader>
                </ScrollView>
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
    invoiceRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: CONSTS.COLOR.LIGHT,
        paddingVertical: CONSTS.SIZE.LG,
    },
    companyAddress: {
        width: '50%',
    },
    logoContainer: {
        paddingTop: CONSTS.SIZE.SM,
        width: '50%',
        alignItems: 'flex-end',
    },
    logo: {
        width: 120,
        height: 17,
    },
    userInfo: {
        width: '50%',
    },
    userInfoTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userName: {
        color: CONSTS.COLOR.BLACK,
    },
    orderInfo: {
        width: '50%',
        alignSelf: 'center',
    },
    orderInfoRow: {
        flexDirection: 'row',
        rowGap: CONSTS.SIZE.MD,
        justifyContent: 'space-between',
    },
    orderInfoLabel: {
        textAlign: 'right',
        color: CONSTS.COLOR.PRIMARY,
    },
    orderStatus: {
        flexDirection: 'row',
        columnGap: CONSTS.SIZE.XS,
        alignItems: 'center',
    },
    totalContainer: {
        paddingVertical: CONSTS.SIZE.MD,
    },
    totalRow: {
        paddingVertical: CONSTS.SIZE.XS,
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalLabel: {
        flex: 3,
        color: CONSTS.COLOR.BLACK,
        textAlign: 'right',
    },
    totalValue: {
        flex: 1,
        color: CONSTS.COLOR.BLACK,
        textAlign: 'right',
    },
    lastTotalLabel: {
        flex: 3,
        color: CONSTS.COLOR.BLACK,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    lastTotalValue: {
        flex: 1,
        color: CONSTS.COLOR.BLACK,
        textAlign: 'right',
        fontWeight: 'bold',
    },
})