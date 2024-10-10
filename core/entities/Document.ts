import DocumentType from './DocumentType';
import User from './User';
import BaseEntity from './BaseEntity';

export default interface Document extends BaseEntity {
    user_id: number,
    document_type_id: number,
    file_url: string,
    user?: User,
    document_type?: DocumentType,
}