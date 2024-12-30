import BaseEntity from './BaseEntity';

export default interface Admin extends BaseEntity {
    profile_img_url: string,
    name: string,
    email: string,
    password?: string,
    is_active: boolean,
    role_id: number,
}