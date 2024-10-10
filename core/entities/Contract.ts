import ContractType from './ContractType';
import User from './User';

export default interface Contract {
    id: number,
    contract_type_id: number,
    user_id: number,
    file_url: string,
    is_signed: boolean,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    contract_type?: ContractType,
    user?: User,
}