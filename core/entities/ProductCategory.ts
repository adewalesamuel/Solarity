import BaseEntity from './BaseEntity';

export default interface ProductCategory extends BaseEntity {
    display_img_url: string,
    logo_img_url: string,
    name: string,
    description: string,
    slug: string,
    product_category_id: number,
    product_category?: ProductCategory
}