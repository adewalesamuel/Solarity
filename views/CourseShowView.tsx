/* eslint-disable react-hooks/exhaustive-deps */
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layouts } from '../layouts';
import { Components } from '../components';
import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useError } from '../hooks/useError';
import { Hooks } from '../hooks';
import Course from '../core/entities/Course';
import { Services } from '../services';
import { ResponsePaginate } from '../core/types/services';
import CustomText from '../components/CustomText';
import { CONSTS } from '../constants';

type CourseRouteParams = Partial<{
    id: number,
    slug: string,
}> | undefined;
export default function CourseShowView() {
    let abortController = new AbortController();

    const route: RouteProp<ParamListBase> = useRoute();
    const params: CourseRouteParams = route.params;
    const errorHandler = useError();
    const useCourse = Hooks.useCourse();

    const [courses, setCourses] = useState<Course[]>([]);
    const [_search, _setSearch] = useState('');
    const [hasClickedPlay, setHasClickedPlay] = useState(false);
    const [slug, _setSlug] = useState(params?.slug);
    const [isLoading, setIsLoading] = useState(true);

    const init = useCallback(async () => {
        if (!slug) {return}
        setIsLoading(true);

        try {
            await useCourse.getCourse(slug, abortController.signal);

            if (courses.length > 0) {return;}

            const response = await Services.CourseService.getAll(
                {page: 1}, abortController.signal);

            setCourses((response.courses as ResponsePaginate<Course[]>).data);
        } catch (error) {
            errorHandler.setError(error);
        } finally{
            setIsLoading(false);
        }
    }, [slug])

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init])

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <View style={styles.container}>
                    <Components.Loader isLoading={isLoading}>
                        <View style={styles.top}>
                            <CustomText customStyle={styles.title}>Tutoriel</CustomText>
                            <Components.TitleText customStyle={styles.courseName}>
                                {useCourse.name}
                            </Components.TitleText>
                        </View>
                        {!hasClickedPlay ?
                            <View style={styles.courseCard}>
                                {useCourse.display_img_url ?
                                    <ImageBackground style={styles.courseImage} resizeMode="cover"
                                    source={{uri: useCourse.display_img_url}} />
                                    : null}
                                <View style={styles.imageOverlay}/>
                                    <TouchableOpacity style={styles.playBtnContainer}
                                    onPress={() => setHasClickedPlay(true)}>
                                        <Image style={styles.playBtn}
                                        source={require('../assets/images/play-btn.png')}/>
                                    </TouchableOpacity>
                            </View> :
                            <Components.CourseVideo videoType={useCourse.video_type}
                            videoUrl={useCourse.video_url}/>
                        }
                    </Components.Loader>
                </View>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: CONSTS.SIZE.LG,
        backgroundColor: CONSTS.COLOR.WHITE,
    },
    top: {
        marginTop: CONSTS.SIZE.XL,
        paddingVertical: CONSTS.SIZE.LG,
    },
    title: {
        fontWeight: 'bold',
        color: CONSTS.COLOR.PRIMARY,
    },
    courseName: {
        fontWeight: 'light',
    },
    courseCard: {
        overflow: 'hidden',
        height: 370,
        borderRadius: CONSTS.SIZE.XL,
        padding: CONSTS.SIZE.MD,
    },
    courseImage: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        backgroundColor: CONSTS.COLOR.LIGHT,
    },
    imageOverlay: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        opacity: 0.5,
        backgroundColor: CONSTS.COLOR.BLACK,
    },
    playBtnContainer: {
        position: 'absolute',
        top: '44%',
        left: '44%',
    },
    playBtn: {
        width: 80,
        height: 100,
        borderWidth: 1,
    },
})