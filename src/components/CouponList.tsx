
import React from 'react';
import { Coupon } from '@/types';

const STATIC_COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'SUMMER25',
    discount: '25% OFF',
    description: 'Summer season discount on all products',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
  },
  {
    id: '2',
    code: 'FREESHIP',
    discount: 'FREE SHIPPING',
    description: 'Free shipping on orders over $50',
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days from now
  },
  {
    id: '3',
    code: 'FLASH10',
    discount: '10% OFF',
    description: 'Flash sale discount on selected items',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  },
  {
    id: '4',
    code: 'NEW15',
    discount: '15% OFF',
    description: 'Discount for new customers',
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days from now
  }
];

const CouponList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-reveal">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Coupons</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {STATIC_COUPONS.map((coupon) => (
          <div key={coupon.id} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow duration-200">
            <div className="bg-gray-50 p-2 mb-2 rounded flex justify-between items-center">
              <span className="font-mono font-bold text-blue-600">{coupon.code}</span>
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{coupon.discount}</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">{coupon.description}</p>
            <p className="text-gray-500 text-xs">
              Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponList;
