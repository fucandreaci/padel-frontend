import {ResponseCouponDto} from 'models/coupon';

export interface CouponState {
    coupons: ResponseCouponDto[];
    isLoading: boolean;
    error?: string;
}
