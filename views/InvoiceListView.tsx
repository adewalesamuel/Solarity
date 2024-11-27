import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AppLayout from '../layouts/AppLayout';
import MainLayout from '../layouts/MainLayout';
import { CONSTS } from '../constants';

export default function InvoiceListView() {
    return (
        <AppLayout>
            <MainLayout>
                <ScrollView style={styles.container}>
                    <Text>invoice list view</Text>
                </ScrollView>
            </MainLayout>
        </AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        height: '100%',
    },
})