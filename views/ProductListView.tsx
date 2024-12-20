/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import { NavigationProp, ParamListBase, useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import Product from '../core/entities/Product';
import { ResponsePaginate } from '../core/types/services';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import ProductCategory from '../core/entities/ProductCategory';
import CustomText from '../components/CustomText';

export default function ProductListView() {
    let abortController = new AbortController();
    const { ProductService, ProductCategoryService } = Services;

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<ParamListBase> = useRoute();
    const errorHandler = useError();

    const [product_categorys, setProduct_categorys] = useState<ProductCategory[]>([])
    const [current_category, _setCurrent_category] = useState<string>();
    const [_products, setProducts] = useState<Product[]>([]);
    const [page, _setPage] = useState(1);
    const [_pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string>();

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
            const productResponse = await ProductService.getAll({
                    page: page,
                    category: current_category,
                    type: CONSTS.PRODUCT.PRODUCT_TYPE,
                }, abortController.signal
            );
            const productList = productResponse.products as ResponsePaginate<Product[]>;

            setProducts(productList.data);
            setPageLength(productList.last_page);

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
                    <Components.Loader isLoading={isLoading}>
                        <View style={styles.topContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput style={styles.searchInput} placeholderTextColor={CONSTS.COLOR.TEXT_BASE}
                                placeholder="Trouver un produit" textContentType="name" autoCapitalize="none"
                                value={searchInput} onChangeText={(text: string) => setSearchInput(text)} />
                                <MagnifyingGlassIcon style={styles.searchIcon}
                                color={CONSTS.COLOR.BLACK} size={30} />
                            </View>
                            <View style={styles.iconContainer}>
                                <EllipsisVerticalIcon size={30} color="black"/>
                            </View>
                        </View>
                        <Components.TitleText>Catégories</Components.TitleText>
                        <FlatList contentContainerStyle={styles.productCategoryContainer}
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
                        }
                        />
                    </Components.Loader>
                </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingHorizontal: CONSTS.SIZE.LG,
        height: '100%',
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: CONSTS.SIZE.SM,
        columnGap: CONSTS.SIZE.SM,
    },
})