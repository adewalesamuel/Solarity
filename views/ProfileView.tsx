import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Layouts } from '../layouts'
import { AcademicCapIcon, ArrowRightIcon, CheckBadgeIcon, Cog6ToothIcon,
    GlobeEuropeAfricaIcon, LifebuoyIcon, ShieldCheckIcon, ShoppingCartIcon, SunIcon, UserIcon, UsersIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { Utils } from '../utils';
import CustomText from '../components/CustomText';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


export default function ProfileView() {
    const BADGE_PADDING = 12;
    const {Auth} = Utils;

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const errorHandler = Hooks.useError();
    const useUser = Hooks.useUser();

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            const user = await Auth.getUser();
            useUser.fillUser(user);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView style={styles.container}>
                    <View style={styles.top}>
                        <Components.TitleText>Mon profil</Components.TitleText>
                        <Pressable style={styles.icon}>
                            <Cog6ToothIcon size={28} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.imageContainer}>
                            <Components.SafeImage
                            source={useUser.profile_img_url as ImageSourcePropType ?? undefined}
                            style={styles.image}/>
                            <Components.TitleText>{useUser.name ?? '--'}</Components.TitleText>
                        </View>
                        <View style={styles.statContainer}>
                            <View style={styles.statItem}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.INFO_SOFT}>
                                    <UserIcon size={18} color={CONSTS.COLOR.INFO}/>
                                </Components.BadgeIcon>
                                <View style={styles.statText}>
                                    <CustomText>Parrainages</CustomText>
                                    <CustomText customStyle={styles.statNumber}>2</CustomText>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.PRIMARY_SOFT}>
                                    <SunIcon size={18} color={CONSTS.COLOR.PRIMARY}/>
                                </Components.BadgeIcon>
                                <View style={styles.statText}>
                                    <CustomText>Production</CustomText>
                                    <CustomText customStyle={styles.statNumber}>13,850 kWa</CustomText>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.SUCCESS_SOFT}>
                                    <GlobeEuropeAfricaIcon size={18} color={CONSTS.COLOR.SUCCESS}/>
                                </Components.BadgeIcon>
                                <View style={styles.statText}>
                                    <CustomText>Réduction CO2</CustomText>
                                    <CustomText customStyle={styles.statNumber}>13,850 kWa</CustomText>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonListContainer}>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.LIGHT}>
                                    <AcademicCapIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </Components.BadgeIcon>
                                <CustomText customStyle={styles.buttonListItemText}>Espace Formation</CustomText>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.LIGHT}>
                                    <UsersIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </Components.BadgeIcon>
                                <CustomText customStyle={styles.buttonListItemText}>Espace Parrainage</CustomText>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem} onPress={() => navigation.navigate('InvoiceList')}>
                            <View style={styles.buttonListItemLeft}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.LIGHT}>
                                    <ShoppingCartIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </Components.BadgeIcon>
                                <CustomText customStyle={styles.buttonListItemText}>Mes Factures</CustomText>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem} onPress={() => navigation.navigate('SubscriptionShow')}>
                            <View style={styles.buttonListItemLeft}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.LIGHT}>
                                    <CheckBadgeIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </Components.BadgeIcon>
                                <CustomText customStyle={styles.buttonListItemText}>Mes Abonnements</CustomText>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.LIGHT}>
                                    <ShieldCheckIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </Components.BadgeIcon>
                                <CustomText customStyle={styles.buttonListItemText}>Assurance</CustomText>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <Components.BadgeIcon paddingH={BADGE_PADDING} paddingV={BADGE_PADDING}
                                color={CONSTS.COLOR.LIGHT}>
                                    <LifebuoyIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </Components.BadgeIcon>
                                <CustomText customStyle={styles.buttonListItemText}>Support Client</CustomText>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: CONSTS.SIZE.MD,
        backgroundColor: CONSTS.COLOR.WHITE,
    },
    top: {
        paddingVertical: CONSTS.SIZE.LG,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    icon: {
        paddingHorizontal: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
        borderWidth: 1,
        borderColor: CONSTS.COLOR.LIGHT,
        borderRadius: 100,
    },
    imageContainer: {
        paddingHorizontal: CONSTS.SIZE.MD,
        alignItems: 'center',
    },
    image: {
        width: 115,
        height: 115,
        borderRadius: 115,
        objectFit: 'cover',
        marginBottom: CONSTS.SIZE.MD,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    statContainer: {
        paddingRight: CONSTS.SIZE.XL,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: CONSTS.SIZE.MD,
    },
    statText: {
        paddingLeft: CONSTS.SIZE.MD,
    },
    statNumber: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.BLACK,
        fontSize: CONSTS.SIZE.MD,
    },
    buttonListContainer: {
        marginTop: CONSTS.SIZE.XL,
    },
    buttonListItem: {
        marginBottom: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.LG,
        paddingVertical: CONSTS.SIZE.LG,
        borderWidth: 2,
        borderColor: CONSTS.COLOR.LIGHT,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonListItemLeft: {
        gap: CONSTS.SIZE.LG,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonListItemText: {
        fontSize: CONSTS.SIZE.LG,
    },
})