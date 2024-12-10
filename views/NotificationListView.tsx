import React, { useCallback, useEffect, useState } from 'react';
import { Layouts } from '../layouts';
import { Text } from 'react-native';
import { useError } from '../hooks/useError';
import { Services } from '../services';
import Notification from '../core/entities/Notification';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ResponsePaginate } from '../core/types/services';

type NotificationData = {
    [key: string]: Notification[],
}

export default function NotificationListView() {
    const abortController = new AbortController();
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const errorHandler = useError();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [_notificationData, setNotificationData] = useState<NotificationData>();
    const [page ] = useState(1);
    const [unreadNum, setUnreadNum] = useState<number>();
    const [_isLoading, setIsLoading] = useState(true);

    const getUnreadNotificationNum = (notificationList: Notification[]): number => {
        let carr = 0;
        notificationList.forEach((notification) => {
            carr = carr + (notification.read_at ? 0 : 1);
        });

        return carr;
    }

    const getNotificationData = (notificationList: Notification[]): NotificationData => {
        let currentDate;
        let data: NotificationData = {};

        for (let i = 0; i < notificationList.length; i++) {
            const notificationItem = notificationList[i];
            const notifcationDataItemDate = new Date(notificationItem.created_at).toLocaleDateString();

            if (currentDate === undefined || currentDate !== notifcationDataItemDate) {
                currentDate = notifcationDataItemDate;
                data[currentDate] = [];
            }

            data[currentDate].push(notificationItem);
        }

        return data;
    }

    const handleNotificationClick = (index: number, url: string = '/') => {
        const notificationCopy = [...notifications];
        const notificationItem = notificationCopy[index];

        navigation.navigate(url);

        if (notificationItem.read_at !== null) {return;}

        notificationItem.read_at = new Date().toISOString();

        setNotifications([...notificationCopy]);
        setUnreadNum(unreadNum ? unreadNum - 1 : 0);

        Services.NotificationService.read(
            notificationItem.id, '', abortController.signal);
    }

    const init = useCallback(async() => {
        setIsLoading(true);

        try {
            const response = await Services.NotificationService.getAll(
                {page: page}, abortController.signal);
            const notificationList = (response.notifications as ResponsePaginate<Notification[]>).data;
            const notificationDataObject = getNotificationData(notificationList);
            const notificationUnreadNum = getUnreadNotificationNum(notificationList);

            setNotifications([...notificationList]);
            setNotificationData(notificationDataObject);
            setUnreadNum(notificationUnreadNum);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            setIsLoading(false);
        }
    },[page])

    useEffect(() => {
        init();
    }, [init])
    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <Text>NotificationListView</Text>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}