import React from 'react';
import { Image, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { CONSTS } from '../constants';
import { Components } from '.';
import CustomText from './CustomText';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';

type InvoiceCardHeaderProps = ViewProps & {
    canShowButton: boolean,
    canShowImage: boolean,
    price?: string,
}

export default function InvoiceCardHeader(props: InvoiceCardHeaderProps) {
    return (
        <View style={styles.invoiceHeader}>
            <View style={styles.invoiceHeaderTop}>
                <View style={styles.invoiceHeaderLeft}>
                    <Components.BadgeIcon color="#262003"
                    paddingH={CONSTS.SIZE.SM} paddingV={CONSTS.SIZE.SM}>
                        <ShoppingCartIcon color={CONSTS.COLOR.PRIMARY} size={25}/>
                    </Components.BadgeIcon>
                    <View>
                        <CustomText customStyle={styles.invoiceTitle}>
                            Facture
                        </CustomText>
                        <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                            à payer
                        </CustomText>
                    </View>
                </View>
                <CustomText customStyle={styles.invoicePrice}>
                    {props.price !== undefined ? props.price : null}
                </CustomText>
            </View>
            {props.canShowButton &&
                <Pressable onPress={null} style={styles.invoiceButton}>
                    <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                        Consulter
                    </CustomText>
                </Pressable>
            }
            <Image style={styles.paperPattern}
            source={require('../assets/images/paper-pattern.png')} />
            {props.canShowImage &&
                <Image style={styles.invoiceImage}
                source={require('../assets/images/invoice-coins.png')} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    invoiceHeader: {
        position: 'relative',
        backgroundColor: CONSTS.COLOR.BLACK,
        paddingHorizontal: CONSTS.SIZE.XL,
        paddingVertical: CONSTS.SIZE.XL,
        borderTopLeftRadius: CONSTS.SIZE.XL,
        borderTopRightRadius: CONSTS.SIZE.XL,
        marginTop: CONSTS.SIZE.LG,
        marginBottom: 60,
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
    invoiceButton: {
        alignSelf: 'flex-start',
        marginTop: CONSTS.SIZE.XL,
        backgroundColor: CONSTS.COLOR.PRIMARY,
        paddingVertical: CONSTS.SIZE.SM,
        paddingHorizontal: 40,
        borderRadius: CONSTS.SIZE.XXL,
    },
    invoiceImage: {
        position: 'absolute',
        right: 0,
        bottom: -60,
    },
    paperPattern: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        width: '115%',
    },
})