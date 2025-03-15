
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { claimCoupon } from '@/services/api';
import CountdownTimer from './CountdownTimer';
import { Coupon, CouponStatus } from '@/types';

const COOLDOWN_MINUTES = 60; // 15 minute cooldown between coupon claims

const CouponInterface: React.FC = () => {
  const [cookies, setCookie] = useCookies(['couponClaimed']);
  const [status, setStatus] = useState<CouponStatus>('initial');
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [message, setMessage] = useState<string>('');
  const [cooldownEnd, setCooldownEnd] = useState<Date | null>(null);

  useEffect(() => {
    // Check cookie on component mount
    if (cookies.couponClaimed) {
      try {
        const claimedData = JSON.parse(cookies.couponClaimed);
        const endTime = new Date(claimedData.cooldownEnd);
        
        // If cooldown is still active
        if (endTime > new Date()) {
          setCooldownEnd(endTime);
          setStatus('cooldown');
          if (claimedData.coupon) {
            setCoupon(claimedData.coupon);
            setMessage(`You've claimed a coupon! Next coupon available later.`);
          }
        }
      } catch (err) {
        console.error('Error parsing coupon cookie:', err);
      }
    }
  }, [cookies.couponClaimed]);

  const handleClaim = async () => {
    if (status === 'loading' || status === 'cooldown') return;
    
    setStatus('loading');
    setMessage('Claiming your coupon...');
    
    try {
      const response = await claimCoupon();
      setCoupon(response.coupon);
      setMessage(response.message || 'You successfully claimed a coupon!');
      setStatus('success');
      
      // Set cooldown
      const endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + COOLDOWN_MINUTES);
      setCooldownEnd(endTime);
      
      // Save to cookie
      setCookie('couponClaimed', JSON.stringify({
        coupon: response.coupon,
        cooldownEnd: endTime.toISOString()
      }), {
        path: '/',
        maxAge: COOLDOWN_MINUTES * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // After 3 seconds, switch to cooldown state to show timer
      setTimeout(() => {
        setStatus('cooldown');
      }, 3000);
      
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Failed to claim coupon. Please try again.');
      
      // If it's a rate limit error (429)
      if (error.status === 429) {
        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + COOLDOWN_MINUTES);
        setCooldownEnd(endTime);
        
        setTimeout(() => {
          setStatus('cooldown');
        }, 3000);
      }
    }
  };

  const handleCooldownComplete = () => {
    setStatus('initial');
    setCooldownEnd(null);
    setMessage('');
  };

  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error animate-shake';
      case 'cooldown':
        return 'cooldown';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`coupon-display w-full max-w-md mb-6 ${getStatusClasses()}`}>
        <div className="text-center">
          {status === 'initial' && (
            <p className="status-message">Claim a coupon to get exclusive discounts!</p>
          )}
          
          {status === 'loading' && (
            <p className="status-message">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {message}
            </p>
          )}
          
          {(status === 'success' || status === 'cooldown') && coupon && (
            <div className="animate-reveal">
              <p className={`status-message ${status}`}>{message}</p>
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{coupon.discount}</h3>
                <p className="font-mono bg-gray-100 p-2 rounded text-lg mb-2">{coupon.code}</p>
                <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                <p className="text-xs text-gray-500">
                  Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <p className="status-message error">{message}</p>
          )}
          
          {status === 'cooldown' && cooldownEnd && (
            <CountdownTimer 
              targetDate={cooldownEnd} 
              onComplete={handleCooldownComplete} 
            />
          )}
        </div>
      </div>
      
      <button
        onClick={handleClaim}
        disabled={status === 'loading' || status === 'cooldown'}
        className={`coupon-button ${status === 'cooldown' || status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-scale'}`}
      >
        {status === 'cooldown' ? 'On Cooldown' : 'Claim Coupon'}
      </button>
    </div>
  );
};

export default CouponInterface;
