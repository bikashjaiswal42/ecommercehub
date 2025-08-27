import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GuestCheckoutOption = ({ onGuestContinue }) => {
  const [guestEmail, setGuestEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleGuestContinue = () => {
    if (!guestEmail?.trim()) {
      setEmailError('Email is required for order confirmation');
      return;
    }
    
    if (!validateEmail(guestEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    onGuestContinue(guestEmail);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Checkout</h2>
        <p className="text-muted-foreground">
          Complete your purchase quickly and securely
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Guest Checkout */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="User" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Guest Checkout</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Checkout quickly without creating an account. You'll receive order updates via email.
          </p>
          
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email for order confirmation"
            value={guestEmail}
            onChange={(e) => {
              setGuestEmail(e?.target?.value);
              if (emailError) setEmailError('');
            }}
            error={emailError}
            required
          />
          
          <Button 
            onClick={handleGuestContinue}
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue as Guest
          </Button>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>You can create an account after placing your order</span>
          </div>
        </div>

        {/* Account Login */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="LogIn" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Have an Account?</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Sign in to access saved addresses, payment methods, and order history.
          </p>
          
          <div className="space-y-3">
            <Link to="/login">
              <Button variant="outline" fullWidth iconName="LogIn" iconPosition="left">
                Sign In
              </Button>
            </Link>
            
            <Link to="/register">
              <Button variant="ghost" fullWidth iconName="UserPlus" iconPosition="left">
                Create Account
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-success">
            <Icon name="Check" size={14} />
            <span>Faster checkout with saved information</span>
          </div>
        </div>
      </div>
      {/* Benefits */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Why create an account?</h4>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-muted-foreground">Faster checkout</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-muted-foreground">Saved addresses</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={16} className="text-primary" />
            <span className="text-muted-foreground">Order tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutOption;