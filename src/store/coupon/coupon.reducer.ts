import {createReducer} from '@reduxjs/toolkit';
import {couponAction} from './coupon.action'
import {CouponState} from './types';

const initialState: CouponState = {
    coupons: [],
    isLoading: false,
};

export const couponReducer = {
    coupon: createReducer(initialState, (builder) => {
        builder.addCase(couponAction.fetchAllCoupon.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined,
            }
        });

        builder.addCase(couponAction.fetchAllCoupon.fulfilled, (state, action) => {
            return {
                ...state,
                coupons: action.payload,
                isLoading: false,
                error: undefined,
            }
        });

        builder.addCase(couponAction.fetchAllCoupon.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(couponAction.createCoupon.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined,
            }
        });

        builder.addCase(couponAction.createCoupon.fulfilled, (state, action) => {
            return {
                ...state,
                coupons: [...state.coupons, action.payload],
                isLoading: false,
                error: undefined,
            }
        });

        builder.addCase(couponAction.createCoupon.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });

        builder.addCase(couponAction.deleteById.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                error: undefined,
            }
        });

        builder.addCase(couponAction.deleteById.fulfilled, (state, action) => {
            return {
                ...state,
                coupons: state.coupons.filter(coupon => coupon.id !== action.payload),
                isLoading: false,
                error: undefined,
            }
        });

        builder.addCase(couponAction.deleteById.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.error.message,
            }
        });
    })
}
