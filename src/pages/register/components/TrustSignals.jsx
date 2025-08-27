import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: "Shield",
      title: "Secure Registration",
      description: "Your data is protected with industry-standard encryption"
    },
    {
      icon: "Lock",
      title: "Privacy Protected",
      description: "We never share your personal information with third parties"
    },
    {
      icon: "CheckCircle",
      title: "Verified Platform",
      description: "Trusted by thousands of customers worldwide"
    },
    {
      icon: "CreditCard",
      title: "Secure Payments",
      description: "All transactions are processed through encrypted channels"
    }
  ];

  const securityBadges = [
    {
      name: "SSL Secured",
      icon: "Shield",
      color: "text-green-600"
    },
    {
      name: "GDPR Compliant",
      icon: "FileCheck",
      color: "text-blue-600"
    },
    {
      name: "PCI DSS",
      icon: "CreditCard",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <Icon name={feature?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">{feature?.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="bg-muted/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Your Security is Our Priority
          </h3>
          <p className="text-muted-foreground">
            EcommerceHub is certified and compliant with industry security standards
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {securityBadges?.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2 bg-card px-4 py-2 rounded-lg border border-border">
              <Icon name={badge?.icon} size={18} className={badge?.color} />
              <span className="text-sm font-medium text-foreground">{badge?.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            All customer data is encrypted and stored securely. We comply with international privacy regulations.
          </p>
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            name: "Sarah Johnson",
            role: "Verified Customer",
            comment: "Quick and secure registration process. Love the platform!",
            rating: 5
          },
          {
            name: "Michael Chen",
            role: "Verified Customer", 
            comment: "Easy to sign up and great customer service support.",
            rating: 5
          },
          {
            name: "Emma Davis",
            role: "Verified Customer",
            comment: "Trustworthy platform with excellent security measures.",
            rating: 5
          }
        ]?.map((testimonial, index) => (
          <div key={index} className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center mb-2">
              {[...Array(testimonial?.rating)]?.map((_, i) => (
                <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3 italic">
              "{testimonial?.comment}"
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{testimonial?.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial?.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;