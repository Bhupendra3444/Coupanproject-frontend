
import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-reveal mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
            <span className="text-blue-600 font-bold">1</span>
          </div>
          <p className="text-gray-700">Click the "Claim Coupon" button to receive a random discount coupon.</p>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
            <span className="text-blue-600 font-bold">2</span>
          </div>
          <p className="text-gray-700">Use the coupon code during checkout to apply your discount.</p>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
            <span className="text-blue-600 font-bold">3</span>
          </div>
          <p className="text-gray-700">After claiming a coupon, you need to wait for the cooldown period before claiming another one.</p>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
            <span className="text-blue-600 font-bold">4</span>
          </div>
          <p className="text-gray-700">Coupons expire, so make sure to use them before their expiration date!</p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
