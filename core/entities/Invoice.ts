import Order from './Order';
import BaseEntity from './BaseEntity';

export default interface Invoice extends BaseEntity {
    number: string,
    subject: string,
    date: string,
    footer: string,
    order_id: number,
    order?: Order
}