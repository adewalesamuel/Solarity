import Referral from '../core/entities/Referral';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/referrals';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Referral[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Referral>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<Referral>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: string, payload: string, signal: AbortSignal): Promise<Response<Referral>> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: string, signal: AbortSignal): Promise<Response<Referral>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}


export const ReferralService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy
}