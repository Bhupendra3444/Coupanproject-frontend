
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import CouponInterface from '@/components/CouponInterface';
import Instructions from '@/components/Instructions';
import CouponList from '@/components/CouponList';

const Index = () => {
  return (
    <CookiesProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">Discount Dash</h1>
            <p className="text-xl text-gray-600">Claim exclusive discount coupons for your next purchase!</p>
          </header>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <CouponInterface />
              </div>
              <div className="md:col-span-1">
                <Instructions />
              </div>
            </div>
            
            <div className="mt-12">
              <CouponList />
            </div>
          </div>
          
          <footer className="mt-16 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Discount Dash. All rights reserved.</p>
            <p className="mt-2">This is a demo application. No real coupons are issued.</p>
          </footer>
        </div>
      </div>
    </CookiesProvider>
  );
};

export default Index;
