import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ShoppingCartIcon, ArrowRightIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import BadgeIcon from './BadgeIcon';
import CustomText from './CustomText';
import Invoice from '../core/entities/Invoice';
import { Utils } from '../utils';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

type InvoiceCardProps = {
    invoice: Invoice,
}
export default function InvoiceCardItem({invoice}: InvoiceCardProps) {
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const getInvoiceDetail = (invoiceItem: Invoice) => {
        const amount = invoiceItem?.order?.amount ?? '';
        const orderType = getOrderTypeName(invoiceItem?.order?.type);
        const prodcutName = invoiceItem?.order?.product?.name ?? '';

        return (
            `${amount}€ ${orderType} ${prodcutName}`
        )
    }
    const getOrderTypeName = (type:string | undefined): string => {
        if (type !== 'sale') {return 'Abonnement';}
        return 'Achat'
    }
    return (
        <Pressable style={styles.invoiceCardItem} onPress={() => navigation.navigate('InvoiceShow', {id: invoice.id, number: invoice.number})}>
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
            <ArrowRightIcon size={25} color={CONSTS.COLOR.PRIMARY}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    invoiceCardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: CONSTS.SIZE.LG,
        paddingVertical: CONSTS.SIZE.LG,
        paddingHorizontal: CONSTS.SIZE.LG,
        borderWidth: 1,
        borderColor: CONSTS.COLOR.SECONDARY,
        marginBottom: CONSTS.SIZE.MD,
    },
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