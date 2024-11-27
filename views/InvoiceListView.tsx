import { ScrollView, Text } from 'react-native';
import AppLayout from '../layouts/AppLayout';
import MainLayout from '../layouts/MainLayout';

export default function InvoiceListView() {
    return (
        <AppLayout>
            <MainLayout>
                <ScrollView>
                    <Text>invoice list view</Text>
                </ScrollView>
            </MainLayout>
        </AppLayout>
    )
}