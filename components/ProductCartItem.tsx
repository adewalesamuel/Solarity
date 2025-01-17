import { Pressable, View, ImageSourcePropType, TouchableOpacity, PressableProps, StyleSheet } from 'react-native';
import { ShoppingCartIcon, PlusIcon, MinusIcon } from 'react-native-heroicons/outline';
import { Components } from '.';
import { CONSTS } from '../constants';
import CustomText from './CustomText';
import React, { useState } from 'react';
import Product from '../core/entities/Product';

type ProductCartitemProps = PressableProps & {
    product: Product
}

export default function ProductCardItem({product}: ProductCartitemProps) {
    const [quantity, setQuantity] = useState(0);
    return (
        <Pressable style={styles.productCard}>
            <View style={styles.productCardLeft}>
                <Components.SafeImage style={styles.productImage}
                source={product.img_url as ImageSourcePropType} />
                <View style={styles.productCardInfo}>
                    <CustomText customStyle={styles.productName}>
                        {product.name.slice(0,28).concat('...')}
                    </CustomText>
                    <CustomText customStyle={styles.productDescription}>
                        {product.details.slice(0,32).concat('...')}
                    </CustomText>
                    <CustomText customStyle={styles.productPrice}>
                        {product.primary_price}€
                    </CustomText>
                </View>
            </View>
            <View style={styles.productCardRight}>
                <ShoppingCartIcon color={CONSTS.COLOR.PRIMARY} />
                <View style={styles.quantityPicker}>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <PlusIcon color={CONSTS.COLOR.BLACK} size={10}/>
                    </TouchableOpacity>
                    <CustomText customStyle={styles.quantity}>{quantity}</CustomText>
                    <TouchableOpacity onPress={() => setQuantity(quantity && quantity - 1)}>
                        <MinusIcon color={CONSTS.COLOR.BLACK} size={10}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    productCard: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: CONSTS.SIZE.MD,
        borderRadius: CONSTS.SIZE.LG,
        borderColor: CONSTS.COLOR.LIGHT,
    },
    productCardLeft: {
        flexDirection: 'row',
        columnGap: CONSTS.SIZE.MD,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: CONSTS.SIZE.MD,
    },
    productName: {
        fontSize: CONSTS.SIZE.MD,
        color: CONSTS.COLOR.BLACK,
    },
    productDescription: {
        fontSize: 10,
        marginTop: -CONSTS.SIZE.MD,
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: CONSTS.SIZE.LG,
        color: CONSTS.COLOR.BLACK,
    },
    productCardInfo: {
        justifyContent: 'space-between',
    },
    productCardRight: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    quantityPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: CONSTS.SIZE.MD,
    },
    quantity: {
        color: CONSTS.COLOR.BLACK,
        fontSize: CONSTS.SIZE.MD,
    },
})