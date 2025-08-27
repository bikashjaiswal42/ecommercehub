import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentSection = ({ isActive, onComplete, paymentData, setPaymentData }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: 'Smartphone',
      description: 'Pay using UPI ID or QR code'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'Wallet',
      description: 'PayPal, Apple Pay, Google Pay'
    }
  ];

  const validateCardForm = () => {
    const newErrors = {};
    
    if (!paymentData?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (paymentData?.cardNumber?.replace(/\s/g, '')?.length < 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!paymentData?.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/?.test(paymentData?.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format';
    }
    
    if (!paymentData?.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentData?.cvv?.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    if (!paymentData?.cardholderName?.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\D/g, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value?.replace(/\D/g, '')?.substring(0, 4);
    }
    
    setPaymentData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = async () => {
    if (selectedMethod === 'card' && !validateCardForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  if (!isActive) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Payment Method</h3>
              <p className="text-sm text-muted-foreground">
                {selectedMethod === 'card' ? `****${paymentData?.cardNumber?.slice(-4)}` : 
                 selectedMethod === 'upi' ? 'UPI Payment' : 'Digital Wallet'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onComplete(false)}>
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="CreditCard" size={16} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
      </div>
      {/* Payment Method Selection */}
      <div className="space-y-4 mb-6">
        {paymentMethods?.map((method) => (
          <div
            key={method?.id}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedMethod === method?.id 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }
            `}
            onClick={() => setSelectedMethod(method?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={method?.icon} size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{method?.name}</p>
                  <p className="text-sm text-muted-foreground">{method?.description}</p>
                </div>
              </div>
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedMethod === method?.id 
                  ? 'border-primary bg-primary' :'border-border'
                }
              `}>
                {selectedMethod === method?.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Card Payment Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4 border-t border-border pt-6">
          <Input
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={paymentData?.cardNumber || ''}
            onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
            error={errors?.cardNumber}
            maxLength={19}
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Expiry Date"
              type="text"
              placeholder="MM/YY"
              value={paymentData?.expiryDate || ''}
              onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
              error={errors?.expiryDate}
              maxLength={5}
              required
            />
            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={paymentData?.cvv || ''}
              onChange={(e) => handleInputChange('cvv', e?.target?.value)}
              error={errors?.cvv}
              maxLength={4}
              required
            />
          </div>

          <Input
            label="Cardholder Name"
            type="text"
            placeholder="Enter name on card"
            value={paymentData?.cardholderName || ''}
            onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
            error={errors?.cardholderName}
            required
          />

          <Checkbox
            label="Save this card for future purchases"
            checked={paymentData?.saveCard || false}
            onChange={(e) => setPaymentData(prev => ({ ...prev, saveCard: e?.target?.checked }))}
          />
        </div>
      )}
      {/* UPI Payment */}
      {selectedMethod === 'upi' && (
        <div className="border-t border-border pt-6">
          <Input
            label="UPI ID"
            type="text"
            placeholder="yourname@upi"
            value={paymentData?.upiId || ''}
            onChange={(e) => setPaymentData(prev => ({ ...prev, upiId: e?.target?.value }))}
          />
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Or scan QR code with your UPI app
            </p>
            <div className="w-32 h-32 bg-background border-2 border-dashed border-border rounded-lg mx-auto mt-3 flex items-center justify-center">
              <Icon name="QrCode" size={48} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
      {/* Digital Wallet */}
      {selectedMethod === 'wallet' && (
        <div className="border-t border-border pt-6">
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="h-12">
              <Icon name="Wallet" size={20} className="mr-2" />
              PayPal
            </Button>
            <Button variant="outline" className="h-12">
              <Icon name="Smartphone" size={20} className="mr-2" />
              Apple Pay
            </Button>
            <Button variant="outline" className="h-12">
              <Icon name="Wallet" size={20} className="mr-2" />
              Google Pay
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleContinue} 
          loading={isProcessing}
          iconName="ArrowRight" 
          iconPosition="right"
        >
          {isProcessing ? 'Processing...' : 'Continue to Review'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentSection;