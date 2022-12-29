import {createAsyncThunk} from '@reduxjs/toolkit';
import {utility} from 'utils/utility';
import {couponService} from 'api/coupon.service';
import {RequestGenerateCouponDto} from 'models/coupon';

export const enum COUPON_ACTION {
    FETCH_ALL_COUPON = 'FETCH_ALL_COUPON',
    CREATE_COUPON = 'CREATE_COUPON',
    DELETE_BY_ID = 'DELETE_COUPON_BY_ID',
}

const fetchAllCoupon = createAsyncThunk(COUPON_ACTION.FETCH_ALL_COUPON, async () => {
    try {
        const response = await couponService.getAll();
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

const createCoupon = createAsyncThunk(COUPON_ACTION.CREATE_COUPON, async (dto: RequestGenerateCouponDto) => {
    try {
        const response = await couponService.create(dto);
        return response.data;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

const deleteById = createAsyncThunk(COUPON_ACTION.DELETE_BY_ID, async (id: number) => {
    try {
        await couponService.deleteById(id);
        return id;
    } catch (e) {
        const msg = utility.getErrorMessage(e);
        throw new Error(msg);
    }
});

export const couponAction = {
    fetchAllCoupon,
    createCoupon,
    deleteById
}