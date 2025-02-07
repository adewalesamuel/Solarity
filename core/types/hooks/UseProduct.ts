import Product, { ProductType } from '../../entities/Product';
import ProductCategory from '../../entities/ProductCategory';
import { Response } from '../services';
import BaseHook from './BaseHook';

export type UseProduct = BaseHook & {
    img_url: string,
    img_url_list: string[],
    name: string,
    slug: string,
    type: ProductType,
    primary_price: number | undefined,
    other_price: number | undefined,
    full_price: number | undefined,
    discount_amount: number | undefined,
    first_deposit_amount: number | undefined,
    discount_end_date: string,
    primary_period: number | undefined,
    other_period: number | undefined,
    full_period: number | undefined,
    details: string,
    description: string,
    excerpt: string,
    amount_in_stock: number | undefined,
    feature_list: string[],
    characteristic_list: object,
    has_documents: boolean,
    technical_doc_url: string,
    product_category_id: number | undefined,
    product_category?: ProductCategory,

    setImg_url: (arg: string) => void,
    setImg_url_list: (arg: string[]) => void,
    setName: (arg: string) => void,
    setSlug: (arg: string) => void,
    setType: (arg: ProductType) => void,
    setPrimary_price: (arg: number) => void,
    setOther_price: (arg: number) => void,
    setFull_price: (arg: number) => void,
    setDiscount_amount: (arg: number) => void,
    setFirst_deposit_amount: (arg: number) => void,
    setDiscount_end_date: (arg: string) => void,
    setPrimary_period: (arg: number) => void,
    setOther_period: (arg: number) => void,
    setFull_period: (arg: number) => void,
    setDetails: (arg: string) => void,
    setDescription: (arg: string) => void,
    setExcerpt: (arg: string) => void,
    setAmount_in_stock: (arg: number) => void,
    setFeature_list: (arg: string[]) => void,
    setCharacteristic_list: (arg: object) => void,
    setHas_documents: (arg: boolean) => void,
    setTechnical_doc_url: (arg: string) => void,
    setProduct_category_id: (arg: number) => void,
    setProduct_category?:(arg:  ProductCategory) => void,

    getProduct: (productSlug: string, signal: AbortSignal) => Promise<Response<Product>>,
    fillProduct: (product: Product) => void,
    emptyProduct: () => any,
}