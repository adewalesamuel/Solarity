import Product from './Product';
import User from './User';

export default interface Review {
    id: number,
    title: string,
    content: string,
    score: number,
    user_id: number,
    product_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    user?: User,
    product?: Product,
}