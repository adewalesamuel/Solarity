import User, { UserType } from '../entities/User';
import Response from '../services/Response';
import BaseHook from './BaseHook';

export type UseUser = BaseHook & {
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
    email_verified_at?: string,
    remember_token?: string,
    stripe_id?: string,
    pm_type?: string,
    pm_last_four?: string,
    trial_ends_at?: string,
    isPasswordVisible: boolean,
    hasAcceptedConditions?: boolean,
    canRemember?: boolean,

    setProfile_img_url: (arg: string) => void,
    setName: (arg: string) => void,
    setPhone_number: (arg: string) => void,
    setEmail: (arg: string) => void,
    setAddress: (arg: string) => void,
    setStreet: (arg: string) => void,
    setPostal_code: (arg: string) => void,
    setCity: (arg: string) => void,
    setReferral_code: (arg: string) => void,
    setType: (arg: UserType) => void,
    setIs_active: (arg: boolean) => void,
    setCan_receive_mail: (arg: boolean) => void,
    setPassword: (arg: string) => void,
    setPassword_confirmation: (arg: string) => void,
    setCity_id?: (arg: number) => void,
    setEmail_verified_at?: (arg: string) => void,
    setRemember_token?: (arg: string) => void,
    setStripe_id?: (arg: string) => void,
    setPm_type?: (arg: string) => void,
    setPm_last_four?: (arg: string) => void,
    setTrial_ends_at?: (arg: string) => void,
    setIsPasswordVisible: (arg: boolean) => void,
    setHasAcceptedConditions: (arg: boolean) => void,
    setCanRemember: (arg: boolean) => void,

    getUser: (userId: number, signal: AbortSignal) => Promise<Response<User | User[]>>,
    createUser: (signal: AbortSignal) => Promise<Response<User>>,
    updateUser: (signal: AbortSignal) => Promise<Response<User>>,
    deleteUser: (userId: number, signal: AbortSignal) => Promise<Response<User>>,
    fillUser: (user: User) => void,
    emptyUser: () => any
}