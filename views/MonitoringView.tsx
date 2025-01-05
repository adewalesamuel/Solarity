import { Layouts } from '../layouts';
import React from 'react';
import { Components } from '../components';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import { CalendarIcon, GiftIcon, GlobeEuropeAfricaIcon, SunIcon } from 'react-native-heroicons/outline';
import CustomText from '../components/CustomText';

export default function MonitoringView() {
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}>
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
                                <Components.TitleText customStyle={{fontSize: CONSTS.SIZE.LG,}}>
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
                                <CustomText customStyle={styles.defaultCardNumber}>162</CustomText>
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
                                <CustomText customStyle={styles.defaultCardNumber}>120</CustomText>
                                <CustomText>Points</CustomText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const defaultCardStyle = {
	borderWidth: 1,
	borderColor: CONSTS.COLOR.SECONDARY,
	borderRadius: CONSTS.SIZE.LG,
	paddingVertical: CONSTS.SIZE.MD,
	paddingHorizontal: CONSTS.SIZE.MD,
	justifyContent: 'space-between',
	alignItems: 'flex-start',
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        height: '100%',
        paddingHorizontal: CONSTS.SIZE.LG,
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
    textRight: {textAlign: 'right'},
    textCenter: {textAlign: 'center'},
})