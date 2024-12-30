import { Image, ImageBackground, StyleSheet, View } from 'react-native';
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
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [hasClickedPlay, setHasClickedPlay] = useState(false);
    const [slug, setSlug] = useState(params?.slug);

    const init = useCallback(async () => {
        if (!slug) {return}
        useCourse.setIsDisabled(true);

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
            useCourse.setIsDisabled(false);
        }
    }, [slug])

    useEffect(() => {
        init();
    }, [init])

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <View style={styles.container}>
                    <Components.Loader isLoading={useCourse.isDisabled}>
                        <View style={styles.top}>
                            <CustomText customStyle={styles.title}>Tutoriel</CustomText>
                            <Components.TitleText customStyle={styles.courseName}>
                                {useCourse.name}
                            </Components.TitleText>
                        </View>
                        <View style={styles.courseCard}>
                            <ImageBackground style={styles.courseImage} resizeMode="cover"
                            source={{uri: useCourse.display_img_url}} />
                            <View style={styles.imageOverlay}/>
                            <Image style={styles.playBtn} source={require('../assets/images/play-btn.png')}/>
                        </View>
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
        backgroundColor: CONSTS.COLOR.BLACK,
        opacity: 0.5,
    },
    playBtn: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        width: 80,
        height: 100,
        borderWidth: 1,
    },
})