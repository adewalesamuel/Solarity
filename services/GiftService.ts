import Gift from '../core/entities/Gift';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/gifts';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Gift[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Gift>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<Gift>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: string, payload: string, signal: AbortSignal): Promise<Response<Gift>> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: string, signal: AbortSignal): Promise<Response<Gift>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const GiftService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy
}