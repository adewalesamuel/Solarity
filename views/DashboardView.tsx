import { Text, BackHandler, ToastAndroid, Platform, View, ImageSourcePropType, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Layouts } from '../layouts';
import { useFocusEffect } from '@react-navigation/native';
import { Utils } from '../utils';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { CONSTS } from '../constants';
import { BoltIcon, EllipsisVerticalIcon, GlobeEuropeAfricaIcon, SunIcon } from 'react-native-heroicons/outline';

export default function DashboardView() {
	const {Auth} = Utils;

	const [backPressed, setBackPressed] = useState(false);

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

	const onBackPress = () => {

		if (backPressed && Platform.OS !== 'android') {
			BackHandler.exitApp();
			return true;
		}

		setBackPressed(true);
		setTimeout(() => {
			setBackPressed(false);
		}, 2000)

		if (Platform.OS !== 'android') {
			return;
		}

		ToastAndroid.showWithGravity(
			'Appuyez une seconde fois pour quitter',
			ToastAndroid.LONG,
			ToastAndroid.CENTER)

		return true;
	};

	useFocusEffect(() => {
		let backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

		return () => backHandler.remove();
	})
	return (
		<Layouts.AppLayout>
			<Layouts.MainLayout>
				<ScrollView style={styles.container}>
					<View style={styles.topContainer}>
						<View>
							<Text style={styles.todayText}>Aujourd'hui</Text>
							<Text style={styles.dateText}>
								{Utils.Date.styleDate(new Date(), 'full')}
							</Text>
						</View>
						<Components.SafeImage
						source={useUser.profile_img_url as ImageSourcePropType ?? undefined}
						width={100} height={100} style={styles.image}/>
					</View>
					<View style={styles.secondContainer}>
						<View>
							<Text style={styles.userNameText}>{useUser.name}</Text>
							<Text style={styles.dateIntervalText}>
								{Utils.Date.getMonthInterval(
								new Date(useUser.created_at as string),
								new Date())}
							</Text>
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
									<Text style={styles.powerCardTitle}>Puissance</Text>
									<Text style={styles.powerCardSubtitle}>actuelle</Text>
								</View>
							</View>
							<View>
								<Text style={styles.powerCardNumber}>
									681,852 <Text style={styles.powerCardNumberSign}>w</Text>
								</Text>
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
								<Text>Production</Text>
								<Text style={styles.defaultCardNumber}>13,850</Text>
								<Text>kwa</Text>
							</View>
						</View>
						<View style={styles.cardGroupItemRight}>
							<View style={styles.prodCard2}>
								<Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
								paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.PRIMARY_SOFT}>
									<SunIcon size={30} color={CONSTS.COLOR.PRIMARY}/>
								</Components.BadgeIcon>
								<View style={{marginTop: CONSTS.SIZE.MD}}>
									<Text>Aujourd'hui</Text>
									<Text style={styles.defaultCardNumber}>13,850</Text>
									<Text>kwa</Text>
								</View>
							</View>
							<View style={styles.prodCardCo2}>
								<Components.BadgeIcon paddingH={CONSTS.SIZE.SM}
								paddingV={CONSTS.SIZE.SM} color={CONSTS.COLOR.SUCCESS_SOFT}>
									<GlobeEuropeAfricaIcon size={30} color={CONSTS.COLOR.SUCCESS}/>
								</Components.BadgeIcon>
								<View style={{marginTop: CONSTS.SIZE.MD}}>
									<Text>Reduction CO2</Text>
									<Text style={styles.defaultCardNumber}>0,7</Text>
									<Text>kg</Text>
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
		height: '100%',
		paddingHorizontal: CONSTS.SIZE.MD,
		backgroundColor: CONSTS.COLOR.WHITE,
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
	userNameText: {
		fontSize: CONSTS.SIZE.XL,
		color: CONSTS.COLOR.BLACK,
		fontWeight: 'bold',
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
		borderRadius: CONSTS.SIZE.LG,
		borderWidth: 1,
		paddingVertical: CONSTS.SIZE.MD,
		borderColor: CONSTS.COLOR.SECONDARY,
	},
	powerCard: {
		position: 'relative',
		borderRadius: CONSTS.SIZE.LG,
		backgroundColor: CONSTS.COLOR.BLACK,
		minHeight: 180,
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
		color: CONSTS.COLOR.WHITE,
		fontWeight: 'bold',
		fontSize: CONSTS.SIZE.XL,
	},
	powerCardSubtitle: {
		color: CONSTS.COLOR.WHITE,
	},
	powerCardNumber: {
		color: CONSTS.COLOR.PRIMARY,
		fontWeight: 'bold',
		fontSize: CONSTS.SIZE.LG,
	},
	powerCardNumberSign: {
		color: CONSTS.COLOR.SECONDARY,
		fontWeight: 'bold',
		fontSize: CONSTS.SIZE.LG,
	},
	powerImage: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '100%',
		maxHeight: '100%',
		height: '45%',
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
		position: 'absolute',
		top: '30%',
		left: 0,
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
		fontWeight: 'bold',
		fontSize: CONSTS.SIZE.LG,
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
		marginTop: CONSTS.SIZE.MD,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
})