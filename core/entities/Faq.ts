import FaqCategory from './FaqCategory';

export default interface Faq {
    id: number,
    title: string,
    content: string,
    faq_category_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    faq_category?: FaqCategory,
}