/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Layouts } from '../layouts';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Course from '../core/entities/Course';
import { ResponsePaginate } from '../core/types/services';
import { StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

export default function CourseListView() {
    let abortController = new AbortController();

    const { CourseService } = Services;

    const errorHandler = useError();

    const [courses, setCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const init = useCallback(async () => {
        try {
            const response = await CourseService.getAll(
                {page: page}, abortController.signal
            );
            const data = (response.courses as ResponsePaginate<Course[]>).data;

            setCourses(data);
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
            <View style={styles.container}>
                <Components.TitleText>Votre espace formation</Components.TitleText>
                <View style={styles.topContainer}>
                    <Components.SearchInput placeholder="Cherchez un tutoriel"
                    value={searchInput} onChangeText={(text: string) => setSearchInput(text)}/>
                    <View style={styles.iconContainer}>
                        <EllipsisVerticalIcon size={30} color="black"/>
                    </View>
                </View>
            </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingHorizontal: CONSTS.SIZE.LG,
    },
    topContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
        columnGap: CONSTS.SIZE.MD,
		marginBottom: CONSTS.SIZE.XL,
        marginTop: CONSTS.SIZE.SM,
	},
    iconContainer: {
		borderRadius: CONSTS.SIZE.LG,
		borderWidth: 1,
		paddingVertical: CONSTS.SIZE.MD,
		borderColor: CONSTS.COLOR.SECONDARY,
	},
})