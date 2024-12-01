import Invoice from '../core/entities/Invoice';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/invoices';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Invoice[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Invoice>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<Invoice>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (invoiceId: number, payload: string, signal: AbortSignal): Promise<Response<Invoice>> => {
    return Api.put(`${ENDPOINT}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<Response<Invoice>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const InvoiceService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy,
}