import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../core/entities/User';

const localStorage = AsyncStorage;
const tokenName = 'utk';
const userName = 'user'

const getSessionToken = () => localStorage.getItem(tokenName);
const setSessionToken = (token: string) => localStorage.setItem(tokenName, token);
const setUser = (user: User) => localStorage.setItem(userName, JSON.stringify(user))

const isLoggedIn = async (): Promise<boolean> => {
    const sessionToken = await getSessionToken();
    return sessionToken === '' || !sessionToken ? false : true;
}

const removeSessionToken = async () => {
    await localStorage.removeItem(tokenName);
    await localStorage.removeItem(userName);
}

const getUser = async (): Promise<User> => {
    return {
        ...JSON.parse(await localStorage?.getItem(userName) ?? '{}'),
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
