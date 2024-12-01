import Invoice from '../../entities/Invoice'
import Order from '../../entities/Order'
import { Response } from '../services'
import BaseHook from './BaseHook'

export type UseInvoice = BaseHook & {
    number: string | undefined,
    subject: string,
    date: string,
    footer: string,
    order_id: number,
    order: Order | {},
    setNumber: (arg: string) => void
    setSubject: (arg: string) => void
    setDate: (arg: string) => void
    setFooter: (arg: string) => void
    setOrder_id: (arg: number) => void
    setOrder: (arg: Order | {}) => void

    getInvoice: (invoiceId: number, signal: AbortSignal) => Promise<Response<Invoice | Invoice[]>>,
    createInvoice: (signal: AbortSignal) => Promise<Response<Invoice>>,
    updateInvoice: (invoiceId: number, signal: AbortSignal) => Promise<Response<Invoice>>,
    deleteInvoice: (invoiceId: number, signal: AbortSignal) => Promise<Response<Invoice>>,
    fillInvoice: (user: Invoice) => void,
    emptyInvoice: () => any
}