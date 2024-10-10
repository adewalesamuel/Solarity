import User from './User';
import BaseEntity from './BaseEntity';

export default interface Referral extends BaseEntity {
    user_id: number,
    client_id: number,
    user?: User,
    client?: User
}