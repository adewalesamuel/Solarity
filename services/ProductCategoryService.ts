import ProductCategory from '../core/entities/ProductCategory';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/product-categorys';

const getAll = (params: any, signal: AbortSignal): Promise<Response<ProductCategory[]>> => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<ProductCategory>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload: string, signal: AbortSignal): Promise<Response<ProductCategory>> => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id: number, payload: string, signal: AbortSignal): Promise<Response<ProductCategory>> => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id: number, signal: AbortSignal): Promise<Response<ProductCategory>> => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const ProductCategoryService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy
}