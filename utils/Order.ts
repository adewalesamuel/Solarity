import { OrderStatus } from '../core/entities/Order';

const isOrderPaid = (status: OrderStatus = 'pending'): boolean => {
    const invalidList = ['pending', 'rejected', 'returned', 'canceled'];
    return invalidList.some(item => item === status);
}

export const Order = {
    isOrderPaid,
}