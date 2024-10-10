import FaqCategory from './FaqCategory';
import BaseEntity from './BaseEntity';

export default interface Faq extends BaseEntity {
    title: string,
    content: string,
    faq_category_id: number,
    faq_category?: FaqCategory,
}