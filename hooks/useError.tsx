import { useCallback, useEffect, useState } from 'react';
import { Utils } from '../utils';
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
  } from '@react-navigation/native';
import { ErrorObject } from '../services/Api';

export type UseError = {
    setError: (error: any) => void,
    setErrorMessages: (error: string[]) => void,
    errorMessages: string[],
}

export function useError(): UseError {
    const ERROR_TYPES = Object.freeze({
        ABORTED: 'Aborted',
    });
    const {Toaster} = Utils;
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const [error, setError] = useState<ErrorObject>();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const handle = useCallback(async () => {
        if (!error) {return;}

        if ('status' in error && error.status === 401) {
            await Utils.Auth.removeSessionToken();
            return navigation.navigate('Login');
        }
        if ('message' in error) {
            if (error.message === ERROR_TYPES.ABORTED) {return;}

            setErrorMessages([error.message as string]);
            Toaster.error(error.message as string);
        }
        if (!('messages' in error)) {return;}

        const messages = await error.messages as string[];

        setErrorMessages(messages);
        messages.forEach(message => Toaster.error(message));
    }, [error, navigation, ERROR_TYPES.ABORTED, Toaster]);

    useEffect(() => {
        handle();
    }, [handle])

    return {
        setError,
        setErrorMessages,
        errorMessages,
    }
}