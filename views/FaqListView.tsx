/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import React, { useCallback, useEffect, useState } from 'react';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';
import { FaqService } from '../services/FaqService';
import { useError } from '../hooks/useError';
import { ResponsePaginate } from '../core/types/services';
import Faq from '../core/entities/Faq';

export default function FaqListView() {
    let abortController = new AbortController();

    const errorHandler = useError();

    const [_search, _setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, _setPage] = useState(1);
    const [_faqs, setFaqs] = useState<Faq[]>([])
    const [_isLoading, setIsLoading] = useState(true);

    const init = useCallback(async () => {
        try {
            const response = await FaqService.getAll(
                {page: page}, abortController.signal);

            setFaqs((response.faqs as ResponsePaginate<Faq[]>).data);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => abortController.abort();
    }, [init]);

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                    <View style={styles.titleContainer}>
                        <Components.TitleText>Support 24/24</Components.TitleText>
                        <View style={styles.iconContainer}>
							<EllipsisVerticalIcon size={30} color={CONSTS.COLOR.BLACK}/>
						</View>
                    </View>
                    <View style={styles.topContainer}>
                        <Components.SearchInput placeholder="Cherchez une information ici"
                        value={searchInput} onChangeText={(text: string) => setSearchInput(text)}/>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingHorizontal: CONSTS.SIZE.MD,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: CONSTS.SIZE.MD,
    },
    iconContainer: {
        borderWidth: 1,
		borderRadius: CONSTS.SIZE.LG,
		paddingVertical: CONSTS.SIZE.MD,
		borderColor: CONSTS.COLOR.SECONDARY,
	},
    topContainer: {
		width: '100%',
        columnGap: CONSTS.SIZE.MD,
		marginBottom: CONSTS.SIZE.XL,
        marginTop: CONSTS.SIZE.SM,
	},
})