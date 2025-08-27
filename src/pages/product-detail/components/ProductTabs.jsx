import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'List' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'returns', label: 'Returns', icon: 'RotateCcw' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product?.description}
            </p>
            {product?.features && (
              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-3">Features:</h4>
                <ul className="space-y-2">
                  {product?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            {product?.specifications && Object.entries(product?.specifications)?.map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                <span className="font-medium text-foreground capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Truck" size={20} className="text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Free Standard Shipping</h4>
                <p className="text-muted-foreground text-sm">
                  Free shipping on orders over $50. Delivery in 5-7 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Zap" size={20} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Express Shipping</h4>
                <p className="text-muted-foreground text-sm">
                  $9.99 for express delivery in 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={20} className="text-orange-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Same Day Delivery</h4>
                <p className="text-muted-foreground text-sm">
                  Available in select areas. Order before 2 PM for same-day delivery.
                </p>
              </div>
            </div>
          </div>
        );

      case 'returns':
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="RotateCcw" size={20} className="text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">30-Day Returns</h4>
                <p className="text-muted-foreground text-sm">
                  Return items within 30 days for a full refund. Items must be in original condition.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Warranty Coverage</h4>
                <p className="text-muted-foreground text-sm">
                  All products come with manufacturer warranty. Extended warranty available.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Headphones" size={20} className="text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Customer Support</h4>
                <p className="text-muted-foreground text-sm">
                  24/7 customer support for returns and exchanges. Contact us anytime.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Product information tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;