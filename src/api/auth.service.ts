import axios, {AxiosResponse} from 'axios';
import {RequestLoginDto, RequestSignupDto, ResponseLoginDto} from 'models/utente';

const login = (dto: RequestLoginDto): Promise<AxiosResponse<ResponseLoginDto>> => {
    return axios.post("/auth/login", dto);
}

const signup = (dto: RequestSignupDto): Promise<AxiosResponse<RequestSignupDto>> => {
    return axios.post("/auth/signup", dto);
}

export const authService = {
    login,
    signup
}