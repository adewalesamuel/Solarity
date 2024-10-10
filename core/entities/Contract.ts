import ContractType from './ContractType';
import User from './User';
import BaseEntity from './BaseEntity';

export default interface Contract extends BaseEntity {
    contract_type_id: number,
    user_id: number,
    file_url: string,
    is_signed: boolean,
    contract_type?: ContractType,
    user?: User,
}