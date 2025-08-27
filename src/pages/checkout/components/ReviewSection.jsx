import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReviewSection = ({ 
  isActive, 
  shippingData, 
  paymentData, 
  onPlaceOrder,
  isProcessing 
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);

  const handlePlaceOrder = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    onPlaceOrder();
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Eye" size={16} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Review Your Order</h3>
      </div>
      {/* Shipping Information Review */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="MapPin" size={16} className="mr-2" />
          Shipping Address
        </h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="font-medium text-foreground">
            {shippingData?.firstName} {shippingData?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{shippingData?.address}</p>
          <p className="text-sm text-muted-foreground">
            {shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}
          </p>
          <p className="text-sm text-muted-foreground">{shippingData?.phone}</p>
        </div>
      </div>
      {/* Payment Information Review */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="CreditCard" size={16} className="mr-2" />
          Payment Method
        </h4>
        <div className="bg-muted/30 rounded-lg p-4">
          {paymentData?.cardNumber ? (
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">
                  Credit Card ending in {paymentData?.cardNumber?.slice(-4)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {paymentData?.cardholderName}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-muted-foreground" />
              <p className="font-medium text-foreground">UPI Payment</p>
            </div>
          )}
        </div>
      </div>
      {/* Delivery Information */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Truck" size={16} className="mr-2" />
          Delivery Information
        </h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Estimated Delivery</span>
            <span className="font-medium text-foreground">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delivery Method</span>
            <span className="font-medium text-foreground">Standard Shipping</span>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4 mb-6">
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button className="text-primary hover:underline">Terms and Conditions</button>
              {' '}and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </span>
          }
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          required
        />
        
        <Checkbox
          label="I would like to receive marketing emails about new products and offers"
          checked={agreedToMarketing}
          onChange={(e) => setAgreedToMarketing(e?.target?.checked)}
        />
      </div>
      {/* Security Notice */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h5 className="font-medium text-success mb-1">Secure Payment</h5>
            <p className="text-sm text-success/80">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
      {/* Place Order Button */}
      <Button
        onClick={handlePlaceOrder}
        disabled={!agreedToTerms || isProcessing}
        loading={isProcessing}
        fullWidth
        size="lg"
        className="mb-4"
        iconName="ShoppingBag"
        iconPosition="left"
      >
        {isProcessing ? 'Processing Your Order...' : 'Complete Order'}
      </Button>
      {/* Additional Security Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By placing this order, you agree to our terms and conditions.
          <br />
          Your order will be processed securely using 256-bit SSL encryption.
        </p>
      </div>
    </div>
  );
};

export default ReviewSection;