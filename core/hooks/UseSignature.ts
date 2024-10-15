import Signature from '../entities/Signature';
import Response from '../services/Response';
import BaseHook from './BaseHook';

export default interface UseSignature extends BaseHook {
    model_type: string,
    model_id: number,
    uuid: string,
    filename: string,
    document_filename: string,
    certified: boolean,
    created_at: string,
    updated_at: string,

    setModel_type: (arg: string) => any,
    setModel_id: (arg: number) => any,
    setUuid: (arg: string) => any,
    setFilename: (arg: string) => any,
    setDocument_filename: (arg: string) => any,
    setCertified: (arg: boolean) => any,

    getSignature: (userId: number, signal: AbortSignal) => Promise<Response<Signature>>,
    createSignature: (signal: AbortSignal) => Promise<Response<Signature>>,
    updateSignature: (signal: AbortSignal) => Promise<Response<Signature>>,
    deleteSignature: (userId: number, signal: AbortSignal) => Promise<Response<Signature>>,
    fillSignature: (user: Signature) => any,
    emptySignature: () => any
}