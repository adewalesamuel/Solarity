import { useState } from 'react';
import { Services } from '../services';
import UseOrder from '../core/types/hooks/UseOrder';
import Order, { OrderStatus, OrderType, PeriodType } from '../core/entities/Order';

export const useOrder = (): UseOrder => {
    const [id, setId] = useState<number|''>('');
	const [product_id, setProduct_id] = useState(-1);
	const [user_id, setUser_id] = useState(-1);
	const [amount, setAmount] = useState(0.50);
	const [status, setStatus] = useState<OrderStatus>('pending');
	const [type, setType] = useState<OrderType>('sale');
    const [quantity, setQuantity] = useState(0);
    const [period_type, setPeriod_type] = useState<PeriodType>('primary');
    const [end_subscription_date, setEnd_subscription_date] = useState('');

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getOrder = (orderId: number, signal: AbortSignal) => {
        return Services.OrderService.getById(orderId, signal)
        .then(response => {
            fillOrder(response.order as Order);
            setIsDisabled(false);

            return response;
        });
    }

    const createOrder = (signal: AbortSignal) => {
        const payload = {
            product_id,
		user_id,
		amount,
		status,
		type,
        quantity,
        period_type,
        end_subscription_date,

        };

        return Services.OrderService.create_v2(
        JSON.stringify(payload), signal);
    }
    const updateOrder = (orderId: number, signal: AbortSignal) => {
        const payload = {
            product_id,
		user_id,
		amount,
		status,
		type,
        quantity,
        period_type,
        end_subscription_date,

        };

        return Services.OrderService.update(
            orderId, JSON.stringify(payload), signal);
    }
    const deleteOrder = (orderId: number, signal: AbortSignal) => {
        return Services.OrderService.destroy(orderId, signal);
    }
    const fillOrder = (order: Order) => {
        setId(order.id);
        setProduct_id(order.product_id);
		setUser_id(order.user_id);
		setAmount(order.amount);
		setStatus(order.status);
		setType(order.type);
        setPeriod_type(order.period_type);
		setQuantity(order.quantity);
		setEnd_subscription_date(order.end_subscription_date);

    }
    const emptyOrder = () => {
        setId('');
        setProduct_id(-1);
		setUser_id(-1);
		setAmount(0.50);
		setStatus('pending');
		setType('sale');
        setPeriod_type('primary');
		setQuantity(0);
		setEnd_subscription_date('');

    }

    return {
        id,
        product_id,
		user_id,
		amount,
		status,
		type,
        quantity,
        period_type,
        end_subscription_date,

        errors,
        isDisabled,
        setProduct_id,
		setUser_id,
		setAmount,
		setStatus,
		setType,
		setQuantity,
		setPeriod_type,
		setEnd_subscription_date,

        setId,
        setErrors,
        setIsDisabled,
        getOrder,
        createOrder,
        updateOrder,
        deleteOrder,
        fillOrder,
        emptyOrder,
    };
}