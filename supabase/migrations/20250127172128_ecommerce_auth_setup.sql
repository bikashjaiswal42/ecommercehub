-- Location: supabase/migrations/20250127172128_ecommerce_auth_setup.sql
-- Schema Analysis: Fresh e-commerce authentication implementation
-- Integration Type: Complete authentication module with user profiles
-- Dependencies: auth.users (Supabase managed)

-- 1. Types and Core Tables
CREATE TYPE public.user_role AS ENUM ('customer', 'admin', 'manager');
CREATE TYPE public.account_status AS ENUM ('active', 'suspended', 'pending_verification');

-- Critical intermediary table for e-commerce user profiles
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'customer'::public.user_role,
    status public.account_status DEFAULT 'pending_verification'::public.account_status,
    phone TEXT,
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- E-commerce specific tables
CREATE TABLE public.customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'shipping', -- shipping, billing
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'US',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.customer_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    preferred_currency TEXT DEFAULT 'USD',
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
CREATE INDEX idx_customer_addresses_user_id ON public.customer_addresses(user_id);
CREATE INDEX idx_customer_preferences_user_id ON public.customer_preferences(user_id);

-- 3. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_preferences ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies - Using Pattern 1 for user_profiles (core user table)
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for related tables
CREATE POLICY "users_manage_own_addresses"
ON public.customer_addresses
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_preferences"
ON public.customer_preferences
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin access using auth metadata
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

-- Admin access policies
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 5. Functions for automatic profile creation and email verification
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Create user profile
    INSERT INTO public.user_profiles (id, email, full_name, role, email_verified)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role,
        COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
    );
    
    -- Create default preferences
    INSERT INTO public.customer_preferences (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$;

-- Function to handle email verification updates
CREATE OR REPLACE FUNCTION public.handle_email_verification()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Update email verification status and account status
    UPDATE public.user_profiles 
    SET 
        email_verified = (NEW.email_confirmed_at IS NOT NULL),
        status = CASE 
            WHEN NEW.email_confirmed_at IS NOT NULL THEN 'active'::public.account_status 
            ELSE status 
        END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$;

-- Triggers for automatic user management
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_email_verification();

-- 6. Mock Data for Testing
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    customer_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@ecommercehub.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (customer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'customer@ecommercehub.com', crypt('customer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Customer", "role": "customer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Add sample addresses for customer
    INSERT INTO public.customer_addresses (user_id, type, street_address, city, state, postal_code, country, is_default)
    VALUES 
        (customer_uuid, 'shipping', '123 Main Street', 'New York', 'NY', '10001', 'US', true),
        (customer_uuid, 'billing', '456 Oak Avenue', 'New York', 'NY', '10002', 'US', false);

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Sample users already exist, skipping creation';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating sample data: %', SQLERRM;
END $$;