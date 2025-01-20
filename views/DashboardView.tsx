/* eslint-disable react-hooks/exhaustive-deps */
import { BackHandler, ToastAndroid, Platform, View, ImageSourcePropType, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Layouts } from '../layouts';
import { useFocusEffect } from '@react-navigation/native';
import { Utils } from '../utils';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { CONSTS } from '../constants';
import { BoltIcon, EllipsisVerticalIcon, GlobeEuropeAfricaIcon, SunIcon } from 'react-native-heroicons/outline';
import { NetworkInfo } from 'react-native-network-info';
import CustomText from '../components/CustomText';

export default function DashboardView() {
	const {Auth} = Utils;

    const errorHandler = Hooks.useError();
    const useUser = Hooks.useUser();

	const [backPressed, setBackPressed] = useState(false);

	const getNetworkSubnet = async (): Promise<string | undefined> => {
			const ip = await NetworkInfo.getIPAddress();
			return ip?.substring(0, ip.lastIndexOf('.'));
	}

	const fetchWithTimeout = (url:string, timeout: number = 1000): Promise<Response>[] => {
		const abortController = new AbortController();
		const requestList = [];

		requestList.push(
			fetch(url, { signal: abortController.signal })
			.catch(err => err)
		);
		setTimeout(() => abortController.abort(), timeout);

		return requestList;
	}

	const scanNetwork = async (subnet: string,range: number = 225) => {
		let requestList: Promise<Response>[] = [];

		for (let i = 1; i <= range; i++) {
			const ip = `${subnet}.${i}`;
			requestList = fetchWithTimeout(`http://${ip}`);
		}

		const responses = await Promise.all(requestList);
		const devices = responses
			.filter(response => response && response.status === 200)
			.map((_, index) => ({ ip: `${subnet}.${index + 1}` }));

		return devices;
	};

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
			const user = await Auth.getUser();
            useUser.fillUser(user);

			const subnet = await getNetworkSubnet();
			if (!subnet || subnet === undefined) {return}

			await scanNetwork(subnet as string, 2);

			// Alert.alert(
			// 	'Device Info',
			// 	JSON.stringify({subnet,devices}),
			// )
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    }, [])

	const onBackPress = () => {
		if (Platform.OS !== 'android') {return;}
		if (backPressed) {
			BackHandler.exitApp();
			return true;
		}

		setBackPressed(true);
		setTimeout(() => setBackPressed(false), 2000);

		ToastAndroid.showWithGravity(
			'Appuyez une seconde fois pour quitter',
			ToastAndroid.LONG,
			ToastAndroid.CENTER)

		return true;
	};

    useEffect(() => {
        init();
    }, [init])

	useFocusEffect(() => {
		let backHandler = BackHandler.addEventListener(
			'hardwareBackPress', onBackPress);

		return () => backHandler.remove();
	})
	return (
		<Layouts.AppLayout>
			<Layouts.MainLayout>
				<ScrollView contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}>
					<View style={styles.topContainer}>
						<View>
							<CustomText customStyle={styles.todayText}>Aujourd'hui</CustomText>
							<CustomText customStyle={styles.dateText}>
								{Utils.Date.styleDate(new Date(), 'full')}
							</CustomText>
						</View>
						<Components.SafeImage
						source={useUser.profile_img_url as ImageSourcePropType ?? undefined}
						width={100} height={100} style={styles.image}/>
					</View>
					<View style={styles.secondContainer}>
						<View>
							<Components.TitleText>{useUser.name}</Components.TitleText>
							<CustomText customStyle={styles.dateIntervalText}>
								{Utils.Date.getMonthInterval(
								new Date(useUser.created_at as string),
								new Date())}
							</CustomText>
						</View>
						<View style={styles.iconContainer}>
							<EllipsisVerticalIcon size={30} color="black"/>
						</View>
					</View>
					<View style={styles.powerCard}>
						<View style={styles.powerCardHeader}>
							<View style={styles.powerCardHeaderLeft}>
								<View style={styles.powerCardIconContainer}>
									<Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
									paddingV={CONSTS.SIZE.SM} color="#262003">
										<BoltIcon size={28} color={CONSTS.COLOR.PRIMARY}/>
									</Components.BadgeIcon>
								</View>
								<View>
									<CustomText customStyle={styles.powerCardTitle}>Puissance</CustomText>
									<CustomText customStyle={styles.powerCardSubtitle}>actuelle</CustomText>
								</View>
							</View>
							<View>
								<CustomText customStyle={styles.powerCardNumber}>
									681,852 <CustomText customStyle={styles.powerCardNumberSign}>w</CustomText>
								</CustomText>
							</View>
						</View>
						<Image style={styles.powerImage}
						source={require('../assets/images/power-graph.png')} />
					</View>
					<View style={styles.cardGroupContainer}>
						<View style={styles.prodCard}>
							<Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
							paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.PRIMARY_SOFT}>
								<SunIcon size={30} color={CONSTS.COLOR.PRIMARY}/>
							</Components.BadgeIcon>
							<Image style={styles.prodImage}
							source={require('../assets/images/production-graph.png')} />
							<View>
								<Image style={styles.logoImage}
								source={require('../assets/images/logo-light.png')} />
								<CustomText>Production</CustomText>
								<CustomText customStyle={styles.defaultCardNumber}>13,850</CustomText>
								<CustomText>kwa</CustomText>
							</View>
						</View>
						<View style={styles.cardGroupItemRight}>
							<View style={styles.prodCard2}>
								<Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
								paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.PRIMARY_SOFT}>
									<SunIcon size={30} color={CONSTS.COLOR.PRIMARY}/>
								</Components.BadgeIcon>
								<View style={{marginTop: CONSTS.SIZE.MD}}>
									<CustomText>Aujourd'hui</CustomText>
									<CustomText customStyle={styles.defaultCardNumber}>13,850</CustomText>
									<CustomText>kwa</CustomText>
								</View>
							</View>
							<View style={styles.prodCardCo2}>
								<Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
								paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.SUCCESS_SOFT}>
									<GlobeEuropeAfricaIcon size={30} color={CONSTS.COLOR.SUCCESS}/>
								</Components.BadgeIcon>
								<View style={{marginTop: CONSTS.SIZE.MD}}>
									<CustomText>Reduction CO2</CustomText>
									<CustomText customStyle={styles.defaultCardNumber}>0,7</CustomText>
									<CustomText>kg</CustomText>
								</View>
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
		paddingHorizontal: CONSTS.SIZE.MD,
		paddingBottom: CONSTS.SIZE.LG,
	},
	topContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: CONSTS.SIZE.XL,
	},
	todayText: {
		marginBottom: CONSTS.SIZE.SM,
	},
	dateText: {
		color: CONSTS.COLOR.BLACK,
		textTransform: 'capitalize',
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 70,
		objectFit: 'cover',
	},
	secondContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: CONSTS.SIZE.XL,
	},
	dateIntervalText: {
		textTransform: 'capitalize',
	},
	iconContainer: {
		borderWidth: 1,
		borderRadius: CONSTS.SIZE.LG,
		paddingVertical: CONSTS.SIZE.MD,
		borderColor: CONSTS.COLOR.SECONDARY,
	},
	powerCard: {
		position: 'relative',
		minHeight: 160,
		borderRadius: CONSTS.SIZE.LG,
		backgroundColor: CONSTS.COLOR.BLACK,
	},
	powerCardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: CONSTS.SIZE.XL,
		paddingBottom: CONSTS.SIZE.LG,
		paddingHorizontal: CONSTS.SIZE.LG,
	},
	powerCardHeaderLeft: {
		flexDirection: 'row',
	},
	powerCardIconContainer: {
		marginRight: CONSTS.SIZE.MD,
	},
	powerCardTitle: {
		fontWeight: 'bold',
		color: CONSTS.COLOR.WHITE,
		fontSize: CONSTS.SIZE.XL,
	},
	powerCardSubtitle: {
		color: CONSTS.COLOR.WHITE,
	},
	powerCardNumber: {
		fontWeight: 'bold',
		color: CONSTS.COLOR.PRIMARY,
		fontSize: CONSTS.SIZE.LG,
	},
	powerCardNumberSign: {
		fontWeight: 'bold',
		color: CONSTS.COLOR.SECONDARY,
		fontSize: CONSTS.SIZE.LG,
	},
	powerImage: {
		position: 'absolute',
		width: '100%',
		maxHeight: '100%',
		height: '45%',
		left: 0,
		bottom: 0,
	},
	cardGroupContainer: {
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'stretch',
		flexWrap: 'nowrap',
		marginTop: CONSTS.SIZE.MD,
	},
	prodCard: {
		...defaultCardStyle,
		minHeight: 240,
		width: '48%',
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	prodImage: {
		left: 0,
		position: 'absolute',
		top: '30%',
		width: '118%',
		height: '85%',
	},
	logoImage: {
		width: 110,
		height: 12,
		marginBottom: CONSTS.SIZE.SM,
	},
	defaultCardNumber: {
		color: CONSTS.COLOR.BLACK,
		fontSize: CONSTS.SIZE.LG,
		fontWeight: 'bold',
	},
	cardGroupItemRight: {
		width: '48%',
	},
	prodCard2: {
		...defaultCardStyle,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	prodCardCo2: {
		...defaultCardStyle,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginTop: CONSTS.SIZE.MD,
	},
})