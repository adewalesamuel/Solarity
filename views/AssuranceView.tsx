/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { Layouts } from '../layouts';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';
import Product from '../core/entities/Product';
import TitleText from '../components/TitleText';
import CustomText from '../components/CustomText';
import { Utils } from '../utils';
import { CheckBadgeIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';

export default function AssuranceView() {
    const abortController = new AbortController();
    const {String} = Utils;

    const useOrder = Hooks.useOrder();
    const useProduct = Hooks.useProduct();
    const errorHandler = useError();

    const init = useCallback(async () => {
        useOrder.setIsDisabled(true);

        try {
            const response = await useProduct.getProduct(
                CONSTS.PRODUCT.SOLARITY_ASSURE_SLUG, abortController.signal);
            const product = response.product as Product;

            useOrder.setProduct_id(product.id);
            useOrder.setAmount(product.primary_price);
            useOrder.setType(CONSTS.ORDER.TYPES.SUBSCRIPTION);
            useOrder.setQuantity(1);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useOrder.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    },[init])

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <View style={styles.container}>
                    <ImageBackground style={styles.bgImg} resizeMode="cover"
                    source={require('../assets/images/family-bg.jpg')}/>
                    <View style={styles.top}>
                        <View style={styles.priceContainer}>
                            <TitleText customStyle={styles.price}>
                                {String.parsePrice(useProduct?.primary_price)}
                            </TitleText>
                            <CustomText customStyle={{
                                color: CONSTS.COLOR.WHITE,
                                fontSize: textMediumFontSize,
                            }}>
                                seulement
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.bottomCard}>
                        <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: CONSTS.SIZE.LG}}>
                            <TitleText customStyle={{marginBottom: CONSTS.SIZE.MD}}>
                                Panneaux solaires protégés, énergie assurée ...
                            </TitleText>
                            <CustomText customStyle={textLineHeightStyle}>
                                Pour <CustomText customStyle={textBoldFontStyle}>
                                    seulement {String.parsePrice(useProduct.primary_price)}
                                </CustomText> de plus,
                            </CustomText>
                            <CustomText customStyle={textLineHeightStyle}>
                                assurez vos panneaux solaires contre les aléas
                                de la météo, le vol et les incendies.
                            </CustomText>
                            <ScrollView horizontal={true} contentContainerStyle={styles.cardContainer}
                            showsHorizontalScrollIndicator={false}>
                                <View style={[
                                    styles.card,
                                    {backgroundColor: CONSTS.COLOR.PRIMARY},
                                ]}>
                                    <View style={styles.cardLeft}>
                                        <TitleText customStyle={{fontSize: CONSTS.SIZE.LG}}>
                                            Assurance
                                        </TitleText>
                                        <TitleText customStyle={{fontSize: CONSTS.SIZE.LG}}>
                                            Intempéries
                                        </TitleText>
                                        <CustomText customStyle={styles.cardText}>
                                            Zone de texte pour répondre à cette question fréquente
                                            maximum 4-5 lignes pas plus
                                        </CustomText>
                                    </View>
                                    <View style={styles.cardRight}>
                                        <ImageBackground style={styles.cardBgImage}
                                        source={require('../assets/images/thunder.jpg')} resizeMode="cover"/>
                                    </View>
                                </View>
                                <View style={[
                                    styles.card,
                                    {backgroundColor: CONSTS.COLOR.BLACK},
                                ]}>
                                    <View style={styles.cardLeft}>
                                        <TitleText customStyle={{
                                            fontSize: CONSTS.SIZE.LG,
                                            color: CONSTS.COLOR.PRIMARY,
                                        }}>
                                            Assurance
                                        </TitleText>
                                        <TitleText customStyle={{
                                            fontSize: CONSTS.SIZE.LG,
                                            color: CONSTS.COLOR.PRIMARY,
                                        }}>
                                            Voleurs
                                        </TitleText>
                                        <CustomText customStyle={{
                                            ...styles.cardText,
                                            color: CONSTS.COLOR.WHITE,
                                        }}>
                                            Zone de texte pour répondre à cette question fréquente
                                            maximum 4-5 lignes pas plus
                                        </CustomText>
                                    </View>
                                    <View style={styles.cardRight}>
                                        <ImageBackground style={styles.cardBgImage}
                                        source={require('../assets/images/thieves.jpg')} resizeMode="cover"/>
                                    </View>
                                </View>
                                <View style={[
                                    styles.card,
                                    {backgroundColor: CONSTS.COLOR.LIGHT},
                                ]}>
                                    <View style={styles.cardLeft}>
                                        <TitleText customStyle={{fontSize: CONSTS.SIZE.LG}}>
                                            Assurance
                                        </TitleText>
                                        <TitleText customStyle={{fontSize: CONSTS.SIZE.LG}}>
                                            Intempéries
                                        </TitleText>
                                        <CustomText customStyle={styles.cardText}>
                                            Zone de texte pour répondre à cette question fréquente
                                            maximum 4-5 lignes pas plus
                                        </CustomText>
                                    </View>
                                    <View style={styles.cardRight}>
                                        <ImageBackground style={styles.cardBgImage}
                                        source={require('../assets/images/fire.jpg')} resizeMode="cover"/>
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.listItem}>
                                <CheckBadgeIcon color={CONSTS.COLOR.SUCCESS} size={CONSTS.SIZE.LG}/>
                                <CustomText>Sécurisez votre investissement solaire</CustomText>
                            </View>
                            <View style={styles.listItem}>
                                <CheckBadgeIcon color={CONSTS.COLOR.SUCCESS} size={CONSTS.SIZE.LG}/>
                                <CustomText>Protégez votre installation en toute sérénité</CustomText>
                            </View>
                            <View style={styles.listItem}>
                                <CheckBadgeIcon color={CONSTS.COLOR.SUCCESS} size={CONSTS.SIZE.LG}/>
                                <CustomText>Couverture solaire complète </CustomText>
                            </View>
                            <View style={styles.listItem}>
                                <CheckBadgeIcon color={CONSTS.COLOR.SUCCESS} size={CONSTS.SIZE.LG}/>
                                <CustomText>Tranquillité d'esprit garantie </CustomText>
                            </View>
                            <Components.SuccessButton onClick={() => null} isDisabled={false}>
                                <View style={styles.buttonInnerContainer}>
                                    <CustomText customStyle={styles.buttonTextLeft}>
                                        Profitez
                                    </CustomText>
                                    <CustomText customStyle={{color: CONSTS.COLOR.WHITE }}>
                                        Maintenant !
                                    </CustomText>
                                </View>
                            </Components.SuccessButton>
                        </ScrollView>
                    </View>
                </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const textMediumFontSize = 11;

const textBoldFontStyle = {
    fontWeight: 'bold' as 'bold',
}

const textLineHeightStyle = {
    lineHeight: CONSTS.SIZE.XL,
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    bgImg: {
        position: 'absolute',
        width: '100%',
        height: 260,
        top: 0,
        left: 0,
        zIndex: 0,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 80,
        paddingHorizontal: CONSTS.SIZE.XL,
        marginBottom: -CONSTS.SIZE.XXL,
    },
    priceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: CONSTS.COLOR.BLACK,
    },
    price: {
        fontSize: 42,
        color: CONSTS.COLOR.PRIMARY,
        marginBottom: -CONSTS.SIZE.SM,
    },
    bottomCard: {
        flex: 1,
        paddingHorizontal: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingTop: CONSTS.SIZE.XL,
        borderTopLeftRadius: CONSTS.SIZE.XXL,
        borderTopRightRadius: CONSTS.SIZE.XXL,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: CONSTS.SIZE.MD,
        marginVertical: CONSTS.SIZE.LG,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        width: 300,
        borderRadius: CONSTS.SIZE.XL,
    },
    cardLeft: {
        width: '65%',
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingVertical: CONSTS.SIZE.XL,
    },
    cardText: {
        fontSize: textMediumFontSize,
        marginTop: CONSTS.SIZE.SM,
        paddingBottom: CONSTS.SIZE.SM,
        paddingRight: CONSTS.SIZE.MD,
    },
    cardRight: {
        position: 'relative',
        width: '35%',
    },
    cardBgImage: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        top: 0,
        left: 0,
    },
    listItem: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: CONSTS.SIZE.XS,
    },
    buttonInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTextLeft: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.WHITE,
        marginRight: CONSTS.SIZE.SM,
    },
})