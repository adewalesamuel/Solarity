
import Order, { OrderStatus, OrderType } from '../../entities/Order';
import Product from '../../entities/Product';
import User from '../../entities/User';
import { Response } from '../services';
import BaseHook from './BaseHook';

export default interface UseOrder extends BaseHook {
    product_id: number,
    user_id: number,
    amount: number,
    quantity: number,
    end_subscription_date: string,
    status: OrderStatus,
    type: OrderType,
    product?: Product,
    products?: Product[],
    user?: User,

    setProduct_id: (arg: number) => any,
    setUser_id: (arg: number) => any,
    setAmount: (arg: number) => any,
    setQuantity: (arg: number) => any,
    setEnd_subscription_date: (arg: string) => any,
    setStatus: (arg: OrderStatus) => any,
    setType: (arg: OrderType) => any,
    setProduct?: (arg: Product) => any,
    setProducts?: (arg: Product[]) => any,
    setUser?: (arg: User) => any,

    getOrder: (userId: number, signal: AbortSignal) => Promise<Response<Order>>,
    createOrder: (signal: AbortSignal) => Promise<Response<Order>>,
    updateOrder: (signal: AbortSignal) => Promise<Response<Order>>,
    deleteOrder: (userId: number, signal: AbortSignal) => Promise<Response<Order>>,
    fillOrder: (user: Order) => any,
    emptyOrder: () => any

}