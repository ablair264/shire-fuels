-- =====================================================
-- SHIRE FUELS - SAMPLE DATA
-- =====================================================
-- This file contains sample data for testing the Shire Fuels admin dashboard
-- Run this AFTER setting up the schema (supabase-schema.sql)
-- =====================================================

-- =====================================================
-- ENQUIRIES - 5 Sample Entries
-- =====================================================
INSERT INTO enquiries (name, email, phone, postcode, service, status, notes, source) VALUES
  ('John Smith', 'john.smith@example.com', '01594 123456', 'GL16 8BE', 'heating-oil', 'new', 'Need 500L heating oil delivery next week for farmhouse', 'website'),
  ('Sarah Johnson', 'sarah.johnson@farmmail.com', '01594 789012', 'GL15 6HN', 'red-diesel', 'contacted', 'Farm requires regular red diesel deliveries - approx 1000L monthly', 'phone'),
  ('Mike Brown', 'mike.brown@logistics.com', '01594 345678', 'GL16 7JK', 'fuel-cards', 'converted', 'Fleet of 8 vehicles - interested in fuel card scheme', 'email'),
  ('Emma Wilson', 'emma.w@example.com', '01594 901234', 'GL14 2AB', 'oil-tanks', 'contacted', 'Looking for 1200L bunded tank installation quote', 'website'),
  ('David Taylor', 'david.taylor@example.com', '01594 567890', 'GL17 0CD', 'heating-oil', 'new', 'First time customer - needs advice on tank sizing and delivery schedule', 'website');

-- =====================================================
-- CUSTOMERS - 5 Sample Entries
-- =====================================================
INSERT INTO customers (
  name, email, phone,
  address_line1, address_line2, city, county, postcode,
  latitude, longitude,
  customer_type, company_name, vat_number,
  preferred_delivery_time, access_instructions,
  is_active, credit_limit, notes
) VALUES
  (
    'Robert Williams', 'robert.williams@example.com', '01594 234567',
    '12 Oak Tree Lane', NULL, 'Coleford', 'Gloucestershire', 'GL16 8BE',
    51.7950, -2.6150,
    'residential', NULL, NULL,
    'Morning (8AM-12PM)', 'Gate code: 1234. Tank is around the back of the house.',
    true, NULL, 'Regular customer since 2020. Prefers morning deliveries.'
  ),
  (
    'Jennifer Clarke', 'jen.clarke@greenfarm.co.uk', '01594 345123',
    'Green Farm', 'Clearwell Road', 'Coleford', 'Gloucestershire', 'GL16 7NP',
    51.8100, -2.5900,
    'farm', 'Green Farm Ltd', 'GB123456789',
    'Afternoon (1PM-5PM)', 'Large farm entrance. Tank located in main yard.',
    true, 5000.00, 'High volume customer. Monthly red diesel deliveries.'
  ),
  (
    'Thomas Anderson', 'thomas@andersonhaulage.com', '01594 456789',
    'Anderson Haulage Depot', 'Industrial Estate', 'Cinderford', 'Gloucestershire', 'GL14 2PQ',
    51.8228, -2.5001,
    'commercial', 'Anderson Haulage Ltd', 'GB987654321',
    'Any time', 'Main depot - 24/7 access. Multiple storage tanks.',
    true, 10000.00, 'Large commercial account. Weekly bulk deliveries.'
  ),
  (
    'Patricia Morgan', 'pat.morgan@example.com', '01594 567234',
    '45 Church Street', 'Lydney', 'Lydney', 'Gloucestershire', 'GL15 5DZ',
    51.7280, -2.5330,
    'residential', NULL, NULL,
    'Morning (8AM-12PM)', 'Narrow lane access. Please call before delivery.',
    true, NULL, 'Seasonal customer. Increased usage in winter months.'
  ),
  (
    'Michael Hughes', 'mike@hughesbuilders.co.uk', '01594 678345',
    'Hughes Builders Yard', 'Station Road', 'Cinderford', 'Gloucestershire', 'GL14 3BN',
    51.8200, -2.4950,
    'commercial', 'Hughes Builders Ltd', 'GB555444333',
    'Afternoon (1PM-5PM)', 'Builders yard. Tank at rear of site.',
    true, 3000.00, 'Construction company. Regular red diesel for machinery.'
  );

-- =====================================================
-- INVOICES - 5 Sample Entries
-- =====================================================
-- Note: These will auto-generate invoice numbers via trigger
INSERT INTO invoices (
  customer_id,
  issue_date, due_date,
  subtotal, tax_amount, total_amount, amount_paid,
  status, payment_method, payment_date, payment_reference, notes
) VALUES
  (
    (SELECT id FROM customers WHERE email = 'robert.williams@example.com'),
    '2025-01-10', '2025-02-10',
    425.00, 85.00, 510.00, 510.00,
    'paid', 'Bank Transfer', '2025-01-15', 'BACS-20250115-001', NULL
  ),
  (
    (SELECT id FROM customers WHERE email = 'jen.clarke@greenfarm.co.uk'),
    '2025-01-15', '2025-02-15',
    850.00, 170.00, 1020.00, 1020.00,
    'paid', 'Direct Debit', '2025-01-20', 'DD-20250120-002', NULL
  ),
  (
    (SELECT id FROM customers WHERE email = 'thomas@andersonhaulage.com'),
    '2025-01-20', '2025-02-20',
    2400.00, 480.00, 2880.00, 0.00,
    'pending', NULL, NULL, NULL, 'Monthly account - due end of month'
  ),
  (
    (SELECT id FROM customers WHERE email = 'pat.morgan@example.com'),
    '2024-12-15', '2025-01-15',
    600.00, 120.00, 720.00, 720.00,
    'paid', 'Card Payment', '2024-12-20', 'CARD-20241220-003', NULL
  ),
  (
    (SELECT id FROM customers WHERE email = 'mike@hughesbuilders.co.uk'),
    '2025-01-05', '2025-02-05',
    1200.00, 240.00, 1440.00, 0.00,
    'overdue', NULL, NULL, NULL, 'Payment reminder sent'
  );

-- =====================================================
-- DELIVERIES - 5 Sample Entries
-- =====================================================
INSERT INTO deliveries (
  customer_id, customer_name,
  address_line1, address_line2, city, county, postcode,
  latitude, longitude,
  delivery_date, delivery_time_slot,
  product, quantity_litres, price_per_litre, total_price,
  status, driver_name, vehicle_registration,
  phone, email,
  delivery_notes, access_notes,
  invoice_id,
  distance_from_warehouse, route_order
) VALUES
  (
    (SELECT id FROM customers WHERE email = 'robert.williams@example.com'),
    'Robert Williams',
    '12 Oak Tree Lane', NULL, 'Coleford', 'Gloucestershire', 'GL16 8BE',
    51.7950, -2.6150,
    '2025-01-10', '09:00 - 09:30',
    'heating-oil', 500, 0.85, 425.00,
    'completed', 'Dave Mitchell', 'SF25 ABC',
    '01594 234567', 'robert.williams@example.com',
    'Delivered successfully. Tank filled to 80% capacity.', 'Gate code: 1234',
    (SELECT id FROM invoices WHERE customer_id = (SELECT id FROM customers WHERE email = 'robert.williams@example.com')),
    4.5, 1
  ),
  (
    (SELECT id FROM customers WHERE email = 'jen.clarke@greenfarm.co.uk'),
    'Jennifer Clarke - Green Farm',
    'Green Farm', 'Clearwell Road', 'Coleford', 'Gloucestershire', 'GL16 7NP',
    51.8100, -2.5900,
    '2025-01-15', '14:00 - 14:30',
    'red-diesel', 1000, 0.85, 850.00,
    'completed', 'Steve Baker', 'SF25 XYZ',
    '01594 345123', 'jen.clarke@greenfarm.co.uk',
    'Farm tank filled. Customer requested monthly schedule.', 'Large farm entrance',
    (SELECT id FROM invoices WHERE customer_id = (SELECT id FROM customers WHERE email = 'jen.clarke@greenfarm.co.uk')),
    5.2, 2
  ),
  (
    (SELECT id FROM customers WHERE email = 'thomas@andersonhaulage.com'),
    'Thomas Anderson - Anderson Haulage',
    'Anderson Haulage Depot', 'Industrial Estate', 'Cinderford', 'Gloucestershire', 'GL14 2PQ',
    51.8228, -2.5001,
    '2025-01-22', '10:00 - 10:30',
    'red-diesel', 3000, 0.80, 2400.00,
    'scheduled', 'Dave Mitchell', 'SF25 ABC',
    '01594 456789', 'thomas@andersonhaulage.com',
    'Bulk delivery to main storage tank.', '24/7 access available',
    (SELECT id FROM invoices WHERE customer_id = (SELECT id FROM customers WHERE email = 'thomas@andersonhaulage.com')),
    2.1, 1
  ),
  (
    (SELECT id FROM customers WHERE email = 'pat.morgan@example.com'),
    'Patricia Morgan',
    '45 Church Street', 'Lydney', 'Lydney', 'Gloucestershire', 'GL15 5DZ',
    51.7280, -2.5330,
    '2024-12-15', '09:30 - 10:00',
    'heating-oil', 700, 0.857, 600.00,
    'completed', 'Steve Baker', 'SF25 XYZ',
    '01594 567234', 'pat.morgan@example.com',
    'Delivered. Customer very happy with service.', 'Narrow lane - careful approach',
    (SELECT id FROM invoices WHERE customer_id = (SELECT id FROM customers WHERE email = 'pat.morgan@example.com')),
    6.8, 3
  ),
  (
    (SELECT id FROM customers WHERE email = 'mike@hughesbuilders.co.uk'),
    'Michael Hughes - Hughes Builders',
    'Hughes Builders Yard', 'Station Road', 'Cinderford', 'Gloucestershire', 'GL14 3BN',
    51.8200, -2.4950,
    '2025-01-05', '15:00 - 15:30',
    'red-diesel', 1500, 0.80, 1200.00,
    'completed', 'Dave Mitchell', 'SF25 ABC',
    '01594 678345', 'mike@hughesbuilders.co.uk',
    'Delivered to builders yard. Tank at rear.', 'Access via main gate',
    (SELECT id FROM invoices WHERE customer_id = (SELECT id FROM customers WHERE email = 'mike@hughesbuilders.co.uk')),
    2.3, 2
  );

-- =====================================================
-- OIL TANKS - 5 Sample Entries
-- =====================================================
INSERT INTO oil_tanks (
  customer_id,
  tank_type, capacity_litres, installation_date,
  location_description, latitude, longitude,
  last_inspection_date, next_inspection_date,
  status, notes
) VALUES
  (
    (SELECT id FROM customers WHERE email = 'robert.williams@example.com'),
    'bunded', 1200, '2020-03-15',
    'Rear garden, adjacent to house', 51.7950, -2.6150,
    '2024-03-15', '2025-03-15',
    'active', 'Annual inspection due March 2025. Tank in good condition.'
  ),
  (
    (SELECT id FROM customers WHERE email = 'jen.clarke@greenfarm.co.uk'),
    'bunded', 2500, '2018-06-20',
    'Main farm yard, next to machinery shed', 51.8100, -2.5900,
    '2024-06-20', '2025-06-20',
    'active', 'Large capacity tank for farm operations. Regular heavy usage.'
  ),
  (
    (SELECT id FROM customers WHERE email = 'thomas@andersonhaulage.com'),
    'steel', 5000, '2015-01-10',
    'Main depot storage area', 51.8228, -2.5001,
    '2024-07-10', '2025-07-10',
    'active', 'Commercial grade steel tank. Monthly inspections by on-site team.'
  ),
  (
    (SELECT id FROM customers WHERE email = 'pat.morgan@example.com'),
    'bunded', 1000, '2019-11-05',
    'Side of property, accessible from driveway', 51.7280, -2.5330,
    '2024-11-05', '2025-11-05',
    'active', 'Standard residential installation. Good access for deliveries.'
  ),
  (
    (SELECT id FROM customers WHERE email = 'mike@hughesbuilders.co.uk'),
    'bunded', 2000, '2021-02-28',
    'Rear of builders yard', 51.8200, -2.4950,
    '2024-02-28', '2025-02-28',
    'active', 'Used for machinery fuel. Tank under regular monitoring.'
  );

-- =====================================================
-- OIL TANK PRODUCTS - 5 Sample Entries
-- =====================================================
INSERT INTO oil_tank_products (
  name, model, volume, weight,
  dimensions, footprint, features,
  is_active, display_order, image_url
) VALUES
  (
    '1235 Litre Slimline Bunded Oil Tank',
    'Deso SL1250BT',
    '1235ltr',
    '155.000kg',
    '{"length": "2000mm", "width": "650mm", "height": "1660mm"}'::jsonb,
    '1860mm x 600mm',
    ARRAY['Slimline design', 'Perfect for tight spaces', 'Bunded for safety', 'OFTEC approved'],
    true,
    1,
    NULL
  ),
  (
    '1230 Litre Bunded Oil Tank',
    'Deso V1230BT',
    '1230ltr',
    '96.000kg',
    '{"height": "1600mm", "diameter": "1250mm"}'::jsonb,
    'Diameter: 1230mm',
    ARRAY['Compact vertical design', 'Space-efficient', 'Fully bunded', 'Weather resistant'],
    true,
    2,
    NULL
  ),
  (
    '1800 Litre Bunded Oil Tank',
    'Deso H1800BT',
    '1800ltr',
    '155.000kg',
    '{"length": "2110mm", "width": "1350mm", "height": "1599mm"}'::jsonb,
    '1710mm x 1201mm',
    ARRAY['Large capacity', 'Ideal for high usage', 'Double-walled protection', 'Durable construction'],
    true,
    3,
    NULL
  ),
  (
    '2350 Litre Bunded AdBlue Dispensing Tank',
    'Deso AdBlue 2350',
    '2300ltr',
    '180.000kg',
    '{"height": "1850mm", "diameter": "1700mm"}'::jsonb,
    'Diameter: 1700mm',
    ARRAY['AdBlue dispensing system', 'Commercial grade', 'ISO 22241 compliant', 'Built-in pump option'],
    true,
    4,
    NULL
  ),
  (
    '650 Litre Compact Bunded Tank',
    'Deso C650BT',
    '650ltr',
    '85.000kg',
    '{"length": "1450mm", "width": "750mm", "height": "1300mm"}'::jsonb,
    '1450mm x 750mm',
    ARRAY['Perfect for small properties', 'Easy installation', 'Fully compliant', 'Low profile design'],
    true,
    5,
    NULL
  );

-- =====================================================
-- END OF SAMPLE DATA
-- =====================================================
-- All sample data has been inserted successfully
-- You can now test the admin dashboard with this data
-- =====================================================
