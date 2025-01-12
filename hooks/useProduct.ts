import { useState } from 'react';
import { Services } from '../services';
import { UseProduct } from '../core/types/hooks/UseProduct';
import Product, { ProductType } from '../core/entities/Product';
import { CONSTS } from '../constants';
import { Response } from '../core/types/services';

export const useProduct = (): UseProduct => {
    const [id, setId] = useState<number | ''>('');
	const [img_url, setImg_url] = useState('');
	const [img_url_list, setImg_url_list] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [type, setType] = useState<ProductType>(CONSTS.PRODUCT.PRODUCT_TYPE);
	const [primary_price, setPrimary_price] = useState<number|undefined>();
	const [other_price, setOther_price] = useState<number|undefined>();
	const [full_price, setFull_price] = useState<number|undefined>();
	const [first_deposit_amount, setFirst_deposit_amount] = useState<number|undefined>();
	const [discount_amount, setDiscount_amount] = useState<number|undefined>();
	const [discount_end_date, setDiscount_end_date] = useState('');
	const [primary_period, setPrimary_period] = useState<number|undefined>();
	const [other_period, setOther_period] = useState<number|undefined>();
	const [full_period, setFull_period] = useState<number|undefined>();
	const [details, setDetails] = useState('');
	const [description, setDescription] = useState('');
	const [excerpt, setExcerpt] = useState('');
	const [feature_list, setFeature_list] = useState<string[]>([]);
	const [amount_in_stock, setAmount_in_stock] = useState<number>(1);
	const [characteristic_list, setCharacteristic_list] = useState<object>({});
	const [has_documents, setHas_documents] = useState<boolean>(false);
	const [technical_doc_url, setTechnical_doc_url] = useState('');
	const [product_category_id, setProduct_category_id] = useState<number|undefined>();

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getProduct = (prouductSlug: string, signal: AbortSignal): Promise<Response<Product>> => {
        return Services.ProductService.getBySlug(prouductSlug, signal)
        .then(response => {
            fillProduct(response.product as Product);
            setIsDisabled(false);

            return response;
        });
    }

    const fillProduct = (product: Product) => {
        setId(product.id);
        setImg_url(product.img_url ?? '');
		setImg_url_list(product.img_url_list ?? []);
		setName(product.name ?? '');
		setSlug(product.slug ?? '');
		setType(product.type ?? '');
		setPrimary_price(product.primary_price ?? '');
		setOther_price(product.other_price ?? '');
		setFull_price(product.full_price ?? '');
		setFirst_deposit_amount(product.first_deposit_amount ?? '');
		setDiscount_amount(product.discount_amount ?? '');
		setDiscount_end_date(product.discount_end_date ?? '');
		setPrimary_period(product.primary_period ?? '');
		setOther_period(product.other_period ?? '');
		setFull_period(product.full_period ?? '');
		setDetails(product.details ?? '');
		setDescription(product.description ?? '');
		setExcerpt(product.excerpt ?? '');
		setFeature_list(product.feature_list ?? []);
		setAmount_in_stock(product.amount_in_stock ?? 1);
		setCharacteristic_list(product.characteristic_list ?? []);
		setHas_documents(product.has_documents ?? '');
		setTechnical_doc_url(product.technical_doc_url ?? '');
		setProduct_category_id(product.product_category_id ?? '');

    }
    const emptyProduct = () => {
        setId('');
        setImg_url('');
		setImg_url_list([]);
		setName('');
		setSlug('');
		setType(CONSTS.PRODUCT.PRODUCT_TYPE);
		setPrimary_price(undefined);
		setOther_price(undefined);
		setFull_price(undefined);
		setFirst_deposit_amount(undefined);
		setDiscount_amount(undefined);
		setDiscount_end_date('');
		setPrimary_period(undefined);
		setOther_period(undefined);
		setFull_period(undefined);
		setDetails('');
		setDescription('');
		setExcerpt('');
		setFeature_list([]);
		setAmount_in_stock(1);
		setCharacteristic_list([]);
		setHas_documents(false);
		setTechnical_doc_url('');
		setProduct_category_id(undefined);

    }

    return {
        id,
        img_url,
		img_url_list,
		name,
		slug,
		type,
		primary_price,
		other_price,
		full_price,
		first_deposit_amount,
		discount_amount,
		discount_end_date,
		primary_period,
		other_period,
		full_period,
		details,
		description,
		excerpt,
		feature_list,
		amount_in_stock,
		characteristic_list,
		has_documents,
		technical_doc_url,
		product_category_id,

        errors,
        isDisabled,
        setImg_url,
		setImg_url_list,
		setName,
		setSlug,
		setType,
		setPrimary_price,
		setOther_price,
		setFull_price,
		setFirst_deposit_amount,
		setDiscount_amount,
		setDiscount_end_date,
		setPrimary_period,
		setOther_period,
		setFull_period,
		setDetails,
		setDescription,
		setExcerpt,
		setFeature_list,
		setAmount_in_stock,
		setCharacteristic_list,
		setHas_documents,
		setTechnical_doc_url,
		setProduct_category_id,

        setId,
        setErrors,
        setIsDisabled,
        getProduct,
        fillProduct,
        emptyProduct,
    };
}