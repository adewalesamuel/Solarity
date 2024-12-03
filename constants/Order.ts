export const ORDER = Object.freeze({
    STATUSES: Object.freeze({
        PENDING: 'pending',
        VALIDATED: 'validated',
        IN_DELIVERY : 'in-delivery',
        REJECTED : 'rejected',
        CANCELED : 'canceled',
        DELIVERED : 'delivered',
        RETURNED : 'returned',
    }),
    TYPES: Object.freeze({
        SALE: 'sale',
        SUBSCRIPTION: 'subscription'
    })
})