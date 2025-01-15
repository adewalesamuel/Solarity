
import React, { useCallback, useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeftIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import CustomText from './CustomText';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Components } from '.';

export default function ShopHeader(props: NativeStackHeaderProps) {

    const init = useCallback(async () => {
        // get cart info
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <View style={styles.container}>
            <Pressable style={styles.iconContainer} onPress={() => props.navigation.goBack()}>
                <ArrowLeftIcon size={30} color={CONSTS.COLOR.BLACK}/>
            </Pressable>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <CustomText customStyle={textStyle}>Mon panier</CustomText>
                    <CustomText customStyle={styles.amountText}>
							Total: <CustomText customStyle={styles.price}>00.00 €</CustomText>
					</CustomText>
                </View>
                <Components.BadgeIcon color={CONSTS.COLOR.PRIMARY_SOFT}
                paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                    <ShoppingCartIcon size={CONSTS.SIZE.XXL} color={CONSTS.COLOR.PRIMARY}/>
                </Components.BadgeIcon>
            </View>
        </View>
    )
}

const textStyle = {
    textAlign: 'right' as 'right',
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingTop: CONSTS.SIZE.XL,
        paddingBottom: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.MD,
        marginBottom: Platform.OS === 'ios' ? -20 : 0,
    },
    iconContainer: {
        borderWidth: 1,
        paddingHorizontal: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
        borderRadius: CONSTS.SIZE.XXL,
        borderColor: CONSTS.COLOR.SECONDARY,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        borderColor: 'red',
        marginRight: CONSTS.SIZE.MD,
    },
	amountText: {
        ...textStyle,
        textTransform: 'capitalize',
        marginTop: CONSTS.SIZE.SM,
		color: CONSTS.COLOR.BLACK,
	},
    price: {
        fontWeight: 'bold',
        color: 'black',
    },
});