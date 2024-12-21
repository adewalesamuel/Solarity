/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { ActivityIndicator, Pressable, SectionList, StyleSheet, View } from 'react-native';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Notification from '../core/entities/Notification';
import { ResponsePaginate } from '../core/types/services';
import { CONSTS } from '../constants';
import { Components } from '../components';
import { BellAlertIcon } from 'react-native-heroicons/outline';
import CustomText from '../components/CustomText';
import { Utils } from '../utils';

type NotificationData = {
    title: string,
    data: Notification[],
}

export default function NotificationListView() {
    const abortController = new AbortController();
    const errorHandler = useError();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [page, setPage] = useState(1);
    const [_unreadNum, setUnreadNum] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(true);

    const handleEndReached = () => {
        if (hasMoreData === false) {return;}
        setPage((prevPage) => prevPage + 1);
    }

    const getUnreadNotificationNum = (notificationList: Notification[]): number => {
        let carr = 0;
        notificationList.forEach((notification) => {
            carr = carr + (notification.read_at ? 0 : 1);
        });

        return carr;
    }

    const getNotificationData = (notificationList: Notification[]): NotificationData[] => {
        if (notificationList.length < 1) {return [];}

        let currentDate: string|undefined;
        let notificationData: NotificationData[] = [];

        for (let i = 0; i < notificationList.length; i++) {
            const notificationItem = notificationList[i];
            const notifcationDataItemDate = new Date(notificationItem.created_at).toString();

            if (currentDate === undefined || currentDate !== notifcationDataItemDate) {
                currentDate = notifcationDataItemDate;

                notificationData.push({title: currentDate, data: []});
            }

            const index = notificationData.findIndex(d => d.title === currentDate);

            notificationData[index > 0 ? index : 0].data.push(notificationItem);
        }

        return notificationData;
    }

    const init = useCallback(async() => {
        setIsLoading(true);

        try {
            const response = await Services.NotificationService.getAll(
                {page: page}, abortController.signal);
            const data = (response.notifications as ResponsePaginate<Notification[]>).data;
            const notificationUnreadNum = getUnreadNotificationNum(data);

            setNotifications([...notifications, ...data]);
            setUnreadNum(notificationUnreadNum);

            if (data.length === 0) {setHasMoreData(false)}
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    },[page])

    useEffect(() => {
        init();
        return () => abortController.abort();
    }, [init])
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Components.TitleText>Notifications</Components.TitleText>
                    </View>
                    {notifications.length > 0 ?
                        <SectionList showsVerticalScrollIndicator={false}
                        onEndReached={handleEndReached}
                        sections={getNotificationData(notifications)}
                        keyExtractor={(_items, index) => index.toString()}
                        // SectionSeparatorComponent={}
                        renderSectionHeader={({section: {title}}) => (
                            <CustomText customStyle={styles.notificationHeader}>
                                {Utils.Date.styleDate(new Date(title), 'long')}
                            </CustomText>
                        )}
                        renderItem={({item}) => (
                            <Pressable style={styles.notificationItem}>
                                <Components.BadgeIcon color={CONSTS.COLOR.LIGHT}
                                paddingH={CONSTS.SIZE.SM} paddingV={CONSTS.SIZE.SM}>
                                    <BellAlertIcon size={28} color={CONSTS.COLOR.BLACK}/>
                                </Components.BadgeIcon>
                                <View>
                                    <CustomText customStyle={styles.notificationTitle}>
                                        {Utils.String.getNotificationTitle(item.type)}
                                    </CustomText>
                                    <CustomText customStyle={styles.notifcationMessage}>
                                        {item.data?.message}
                                    </CustomText>
                                </View>
                            </Pressable>
                        )}
                        /> : null
                    }
                    {isLoading ? <ActivityIndicator color={CONSTS.COLOR.PRIMARY} size={'large'}/> : null}
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
    titleContainer: {
        marginTop: CONSTS.SIZE.LG,
        paddingBottom: CONSTS.SIZE.MD,
    },
    notificationHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        color: CONSTS.COLOR.SECONDARY,
        marginTop: CONSTS.SIZE.XXL,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
    },
    notificationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: CONSTS.COLOR.BLACK,
        marginBottom: CONSTS.SIZE.XS,
    },
    notifcationMessage: {
        flexWrap: 'wrap',
        paddingRight: CONSTS.SIZE.XXL,
    },
})