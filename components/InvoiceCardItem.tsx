import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import BadgeIcon from './BadgeIcon';
import CustomText from './CustomText';
import Invoice from '../core/entities/Invoice';
import { Utils } from '../utils';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Components } from '.';

type InvoiceCardProps = {
    invoice: Invoice,
}
export default function InvoiceCardItem({invoice}: InvoiceCardProps) {
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const getInvoiceDetail = (invoiceItem: Invoice) => {
        const amount = invoiceItem?.order?.amount ?? '';
        const orderType = getOrderTypeName(invoiceItem?.order?.type);
        const productName = invoiceItem?.order?.product?.name ?? '';

        return (
            `${amount}€ ${orderType} ${productName}`
            .slice(0,32).concat('...')
        )
    }
    const getOrderTypeName = (type:string | undefined): string => {
        return type !== 'sale' ? 'Abonnement' : 'Achat';
    }
    return (
        <Components.ButtonListItem onPress={() => navigation.navigate(
            'InvoiceShow', {id: invoice.id, number: invoice.number})}>
            <View style={styles.invoiceCardItemLeft}>
                <BadgeIcon color={CONSTS.COLOR.LIGHT} paddingH={CONSTS.SIZE.SM}
                paddingV={CONSTS.SIZE.SM}>
                    <ShoppingCartIcon color={CONSTS.COLOR.BLACK} size={25}/>
                </BadgeIcon>
                <View>
                    <CustomText customStyle={styles.invoiceItemTitle}>
                        Facture {Utils.Date.styleDate(new Date(invoice.date), 'long')}
                    </CustomText>
                    <CustomText>
                        {getInvoiceDetail(invoice)}
                    </CustomText>
                </View>
            </View>
        </Components.ButtonListItem>
    )
}

const styles = StyleSheet.create({
    invoiceCardItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: CONSTS.SIZE.LG,
    },
    invoiceItemTitle: {
        fontSize: CONSTS.SIZE.LG,
    },
    invoiceItemSubtitle: {
        fontSize: CONSTS.SIZE.MD,
        color: CONSTS.COLOR.SECONDARY,
    },
})