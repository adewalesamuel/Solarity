/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { View, Pressable, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ArrowLeftIcon, GiftIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Gift from '../core/entities/Gift';
import CustomText from '../components/CustomText';

const CARD_WIDTH = 280;

export default function ReferralListView() {
    let abortController = new AbortController();

    const { ReferralService, GiftService } = Services;

    const errorHandler = useError();

    const [gifts, setGifts] = useState<Gift[]>([]);
    const [total_points, setTotal_points] = useState<number>();
    const [page, _setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const init = useCallback(async () => {
        try {
            const referalPesponse = await ReferralService.getAll(
                {page: page}, abortController.signal);
            setTotal_points((referalPesponse as any).total_points as number);

            const giftsResponse = await GiftService.getAll({}, abortController.signal);
            setGifts(giftsResponse.gifts as Gift[]);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init]);

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
            <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            borderColor={CONSTS.COLOR.SECONDARY}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <ArrowLeftIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            borderColor={CONSTS.COLOR.SECONDARY}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <QuestionMarkCircleIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                    </View>
                    <Components.Loader isLoading={isLoading}>
                        <View style={styles.mainContent}>
                            <View style={styles.pointContainer}>
                                <CustomText customStyle={styles.pointNumber}>
                                    {total_points}
                                </CustomText>
                                <CustomText customStyle={styles.pointUnit}>pts</CustomText>
                            </View>
                            <View style={styles.textContainer}>
                                <Components.TitleText customStyle={styles.congratTitle}>
                                    Bravo !
                                </Components.TitleText>
                                <CustomText customStyle={styles.congratText}>
                                    Choisissez votre cadeau maintenant
                                    ou collecter plus de points !
                                </CustomText>
                            </View>
                            <FlatList showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.giftCardContainer}
                            snapToInterval={CARD_WIDTH}
                            horizontal={true} data={gifts}
                            renderItem={({item}) => (
                                <View style={styles.giftCard}>
                                    <Components.BadgeIcon paddingH={CONSTS.SIZE.MD}
                                    paddingV={CONSTS.SIZE.MD} color={CONSTS.COLOR.PRIMARY}>
                                        <GiftIcon color={CONSTS.COLOR.BLACK} size={CONSTS.SIZE.XL}/>
                                    </Components.BadgeIcon>
                                    <Components.TitleText customStyle={styles.giftTitle}>
                                        {item.name}
                                    </Components.TitleText>
                                    <CustomText customStyle={styles.giftDescription}>
                                        {item.description}
                                    </CustomText>
                                    <TouchableOpacity style={styles.giftLinkContainer}>
                                        <CustomText customStyle={styles.giftLink}>
                                            Collecter maintenant !
                                        </CustomText>
                                    </TouchableOpacity>
                                </View>
                            )}/>
                        </View>
                    </Components.Loader>
                </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 120,
        backgroundColor: CONSTS.COLOR.BLACK,
    },
    mainContent: {},
    bgImg: {
        position: 'absolute',
        width: '100%',
        height: 600,
        top: 0,
        left: 0,
    },
    header: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        paddingTop: CONSTS.SIZE.XL,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
    pointContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        columnGap: CONSTS.SIZE.MD,
    },
    pointNumber: {
        fontWeight: 'bold',
        fontSize: 150,
        lineHeight: 150,
        letterSpacing: -5,
        color: CONSTS.COLOR.PRIMARY,
    },
    pointUnit: {
        fontWeight: 'bold',
        fontSize: CONSTS.SIZE.XXL,
        color: CONSTS.COLOR.PRIMARY,
    },
    textContainer: {
        alignItems: 'center',
    },
    congratTitle: {
        color: CONSTS.COLOR.WHITE,
        fontSize: CONSTS.SIZE.XXL,
        marginBottom: CONSTS.SIZE.MD,
    },
    congratText: {
        textAlign: 'center',
        maxWidth: 300,
    },
    giftCardContainer: {
        marginVertical: CONSTS.SIZE.LG,
        columnGap: CONSTS.SIZE.MD,
    },
    giftCard: {
        alignItems: 'center',
        borderWidth: 1,
        width: CARD_WIDTH,
        borderRadius: CONSTS.SIZE.XL,
        borderColor: CONSTS.COLOR.TEXT_BASE,
        padding: CONSTS.SIZE.LG,
    },
    giftTitle: {
        color: CONSTS.COLOR.WHITE,
        marginTop: CONSTS.SIZE.MD,
    },
    giftDescription: {
        textAlign: 'center',
        paddingHorizontal: CONSTS.SIZE.XS,
        color: CONSTS.COLOR.WHITE,
    },
    giftLinkContainer: {
        marginTop: CONSTS.SIZE.MD,
    },
    giftLink: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.PRIMARY,
    },
})