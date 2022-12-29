import {Coupon} from 'models/coupon';

export interface CouponState {
    coupons: Coupon[];
    isLoading: boolean;
    error?: string;
}
