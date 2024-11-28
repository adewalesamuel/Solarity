import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppLayout from '../layouts/AppLayout';
import MainLayout from '../layouts/MainLayout';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';
import CustomText from '../components/CustomText';
import { Utils } from '../utils';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Hooks } from '../hooks';

export default function InvoiceListView() {
    const {Auth} = Utils;

    // const navigation: NavigationProp<ParamListBase> = useNavigation();
    const errorHandler = Hooks.useError();
    const useUser = Hooks.useUser();

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            const user = await Auth.getUser();
            useUser.fillUser(user);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        init();
    }, [init])
    return (
        <AppLayout>
            <MainLayout>
                <ScrollView style={styles.container}>
                    <View style={styles.titleContainer}>
                        <View>
                            <Components.TitleText>Factures</Components.TitleText>
                            <CustomText customStyle={styles.dateIntervalText}>
								{Utils.Date.getMonthInterval(
								new Date(useUser.created_at as string),
								new Date())}
							</CustomText>
                        </View>
                        <View style={styles.iconContainer}>
							<EllipsisVerticalIcon size={30} color={CONSTS.COLOR.BLACK}/>
						</View>
                    </View>
                    <View style={styles.invoiceHeader}>
                        <View style={styles.invoiceHeaderTop}>
                            <View style={styles.invoiceHeaderLeft}>
                                <Components.BadgeIcon color="#262003" 
                                paddingH={CONSTS.SIZE.SM} paddingV={CONSTS.SIZE.SM}>
                                    <ShoppingCartIcon color={CONSTS.COLOR.PRIMARY} size={25}/>
                                </Components.BadgeIcon>
                                <View>
                                    <CustomText customStyle={styles.invoiceTitle}>Facture</CustomText>
                                    <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>à payer</CustomText>
                                </View>
                            </View>
                            <CustomText customStyle={styles.invoicePrice}>14,90 €</CustomText>
                        </View>
                    </View>
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
    titleContainer: {
        paddingVertical: CONSTS.SIZE.MD,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateIntervalText: {
		textTransform: 'capitalize',
	},
    iconContainer: {
		borderRadius: CONSTS.SIZE.LG,
		borderWidth: 1,
		paddingVertical: CONSTS.SIZE.MD,
		borderColor: CONSTS.COLOR.SECONDARY,
	},
    invoiceHeader: {
        backgroundColor: CONSTS.COLOR.BLACK,
        paddingHorizontal: CONSTS.SIZE.XL,
        paddingVertical: CONSTS.SIZE.XL,
        borderTopLeftRadius: CONSTS.SIZE.XL,
        borderTopRightRadius: CONSTS.SIZE.XL,
        marginTop: CONSTS.SIZE.LG,
    },
    invoiceHeaderTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    invoiceHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap: CONSTS.SIZE.LG,
    },
    invoiceTitle: {
        color: CONSTS.COLOR.WHITE,
        fontSize: CONSTS.SIZE.LG,
        fontWeight: 'bold',
    },
    invoicePrice: {
        color: CONSTS.COLOR.PRIMARY,
        fontWeight: 'bold',
        fontSize: CONSTS.SIZE.LG,
    },
})