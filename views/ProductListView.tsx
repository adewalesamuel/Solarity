/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Product from '../core/entities/Product';
import { ResponsePaginate } from '../core/types/services';
import { ActivityIndicator, FlatList, ImageSourcePropType, StyleSheet, TextInput, View } from 'react-native';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import ProductCategory from '../core/entities/ProductCategory';
import CustomText from '../components/CustomText';

export default function ProductListView() {
    let abortController = new AbortController();
    const { ProductService, ProductCategoryService } = Services;

    const errorHandler = useError();

    const [product_categorys, setProduct_categorys] = useState<ProductCategory[]>([])
    const [current_category, _setCurrent_category] = useState<string>();
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string>();
    const [hasMoreData, setHasMoreData] = useState(true);

    const handleEndReached = () => {
        if (hasMoreData === false) {return;}
        setPage((prevPage) => prevPage + 1);
    }

    const getCategoryBadgeStyle = (product_category: string) => {
        return {
            borderWidth: 1,
            borderColor: current_category === product_category ?
            CONSTS.COLOR.PRIMARY_SOFT : CONSTS.COLOR.LIGHT,
            paddingVertical: CONSTS.SIZE.SM,
            paddingHorizontal: CONSTS.SIZE.MD,
            borderRadius: CONSTS.SIZE.XL,
        }
    }

    const getCategoryTextStyle = (product_category: string) => {
        return {
            color: current_category === product_category ?
            CONSTS.COLOR.PRIMARY : CONSTS.COLOR.SECONDARY,
        }
    }

    const init = useCallback(async () => {
        setIsLoading(true);

        try {
            const productResponse = await ProductService.getAll(
                {
                    page: page,
                    category: current_category,
                    type: CONSTS.PRODUCT.PRODUCT_TYPE,
                },
                abortController.signal
            );
            const data = (productResponse.products as ResponsePaginate<Product[]>).data;

            setProducts([...products, ...data]);

            if (data.length === 0) {setHasMoreData(false)}
            if (product_categorys.length > 0) {return;}

            const categoryResponse = await ProductCategoryService.getAll(
                {page: ''}, abortController.signal
            );
            setProduct_categorys(categoryResponse.product_categorys as ProductCategory[]);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page, current_category]);

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init]);
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.searchInput}
                            placeholderTextColor={CONSTS.COLOR.TEXT_BASE}
                            placeholder="Trouver un produit" textContentType="name"
                             autoCapitalize="none" value={searchInput}
                             onChangeText={(text: string) => setSearchInput(text)} />
                            <MagnifyingGlassIcon style={styles.searchIcon}
                            color={CONSTS.COLOR.BLACK} size={30} />
                        </View>
                        <View style={styles.iconContainer}>
                            <EllipsisVerticalIcon size={30} color="black"/>
                        </View>
                    </View>
                    <Components.TitleText>Catégories</Components.TitleText>
                    <View style={styles.productCategoryContainer}>
                        <FlatList contentContainerStyle={styles.productCategoryList}
                        data={product_categorys} horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({item}) => (
                                <View style={getCategoryBadgeStyle(item.slug)}>
                                    <CustomText customStyle={getCategoryTextStyle(item.slug)}>
                                        {item.name}
                                    </CustomText>
                                </View>
                            )
                        }/>
                    </View>
                    {products.length > 0 ?
                    <FlatList contentContainerStyle={styles.productList}
                        data={products}
                        onEndReached={handleEndReached}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({item}) => (
                                <View style={styles.productCard}>
                                    <View style={styles.productCardLeft}>
                                        <Components.SafeImage style={styles.productImage}
                                        source={item.img_url as ImageSourcePropType} />
                                        <View style={styles.productCardInfo}>
                                            <CustomText customStyle={styles.productName}>
                                                {item.name.slice(0,28).concat('...')}
                                            </CustomText>
                                            <CustomText customStyle={styles.productDescription}>
                                                {item.details.slice(0,32).concat('...')}
                                            </CustomText>
                                            <CustomText customStyle={styles.productPrice}>
                                                {item.primary_price}€
                                            </CustomText>
                                        </View>
                                    </View>
                                    <View style={styles.productCardRight}>
                                        <ShoppingCartIcon color={CONSTS.COLOR.PRIMARY} />
                                        <View style={styles.quantityPicker}>
                                            <PlusIcon color={CONSTS.COLOR.BLACK} size={10}/>
                                            <CustomText customStyle={styles.quantity}>2</CustomText>
                                            <MinusIcon color={CONSTS.COLOR.BLACK} size={10}/>
                                        </View>
                                    </View>
                                </View>
                            )
                        }/> : null
                    }
                    {isLoading ? <ActivityIndicator size={'large'} color={CONSTS.COLOR.PRIMARY} /> : null}
                </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
    topContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
        columnGap: CONSTS.SIZE.MD,
		marginBottom: CONSTS.SIZE.XL,
        marginTop: CONSTS.SIZE.SM,
	},
    iconContainer: {
		borderRadius: CONSTS.SIZE.LG,
		borderWidth: 1,
		paddingVertical: CONSTS.SIZE.MD,
		borderColor: CONSTS.COLOR.SECONDARY,
	},
    inputContainer: {
        position: 'relative',
        flex: 1,
    },
    searchInput: {
        borderWidth: 1,
        paddingRight: 60,
        color: CONSTS.COLOR.TEXT_BASE,
        borderColor: CONSTS.COLOR.LIGHT,
        paddingVertical: CONSTS.SIZE.MD,
        paddingLeft: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.XL,
    },
    searchIcon: {
        position: 'absolute',
        top: CONSTS.SIZE.MD,
        right: CONSTS.SIZE.XL,
    },
    productCategoryContainer: {
        marginTop: CONSTS.SIZE.SM,
    },
    productCategoryList: {
        columnGap: CONSTS.SIZE.SM,
    },
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
        marginTop: CONSTS.SIZE.MD * -1,
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
    productList: {
        marginTop: CONSTS.SIZE.LG,
        rowGap: CONSTS.SIZE.LG,
    },
})