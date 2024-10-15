import { Text, BackHandler, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Layouts } from '../layouts';

export default function DashboardView() {

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		});
		return () => backHandler.remove();
	}, [])
	return (
		<Layouts.AppLayout>
			<SafeAreaView>
				<Text>DashboardView</Text>
			</SafeAreaView>
		</Layouts.AppLayout>
	)
}