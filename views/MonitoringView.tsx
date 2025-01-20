/* eslint-disable react-hooks/exhaustive-deps */
import { Layouts } from '../layouts';
import React, { useCallback, useEffect } from 'react';
import { Components } from '../components';
import { Image, ImageSourcePropType, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import { CalendarIcon, GiftIcon, SunIcon } from 'react-native-heroicons/outline';
import CustomText from '../components/CustomText';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Hooks } from '../hooks';
import { Utils } from '../utils';
import { useError } from '../hooks/useError';
import SafeImage from '../components/SafeImage';
import PrimaryButton from '../components/PrimaryButton';

export default function MonitoringView() {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const errorHandler = useError();
    const useUser = Hooks.useUser();

    const init = useCallback(async () => {
        try {
            useUser.fillUser(await Utils.Auth.getUser());
        } catch (error) {
            errorHandler.setError(error);
        }

    },[])

    useEffect(() => {
        init();
    }, [init])

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                    <Components.TitleText>
                        Rapport complet
                    </Components.TitleText>
                    <View style={styles.prodCard}>
                        <View style={styles.prodCardTop}>
                            <View style={styles.prodCardTopLeft}>
                                <Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
                                paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.PRIMARY_SOFT}>
                                    <SunIcon size={30} color={CONSTS.COLOR.PRIMARY}/>
                                </Components.BadgeIcon>
                                <CustomText>Production</CustomText>
                            </View>
                            <CustomText>kWa</CustomText>
                        </View>
                        <Image style={styles.prodImage}
                        source={require('../assets/images/production-graph-2.png')} />
                        <View style={styles.prodCardBottom}>
                            <View style={styles.prodCardInfo}>
                                <CustomText>Production Total</CustomText>
                                <Components.TitleText customStyle={{fontSize: CONSTS.SIZE.LG}}>
                                    13,850
                                </Components.TitleText>
                            </View>
                            <View style={styles.prodCardInfo}>
                                <CustomText customStyle={styles.textCenter}>
                                    Rentabilité Panneaux
                                </CustomText>
                                <Components.TitleText customStyle={{
                                    fontSize: CONSTS.SIZE.LG,
                                    ...styles.textCenter,
                                }}>
                                    99%
                                </Components.TitleText>
                            </View>
                            <View style={styles.prodCardInfo}>
                                <CustomText customStyle={styles.textRight}>
                                    Moyenne /Jour
                                </CustomText>
                                <Components.TitleText customStyle={{
                                    fontSize: CONSTS.SIZE.LG,
                                    ...styles.textRight,
                                }}>
                                    1,625
                                </Components.TitleText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.defaultCard}>
                            <Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
                            paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.SECONDARY}>
                                <CalendarIcon size={30} color={CONSTS.COLOR.TEXT_BASE}/>
                            </Components.BadgeIcon>
                            <View style={{marginTop: CONSTS.SIZE.MD}}>
                                <CustomText>Abonnement Uno</CustomText>
                                <CustomText customStyle={styles.defaultCardNumber}>
                                    162
                                </CustomText>
                                <CustomText>Jours restants</CustomText>
                            </View>
                        </View>
                        <View style={styles.defaultCard}>
                            <Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
                            paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.PRIMARY_SOFT}>
                                <GiftIcon size={30} color={CONSTS.COLOR.PRIMARY}/>
                            </Components.BadgeIcon>
                            <View style={{marginTop: CONSTS.SIZE.MD}}>
                                <CustomText>Points cadeaux</CustomText>
                                <CustomText customStyle={styles.defaultCardNumber}>
                                    120
                                </CustomText>
                                <CustomText>Points</CustomText>
                            </View>
                        </View>
                    </View>
                    <Pressable style={styles.buttonBlack}
                    onPress={() => navigation.navigate('Meteo')}>
                        <View style={styles.buttonInnerContainer}>
                            <CustomText customStyle={styles.buttonTextLeft}>
                                Production
                            </CustomText>
                            <CustomText customStyle={{color: CONSTS.COLOR.WHITE }}>
                                prévisionelle
                            </CustomText>
                        </View>
                    </Pressable>
                    <Components.TitleText customStyle={{marginTop: CONSTS.SIZE.LG}}>
                        Objectif Parrainage
                    </Components.TitleText>
                    <View style={styles.referralCard}>
                        <SafeImage style={styles.profileImage}
                        source={useUser.profile_img_url as ImageSourcePropType} />
                        <View style={styles.referralCardRight}>
                            <CustomText customStyle={{
                                fontSize: CONSTS.SIZE.LG,
                                marginBottom: CONSTS.SIZE.SM,
                            }}>
                                {useUser.name}
                            </CustomText>
                            <View>
                                <View style={styles.referralCardInfo}>
                                    <CustomText>1 mois offert</CustomText>
                                    <CustomText customStyle={{fontWeight: styles.defaultCardNumber.fontWeight}}>
                                        120/240<CustomText customStyle={{fontWeight: FONT_NORMAL}}>m</CustomText>
                                    </CustomText>
                                </View>
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBar} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <PrimaryButton onClick={() => navigation.navigate('ReferralList')} isDisabled={false}>
                        <View style={styles.buttonInnerContainer}>
                            <CustomText customStyle={{marginRight: CONSTS.SIZE.SM}}>
                                Mon espace
                            </CustomText>
                            <CustomText customStyle={{fontWeight: styles.defaultCardNumber.fontWeight }}>
                                parrainage
                            </CustomText>
                        </View>
                    </PrimaryButton>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const FONT_NORMAL = 'normal';

const defaultCardStyle = {
	borderWidth: 1,
	borderColor: CONSTS.COLOR.SECONDARY,
	borderRadius: CONSTS.SIZE.LG,
	paddingVertical: CONSTS.SIZE.MD,
	paddingHorizontal: CONSTS.SIZE.MD,
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingBottom: CONSTS.SIZE.LG,
    },
    prodCard: {
		...defaultCardStyle,
		minHeight: 250,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
        marginTop: CONSTS.SIZE.LG,
	},
    prodImage: {
		left: 0,
		position: 'absolute',
		top: '30%',
		width: '108%',
		height: '60%',
        marginTop: CONSTS.SIZE.MD,
	},
    prodCardTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: CONSTS.SIZE.SM,
    },
    prodCardTopLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap:  CONSTS.SIZE.SM,
    },
    prodCardBottom: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    prodCardInfo: {
        maxWidth: 90,
    },
	defaultCardNumber: {
		fontWeight: 'bold',
		color: CONSTS.COLOR.BLACK,
		fontSize: CONSTS.SIZE.LG,
	},
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: CONSTS.SIZE.MD,
        marginVertical: CONSTS.SIZE.LG,
    },
    defaultCard: {
        ...defaultCardStyle,
        flex: 1,
        flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
    },
    buttonBlack: {
        width: '100%',
        alignItems: 'center',
        marginTop: CONSTS.SIZE.XS,
        paddingVertical: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.BLACK,
    },
    buttonInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTextLeft: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.INFO,
        marginRight: CONSTS.SIZE.SM,
    },
    referralCard: {
        ...defaultCardStyle,
		flexDirection: 'row',
		alignItems: 'center',
        marginTop: CONSTS.SIZE.LG,
        columnGap: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingVertical: CONSTS.SIZE.LG,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: CONSTS.SIZE.XXL,
    },
    referralCardRight: {
        flex: 1,
    },
    referralCardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressContainer: {
        marginTop: CONSTS.SIZE.SM,
        height: CONSTS.SIZE.SM,
        borderRadius: CONSTS.SIZE.SM,
        backgroundColor: CONSTS.COLOR.PRIMARY_SOFT,
    },
    progressBar: {
        width: '40%',
        height: CONSTS.SIZE.SM,
        borderRadius: CONSTS.SIZE.SM,
        backgroundColor: CONSTS.COLOR.PRIMARY,
    },
    textRight: {textAlign: 'right'},
    textCenter: {textAlign: 'center'},
})