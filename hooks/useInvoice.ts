import { useState } from 'react';
import { Services } from '../services';
import Invoice from '../core/entities/Invoice';
import Order from '../core/entities/Order';
import { UseInvoice } from '../core/types/hooks/UseInvoice';

export const useInvoice = (): UseInvoice => {
    const [id, setId] = useState<number| ''>('');
	const [number, setNumber] = useState('');
	const [subject, setSubject] = useState('');
	const [date, setDate] = useState('');
	const [footer, setFooter] = useState('');
	const [order_id, setOrder_id] = useState<number>(-1);
    const [created_at, setCreated_at] = useState('');
	const [order, setOrder] = useState<Order | {}>({});

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getInvoice = (invoiceId: number, signal: AbortSignal) => {
        return Services.InvoiceService.getById(invoiceId, signal)
        .then(response => {
            fillInvoice(response.invoice as Invoice);
            setIsDisabled(false);

            return response;
        });
    }

    const createInvoice = (signal: AbortSignal) => {
        const payload = {
            number,
		subject,
		date,
		footer,
		order_id,

        };

        return Services.InvoiceService.create(
        JSON.stringify(payload), signal);
    }
    const updateInvoice = (invoiceId: number, signal: AbortSignal) => {
        const payload = {
            number,
		subject,
		date,
		footer,
		order_id,

        };

        return Services.InvoiceService.update(invoiceId, JSON.stringify(payload), signal);
    }
    const deleteInvoice = (invoiceId: number, signal: AbortSignal) => {
        return Services.InvoiceService.destroy(invoiceId, signal);
    }
    const fillInvoice = (invoice: Invoice) => {
        setId(invoice.id);
        setNumber(invoice.number ?? '');
		setSubject(invoice.subject ?? '');
		setDate(invoice.date ?? '');
		setFooter(invoice.footer ?? '');
		setOrder_id(invoice.order_id ?? '');
        setCreated_at(invoice.created_at);
        if (invoice.order && invoice.order.product) {
            invoice.order.amount = parseFloat(invoice.order.amount.toString());
            invoice.order.product.primary_price = parseFloat(invoice.order.product.primary_price.toString());
            invoice.order.product.other_price = parseFloat(invoice.order.product.other_price.toString());
            invoice.order.product.full_price = parseFloat(invoice.order.product.full_price.toString());
            invoice.order.product.first_deposit_amount = parseFloat(invoice.order.product.first_deposit_amount.toString());
        }
		setOrder(invoice.order ?? {});

    }
    const emptyInvoice = () => {
        setId('');
        setNumber('');
		setSubject('');
		setDate('');
		setFooter('');
		setOrder_id(-1);
        setCreated_at('');
		setOrder({});

    }

    return {
        id,
        number,
		subject,
		date,
		footer,
		order_id,
        order,
        created_at,

        errors,
        isDisabled,
        setNumber,
		setSubject,
		setDate,
		setFooter,
		setOrder_id,
        setOrder,

        setId,
        setErrors,
        setIsDisabled,
        getInvoice,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        fillInvoice,
        emptyInvoice,
    };
}