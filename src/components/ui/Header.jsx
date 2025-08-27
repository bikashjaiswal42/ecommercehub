import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate cart count from localStorage or state management
    const savedCartCount = localStorage.getItem('cartCount') || '0';
    setCartCount(parseInt(savedCartCount));
    
    // Check authentication status
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/product-catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        document.getElementById('mobile-search')?.focus();
      }, 100);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setShowUserMenu(false);
    navigate('/login');
  };

  const isCheckoutPage = location?.pathname === '/checkout';
  const isAuthPage = ['/login', '/register']?.includes(location?.pathname);

  if (isCheckoutPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">EcommerceHub</span>
          </Link>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="ShoppingBag" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground hidden sm:block">EcommerceHub</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </form>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchExpanded && (
          <div className="md:hidden fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex items-center p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
                className="mr-3"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <Input
                  id="mobile-search"
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </form>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Navigation Links - Desktop Only */}
          {!isAuthPage && (
            <nav className="hidden lg:flex items-center space-x-1 mr-4">
              <Link to="/product-catalog">
                <Button 
                  variant={location?.pathname === '/product-catalog' ? 'secondary' : 'ghost'}
                  size="sm"
                >
                  Products
                </Button>
              </Link>
            </nav>
          )}

          {/* Shopping Cart */}
          {!isAuthPage && (
            <Link to="/shopping-cart">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* Authentication */}
          {isAuthenticated ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative"
              >
                <Icon name="User" size={20} />
              </Button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated py-2">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">My Account</p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="Package" size={16} className="mr-3" />
                    Orders
                  </Link>
                  <div className="border-t border-border mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              to="/product-catalog"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button 
                variant={location?.pathname === '/product-catalog' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Icon name="Grid3X3" size={18} className="mr-3" />
                Products
              </Button>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="User" size={18} className="mr-3" />
                    Profile
                  </Button>
                </Link>
                <Link 
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="Package" size={18} className="mr-3" />
                    Orders
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="w-full justify-start text-error"
                >
                  <Icon name="LogOut" size={18} className="mr-3" />
                  Sign Out
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;