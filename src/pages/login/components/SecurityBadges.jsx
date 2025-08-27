import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Multi-factor authentication available'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-foreground mb-2">Your Security Matters</h3>
        <p className="text-xs text-muted-foreground">
          We use industry-standard security measures to protect your account
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name={feature?.icon} size={18} className="text-green-600" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">{feature?.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-green-600" />
          <span className="text-xs text-muted-foreground">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-blue-600" />
          <span className="text-xs text-muted-foreground">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-purple-600" />
          <span className="text-xs text-muted-foreground">Fast &amp; Reliable</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;