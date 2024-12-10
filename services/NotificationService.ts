import Notification from '../core/entities/Notification';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/notifications';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Notification[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const read = (id: number, payload: string, signal: AbortSignal): Promise<Response<Notification>> => {
    return Api.put(`${ENDPOINT}/${id}/read`, payload, signal)
}

const readAll = (signal: AbortSignal): Promise<Response<Notification>> => {
    return Api.put(`${ENDPOINT}/all/read`, undefined, signal)
}
export const NotificationService = {
    ENDPOINT,
    getAll,
    read,
    readAll,
}