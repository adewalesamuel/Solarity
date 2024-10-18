import { useState } from 'react';
import { Services } from '../services';
import User, { UserType } from '../core/entities/User';
import { CONSTS } from '../constants';
import { UseUser } from '../core/hooks/UseUser';

export const useUser = (): UseUser => {
    const [id, setId] = useState<number | ''>('');
	const [profile_img_url, setProfile_img_url] = useState<string|undefined>(undefined);
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [street, setStreet] = useState('');
	const [postal_code, setPostal_code] = useState('');
	const [city, setCity] = useState('');
	const [referral_code, setReferral_code] = useState('');
	const [type, setType] = useState<UserType>(CONSTS.USER.TYPES.PARTICULIER as UserType);
	const [is_active, setIs_active] = useState<boolean>(true);
	const [can_receive_mail, setCan_receive_mail] = useState<boolean>(false);
	const [password, setPassword] = useState('');
	const [password_confirmation, setPassword_confirmation] = useState('');
	const [city_id, setCity_id] = useState<number | undefined>(undefined);

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [hasAcceptedConditions, setHasAcceptedConditions] = useState(false);
	const [canRemember, setCanRemember] = useState(false);

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getUser = (userId: number, signal: AbortSignal) => {
        return Services.UserService.getById(userId, signal)
        .then(response => {
            fillUser(response.user as User);
            setIsDisabled(false);

            return response;
        });
    }

    const createUser = (signal: AbortSignal) => {
        const payload = {
            profile_img_url,
		name,
		phone_number,
		email,
		address,
		street,
		postal_code,
		city,
		referral_code,
		type,
		is_active,
		can_receive_mail,
		password,
		city_id,

        };

        return Services.UserService.create(
        JSON.stringify(payload), signal);
    }
    const updateUser = (signal: AbortSignal) => {
        const payload = {
            profile_img_url,
		name,
		phone_number,
		email,
		address,
		street,
		postal_code,
		city,
		referral_code,
		type,
		is_active,
		can_receive_mail,
		password,
		city_id,

        };

        return Services.UserService.update(
			JSON.stringify(payload), signal);
    }
    const deleteUser = (userId: number, signal: AbortSignal) => {
        return Services.UserService.destroy(userId, signal);
    }
    const fillUser = (user: User) => {
        setId(user.id);
        setProfile_img_url(user.profile_img_url ?? undefined);
		setName(user.name ?? '');
		setPhone_number(user.phone_number ?? '');
		setEmail(user.email ?? '');
		setAddress(user.address ?? '');
		setStreet(user.street ?? '');
		setPostal_code(user.postal_code ?? '');
		setCity(user.city ?? '');
		setReferral_code(user.referral_code ?? '');
		setType(user.type ?? '');
		setIs_active(user.is_active ?? '');
		setCan_receive_mail(user.can_receive_mail ?? '');
		setPassword(user.password ?? '');
		setCity_id(user.city_id ?? undefined);

    }
    const emptyUser = () => {
        setId('');
        setProfile_img_url('');
		setName('');
		setPhone_number('');
		setEmail('');
		setAddress('');
		setStreet('');
		setPostal_code('');
		setCity('');
		setReferral_code('');
		setType(CONSTS.USER.TYPES.PARTICULIER as UserType);
		setIs_active(true);
		setCan_receive_mail(false);
		setPassword('');
		setCity_id(undefined);

    }

    return {
        id,
        profile_img_url,
		name,
		phone_number,
		email,
		address,
		street,
		postal_code,
		city,
		referral_code,
		type,
		is_active,
		can_receive_mail,
		password,
		password_confirmation,
		city_id,
		isPasswordVisible,
		hasAcceptedConditions,
		canRemember,

        errors,
        isDisabled,
        setProfile_img_url,
		setName,
		setPhone_number,
		setEmail,
		setAddress,
		setStreet,
		setPostal_code,
		setCity,
		setReferral_code,
		setType,
		setIs_active,
		setCan_receive_mail,
		setPassword,
		setPassword_confirmation,
		setCity_id,
		setIsPasswordVisible,
		setHasAcceptedConditions,
		setCanRemember,

        setId,
        setErrors,
        setIsDisabled,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        fillUser,
        emptyUser,
    };
}