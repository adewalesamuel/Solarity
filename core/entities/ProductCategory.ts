export default interface ProdcutCategory {
    id: number,
    display_img_url: string,
    logo_img_url: string,
    name: string,
    description: string,
    slug: string,
    product_category_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    product_category?: ProdcutCategory
}