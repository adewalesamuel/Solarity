import User from './User';

export default interface Device {
    id: number,
    name: string,
    device_id: string,
    user_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    user?: User,
}