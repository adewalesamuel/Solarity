import { Text, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { Layouts } from '../layouts';
import { useFocusEffect } from '@react-navigation/native';
import { Utils } from '../utils';

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

		Utils.Toaster.info('Appuyez une seconde fois pour quitter');
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