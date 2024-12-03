import React from 'react';
import Product from '../core/entities/Product';
import { StyleSheet, View } from 'react-native';
import { Components } from '.';
import { CONSTS } from '../constants';
import CustomText from './CustomText';

type InvoiceProductItemProps = {
    product: Product,
}

export default function InvoiceProductItem(props: InvoiceProductItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Components.CustomText customStyle={{color: CONSTS.COLOR.BLACK}}>
                    {props.product.name}
                </Components.CustomText>
                <Components.CustomText>
                    {props.product.details}
                </Components.CustomText>
            </View>
            <View>
                <CustomText customStyle={{color: CONSTS.COLOR.BLACK}}>
                    {props.product.primary_price}€
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: CONSTS.COLOR.LIGHT,
        paddingVertical: CONSTS.SIZE.LG,
    },
    left: {
        width: '50%',
    },
})