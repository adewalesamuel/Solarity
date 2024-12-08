import Product from '../core/entities/Product';
import { Response } from '../core/types/services';
import { Api } from './Api';

const ENDPOINT = '/products';

const getAll = (params: any, signal: AbortSignal): Promise<Response<Product[]>> => {
    let queryParams = '';
    queryParams += params.limit !== undefined ? `&limit=${params.limit}` : '';
    queryParams += params.category !== undefined ? `&category=${params.category}` : '';
    queryParams += params.type !== undefined ? `&type=${params.type}` : '';

    return Api.getAll(`${ENDPOINT}?page=${params?.page ?? ''}${queryParams}`, signal)
}

const getById = (id: number, signal: AbortSignal): Promise<Response<Product>> => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getBySlug = (slug: string, signal: AbortSignal): Promise<Response<Product>> => {
    return Api.get(`${ENDPOINT}/${slug}`, signal);
}

export const ProductService = {
    ENDPOINT,
    getAll,
    getById,
    getBySlug,
}