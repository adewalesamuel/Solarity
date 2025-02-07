import Product from './Product';
import User from './User';

export type OrderStatus = 'pending' | 'validated' | 'rejected' | 'in-delivery' | 'delivered' | 'returned' | 'canceled';
export type OrderType = 'subscription' | 'sale';
export type PeriodType = 'primary' | 'full' | 'other';
import BaseEntity from './BaseEntity';

export default interface Order extends BaseEntity {
    product_id: number,
    user_id: number,
    amount: number,
    quantity: number,
    end_subscription_date: string,
    status: OrderStatus,
    type: OrderType,
    period_type: PeriodType,
    product?: Product,
    products?: Product[],
    user?: User,
}