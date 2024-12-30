/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Layouts } from '../layouts';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Course from '../core/entities/Course';
import { ResponsePaginate } from '../core/types/services';
import { ActivityIndicator, FlatList, ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { CONSTS } from '../constants';
import { CheckCircleIcon, EllipsisVerticalIcon } from 'react-native-heroicons/outline';
import CustomText from '../components/CustomText';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export default function CourseListView() {
    const COURSE_LIST_GAP = 10;
    let abortController = new AbortController();

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const { CourseService } = Services;

    const errorHandler = useError();

    const [courses, setCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [_search, _setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [hasMoreData, setHasMoreData] = useState(true);

    const handleEndReached = () => {
        if (hasMoreData === false) {return;}
        setPage((prevPage) => prevPage + 1);
    }

    const init = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await CourseService.getAll(
                {page: page}, abortController.signal
            );
            const data = (response.courses as ResponsePaginate<Course[]>).data;

            setCourses([...courses, ...data]);
            setIsLoading(false);

            if (data.length === 0) {setHasMoreData(false)}
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
                    {courses.length > 0 ?
                        <FlatList showsVerticalScrollIndicator={false}
                        data={courses} numColumns={2}
                        columnWrapperStyle={{gap: COURSE_LIST_GAP}}
                        contentContainerStyle={{gap: COURSE_LIST_GAP}}
                        onEndReached={handleEndReached}
                        renderItem={({item}) => (
                            <Pressable style={styles.courseCard} onPress={() => navigation.navigate(
                                'CourseShow', {id: item.id, slug: item.slug})}>
                                <ImageBackground style={styles.courseBgImg}
                                source={{uri: item.display_img_url}} resizeMode="cover"/>
                                <Components.TitleText customStyle={styles.courseTitle}>
                                    {item.name}
                                </Components.TitleText>
                                <View style={styles.courseAuthorContainer}>
                                    <CheckCircleIcon color={CONSTS.COLOR.PRIMARY} size={14}/>
                                    <CustomText customStyle={styles.courseAuthor}>
                                        Bruno Expert Solarity
                                    </CustomText>
                                </View>
                            </Pressable>
                        )}/> : null
                    }
                    {isLoading ? <ActivityIndicator size={'large'} color={CONSTS.COLOR.PRIMARY} /> : null}
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
        paddingTop: CONSTS.SIZE.XL,
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
    courseListContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    courseCard: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        width: '48%',
        height: 220,
        padding: CONSTS.SIZE.MD,
        borderRadius: CONSTS.SIZE.XL,
        backgroundColor: CONSTS.COLOR.LIGHT,
    },
    courseBgImg: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        top: 0,
        left: 0,
    },
    courseTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: CONSTS.COLOR.WHITE,
        marginBottom: CONSTS.SIZE.XS,
    },
    courseAuthorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: CONSTS.SIZE.XS,
    },
    courseAuthor: {
        fontSize: 10,
        color: CONSTS.COLOR.WHITE,
    },
})