import ProdcutCategory from './ProductCategory';

export type ProductType = 'product' | 'service';
import BaseEntity from './BaseEntity';

export default interface Product extends BaseEntity {
    img_url: string,
    img_url_list: string[],
    name: string,
    slug: string,
    type: ProductType,
    primary_price: number,
    other_price: number,
    full_price: number,
    discount_amount: number,
    first_deposit_amount: number,
    discount_end_date: string,
    primary_period: number,
    other_period: number,
    full_period: number,
    details: string,
    description: string,
    excerpt: string,
    amount_in_stock: number,
    feature_list: string[],
    characteristic_list: object,
    has_documents: boolean,
    technical_doc_url: string,
    product_category_id: number,
    product_category?: ProdcutCategory,
}