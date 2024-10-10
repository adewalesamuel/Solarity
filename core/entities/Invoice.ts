import Order from './Order';

export default interface Invoice {
    id: number,
    number: string,
    subject: string,
    date: string,
    footer: string,
    order_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    order?: Order
}