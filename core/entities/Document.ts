import DocumentType from './DocumentType';
import User from './User';

export default interface Document {
    id: number,
    user_id: number,
    document_type_id: number,
    file_url: string,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    user?: User,
    document_type?: DocumentType,
}