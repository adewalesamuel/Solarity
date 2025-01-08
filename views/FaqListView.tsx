/* eslint-disable react-hooks/exhaustive-deps */
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import React, { useCallback, useEffect, useState } from 'react';
import { CONSTS } from '../constants';
import { ChatBubbleLeftIcon, EllipsisVerticalIcon } from 'react-native-heroicons/outline';
import { FaqService } from '../services/FaqService';
import { useError } from '../hooks/useError';
import { ResponsePaginate } from '../core/types/services';
import Faq from '../core/entities/Faq';
import CustomText from '../components/CustomText';

const CARD_WIDTH = 300;

export default function FaqListView() {
    let abortController = new AbortController();

    const errorHandler = useError();

    const [_search, _setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, _setPage] = useState(1);
    const [faqs, setFaqs] = useState<Faq[]>([])
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
                    <Components.TitleText customStyle={styles.faqListHeaderTitle}>
                        Questions fréquentes !
                    </Components.TitleText>
                    <Components.Loader isLoading={_isLoading}>
                        <FlatList contentContainerStyle={styles.faqListContainer}
                        snapToInterval={CARD_WIDTH} horizontal={true}
                        data={faqs}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => {
                            const isEven = index % 2 === 0;

                            return (
                                <ScrollView style={{
                                        ...styles.faqCard,
                                        backgroundColor: isEven ?
                                        CONSTS.COLOR.PRIMARY : CONSTS.COLOR.BLACK,
                                    }}>
                                    <Components.TitleText customStyle={{
                                        color: CONSTS.COLOR.WHITE,
                                        marginBottom: CONSTS.SIZE.MD,
                                    }}>
                                        {item.title}
                                    </Components.TitleText>
                                    <CustomText customStyle={{
                                        color: isEven ? CONSTS.COLOR.BLACK : CONSTS.COLOR.WHITE,
                                    }}>
                                        {item.content}
                                    </CustomText>
                                </ScrollView>
                            )
                        }} />
                        <Components.TitleText customStyle={{
                            fontSize: CONSTS.SIZE.LG,
                            marginTop: CONSTS.SIZE.LG,
                        }}>
                            Besoin d’un support direct ?
                        </Components.TitleText>
                        <Pressable style={styles.buttonInfo}>
                            <Pressable style={styles.buttonInnerContainer}>
                                <CustomText customStyle={styles.buttonTextLeft}>
                                    Demarrez une
                                </CustomText>
                                <CustomText customStyle={styles.buttonTextRight}>
                                    conversation
                                </CustomText>
                                <ChatBubbleLeftIcon color={CONSTS.COLOR.BLACK}/>
                            </Pressable>
                        </Pressable>
                    </Components.Loader>
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
    faqListHeaderTitle: {
        marginBottom: CONSTS.SIZE.MD,
        fontSize: CONSTS.SIZE.LG,
    },
    faqListContainer: {
        columnGap: CONSTS.SIZE.LG,
    },
    faqCard: {
        overflow: 'scroll',
        height: 250,
        width: CARD_WIDTH,
        paddingHorizontal: CONSTS.SIZE.XL,
        paddingVertical: CONSTS.SIZE.XXL,
        backgroundColor: CONSTS.COLOR.PRIMARY,
        borderRadius: CONSTS.SIZE.XL,
    },
    buttonInfo: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(48, 199, 163, 1)',
        marginTop: CONSTS.SIZE.SM,
        paddingVertical: CONSTS.SIZE.LG,
        borderRadius: CONSTS.SIZE.LG,
    },
    buttonInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTextLeft: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.BLACK,
        marginRight: CONSTS.SIZE.SM,
    },
    buttonTextRight: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.BLACK,
        marginRight: CONSTS.SIZE.MD,
    }
})