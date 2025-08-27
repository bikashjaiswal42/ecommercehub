import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CartSummary = ({ cartData, onApplyPromoCode }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = async (e) => {
    e?.preventDefault();
    if (!promoCode?.trim()) return;

    setPromoLoading(true);
    setPromoError('');
    setPromoSuccess('');

    // Simulate API call
    setTimeout(() => {
      const validCodes = ['SAVE10', 'WELCOME20', 'FIRST15'];
      if (validCodes?.includes(promoCode?.toUpperCase())) {
        const discount = promoCode?.toUpperCase() === 'WELCOME20' ? 0.20 : 
                        promoCode?.toUpperCase() === 'FIRST15' ? 0.15 : 0.10;
        onApplyPromoCode(promoCode?.toUpperCase(), discount);
        setPromoSuccess(`Promo code applied! ${Math.round(discount * 100)}% discount`);
      } else {
        setPromoError('Invalid promo code. Try SAVE10, WELCOME20, or FIRST15');
      }
      setPromoLoading(false);
    }, 1000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const handleCheckout = () => {
    // Check if all items are in stock
    const outOfStockItems = cartData?.items?.filter(item => !item?.inStock);
    if (outOfStockItems?.length > 0) {
      alert('Please remove out of stock items before proceeding to checkout.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
      <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({cartData?.totalItems} items)
          </span>
          <span className="text-foreground">{formatPrice(cartData?.subtotal)}</span>
        </div>

        {cartData?.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">
              Discount ({cartData?.promoCode})
            </span>
            <span className="text-success">-{formatPrice(cartData?.discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="text-foreground">{formatPrice(cartData?.tax)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {cartData?.shipping === 0 ? 'FREE' : formatPrice(cartData?.shipping)}
          </span>
        </div>

        {cartData?.shipping === 0 && (
          <div className="flex items-center gap-1 text-xs text-success">
            <Icon name="Check" size={12} />
            <span>Free shipping on orders over $50</span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-semibold text-base">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{formatPrice(cartData?.total)}</span>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      <div className="mb-6">
        <form onSubmit={handleApplyPromo} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value)}
              className="flex-1"
              disabled={promoLoading}
            />
            <Button
              type="submit"
              variant="outline"
              size="sm"
              loading={promoLoading}
              disabled={!promoCode?.trim() || promoLoading}
            >
              Apply
            </Button>
          </div>
          
          {promoError && (
            <div className="flex items-center gap-1 text-xs text-error">
              <Icon name="AlertCircle" size={12} />
              <span>{promoError}</span>
            </div>
          )}
          
          {promoSuccess && (
            <div className="flex items-center gap-1 text-xs text-success">
              <Icon name="CheckCircle" size={12} />
              <span>{promoSuccess}</span>
            </div>
          )}
        </form>
      </div>
      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="w-full mb-4"
        size="lg"
        disabled={cartData?.items?.length === 0 || cartData?.items?.some(item => !item?.inStock)}
      >
        <Icon name="CreditCard" size={18} className="mr-2" />
        Proceed to Checkout
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Secure 256-bit SSL encryption</span>
      </div>
      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-2">We accept</p>
        <div className="flex justify-center gap-2">
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="CreditCard" size={12} />
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">PP</span>
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">GP</span>
          </div>
        </div>
      </div>
      {/* Estimated Delivery */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Truck" size={16} className="text-primary" />
          <div>
            <p className="font-medium text-foreground">Estimated Delivery</p>
            <p className="text-xs text-muted-foreground">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })} - {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;