import BaseEntity from './BaseEntity';

export default interface DocumentType extends BaseEntity {
    img_url: string,
    description: string,
    name: string,
    deleted_at: string,
    created_at: string,
    updated_at: string
}