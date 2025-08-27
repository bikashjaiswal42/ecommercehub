import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import SecurityBadges from './components/SecurityBadges';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect if already authenticated
    if (!loading && user) {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/product-catalog';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sign In - EcommerceHub | Secure Login</title>
        <meta name="description" content="Sign in to your EcommerceHub account. Access your orders, wishlist, and enjoy personalized shopping experience with secure authentication." />
        <meta name="keywords" content="login, sign in, ecommerce, account, secure, authentication" />
        <meta property="og:title" content="Sign In - EcommerceHub" />
        <meta property="og:description" content="Sign in to your EcommerceHub account for personalized shopping experience." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Breadcrumb */}
        <div className="pt-20 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">Sign In</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Left Column - Welcome Content */}
                <div className="hidden lg:block">
                  <div className="sticky top-24">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-foreground mb-4">
                        Welcome to EcommerceHub
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        Discover thousands of products from trusted sellers worldwide. 
                        Sign in to access your personalized shopping experience.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="ShoppingBag" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Personalized Shopping</h3>
                          <p className="text-muted-foreground">
                            Get product recommendations based on your preferences and shopping history.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Truck" size={24} className="text-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                          <p className="text-muted-foreground">
                            Track your orders in real-time and enjoy fast, reliable delivery options.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Heart" size={24} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Wishlist &amp; Favorites</h3>
                          <p className="text-muted-foreground">
                            Save your favorite items and get notified about price drops and availability.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="CreditCard" size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Secure Payments</h3>
                          <p className="text-muted-foreground">
                            Multiple payment options with bank-level security and fraud protection.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 pt-8 border-t border-border">
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                          <div className="text-sm text-muted-foreground">Happy Customers</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-success mb-1">10K+</div>
                          <div className="text-sm text-muted-foreground">Products</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent mb-1">99.9%</div>
                          <div className="text-sm text-muted-foreground">Uptime</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Login Form */}
                <div className="w-full">
                  <LoginForm />
                  <div className="mt-8">
                    <SocialLogin />
                  </div>
                  <SecurityBadges />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-6 mb-4">
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy Policy
                </Link>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Support
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} EcommerceHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;