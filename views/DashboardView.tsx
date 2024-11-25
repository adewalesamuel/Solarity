import { Text, BackHandler, ToastAndroid, Platform, View, ImageSourcePropType, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Layouts } from '../layouts';
import { useFocusEffect } from '@react-navigation/native';
import { Utils } from '../utils';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

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
				</ScrollView>
			</Layouts.MainLayout>
		</Layouts.AppLayout>
	)
}

const rowStyle = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'space-between',
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		paddingHorizontal: CONSTS.SIZE.MD,
		backgroundColor: CONSTS.COLOR.WHITE,
	},
	topContainer: {
		...rowStyle,
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
		...rowStyle,
		paddingBottom: CONSTS.SIZE.LG,
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
})