import User from './User';
import BaseEntity from './BaseEntity';

export default interface Device extends BaseEntity {
    name: string,
    device_id: string,
    user_id: number,
    user?: User,
}