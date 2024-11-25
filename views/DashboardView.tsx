import { Text, BackHandler, ToastAndroid, Platform, View, ImageSourcePropType, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Layouts } from '../layouts';
import { useFocusEffect } from '@react-navigation/native';
import { Utils } from '../utils';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { CONSTS } from '../constants';
import { BoltIcon, EllipsisVerticalIcon } from 'react-native-heroicons/outline';

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
									<BoltIcon size={20} color={CONSTS.COLOR.PRIMARY}/>
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
				</ScrollView>
			</Layouts.MainLayout>
		</Layouts.AppLayout>
	)
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
		paddingHorizontal: CONSTS.SIZE.MD,
		paddingVertical: CONSTS.SIZE.MD,
		borderRadius: CONSTS.SIZE.XXL,
		backgroundColor: '#262003',
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
})