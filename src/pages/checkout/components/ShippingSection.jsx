import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ShippingSection = ({ isActive, onComplete, shippingData, setShippingData }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [errors, setErrors] = useState({});

  const savedAddresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'CA', label: 'California' },
    { value: 'FL', label: 'Florida' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!shippingData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingData?.address?.trim()) newErrors.address = 'Address is required';
    if (!shippingData?.city?.trim()) newErrors.city = 'City is required';
    if (!shippingData?.state) newErrors.state = 'State is required';
    if (!shippingData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address?.id);
    setShippingData({
      firstName: address?.name?.split(' ')?.[0],
      lastName: address?.name?.split(' ')?.[1] || '',
      address: address?.address,
      city: address?.city,
      state: address?.state,
      zipCode: address?.zipCode,
      phone: address?.phone
    });
    setShowNewAddressForm(false);
  };

  const handleInputChange = (field, value) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      onComplete();
    }
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
              <h3 className="font-semibold text-foreground">Shipping Address</h3>
              <p className="text-sm text-muted-foreground">
                {shippingData?.firstName} {shippingData?.lastName}, {shippingData?.address}
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
          <Icon name="MapPin" size={16} color="white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Shipping Address</h3>
      </div>
      {/* Saved Addresses */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-foreground">Choose from saved addresses</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {savedAddresses?.map((address) => (
            <div
              key={address?.id}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${selectedAddress === address?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
              onClick={() => handleAddressSelect(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground">{address?.type}</span>
                    {address?.isDefault && (
                      <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground font-medium">{address?.name}</p>
                  <p className="text-sm text-muted-foreground">{address?.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {address?.city}, {address?.state} {address?.zipCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address?.phone}</p>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedAddress === address?.id 
                    ? 'border-primary bg-primary' :'border-border'
                  }
                `}>
                  {selectedAddress === address?.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* New Address Option */}
      <div className="border-t border-border pt-6">
        <Button
          variant="outline"
          onClick={() => {
            setShowNewAddressForm(!showNewAddressForm);
            setSelectedAddress(null);
          }}
          className="mb-4"
          iconName="Plus"
          iconPosition="left"
        >
          Add New Address
        </Button>

        {showNewAddressForm && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={shippingData?.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                error={errors?.firstName}
                required
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={shippingData?.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                error={errors?.lastName}
                required
              />
            </div>

            <Input
              label="Address"
              type="text"
              placeholder="Enter street address"
              value={shippingData?.address || ''}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              required
            />

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={shippingData?.city || ''}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                error={errors?.city}
                required
              />
              <Select
                label="State"
                placeholder="Select state"
                options={stateOptions}
                value={shippingData?.state || ''}
                onChange={(value) => handleInputChange('state', value)}
                error={errors?.state}
                required
              />
              <Input
                label="ZIP Code"
                type="text"
                placeholder="Enter ZIP code"
                value={shippingData?.zipCode || ''}
                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                error={errors?.zipCode}
                required
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter phone number"
              value={shippingData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={handleContinue} iconName="ArrowRight" iconPosition="right">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default ShippingSection;