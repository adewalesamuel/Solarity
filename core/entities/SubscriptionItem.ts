export default interface SubscriptionItem {
    id: number,
    subscription_id: number,
    stripe_id: string,
    stripe_product: string,
    stripe_price: string,
    quantity: number,
    created_at: string,
    updated_at: string,

}