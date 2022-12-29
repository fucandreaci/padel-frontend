import axios, {AxiosResponse} from 'axios';
import {tokenUtils} from 'utils/token.utils';
import {Coupon, RequestGenerateCouponDto, ResponseCouponDto} from 'models/coupon';

const getAll = (): Promise<AxiosResponse<ResponseCouponDto[]>> => {
    return axios.get("/coupon", tokenUtils.getHeader());
}

const create = (dto: RequestGenerateCouponDto): Promise<AxiosResponse<ResponseCouponDto>> => {
    return axios.post("/coupon", dto, tokenUtils.getHeader());
}

const deleteById = (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete(`/coupon/${id}`, tokenUtils.getHeader());
}


export const couponService = {
    getAll,
    create,
    deleteById
}
