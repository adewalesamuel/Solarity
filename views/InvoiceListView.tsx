/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, VirtualizedList } from 'react-native';
import AppLayout from '../layouts/AppLayout';
import MainLayout from '../layouts/MainLayout';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';
import { Components } from '../components';
import CustomText from '../components/CustomText';
import { Utils } from '../utils';
import { Hooks } from '../hooks';
import Invoice from '../core/entities/Invoice';
import { Services } from '../services';
import { ResponsePaginate } from '../core/types/services';

export default function InvoiceListView() {
    const abortController = new AbortController();
    const {Auth} = Utils;

    const errorHandler = Hooks.useError();
    const useUser = Hooks.useUser();

    const [page, setPage] = useState(1);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(true);

    const getUnpaidInvoice = (invoiceList: Invoice[]): Invoice | undefined => {
        const invoice = invoiceList.find(
            (invoiceItem) => !Utils.Order.isOrderPaid(invoiceItem.order?.status)
        );

        return invoice;
    }
    const InvoiceCardHeader = useMemo(() => (
        <Components.InvoiceCardHeader
        canShowButton={true} canShowImage={true}
        price={getUnpaidInvoice(invoices)?.order?.amount}
        number={getUnpaidInvoice(invoices)?.number}/>
    ), [invoices.length])

    const handleEndReached = () => {
        if (hasMoreData === false) {return;}
        setPage((prevPage) => prevPage + 1);
    }

    const loadInvoiceList = async (currentPage: number = 1): Promise<Invoice[]> => {
        const response = await Services.InvoiceService.getAll(
            {page: currentPage},
            abortController.signal
        );
        const data = (response.invoices as ResponsePaginate<Invoice[]>).data;

        return data;
    }

    const init = useCallback(async () => {
        setIsLoading(true);

        try {
            const data = await loadInvoiceList(page);
            const invoiceList = [...invoices, ...data];

            setInvoices(invoiceList);
            setIsLoading(false);

            if (data.length === 0) {setHasMoreData(false)}
            if (page === 1) {
                const user = await Auth.getUser();
                useUser.setCreated_at(user?.created_at);
            }
        } catch (error) {
            errorHandler.setError(error);
        }
    }, [page])

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init])
    return (
        <AppLayout>
            <MainLayout>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <View>
                            <Components.TitleText>Factures</Components.TitleText>
                            <CustomText customStyle={styles.dateIntervalText}>
								{Utils.Date.getMonthInterval(
								new Date(useUser.created_at as string),
								new Date())}
							</CustomText>
                        </View>
                        <View style={styles.iconContainer}>
							<EllipsisVerticalIcon size={30} color={CONSTS.COLOR.BLACK}/>
						</View>
                    </View>
                    {invoices.length > 0 ?
                        <VirtualizedList data={invoices} initialNumToRender={15}
                            ListHeaderComponent={() => InvoiceCardHeader}
                            onEndReached={handleEndReached}
                            getItem={(data: Invoice[], index) => data[index]}
                            getItemCount={(data: Invoice[]) => data.length}
                            renderItem={({item}) => <Components.InvoiceCardItem invoice={item} />}/>
                        : null
                    }
                    {isLoading ? <ActivityIndicator size={'large'} color={CONSTS.COLOR.PRIMARY} /> : null}
                </View>
            </MainLayout>
        </AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        height: '100%',
        paddingHorizontal: CONSTS.SIZE.MD,
    },
    titleContainer: {
        paddingVertical: CONSTS.SIZE.MD,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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