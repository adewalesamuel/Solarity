import BaseEntity from './BaseEntity';

export default interface Signature extends BaseEntity {
    model_type: string,
    model_id: number,
    uuid: string,
    filename: string,
    document_filename: string,
    certified: boolean,
}