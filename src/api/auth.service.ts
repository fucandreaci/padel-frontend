import axios, {AxiosResponse} from 'axios';
import {RequestLoginDto, RequestSignupDto, ResponseLoginDto} from 'models/utente';
import {tokenUtils} from 'utils/token.utils';

const login = (dto: RequestLoginDto): Promise<AxiosResponse<ResponseLoginDto>> => {
    return axios.post("/auth/login", dto);
}

const signup = (dto: RequestSignupDto): Promise<AxiosResponse<RequestSignupDto>> => {
    return axios.post("/auth/signup", dto);
}

const checkUser = (): Promise<AxiosResponse<boolean>> => {
    return axios.post("/auth/isValidUser", {}, tokenUtils.getHeader());
}

const checkAdmin = (): Promise<AxiosResponse<boolean>> => {
    return axios.post("/auth/isValidAdmin", {}, tokenUtils.getHeader());
}

export const authService = {
    login,
    signup,
    checkUser,
    checkAdmin
}