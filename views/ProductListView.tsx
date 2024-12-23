/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { Components } from '../components';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Product from '../core/entities/Product';
import { ResponsePaginate } from '../core/types/services';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import ProductCategory from '../core/entities/ProductCategory';
import CustomText from '../components/CustomText';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

export default function ProductListView() {
    let abortController = new AbortController();
    const { ProductService, ProductCategoryService } = Services;
    const allCategoryItem: ProductCategory = {
        id: -1,
        display_img_url: '',
        logo_img_url: '',
        name: 'Tous',
        description: '',
        slug: '',
        product_category_id: -1,
        created_at: '',
        updated_at: '',
    }

    const errorHandler = useError();

    const [product_categorys, setProduct_categorys] = useState<ProductCategory[]>([])
    const [current_category, setCurrent_category] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string>();
    const [hasMoreData, setHasMoreData] = useState(true);

    const appendProductList = (currentPage: number, productList: Product[]) => {
        if (currentPage === 1) { return setProducts(productList);}
        setProducts([...products, ...productList]);
    }

    const handleCategoryPress = (slug: string) => {
        if (isLoading) {return;}

        setPage(1);
        setHasMoreData(true);
        setCurrent_category(slug);
    }

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
            backgroundColor: current_category === product_category ?
            CONSTS.COLOR.PRIMARY_SOFT : CONSTS.COLOR.WHITE,
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
        if (page === 1) {setProducts([]);}

        try {
            const productResponse = await ProductService.getAll(
                {
                    page: page,
                    category: current_category,
                },
                abortController.signal
            );
            const data = (productResponse.products as ResponsePaginate<Product[]>).data;

            appendProductList(page, data);

            if (data.length === 0) {setHasMoreData(false)}
            if (product_categorys.length > 0) {return;}

            const categoryResponse = await ProductCategoryService.getAll(
                {page: ''}, abortController.signal
            );

            setProduct_categorys([
                allCategoryItem,
                ...categoryResponse.product_categorys as ProductCategory[],
            ]);
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
                        <Components.SearchInput placeholder="Trouver un produit"
                        value={searchInput} onChangeText={(text: string) => setSearchInput(text)}/>
                        <View style={styles.iconContainer}>
                            <EllipsisVerticalIcon size={30} color="black"/>
                        </View>
                    </View>
                    <Components.TitleText>Catégories</Components.TitleText>
                    <View style={styles.productCategoryContainer}>
                        <FlatList contentContainerStyle={styles.productCategoryList}
                        data={product_categorys} horizontal={true}
                        extraData={current_category}
                        renderItem={
                            ({item}) => (
                                <Pressable style={getCategoryBadgeStyle(item.slug)}
                                onPress={() => handleCategoryPress(item.slug)}>
                                    <CustomText customStyle={getCategoryTextStyle(item.slug)}>
                                        {item.name}
                                    </CustomText>
                                </Pressable>
                            )
                        }/>
                    </View>
                    {products.length > 0 ?
                    <FlatList contentContainerStyle={styles.productListContainer}
                        data={products} showsVerticalScrollIndicator={false}
                        onEndReached={handleEndReached}
                        renderItem={
                            ({item}) => (
                                <Components.ProductCardItem product={item} />
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
    productCategoryContainer: {
        paddingVertical: CONSTS.SIZE.MD,
    },
    productCategoryList: {
        columnGap: CONSTS.SIZE.SM,
    },
    productListContainer: {
        paddingBottom: CONSTS.SIZE.LG,
        rowGap: CONSTS.SIZE.LG,
    },
})