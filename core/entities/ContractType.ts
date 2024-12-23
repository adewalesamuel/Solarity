import BaseEntity from './BaseEntity';

export default interface ContractType extends BaseEntity {
    name: string,
    description: string,
    template_file_url: string,
    signature_img_url: string,
    deleted_at: string,
    created_at: string,
    updated_at: string
}