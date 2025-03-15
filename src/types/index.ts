
export interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  expiresAt: string;
}

export interface CouponClaimResponse {
  coupon: Coupon;
  message: string;
}

export interface ErrorResponse {
  message: string;
  status?: number;
}

export type CouponStatus = 'initial' | 'loading' | 'success' | 'cooldown' | 'error';
