import { Api } from './Api';

const  ENPOINTS = {
    Login: '/login',
    Register: '/register',
    Logout: '/logout',
    ForgotPassword: '/forgot-password',
    ResetPassword: '/reset-password',
 };


const login = (payload: string, signal: AbortSignal) => {
    return Api.post(ENPOINTS.Login, payload, signal)

}
const register = (payload: string, signal: AbortSignal) => {
    return Api.post(ENPOINTS.Register, payload, signal)
}

const logout = (payload: string, signal: AbortSignal) => {
    return Api.post(ENPOINTS.Logout, payload, signal)
}

const forgotPassword = (payload: string, signal: AbortSignal) => {
    return Api.post(ENPOINTS.ForgotPassword, payload, signal)
}

const resetPasword = (payload: string, signal: AbortSignal) => {
    return Api.post(ENPOINTS.ResetPassword, payload, signal)
}


export const AuthService = {
    login,
    logout,
    register,
    forgotPassword,
    resetPasword,
}