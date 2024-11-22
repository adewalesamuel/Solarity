import { Text, BackHandler, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Layouts } from '../layouts';
import { useFocusEffect } from '@react-navigation/native';

export default function DashboardView() {
	const [backPressed, setBackPressed] = useState(false);

	const onBackPress = () => {

		if (backPressed) {
			BackHandler.exitApp();
			return true;
		}

		setBackPressed(true);

		setTimeout(() => {
			setBackPressed(false);
		}, 2000)

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
				<Text>Hello</Text>
			</Layouts.MainLayout>
		</Layouts.AppLayout>
	)
}