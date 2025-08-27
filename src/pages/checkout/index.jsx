import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutHeader from './components/CheckoutHeader';
import StepIndicator from './components/StepIndicator';
import GuestCheckoutOption from './components/GuestCheckoutOption';
import ShippingSection from './components/ShippingSection';
import PaymentSection from './components/PaymentSection';
import ReviewSection from './components/ReviewSection';
import OrderSummary from './components/OrderSummary';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false,
    upiId: ''
  });

  // Add cart items and totals state for OrderSummary
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });

  const steps = [
    { id: 'shipping', title: 'Shipping' },
    { id: 'payment', title: 'Payment' },
    { id: 'review', title: 'Review' }
  ];

  useEffect(() => {
    // Check authentication status
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
    
    // Check if cart is empty and load cart data
    const cartItemsData = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItemsData?.length === 0) {
      navigate('/shopping-cart');
    } else {
      setCartItems(cartItemsData);
      // Calculate totals based on cart items
      const subtotal = cartItemsData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = 15.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;
      
      setTotals({
        subtotal,
        shipping,
        tax,
        total
      });
    }
  }, [navigate]);

  const handleGuestContinue = (email) => {
    setGuestEmail(email);
    setCurrentStep(0);
  };

  const handleStepComplete = (stepIndex, goBack = false) => {
    if (goBack) {
      setCurrentStep(stepIndex);
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      
      // Create order data
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        email: guestEmail || 'user@example.com',
        shipping: shippingData,
        payment: paymentData,
        total: 339.96,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toISOString()
      };
      
      // Store order for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Redirect to success page (would be order confirmation page)
      navigate('/product-catalog?orderSuccess=true');
      
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Show guest checkout option if not authenticated
  if (!isAuthenticated && !guestEmail) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <GuestCheckoutOption onGuestContinue={handleGuestContinue} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />
      
      <div className="pt-16">
        <StepIndicator currentStep={currentStep} steps={steps} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Section */}
                <ShippingSection
                  isActive={currentStep === 0}
                  onComplete={(goBack) => handleStepComplete(0, goBack)}
                  shippingData={shippingData}
                  setShippingData={setShippingData}
                />

                {/* Payment Section */}
                <PaymentSection
                  isActive={currentStep === 1}
                  onComplete={(goBack) => handleStepComplete(1, goBack)}
                  paymentData={paymentData}
                  setPaymentData={setPaymentData}
                />

                {/* Review Section */}
                <ReviewSection
                  isActive={currentStep === 2}
                  shippingData={shippingData}
                  paymentData={paymentData}
                  onPlaceOrder={handlePlaceOrder}
                  isProcessing={isProcessing}
                />
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary items={cartItems} totals={totals} isSticky={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-lg border border-border p-8 text-center max-w-sm mx-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Processing Your Order</h3>
            <p className="text-sm text-muted-foreground">
              Please don't close this window. We're securely processing your payment and creating your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;