import Product from './Product';
import User from './User';
import BaseEntity from './BaseEntity';

export default interface Review extends BaseEntity {
    title: string,
    content: string,
    score: number,
    user_id: number,
    product_id: number,
    user?: User,
    product?: Product,
}