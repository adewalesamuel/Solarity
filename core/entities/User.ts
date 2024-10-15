import BaseEntity from './BaseEntity';

export type UserType = 'particulier' | 'professionel';

export default interface User extends BaseEntity {
    profile_img_url: string,
    name: string,
    phone_number: string,
    email: string,
    address: string,
    street: string,
    postal_code: string,
    city: string,
    referral_code: string,
    type: UserType,
    is_active: boolean,
    can_receive_mail: boolean,
    password?: string,
    password_confirmation?: string,
    city_id?: number,
    email_verified_at: string,
    remember_token: string,
    created_at: string,
    deleted_at: string,
    updated_at: string,
    stripe_id: string,
    pm_type: string,
    pm_last_four: string,
    trial_ends_at: string,
}

