import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - EcommerceHub</title>
        <meta name="description" content="Join EcommerceHub today. Create your account to access thousands of products with secure checkout and fast delivery." />
        <meta name="keywords" content="register, sign up, create account, ecommerce, online shopping" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Join EcommerceHub Today
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Create your account to access thousands of products, exclusive deals, and enjoy a seamless shopping experience with secure checkout and fast delivery.
                </p>
              </div>

              {/* Breadcrumb */}
              <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-primary transition-smooth">
                      Home
                    </a>
                  </li>
                  <li className="text-muted-foreground">/</li>
                  <li className="text-foreground font-medium">Create Account</li>
                </ol>
              </nav>
            </div>
          </section>

          {/* Registration Section */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Registration Form */}
                  <div className="order-2 lg:order-1">
                    <RegistrationForm />
                    
                    {/* Social Registration */}
                    <div className="mt-8">
                      <SocialRegistration />
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="order-1 lg:order-2">
                    <div className="lg:sticky lg:top-24">
                      <TrustSignals />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 lg:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Why Choose EcommerceHub?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of satisfied customers who trust us for their online shopping needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Free Shipping",
                    description: "Free delivery on orders over $50",
                    icon: "Truck"
                  },
                  {
                    title: "24/7 Support",
                    description: "Round-the-clock customer assistance",
                    icon: "Headphones"
                  },
                  {
                    title: "Easy Returns",
                    description: "30-day hassle-free return policy",
                    icon: "RotateCcw"
                  },
                  {
                    title: "Secure Payments",
                    description: "Multiple secure payment options",
                    icon: "CreditCard"
                  }
                ]?.map((benefit, index) => (
                  <div key={index} className="text-center p-6 bg-card rounded-lg border border-border">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit?.title}</h3>
                    <p className="text-muted-foreground">{benefit?.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="bg-primary rounded-2xl p-8 lg:p-12 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
                  Trusted by Customers Worldwide
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    { number: "50K+", label: "Happy Customers" },
                    { number: "100K+", label: "Products Sold" },
                    { number: "99.9%", label: "Uptime" },
                    { number: "4.8/5", label: "Customer Rating" }
                  ]?.map((stat, index) => (
                    <div key={index} className="text-white">
                      <div className="text-3xl lg:text-4xl font-bold mb-2">{stat?.number}</div>
                      <div className="text-white/80">{stat?.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-muted-foreground">
                © {new Date()?.getFullYear()} EcommerceHub. All rights reserved.
              </p>
              <div className="flex justify-center space-x-6 mt-4">
                <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
                <a href="/support" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;