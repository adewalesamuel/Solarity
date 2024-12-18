import { Response as ApiResponse } from '../core/types/services';
import { Utils } from '../utils';

const HOST = 'http://10.0.2.2';
const PORT = '8000';
const URL = process.env.APP_HOST_URL ?? `${HOST}:${PORT}`;
const ROOT_PATH  = '/api';

const getHeaders = async () => {
    const sessionToken = await Utils.Auth.getSessionToken();

    return (new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Authorization': `Bearer ${sessionToken}`,
    }));
}
const getFormDataHeaders = async () => {
    const sessionToken = await Utils.Auth.getSessionToken();

    return (new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
    }));
}

const getAll = async <T>(
    endpoint: string,
    signal: AbortSignal,
    hostUrl = `${URL}${ROOT_PATH}`): Promise<ApiResponse<T[]>> => {
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`, {
            headers,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

const get = async <T>(
    endpoint: string,
    signal: AbortSignal,
    hostUrl = `${URL}${ROOT_PATH}`): Promise<ApiResponse<T>> => {
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`, {
            headers,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

const _get = async <T>(
    endpoint: string,
    signal: AbortSignal,
    hostUrl = `${URL}${ROOT_PATH}`): Promise<T> => {
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`, {
            headers,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

const post = async <T>(
    endpoint: string,
    payload = '',
    signal: AbortSignal,
    hostUrl: string = `${URL}${ROOT_PATH}`): Promise<ApiResponse<T>> => {
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`,
        {
            method:'post',
            headers,
            body:payload,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}
const postFormData = async <T>(
    endpoint: string,
    payload = '',
    signal: AbortSignal,
    hostUrl: string = `${URL}${ROOT_PATH}`): Promise<ApiResponse<T>> => {
    const headers = await getFormDataHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`,
        {
            method:'post',
            headers,
            body:payload,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

const put = async <T>(
    endpoint: string,
    payload = '',
    signal: AbortSignal,
    hostUrl: string = `${URL}${ROOT_PATH}`): Promise<ApiResponse<T>> => {
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`,
        {
            method:'put',
            headers,
            body:payload,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

const erase = async <T>(
    endpoint: string,
    signal: AbortSignal,
    hostUrl = `${URL}${ROOT_PATH}`): Promise<ApiResponse<T>> => {
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        fetch(`${hostUrl}${endpoint}`,
        {
            method:'delete',
            headers,
            signal,
        })
        .then(response => {
            if (!response.ok) {return reject(getErrorObject(response));}
            return response.json();
        })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

const getResponseErrors = (response: Response): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        if (!response) {reject(null);}

        response.json().then((result: any) => {
            let errorMessages = [];

            if (!result.errors || result?.errors?.length < 1) {
                errorMessages.push(result.message);
            } else {
                for (let error in result.errors) {
                    errorMessages.push(result.errors[error]);
                }
            }

            resolve(errorMessages);
        });
    })
}

const getErrorObject = (response: Response): object => {
    return {
        status: response.status,
        messages: getResponseErrors(response),
    }
}

export const Api = {
    getAll,
    get,
    _get,
    post,
    put,
    erase,
    postFormData,
}