import Product from './Product';
import User from './User';

export type OrderStatus = 'pending' | 'validated' | 'rejected' | 'in-delivery' | 'delivered' | 'returned' | 'canceled';
export type OrderType = 'subscription' | 'sale';

export default interface Order {
    id: number,
    product_id: number,
    user_id: number,
    amount: number,
    quantity: number,
    end_subscription_date: string,
    status: OrderStatus,
    type: OrderType,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    product?: Product,
    user?: User,
}