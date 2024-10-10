import User from './User';

export default interface Referral {
    id: number,
    user_id: number,
    client_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    user?: User,
    client?: User
}