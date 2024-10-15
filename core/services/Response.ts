import ResponsePaginate from './ResponsePaginate';

export default interface Response<T> {
    [key: string]: T | ResponsePaginate<T>,
    success: any,
}