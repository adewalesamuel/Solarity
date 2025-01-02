import Video, { VideoRef } from 'react-native-video'
import { CONSTS } from '../constants'
import { CourseVideoType } from '../core/entities/Course'
import { Hooks } from '../hooks'
import React, { useRef } from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

type CourseVideoProps = {
    videoUrl: string,
    videoType: CourseVideoType,
}

export default function CourseVideo(props: CourseVideoProps) {
    const useError = Hooks.useError();
    const videoRef = useRef<VideoRef>(null);

    const handleError = (message: string | undefined) => {
        useError.setError(new Error(message ?? 'Une error est survenue'));
    }
    return (
        <View style={styles.container}>
            {props.videoType === CONSTS.COURSE.VIDEO_TYPES.SELF_HOSTING ?
                <Video source={{uri: props.videoUrl}} ref={videoRef}
                onError={(errorData) => handleError(errorData.error.errorString)} /> :

                <WebView
                source={{uri: props.videoUrl}}
                mixedContentMode="compatibility"
                allowsFullscreenVideo={true}
                scrollEnabled={false}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                showsVerticalScrollIndicator={false}
                onError={(event) => handleError(event.nativeEvent.description)}
                renderLoading={() => (
                    <ActivityIndicator size="large" 
                    color={CONSTS.COLOR.PRIMARY} style={styles.loader}/>
                )} />
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: '40%',
        width: '100%',
    },
    loader: {
        position: 'absolute',
        top: '44%',
        left: '44%',
    },
})

