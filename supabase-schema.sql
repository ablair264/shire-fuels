-- =====================================================
-- SHIRE FUELS - SUPABASE DATABASE SCHEMA
-- =====================================================
-- This file contains all table schemas for the Shire Fuels admin dashboard
-- Run this in your Supabase SQL Editor to set up the database
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENQUIRIES TABLE
-- =====================================================
-- Stores customer enquiries from the contact form and manual entries
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Customer Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  postcode VARCHAR(20) NOT NULL,

  -- Service Information
  service VARCHAR(50) NOT NULL CHECK (service IN ('heating-oil', 'red-diesel', 'fuel-cards', 'oil-tanks', 'other')),
  notes TEXT,

  -- Status Tracking
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),

  -- Metadata
  source VARCHAR(20) DEFAULT 'website' CHECK (source IN ('website', 'manual', 'phone', 'email')),
  assigned_to UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ
);

-- Create indexes for better query performance
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_email ON enquiries(email);
CREATE INDEX idx_enquiries_service ON enquiries(service);

-- Trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to set contacted_at when status changes to 'contacted'
CREATE OR REPLACE FUNCTION set_contacted_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'contacted' AND OLD.status != 'contacted' THEN
    NEW.contacted_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_enquiries_contacted_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION set_contacted_at();

-- Trigger to set converted_at when status changes to 'converted'
CREATE OR REPLACE FUNCTION set_converted_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'converted' AND OLD.status != 'converted' THEN
    NEW.converted_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_enquiries_converted_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION set_converted_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all enquiries
CREATE POLICY "Allow authenticated users to read enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert enquiries
CREATE POLICY "Allow authenticated users to insert enquiries"
  ON enquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update enquiries
CREATE POLICY "Allow authenticated users to update enquiries"
  ON enquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow public (anonymous) users to insert enquiries (from contact form)
CREATE POLICY "Allow public to insert enquiries"
  ON enquiries
  FOR INSERT
  TO anon
  WITH CHECK (source = 'website');

-- =====================================================
-- CUSTOMERS TABLE (EXPANDED)
-- =====================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,

  -- Address
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  county VARCHAR(100),
  postcode VARCHAR(20) NOT NULL,

  -- Geolocation (for mapping)
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Customer Type
  customer_type VARCHAR(20) DEFAULT 'residential' CHECK (customer_type IN ('residential', 'farm', 'commercial')),

  -- Business Information (for commercial/farm)
  company_name VARCHAR(255),
  vat_number VARCHAR(50),

  -- Preferences
  preferred_delivery_time VARCHAR(50),
  access_instructions TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,
  credit_limit DECIMAL(10, 2),

  -- Metadata
  created_from_enquiry UUID REFERENCES enquiries(id),
  notes TEXT,

  -- Statistics (denormalized for performance)
  total_deliveries INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  last_delivery_date DATE,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_postcode ON customers(postcode);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_customers_type ON customers(customer_type);
CREATE INDEX idx_customers_location ON customers(latitude, longitude);
CREATE INDEX idx_customers_active ON customers(is_active);

-- Trigger for updated_at
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- INVOICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Invoice Number (human-readable)
  invoice_number VARCHAR(50) UNIQUE NOT NULL,

  -- Customer Reference
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,

  -- Invoice Details
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,

  -- Amounts
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0,

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'paid', 'overdue', 'cancelled')),

  -- Payment Details
  payment_method VARCHAR(50),
  payment_date DATE,
  payment_reference VARCHAR(100),

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate invoice numbers automatically
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL THEN
    NEW.invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('invoice_number_seq')::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

CREATE TRIGGER generate_invoice_number_trigger
  BEFORE INSERT ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION generate_invoice_number();

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to invoices"
  ON invoices
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- DELIVERIES TABLE (EXPANDED)
-- =====================================================
CREATE TABLE IF NOT EXISTS deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Customer Reference (can be null for one-off deliveries)
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,

  -- Delivery Address (stored here for historical accuracy)
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  county VARCHAR(100),
  postcode VARCHAR(20) NOT NULL,

  -- Geolocation for route optimization
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Delivery Date & Time
  delivery_date DATE NOT NULL,
  delivery_time_slot VARCHAR(50), -- Format: "09:00 - 09:30"

  -- Product Details
  product VARCHAR(50) NOT NULL CHECK (product IN ('heating-oil', 'red-diesel')),
  quantity_litres INTEGER NOT NULL,
  price_per_litre DECIMAL(10, 4),
  total_price DECIMAL(10, 2),

  -- Delivery Status
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')),

  -- Driver and Vehicle Assignment
  driver_name VARCHAR(255),
  driver_id UUID REFERENCES auth.users(id),
  vehicle_registration VARCHAR(20),

  -- Contact Information (for delivery day)
  phone VARCHAR(50),
  email VARCHAR(255),

  -- Notes
  delivery_notes TEXT,
  access_notes TEXT,

  -- Invoice Reference
  invoice_id UUID REFERENCES invoices(id),

  -- Route Optimization Data
  estimated_drive_time INTEGER, -- in minutes
  actual_drive_time INTEGER, -- in minutes
  distance_from_warehouse DECIMAL(10, 2), -- in miles
  route_order INTEGER, -- order in the daily route

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes for query performance
CREATE INDEX idx_deliveries_customer ON deliveries(customer_id);
CREATE INDEX idx_deliveries_date ON deliveries(delivery_date DESC);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_postcode ON deliveries(postcode);
CREATE INDEX idx_deliveries_date_status ON deliveries(delivery_date, status);
CREATE INDEX idx_deliveries_route_order ON deliveries(delivery_date, route_order);

-- Trigger to update updated_at
CREATE TRIGGER update_deliveries_updated_at
  BEFORE UPDATE ON deliveries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to set completed_at when status changes to completed
CREATE OR REPLACE FUNCTION set_delivery_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_deliveries_completed_at
  BEFORE UPDATE ON deliveries
  FOR EACH ROW
  EXECUTE FUNCTION set_delivery_completed_at();

-- Row Level Security
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to deliveries"
  ON deliveries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update customer statistics
CREATE OR REPLACE FUNCTION update_customer_statistics()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE customers
    SET
      total_deliveries = (
        SELECT COUNT(*)
        FROM deliveries
        WHERE customer_id = NEW.customer_id
        AND status = 'completed'
      ),
      total_spent = (
        SELECT COALESCE(SUM(total_price), 0)
        FROM deliveries
        WHERE customer_id = NEW.customer_id
        AND status = 'completed'
      ),
      last_delivery_date = (
        SELECT MAX(delivery_date)
        FROM deliveries
        WHERE customer_id = NEW.customer_id
        AND status = 'completed'
      )
    WHERE id = NEW.customer_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update customer stats when delivery is completed
CREATE TRIGGER update_customer_stats_on_delivery
  AFTER INSERT OR UPDATE ON deliveries
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION update_customer_statistics();

-- =====================================================
-- OIL TANKS TABLE (PLACEHOLDER - TO BE EXPANDED)
-- =====================================================
CREATE TABLE IF NOT EXISTS oil_tanks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Customer Reference
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,

  -- Tank Details
  tank_type VARCHAR(50) CHECK (tank_type IN ('bunded', 'single-skin', 'plastic', 'steel')),
  capacity_litres INTEGER,
  installation_date DATE,

  -- Location
  location_description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Maintenance
  last_inspection_date DATE,
  next_inspection_date DATE,

  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'decommissioned')),

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_oil_tanks_customer ON oil_tanks(customer_id);
CREATE INDEX idx_oil_tanks_next_inspection ON oil_tanks(next_inspection_date);

CREATE TRIGGER update_oil_tanks_updated_at
  BEFORE UPDATE ON oil_tanks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE oil_tanks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to oil_tanks"
  ON oil_tanks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =====================================================
-- Uncomment to insert sample enquiries for testing

-- INSERT INTO enquiries (name, email, phone, postcode, service, status, notes) VALUES
--   ('John Smith', 'john@example.com', '01594 123456', 'GL16 8BE', 'heating-oil', 'new', 'Need delivery next week'),
--   ('Sarah Johnson', 'sarah.j@example.com', '01594 789012', 'GL15 6HN', 'red-diesel', 'contacted', 'Farm delivery required'),
--   ('Mike Brown', 'mike.brown@example.com', '01594 345678', 'GL16 7JK', 'fuel-cards', 'converted', 'Fleet of 5 vehicles'),
--   ('Emma Wilson', 'emma.w@example.com', '01594 901234', 'GL14 2AB', 'oil-tanks', 'new', 'Tank installation quote needed'),
--   ('David Taylor', 'david.taylor@example.com', '01594 567890', 'GL17 0CD', 'heating-oil', 'contacted', 'Regular customer - 500L monthly');

-- =====================================================
-- OIL TANK PRODUCTS TABLE
-- =====================================================
-- Stores oil tank products displayed on the customer-facing website
CREATE TABLE IF NOT EXISTS oil_tank_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Product Information
  name VARCHAR(255) NOT NULL,
  model VARCHAR(100) NOT NULL,
  volume VARCHAR(50) NOT NULL,
  weight VARCHAR(50) NOT NULL,
  footprint VARCHAR(100) NOT NULL,

  -- Dimensions (stored as JSONB for flexibility)
  dimensions JSONB DEFAULT '{}',
  -- Example: {"length": "2000mm", "width": "650mm", "height": "1660mm"}
  -- or: {"height": "1600mm", "diameter": "1250mm"}

  -- Features (array of text)
  features TEXT[] DEFAULT '{}',

  -- Image
  image_url TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Display Order
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_oil_tank_products_active ON oil_tank_products(is_active);
CREATE INDEX idx_oil_tank_products_display_order ON oil_tank_products(display_order);

CREATE TRIGGER update_oil_tank_products_updated_at
  BEFORE UPDATE ON oil_tank_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE oil_tank_products ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous) read access to active products
CREATE POLICY "Allow public to read active oil tank products"
  ON oil_tank_products
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated users full access to oil tank products"
  ON oil_tank_products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- SAMPLE OIL TANK PRODUCTS (OPTIONAL - FOR TESTING)
-- =====================================================
-- Uncomment to insert sample oil tank products

-- INSERT INTO oil_tank_products (name, model, volume, weight, dimensions, footprint, features) VALUES
--   ('1235 Litre Slimline Bunded Oil Tank', 'Deso SL1250BT', '1235ltr', '155.000kg',
--    '{"length": "2000mm", "width": "650mm", "height": "1660mm"}'::jsonb, '1860mm x 600mm',
--    ARRAY['Slimline design', 'Perfect for tight spaces', 'Bunded for safety', 'OFTEC approved']),
--
--   ('1230 Litre Bunded Oil Tank', 'Deso V1230BT', '1230ltr', '96.000kg',
--    '{"height": "1600mm", "diameter": "1250mm"}'::jsonb, 'Diameter: 1230mm',
--    ARRAY['Compact vertical design', 'Space-efficient', 'Fully bunded', 'Weather resistant']),
--
--   ('1800 Litre Bunded Oil Tank', 'Deso H1800BT', '1800ltr', '155.000kg',
--    '{"length": "2110mm", "width": "1350mm", "height": "1599mm"}'::jsonb, '1710mm x 1201mm',
--    ARRAY['Large capacity', 'Ideal for high usage', 'Double-walled protection', 'Durable construction']),
--
--   ('2350 Litre Bunded AdBlue Dispensing Tank', 'Deso', '2300ltr', '180.000kg',
--    '{"height": "1850mm", "diameter": "1700mm"}'::jsonb, 'Diameter: 1700mm',
--    ARRAY['AdBlue dispensing system', 'Commercial grade', 'ISO 22241 compliant', 'Built-in pump option']);

-- =====================================================
-- END OF SCHEMA
-- =====================================================
