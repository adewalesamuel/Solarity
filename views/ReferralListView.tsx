/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { View, Pressable, StyleSheet } from 'react-native';
import { ArrowLeftIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';
import { CONSTS } from '../constants';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Gift from '../core/entities/Gift';
import CustomText from '../components/CustomText';

export default function ReferralListView() {
    let abortController = new AbortController();

    const { ReferralService, GiftService } = Services;

    const errorHandler = useError();

    const [gifts, setGifts] = useState<Gift[]>([]);
    const [total_points, setTotal_points] = useState<number>();
    const [page, setPage] = useState(1);
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
                    <View style={styles.mainContent}>
                        <View style={styles.pointContainer}>
                            <CustomText customStyle={styles.pointNumber}>
                                {120}
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
                    </View>
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
    mainContent: {
        paddingHorizontal: CONSTS.SIZE.LG,
    },
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
})