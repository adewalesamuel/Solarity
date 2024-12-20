/* eslint-disable react-hooks/exhaustive-deps */
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Layouts } from '../layouts';
import React, { useCallback, useEffect, useState } from 'react';
import { CONSTS } from '../constants';
import { ArrowLeftIcon, QuestionMarkCircleIcon, SunIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';
import CustomText from '../components/CustomText';
import { Utils } from '../utils';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import { Wheather } from '../core/entities/Wheather';

export default function MeteoView() {
    const ERROR_MESSAGE = "Impossible d'acceder à la localisation";
    const abortController = new AbortController();
    const {Toaster, Location} = Utils;

    const errorHandler = useError();

    const [, setIsLoading] = useState(true);
    const [weatherInfo, setWheatherInfo] = useState<Wheather>();

    const init = useCallback(async () => {
        try {
            const {latitude, longitude} = await Location.getLatLong();
            const response = await Services.WeatherService.getAll(
                {latitude, longitude},
                abortController.signal
            )

            setWheatherInfo(response);
        } catch (error) {
            Toaster.error(ERROR_MESSAGE);
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                    <ImageBackground source={require('../assets/images/meteo-bg.png')}
                    style={styles.bgImg} resizeMode="cover"/>
                    <View style={styles.header}>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <ArrowLeftIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                        <Pressable>
                            <Components.BadgeIcon color={CONSTS.COLOR.BLACK}
                            paddingH={CONSTS.SIZE.MD} paddingV={CONSTS.SIZE.MD}>
                                <QuestionMarkCircleIcon size={30} color={CONSTS.COLOR.WHITE}/>
                            </Components.BadgeIcon>
                        </Pressable>
                    </View>
                    <View style={styles.mainContent}>
                        <View style={styles.top}>
                            <View>
                                <Image style={styles.wheatherIcon}
                                source={require('../assets/images/wheather-icon.png')}/>
                            </View>
                            <CustomText customStyle={styles.temperature}>
                                {weatherInfo?.current?.apparent_temperature ?? '--'}
                                {weatherInfo?.current_units?.apparent_temperature ?? '°C'}
                            </CustomText>
                        </View>
                        <View style={styles.second}>
                            <View>
                                <CustomText customStyle={styles.currentDate}>
                                    {Utils.Date.styleDate(new Date(), 'full')}
                                </CustomText>
                                <Components.CustomText customStyle={styles.wheatherType}>
                                    Nuageux
                                </Components.CustomText>
                            </View>
                            <Image style={styles.solarPanelImg}
                            source={require('../assets/images/solar-panel-2.png')} />
                        </View>
                        <View style={styles.graphContainer}>
                            <View style={styles.graphTop}>
                                <Image style={styles.graphTopIcon}
                                source={require('../assets/images/wheather-icon.png')}  />
                                <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                                    Estimation pour ce mois
                                </CustomText>
                                <CustomText customStyle={styles.boldText}>
                                    33 kwa
                                </CustomText>
                            </View>
                            <Image style={styles.graphImg}
                            source={require('../assets/images/meteo-graph.png')} />
                        </View>
                        <View style={styles.uvContainer}>
                            <View>
                                <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                                    Moyenne UV {Utils.Date.styleDate(new Date(), 'full')?.split(' ')[2]}
                                </CustomText>
                                <View style={styles.uvInfoConatainer}>
                                    <Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
                                    paddingV={CONSTS.SIZE.SM} color={'rgba(225,225,225, 0.2)'}>
                                        <SunIcon color={CONSTS.COLOR.PRIMARY}/>
                                    </Components.BadgeIcon>
                                    <CustomText customStyle={styles.uvAmount}>
                                        8/11
                                    </CustomText>

                                </View>
                            </View>
                            <CustomText customStyle={styles.meteoDescription}>
                                Petit descriptif météo globale API
                            </CustomText>
                        </View>
                        <View style={styles.meteoRow}>
                            <View style={styles.meteoCard}>
                                <Image style={styles.windIcon} source={require('../assets/images/wind.png')} />
                                <View>
                                    <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                                        Moyenne vent
                                    </CustomText>
                                    <CustomText customStyle={styles.cardTitle}>
                                        {weatherInfo?.current?.wind_speed_10m ?? '--'}
                                        {weatherInfo?.current_units?.wind_speed_10m ?? '--'}
                                    </CustomText>
                                </View>
                            </View>
                            <View style={styles.meteoCard}>
                                <Image style={styles.windIcon} source={require('../assets/images/water-drop.png')} />
                                <View>
                                    <CustomText customStyle={{color: CONSTS.COLOR.WHITE}}>
                                        Humidité
                                    </CustomText>
                                    <CustomText customStyle={styles.cardTitle}>
                                        {weatherInfo?.current?.relative_humidity_2m ?? '--'}
                                        {weatherInfo?.current_units?.relative_humidity_2m ?? '--'}
                                    </CustomText>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const cardDefaultStyles = {
    backgroundColor: 'rgba(225,225,225, 0.2)',
    borderColor: 'rgba(225,225,225, 0.3)',
    borderWidth:1,
    borderRadius: CONSTS.SIZE.LG,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
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
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wheatherIcon: {
        width: 180,
        height: 120,
    },
    temperature: {
        fontWeight: 'bold',
        fontSize: 62,
        color: CONSTS.COLOR.WHITE,
    },
    second: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    currentDate: {
        textTransform: 'capitalize',
        color: CONSTS.COLOR.WHITE,
        marginTop:CONSTS.SIZE.MD,
    },
    wheatherType: {
        fontWeight: 'bold',
        fontSize: 27,
        color: CONSTS.COLOR.WHITE,
    },
    solarPanelImg: {
        position: 'absolute',
        right: 0,
        width: 270,
        marginEnd:10,
    },
    graphContainer: {
        ...cardDefaultStyles,
        marginTop: 50,
    },
    graphTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'rgba(225,225,225, 0.15)',
        borderBottomWidth: 1,
        columnGap: CONSTS.SIZE.SM,
        paddingTop: CONSTS.SIZE.XL,
        paddingBottom: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.MD,
    },
    graphTopIcon: {
        width: 22,
        height: 20,
        marginRight: CONSTS.SIZE.XS,
    },
    boldText:{
        fontWeight: 'bold',
        color: CONSTS.COLOR.WHITE,
    },
    graphImg: {
        width: '100%',
        height: 130,
        marginTop: CONSTS.SIZE.SM,
    },
    uvContainer: {
        ...cardDefaultStyles,
        flexDirection: 'row',
        alignItems: 'center',
        padding: CONSTS.SIZE.MD,
        marginTop: CONSTS.SIZE.XL,
    },
    uvInfoConatainer: {
        flexDirection: 'row',
        width: '50%',
        columnGap: CONSTS.SIZE.SM,
        marginTop: CONSTS.SIZE.MD,
    },
    uvAmount: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.PRIMARY,
        fontSize: CONSTS.SIZE.XL,
    },
    meteoDescription: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
        paddingLeft: CONSTS.SIZE.XL,
        fontSize: CONSTS.SIZE.LG,
        color: CONSTS.COLOR.WHITE,
    },
    meteoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.LG,
    },
    meteoCard: {
        ...cardDefaultStyles,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: CONSTS.SIZE.MD,
    },
    windIcon: {
        width: 40,
        height: 40,
        marginRight: CONSTS.SIZE.SM,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.WHITE,
        fontSize: CONSTS.SIZE.XL,
    },
})