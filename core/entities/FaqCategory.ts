import BaseEntity from './BaseEntity';

export default interface FaqCategory extends BaseEntity {
    name: string,
    slug: string,
    description: string,
    deleted_at: string,
    created_at: string,
    updated_at: string
}