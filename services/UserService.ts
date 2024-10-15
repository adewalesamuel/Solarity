import User from '../core/entities/User';
import Response from '../core/services/Response';
import { Api } from './Api';

const ENDPOINT = '/profile';

const getAll = (params: any, signal: AbortSignal): Promise<Response<User[] | User>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<User>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<User>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (payload: string, signal: AbortSignal): Promise<Response<User>> => {
    return Api.put(`${ENDPOINT}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<Response<User>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const UserService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy,
}