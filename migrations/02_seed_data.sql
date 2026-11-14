-- UP Web Tech --- Business Management Platform
-- Migration 02: Initial Seed Data for Demo & Testing

-- 1. Insert Users (Admin, 3 Workers, 3 Clients)
INSERT INTO users (id, email, password_hash, full_name, phone, role, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'admin@upwebtech.com', 'admin_hash_2026', 'UP Web Tech Admin', '+91 9876543210', 'SUPER_ADMIN', 'ACTIVE'),
  ('w0000000-0000-0000-0000-000000000001', 'rahul@upwebtech.com', 'worker_hash_2026', 'Rahul Sharma', '+91 9876543211', 'WORKER', 'ACTIVE'),
  ('w0000000-0000-0000-0000-000000000002', 'priya@upwebtech.com', 'worker_hash_2026', 'Priya Patel', '+91 9876543212', 'WORKER', 'ACTIVE'),
  ('w0000000-0000-0000-0000-000000000003', 'amit@upwebtech.com', 'worker_hash_2026', 'Amit Verma', '+91 9876543213', 'WORKER', 'ACTIVE'),
  ('c0000000-0000-0000-0000-000000000001', 'vikram@apolloretail.in', 'client_hash_2026', 'Vikram Malhotra', '+91 9876543220', 'CLIENT', 'ACTIVE'),
  ('c0000000-0000-0000-0000-000000000002', 'sneha@nexalogistics.com', 'client_hash_2026', 'Sneha Reddy', '+91 9876543221', 'CLIENT', 'ACTIVE'),
  ('c0000000-0000-0000-0000-000000000003', 'rohit@zenithhospitality.com', 'client_hash_2026', 'Rohit Khanna', '+91 9876543222', 'CLIENT', 'ACTIVE')
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Workers
INSERT INTO workers (id, user_id, employee_code, designation, skills, phone, email, status, joining_date) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'w0000000-0000-0000-0000-000000000001', 'EMP-001', 'Lead Full-Stack Developer', ARRAY['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'], '+91 9876543211', 'rahul@upwebtech.com', 'ACTIVE', '2026-01-15'),
  ('b0000000-0000-0000-0000-000000000002', 'w0000000-0000-0000-0000-000000000002', 'EMP-002', 'Senior UI/UX Designer & Frontend', ARRAY['Figma', 'UI/UX', 'Tailwind CSS', 'Responsive Design'], '+91 9876543212', 'priya@upwebtech.com', 'ACTIVE', '2026-02-01'),
  ('b0000000-0000-0000-0000-000000000003', 'w0000000-0000-0000-0000-000000000003', 'EMP-003', 'Backend & Cloud DevOps Engineer', ARRAY['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Security'], '+91 9876543213', 'amit@upwebtech.com', 'ACTIVE', '2026-02-15')
ON CONFLICT (employee_code) DO NOTHING;

-- 3. Insert Clients
INSERT INTO clients (id, user_id, company_name, contact_name, email, phone, city, state, country, status) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Apollo Retail Mart', 'Vikram Malhotra', 'vikram@apolloretail.in', '+91 9876543220', 'Lucknow', 'Uttar Pradesh', 'India', 'ACTIVE'),
  ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Nexa Logistics Solutions', 'Sneha Reddy', 'sneha@nexalogistics.com', '+91 9876543221', 'Noida', 'Uttar Pradesh', 'India', 'ACTIVE'),
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'Zenith Grand Hotel', 'Rohit Khanna', 'rohit@zenithhospitality.com', '+91 9876543222', 'Varanasi', 'Uttar Pradesh', 'India', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- 4. Insert Services
INSERT INTO services (id, name, description, base_price, estimated_days, status) VALUES
  ('s0000000-0000-0000-0000-000000000001', 'E-commerce Website', 'Full-featured online store with payment gateway, inventory and admin dashboard', 65000.00, 21, 'ACTIVE'),
  ('s0000000-0000-0000-0000-000000000002', 'Corporate Business Portal', 'Modern multi-page corporate website with high SEO ranking and CMS', 35000.00, 14, 'ACTIVE'),
  ('s0000000-0000-0000-0000-000000000003', 'Custom Web Application', 'Scalable Next.js & PostgreSQL web app with authentication and role access', 90000.00, 30, 'ACTIVE'),
  ('s0000000-0000-0000-0000-000000000004', 'High-Converting Landing Page', 'Performance optimized landing page with lead capture form and analytics', 18000.00, 7, 'ACTIVE'),
  ('s0000000-0000-0000-0000-000000000005', 'Website Maintenance & SEO', 'Monthly security updates, speed optimization, and search rankings', 12000.00, 30, 'ACTIVE')
ON CONFLICT DO NOTHING;

-- 5. Insert Projects
INSERT INTO projects (id, project_code, client_id, service_id, name, description, assigned_worker_id, status, priority, start_date, deadline, estimated_budget, final_price, website_url, staging_url) VALUES
  ('p0000000-0000-0000-0000-000000000001', 'PRJ-2026-001', 'd0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 'Apollo Supermarket Online Store', 'Omnichannel e-commerce web platform with Razorpay checkout and WhatsApp orders', 'b0000000-0000-0000-0000-000000000001', 'DEVELOPMENT', 'HIGH', '2026-10-15', '2026-11-30', 65000.00, 68000.00, 'https://apolloretail.in', 'https://staging.apolloretail.upwebtech.com'),
  ('p0000000-0000-0000-0000-000000000002', 'PRJ-2026-002', 'd0000000-0000-0000-0000-000000000002', 's0000000-0000-0000-0000-000000000003', 'Nexa Fleet Tracking Dashboard', 'Real-time GPS parcel and freight monitoring SaaS portal', 'b0000000-0000-0000-0000-000000000003', 'CLIENT_REVIEW', 'HIGH', '2026-09-20', '2026-11-20', 95000.00, 95000.00, 'https://nexalogistics.com', 'https://nexa-stage.upwebtech.com'),
  ('p0000000-0000-0000-0000-000000000003', 'PRJ-2026-003', 'd0000000-0000-0000-0000-000000000003', 's0000000-0000-0000-0000-000000000002', 'Zenith Grand Luxury Resort Website', 'Interactive 360 room booking and luxury banquet reservation site', 'b0000000-0000-0000-0000-000000000002', 'DESIGN', 'MEDIUM', '2026-11-01', '2026-12-15', 45000.00, 45000.00, 'https://zenithgrand.com', 'https://zenith-preview.upwebtech.com'),
  ('p0000000-0000-0000-0000-000000000004', 'PRJ-2026-004', 'd0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000004', 'Apollo Festive Flash Sale Page', 'Dedicated high-traffic Diwali & New Year promotion landing page', 'b0000000-0000-0000-0000-000000000001', 'COMPLETED', 'URGENT', '2026-10-01', '2026-10-20', 20000.00, 20000.00, 'https://sale.apolloretail.in', 'https://apollo-sale.upwebtech.com'),
  ('p0000000-0000-0000-0000-000000000005', 'PRJ-2026-005', 'd0000000-0000-0000-0000-000000000002', 's0000000-0000-0000-0000-000000000005', 'Nexa Logistics SEO Optimization', 'Comprehensive technical SEO and speed audit to rank #1 in North India', 'b0000000-0000-0000-0000-000000000003', 'IN_PROGRESS', 'MEDIUM', '2026-11-05', '2026-12-05', 15000.00, 15000.00, 'https://nexalogistics.com', NULL)
ON CONFLICT DO NOTHING;

-- 6. Insert Tasks
INSERT INTO tasks (id, project_id, assigned_worker_id, title, description, priority, status, deadline) VALUES
  ('t0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Integrate Razorpay Payment Gateway', 'Setup UPI, Cards, and NetBanking checkout flow with webhooks', 'HIGH', 'IN_PROGRESS', '2026-11-18'),
  ('t0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'Design Mobile Responsive Product Card & Filter', 'Create smooth mobile UX for filtering grocery categories', 'MEDIUM', 'DONE', '2026-11-10'),
  ('t0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003', 'Build Live WebSocket Telemetry Route', 'Connect GPS sensor feed to interactive map dashboard', 'HIGH', 'IN_REVIEW', '2026-11-15'),
  ('t0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'Figma Mockup for Luxury Suite Gallery', 'Design visual hero banner and photo gallery with booking CTA', 'HIGH', 'IN_PROGRESS', '2026-11-22'),
  ('t0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Setup Automated Invoice PDF Generation', 'Generate GST compliant invoices on successful orders', 'MEDIUM', 'TODO', '2026-11-25'),
  ('t0000000-0000-0000-0000-000000000006', 'p0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'Color Palette & Typography System', 'Present 3 brand theme variants for luxury hospitality client', 'MEDIUM', 'DONE', '2026-11-08'),
  ('t0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'PostgreSQL Query Optimization for Truck Routes', 'Add spatial indexing for fast geo-radius searches', 'HIGH', 'DONE', '2026-11-12'),
  ('t0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Deploy Landing Page to Cloudflare Pages', 'Configure custom domain sale.apolloretail.in with SSL', 'URGENT', 'DONE', '2026-10-18'),
  ('t0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000003', 'Fix Core Web Vitals on Nexa Homepage', 'Compress LCP hero image and reduce unused JavaScript', 'MEDIUM', 'IN_PROGRESS', '2026-11-20'),
  ('t0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Database Schema for Room Availability', 'Create tables for seasonal rates, room categories, and booking dates', 'HIGH', 'TODO', '2026-11-28')
ON CONFLICT DO NOTHING;

-- 7. Insert Invoices & Payments
INSERT INTO invoices (id, project_id, client_id, invoice_number, subtotal, discount, tax, total, due_date, status) VALUES
  ('i0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'INV-2026-001', 34000.00, 0.00, 6120.00, 40120.00, '2026-10-25', 'PAID'),
  ('i0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'INV-2026-002', 34000.00, 0.00, 6120.00, 40120.00, '2026-11-30', 'SENT'),
  ('i0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'INV-2026-003', 50000.00, 2000.00, 8640.00, 56640.00, '2026-10-10', 'PAID'),
  ('i0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'INV-2026-004', 20000.00, 0.00, 3600.00, 23600.00, '2026-10-20', 'PAID')
ON CONFLICT DO NOTHING;

INSERT INTO payments (id, invoice_id, amount, payment_method, transaction_reference, payment_date, status) VALUES
  ('m0000000-0000-0000-0000-000000000001', 'i0000000-0000-0000-0000-000000000001', 40120.00, 'Bank Transfer (NEFT)', 'NEFT-SBIN261015092', '2026-10-24', 'COMPLETED'),
  ('m0000000-0000-0000-0000-000000000002', 'i0000000-0000-0000-0000-000000000003', 56640.00, 'UPI Business', 'UPI-9876543221@icici', '2026-10-08', 'COMPLETED'),
  ('m0000000-0000-0000-0000-000000000003', 'i0000000-0000-0000-0000-000000000004', 23600.00, 'Razorpay Payment', 'pay_Ox8923NskL2026', '2026-10-19', 'COMPLETED')
ON CONFLICT DO NOTHING;

-- 8. Insert Project Expenses
INSERT INTO expenses (id, project_id, category, description, amount, expense_date, created_by) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'Infrastructure', 'Cloud VPS & PostgreSQL Database Hosting (6 Mo)', 4500.00, '2026-10-16', 'a0000000-0000-0000-0000-000000000001'),
  ('e0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'Third-Party API', 'WhatsApp Business Messaging Credits Pack', 2200.00, '2026-10-20', 'a0000000-0000-0000-0000-000000000001'),
  ('e0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', 'Maps API', 'Google Maps Geocoding & Route Matrix API key budget', 3800.00, '2026-09-25', 'a0000000-0000-0000-0000-000000000001'),
  ('e0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000003', 'Domain & SSL', 'Premium luxury domain purchase zenithgrand.com', 1200.00, '2026-11-02', 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;
