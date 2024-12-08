import Order from '../core/entities/Order';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/orders';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Order[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}&type=${params.type ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Order>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getLatestSubscription = (signal: AbortSignal): Promise<Response<Order>> => {
    return Api.get(`${ENDPOINT}/subscription`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<Order>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const create_v2 = (payload: string, signal: AbortSignal): Promise<Response<Order>> => {
    return Api.post(`/v2${ENDPOINT}`, payload, signal)
}

const makePayment = (orderId: number, payload: string, signal: AbortSignal): Promise<Response<Order>> => {
    return Api.post(`${ENDPOINT}/${orderId}/payment`, payload, signal)
}

const paymentMethod = (signal: AbortSignal): Promise<Response<Order>> => {
    return Api.post(`${ENDPOINT}/payment-method`, '', signal)

}

const update = (id: number, payload: string, signal: AbortSignal): Promise<Response<Order>> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<Response<Order>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const OrderService = {
    ENDPOINT,
    getAll,
    getById,
    getLatestSubscription,
    create,
    create_v2,
    makePayment,
    paymentMethod,
    update,
    destroy
}