import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../core/entities/User';

const localStorage = AsyncStorage;
const tokenName = 'utk';
const userName = 'user'

const getSessionToken = async () => {
    return await localStorage.getItem(tokenName);
}

const isLoggedIn = async (): Promise<boolean> => {
    const sessionToken = await getSessionToken();

    if (sessionToken === '' || !sessionToken) {
        return false;
    }

    return true;
}

const setSessionToken = (token: string) => {
    return localStorage.setItem(tokenName, token)
}

const setUser = (user: User) => {
    return localStorage.setItem(userName, JSON.stringify(user))
}

const removeSessionToken = async () => {
    await localStorage.removeItem(tokenName);
    await localStorage.removeItem(userName);
}

const getUser = async (): Promise<User> => {
    const data = await localStorage?.getItem(userName);

    return {
        ...JSON.parse(data ?? '{}'),
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    getUser,
    setUser,
}
