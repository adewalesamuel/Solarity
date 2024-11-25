import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Layouts } from '../layouts'
import { AcademicCapIcon, ArrowRightIcon, CheckBadgeIcon, Cog6ToothIcon,
    GlobeEuropeAfricaIcon, LifebuoyIcon, ShieldCheckIcon, ShoppingCartIcon, SunIcon, UserIcon, UsersIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { Utils } from '../utils';


export default function ProfileView() {
    const {Auth} = Utils;

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
                        <Text style={styles.viewTitle}>Mon profil</Text>
                        <Pressable style={styles.icon}>
                            <Cog6ToothIcon size={28} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.imageContainer}>
                            <Components.SafeImage
                            source={useUser.profile_img_url as ImageSourcePropType ?? undefined}
                            style={styles.image}/>
                            <Text style={styles.imageCaption}>{useUser.name ?? '--'}</Text>
                        </View>
                        <View style={styles.statContainer}>
                            <View style={styles.statItem}>
                                <View style={styles.badgeSoftInfo}>
                                    <UserIcon size={18} color={CONSTS.COLOR.INFO}/>
                                </View>
                                <View style={styles.statText}>
                                    <Text>Parrainages</Text>
                                    <Text style={styles.statNumber}>2</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <View style={styles.badgeSoftPrimary}>
                                    <SunIcon size={18} color={CONSTS.COLOR.PRIMARY}/>
                                </View>
                                <View style={styles.statText}>
                                    <Text>Production</Text>
                                    <Text style={styles.statNumber}>13,850 kWa</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <View style={styles.badgeSoftSuccess}>
                                    <GlobeEuropeAfricaIcon size={18} color={CONSTS.COLOR.SUCCESS}/>
                                </View>
                                <View style={styles.statText}>
                                    <Text>Réduction CO2</Text>
                                    <Text style={styles.statNumber}>13,850 kWa</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonListContainer}>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <View style={styles.badgeLight}>
                                    <AcademicCapIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </View>
                                <Text style={styles.buttonListItemText}>Espace Formation</Text>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <View style={styles.badgeLight}>
                                    <UsersIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </View>
                                <Text style={styles.buttonListItemText}>Espace Parrainage</Text>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <View style={styles.badgeLight}>
                                    <ShoppingCartIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </View>
                                <Text style={styles.buttonListItemText}>Mes Factures</Text>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <View style={styles.badgeLight}>
                                    <CheckBadgeIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </View>
                                <Text style={styles.buttonListItemText}>Mes Abonnements</Text>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <View style={styles.badgeLight}>
                                    <ShieldCheckIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </View>
                                <Text style={styles.buttonListItemText}>Assurance</Text>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                        <Pressable style={styles.buttonListItem}>
                            <View style={styles.buttonListItemLeft}>
                                <View style={styles.badgeLight}>
                                    <LifebuoyIcon color={CONSTS.COLOR.BLACK} size={20}/>
                                </View>
                                <Text style={styles.buttonListItemText}>Support Client</Text>
                            </View>
                            <ArrowRightIcon color={CONSTS.COLOR.PRIMARY} size={28}/>
                        </Pressable>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const baseBadgeStyle = {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 100,
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
    viewTitle: {
        fontSize: CONSTS.SIZE.XL,
        color: CONSTS.COLOR.BLACK,
        fontWeight: 'bold',
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
    },
    imageCaption: {
        fontSize: CONSTS.SIZE.XL,
        color: CONSTS.COLOR.BLACK,
        marginTop: CONSTS.SIZE.MD,
        fontWeight: 'bold',
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
    badgeSoftInfo: {
        ...baseBadgeStyle,
        backgroundColor: CONSTS.COLOR.INFO_SOFT,
    },
    badgeSoftPrimary: {
        ...baseBadgeStyle,
        backgroundColor: CONSTS.COLOR.PRIMARY_SOFT,
    },
    badgeSoftSuccess: {
        ...baseBadgeStyle,
        backgroundColor: CONSTS.COLOR.SUCCESS_SOFT,
    },
    badgeLight: {
        ...baseBadgeStyle,
        backgroundColor: CONSTS.COLOR.LIGHT,
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
        gap: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonListItemText: {
        fontSize: CONSTS.SIZE.LG,
    },
})