import React, { useCallback, useEffect } from 'react';
import { ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import { Hooks } from '../hooks';
import { Utils } from '../utils';
import CustomText from './CustomText';
import { Components } from '.';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export default function MainHeader(props: NativeStackHeaderProps) {
    const {Auth} = Utils;

    const useUser = Hooks.useUser();
    const errorHandler = Hooks.useError();

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            const user = await Auth.getUser();
            useUser.fillUser(user);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useUser.setIsDisabled(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <View style={styles.container}>
            <Pressable style={styles.iconContainer} onPress={() => props.navigation.goBack()}>
                <ArrowLeftIcon size={30} color={CONSTS.COLOR.BLACK}/>
            </Pressable>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <CustomText customStyle={textStyle}>Aujourd'hui</CustomText>
                    <CustomText customStyle={styles.dateText}>
							{Utils.Date.styleDate(new Date(), 'full')}
					</CustomText>
                </View>
                <Components.SafeImage
                source={useUser.profile_img_url as ImageSourcePropType ?? undefined}
                style={styles.image}/>
            </View>
        </View>
    )
}

const textStyle = {
    textAlign: 'right' as 'right',
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: CONSTS.COLOR.WHITE,
        paddingTop: CONSTS.SIZE.XL,
        paddingBottom: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.MD,
    },
    iconContainer: {
        borderWidth: 1,
        paddingHorizontal: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
        borderRadius: CONSTS.SIZE.XXL,
        borderColor: CONSTS.COLOR.SECONDARY,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        borderColor: 'red',
        marginRight: CONSTS.SIZE.MD,
    },
    todayText: {
		marginBottom: CONSTS.SIZE.SM,
	},
	dateText: {
        textTransform: 'capitalize',
		color: CONSTS.COLOR.BLACK,
        ...textStyle,
	},
    image: {
        objectFit: 'cover',
        width: 60,
        height: 60,
        borderRadius: 60,
    },
});