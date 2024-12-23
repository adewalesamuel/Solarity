import Course from '../core/entities/Course';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/courses';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Course[]>> => {
    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Course>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}
const getBySlug = (slug: string, signal: AbortSignal): Promise<Response<Course>> => {
    return Api.get(`${ENDPOINT}/${slug}`, signal);

}
const create = (payload: string, signal: AbortSignal): Promise<Response<Course>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: number, payload: string, signal: AbortSignal): Promise<Response<Course>> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<Response<Course>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const CourseService = {
    ENDPOINT,
    getAll,
    getById,
    getBySlug,
    create,
    update,
    destroy
}