import Product from '../entities/Product';
import Review from '../entities/Review';
import User from '../entities/User';
import Response from '../services/Response';
import BaseHook from './BaseHook';

export default interface UseReview extends BaseHook {
    title: string,
    content: string,
    score: number,
    user_id: number,
    product_id: number,
    user?: User,
    product?: Product,

    setTitle: (arg: string) => any,
    setContent: (arg: string) => any,
    setScore: (arg: number) => any,
    setUser_id: (arg: number) => any,
    setProduct_id: (arg: number) => any,
    setUser?: (arg: User) => any,
    setProduct?: (arg: Product) => any,

    getReview: (userId: number, signal: AbortSignal) => Promise<Response<Review>>,
    createReview: (signal: AbortSignal) => Promise<Response<Review>>,
    updateReview: (signal: AbortSignal) => Promise<Response<Review>>,
    deleteReview: (userId: number, signal: AbortSignal) => Promise<Response<Review>>,
    fillReview: (user: Review) => any,
    emptyReview: () => any
}