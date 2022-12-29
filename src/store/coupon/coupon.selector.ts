import {RootState} from '../reducer.config';

const getCoupons = (state: RootState) => state.coupon.coupons;
const getError = (state: RootState) => state.coupon.error;
const isLoading = (state: RootState) => state.coupon.isLoading;

export const couponSelector = {
    getCoupons,
    getError,
    isLoading
}
