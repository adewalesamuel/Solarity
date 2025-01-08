import Faq from '../core/entities/Faq';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/faqs';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Faq[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Faq>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<Faq>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: number, payload: string, signal: AbortSignal): Promise<Response<Faq>> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<Response<Faq>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const FaqService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy,
}