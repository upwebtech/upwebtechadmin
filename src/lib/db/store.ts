'use client';

import {
  Client,
  Worker,
  Service,
  Project,
  Task,
  Invoice,
  Payment,
  Expense,
  ActivityLog,
  Notice,
  SprintLog,
  User,
  ProjectStatus,
  TaskStatus,
  TaskPriority,
} from '@/types';

// Initial Seed Data
const INITIAL_USERS: User[] = [
  {
    id: 'u-admin-1',
    email: 'admin@upwebtech.com',
    fullName: 'UP Web Tech Admin',
    phone: '+91 9876543210',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 'u-worker-1',
    email: 'rahul@upwebtech.com',
    fullName: 'Rahul Sharma',
    phone: '+91 9876543211',
    role: 'WORKER',
    status: 'ACTIVE',
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15',
  },
  {
    id: 'u-worker-2',
    email: 'priya@upwebtech.com',
    fullName: 'Priya Patel',
    phone: '+91 9876543212',
    role: 'WORKER',
    status: 'ACTIVE',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
  {
    id: 'u-worker-3',
    email: 'amit@upwebtech.com',
    fullName: 'Amit Verma',
    phone: '+91 9876543213',
    role: 'WORKER',
    status: 'ACTIVE',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-15',
  },
  {
    id: 'u-client-1',
    email: 'vikram@apolloretail.in',
    fullName: 'Vikram Malhotra',
    phone: '+91 9876543220',
    role: 'CLIENT',
    status: 'ACTIVE',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  },
  {
    id: 'u-client-2',
    email: 'sneha@nexalogistics.com',
    fullName: 'Sneha Reddy',
    phone: '+91 9876543221',
    role: 'CLIENT',
    status: 'ACTIVE',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-10',
  },
  {
    id: 'u-client-3',
    email: 'rohit@zenithhospitality.com',
    fullName: 'Rohit Khanna',
    phone: '+91 9876543222',
    role: 'CLIENT',
    status: 'ACTIVE',
    createdAt: '2026-04-01',
    updatedAt: '2026-04-01',
  },
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c-1',
    userId: 'u-client-1',
    companyName: 'Apollo Retail Mart',
    contactName: 'Vikram Malhotra',
    email: 'vikram@apolloretail.in',
    phone: '+91 9876543220',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    status: 'ACTIVE',
    notes: 'Premium retail chain with 12 stores in UP',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  },
  {
    id: 'c-2',
    userId: 'u-client-2',
    companyName: 'Nexa Logistics Solutions',
    contactName: 'Sneha Reddy',
    email: 'sneha@nexalogistics.com',
    phone: '+91 9876543221',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    status: 'ACTIVE',
    notes: 'Interstate transport logistics client',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-10',
  },
  {
    id: 'c-3',
    userId: 'u-client-3',
    companyName: 'Zenith Grand Luxury Hotel',
    contactName: 'Rohit Khanna',
    email: 'rohit@zenithhospitality.com',
    phone: '+91 9876543222',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    status: 'ACTIVE',
    notes: '5-star heritage hotel along the Ganges',
    createdAt: '2026-04-01',
    updatedAt: '2026-04-01',
  },
];

const INITIAL_WORKERS: Worker[] = [
  {
    id: 'w-1',
    userId: 'u-worker-1',
    fullName: 'Rahul Sharma',
    employeeCode: 'EMP-001',
    designation: 'Lead Full-Stack Developer',
    skills: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    phone: '+91 9876543211',
    email: 'rahul@upwebtech.com',
    status: 'ACTIVE',
    joiningDate: '2026-01-15',
    notes: 'Specializes in architecture and e-commerce web applications',
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15',
  },
  {
    id: 'w-2',
    userId: 'u-worker-2',
    fullName: 'Priya Patel',
    employeeCode: 'EMP-002',
    designation: 'Senior UI/UX Designer & Frontend',
    skills: ['Figma', 'UI/UX', 'Tailwind CSS', 'Responsive Design', 'Animation'],
    phone: '+91 9876543212',
    email: 'priya@upwebtech.com',
    status: 'ACTIVE',
    joiningDate: '2026-02-01',
    notes: 'Creates pixel-perfect, aesthetic interfaces and design systems',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
  {
    id: 'w-3',
    userId: 'u-worker-3',
    fullName: 'Amit Verma',
    employeeCode: 'EMP-003',
    designation: 'Backend & Cloud DevOps Engineer',
    skills: ['PostgreSQL', 'Docker', 'REST API', 'DevOps', 'Security'],
    phone: '+91 9876543213',
    email: 'amit@upwebtech.com',
    status: 'ACTIVE',
    joiningDate: '2026-02-15',
    notes: 'Maintains databases, server performance, and API scaling',
    createdAt: '2026-02-15',
    updatedAt: '2026-02-15',
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: 's-1',
    name: 'E-commerce Website',
    description: 'Custom e-commerce store with cart, Razorpay payment, and inventory manager',
    basePrice: 65000,
    estimatedDays: 21,
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 's-2',
    name: 'Corporate Business Website',
    description: 'High-conversion business portal with SEO and contact funnels',
    basePrice: 35000,
    estimatedDays: 14,
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 's-3',
    name: 'Custom Web Application',
    description: 'Bespoke Next.js & PostgreSQL software platform tailored to client processes',
    basePrice: 95000,
    estimatedDays: 30,
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 's-4',
    name: 'High-Converting Landing Page',
    description: 'Speed-optimized single-page website for ads and lead capture',
    basePrice: 18000,
    estimatedDays: 7,
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 's-5',
    name: 'Website Maintenance & SEO',
    description: 'Monthly security audits, speed boosts, and search engine ranking improvement',
    basePrice: 12000,
    estimatedDays: 30,
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p-1',
    projectCode: 'PRJ-2026-001',
    clientId: 'c-1',
    clientName: 'Apollo Retail Mart',
    serviceId: 's-1',
    serviceName: 'E-commerce Website',
    name: 'Apollo Supermarket Online Store',
    description: 'Omnichannel e-commerce web platform with Razorpay checkout and WhatsApp orders',
    assignedWorkerId: 'w-1',
    assignedWorkerName: 'Rahul Sharma',
    status: 'DEVELOPMENT',
    priority: 'HIGH',
    startDate: '2026-10-15',
    deadline: '2026-11-30',
    estimatedBudget: 65000,
    finalPrice: 68000,
    websiteUrl: 'https://apolloretail.in',
    stagingUrl: '/staging/apollo-retail',
    createdAt: '2026-10-15',
    updatedAt: '2026-11-14',
  },
  {
    id: 'p-2',
    projectCode: 'PRJ-2026-002',
    clientId: 'c-2',
    clientName: 'Nexa Logistics Solutions',
    serviceId: 's-3',
    serviceName: 'Custom Web Application',
    name: 'Nexa Fleet Tracking Dashboard',
    description: 'Real-time GPS parcel and freight monitoring SaaS portal',
    assignedWorkerId: 'w-3',
    assignedWorkerName: 'Amit Verma',
    status: 'CLIENT_REVIEW',
    priority: 'HIGH',
    startDate: '2026-09-20',
    deadline: '2026-11-20',
    estimatedBudget: 95000,
    finalPrice: 95000,
    websiteUrl: 'https://nexalogistics.com',
    stagingUrl: '/staging/nexa-logistics',
    createdAt: '2026-09-20',
    updatedAt: '2026-11-12',
  },
  {
    id: 'p-3',
    projectCode: 'PRJ-2026-003',
    clientId: 'c-3',
    clientName: 'Zenith Grand Luxury Hotel',
    serviceId: 's-2',
    serviceName: 'Corporate Business Website',
    name: 'Zenith Grand Luxury Resort Website',
    description: 'Interactive 360 room booking and luxury banquet reservation site',
    assignedWorkerId: 'w-2',
    assignedWorkerName: 'Priya Patel',
    status: 'DESIGN',
    priority: 'MEDIUM',
    startDate: '2026-11-01',
    deadline: '2026-12-15',
    estimatedBudget: 45000,
    finalPrice: 45000,
    websiteUrl: 'https://zenithgrand.com',
    stagingUrl: '/staging/zenith-hospitality',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-10',
  },
  {
    id: 'p-4',
    projectCode: 'PRJ-2026-004',
    clientId: 'c-1',
    clientName: 'Apollo Retail Mart',
    serviceId: 's-4',
    serviceName: 'High-Converting Landing Page',
    name: 'Apollo Festive Flash Sale Page',
    description: 'Dedicated high-traffic Diwali & New Year promotion landing page',
    assignedWorkerId: 'w-1',
    assignedWorkerName: 'Rahul Sharma',
    status: 'COMPLETED',
    priority: 'URGENT',
    startDate: '2026-10-01',
    deadline: '2026-10-20',
    estimatedBudget: 20000,
    finalPrice: 20000,
    websiteUrl: 'https://sale.apolloretail.in',
    completedAt: '2026-10-19',
    createdAt: '2026-10-01',
    updatedAt: '2026-10-19',
  },
  {
    id: 'p-5',
    projectCode: 'PRJ-2026-005',
    clientId: 'c-2',
    clientName: 'Nexa Logistics Solutions',
    serviceId: 's-5',
    serviceName: 'Website Maintenance & SEO',
    name: 'Nexa Logistics SEO Optimization',
    description: 'Comprehensive technical SEO and speed audit to rank #1 in North India',
    assignedWorkerId: 'w-3',
    assignedWorkerName: 'Amit Verma',
    status: 'DEVELOPMENT',
    priority: 'MEDIUM',
    startDate: '2026-11-05',
    deadline: '2026-12-05',
    estimatedBudget: 15000,
    finalPrice: 15000,
    createdAt: '2026-11-05',
    updatedAt: '2026-11-13',
  },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    projectId: 'p-1',
    projectTitle: 'Apollo Supermarket Online Store',
    assignedWorkerId: 'w-1',
    assignedWorkerName: 'Rahul Sharma',
    title: 'Integrate Razorpay Payment Gateway',
    description: 'Setup UPI, Cards, and NetBanking checkout flow with secure webhooks',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    deadline: '2026-11-18',
    createdAt: '2026-10-20',
    updatedAt: '2026-11-10',
  },
  {
    id: 't-2',
    projectId: 'p-1',
    projectTitle: 'Apollo Supermarket Online Store',
    assignedWorkerId: 'w-2',
    assignedWorkerName: 'Priya Patel',
    title: 'Design Mobile Responsive Product Card & Filter',
    description: 'Create smooth mobile UX for filtering grocery categories and cart drawer',
    priority: 'MEDIUM',
    status: 'DONE',
    deadline: '2026-11-10',
    completedAt: '2026-11-09',
    createdAt: '2026-10-22',
    updatedAt: '2026-11-09',
  },
  {
    id: 't-3',
    projectId: 'p-2',
    projectTitle: 'Nexa Fleet Tracking Dashboard',
    assignedWorkerId: 'w-3',
    assignedWorkerName: 'Amit Verma',
    title: 'Build Live WebSocket Telemetry Route',
    description: 'Connect GPS sensor feed to interactive map dashboard',
    priority: 'HIGH',
    status: 'IN_REVIEW',
    deadline: '2026-11-15',
    createdAt: '2026-10-15',
    updatedAt: '2026-11-13',
  },
  {
    id: 't-4',
    projectId: 'p-3',
    projectTitle: 'Zenith Grand Luxury Resort Website',
    assignedWorkerId: 'w-2',
    assignedWorkerName: 'Priya Patel',
    title: 'Figma Mockup for Luxury Suite Gallery',
    description: 'Design visual hero banner and photo gallery with booking CTA',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    deadline: '2026-11-22',
    createdAt: '2026-11-05',
    updatedAt: '2026-11-12',
  },
  {
    id: 't-5',
    projectId: 'p-1',
    projectTitle: 'Apollo Supermarket Online Store',
    assignedWorkerId: 'w-1',
    assignedWorkerName: 'Rahul Sharma',
    title: 'Setup Automated Invoice PDF Generation',
    description: 'Generate GST compliant invoices on successful orders',
    priority: 'MEDIUM',
    status: 'TODO',
    deadline: '2026-11-25',
    createdAt: '2026-11-02',
    updatedAt: '2026-11-02',
  },
  {
    id: 't-6',
    projectId: 'p-3',
    projectTitle: 'Zenith Grand Luxury Resort Website',
    assignedWorkerId: 'w-2',
    assignedWorkerName: 'Priya Patel',
    title: 'Color Palette & Typography System',
    description: 'Present 3 brand theme variants for luxury hospitality client',
    priority: 'MEDIUM',
    status: 'DONE',
    deadline: '2026-11-08',
    completedAt: '2026-11-07',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-07',
  },
  {
    id: 't-7',
    projectId: 'p-2',
    projectTitle: 'Nexa Fleet Tracking Dashboard',
    assignedWorkerId: 'w-3',
    assignedWorkerName: 'Amit Verma',
    title: 'PostgreSQL Query Optimization for Truck Routes',
    description: 'Add spatial indexing for fast geo-radius searches',
    priority: 'HIGH',
    status: 'DONE',
    deadline: '2026-11-12',
    completedAt: '2026-11-11',
    createdAt: '2026-10-25',
    updatedAt: '2026-11-11',
  },
  {
    id: 't-8',
    projectId: 'p-4',
    projectTitle: 'Apollo Festive Flash Sale Page',
    assignedWorkerId: 'w-1',
    assignedWorkerName: 'Rahul Sharma',
    title: 'Deploy Landing Page to Cloudflare Pages',
    description: 'Configure custom domain sale.apolloretail.in with SSL',
    priority: 'URGENT',
    status: 'DONE',
    deadline: '2026-10-18',
    completedAt: '2026-10-18',
    createdAt: '2026-10-05',
    updatedAt: '2026-10-18',
  },
  {
    id: 't-9',
    projectId: 'p-5',
    projectTitle: 'Nexa Logistics SEO Optimization',
    assignedWorkerId: 'w-3',
    assignedWorkerName: 'Amit Verma',
    title: 'Fix Core Web Vitals on Nexa Homepage',
    description: 'Compress LCP hero image and reduce unused JavaScript',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    deadline: '2026-11-20',
    createdAt: '2026-11-06',
    updatedAt: '2026-11-10',
  },
  {
    id: 't-10',
    projectId: 'p-3',
    projectTitle: 'Zenith Grand Luxury Resort Website',
    assignedWorkerId: 'w-1',
    assignedWorkerName: 'Rahul Sharma',
    title: 'Database Schema for Room Availability',
    description: 'Create tables for seasonal rates, room categories, and booking dates',
    priority: 'HIGH',
    status: 'TODO',
    deadline: '2026-11-28',
    createdAt: '2026-11-08',
    updatedAt: '2026-11-08',
  },
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    projectId: 'p-1',
    projectName: 'Apollo Supermarket Online Store',
    clientId: 'c-1',
    clientName: 'Apollo Retail Mart',
    invoiceNumber: 'INV-2026-001',
    subtotal: 34000,
    discount: 0,
    tax: 6120,
    total: 40120,
    paidAmount: 40120,
    dueDate: '2026-10-25',
    status: 'PAID',
    notes: 'Phase 1 Advance (50%)',
    createdAt: '2026-10-16',
    updatedAt: '2026-10-24',
  },
  {
    id: 'inv-2',
    projectId: 'p-1',
    projectName: 'Apollo Supermarket Online Store',
    clientId: 'c-1',
    clientName: 'Apollo Retail Mart',
    invoiceNumber: 'INV-2026-002',
    subtotal: 34000,
    discount: 0,
    tax: 6120,
    total: 40120,
    paidAmount: 0,
    dueDate: '2026-11-30',
    status: 'SENT',
    notes: 'Phase 2 Final Delivery & Launch (50%)',
    createdAt: '2026-11-10',
    updatedAt: '2026-11-10',
  },
  {
    id: 'inv-3',
    projectId: 'p-2',
    projectName: 'Nexa Fleet Tracking Dashboard',
    clientId: 'c-2',
    clientName: 'Nexa Logistics Solutions',
    invoiceNumber: 'INV-2026-003',
    subtotal: 50000,
    discount: 2000,
    tax: 8640,
    total: 56640,
    paidAmount: 56640,
    dueDate: '2026-10-10',
    status: 'PAID',
    notes: 'Milestone 1 - Core Fleet Tracking Architecture',
    createdAt: '2026-09-25',
    updatedAt: '2026-10-08',
  },
  {
    id: 'inv-4',
    projectId: 'p-4',
    projectName: 'Apollo Festive Flash Sale Page',
    clientId: 'c-1',
    clientName: 'Apollo Retail Mart',
    invoiceNumber: 'INV-2026-004',
    subtotal: 20000,
    discount: 0,
    tax: 3600,
    total: 23600,
    paidAmount: 23600,
    dueDate: '2026-10-20',
    status: 'PAID',
    notes: 'Complete Landing Page Development & Launch',
    createdAt: '2026-10-15',
    updatedAt: '2026-10-19',
  },
];

const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    projectId: 'p-1',
    projectName: 'Apollo Supermarket Online Store',
    category: 'Cloud Hosting & DB',
    description: 'High-speed VPS & managed PostgreSQL instance (6 Months)',
    amount: 4500,
    expenseDate: '2026-10-16',
    createdBy: 'Admin',
    createdAt: '2026-10-16',
  },
  {
    id: 'exp-2',
    projectId: 'p-1',
    projectName: 'Apollo Supermarket Online Store',
    category: 'Third-Party API',
    description: 'WhatsApp Business OTP & Order alert messaging bundle',
    amount: 2200,
    expenseDate: '2026-10-20',
    createdBy: 'Admin',
    createdAt: '2026-10-20',
  },
  {
    id: 'exp-3',
    projectId: 'p-2',
    projectName: 'Nexa Fleet Tracking Dashboard',
    category: 'Maps API',
    description: 'Google Maps Geocoding & Route Matrix credits',
    amount: 3800,
    expenseDate: '2026-09-25',
    createdBy: 'Admin',
    createdAt: '2026-09-25',
  },
  {
    id: 'exp-4',
    projectId: 'p-3',
    projectName: 'Zenith Grand Luxury Resort Website',
    category: 'Domain & SSL',
    description: 'Domain purchase zenithgrand.com and wildcard SSL certificate',
    amount: 1200,
    expenseDate: '2026-11-02',
    createdBy: 'Admin',
    createdAt: '2026-11-02',
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'u-admin-1',
    userName: 'Admin',
    action: 'CREATE_PROJECT',
    entityType: 'Project',
    entityId: 'p-1',
    description: 'Created new project: Apollo Supermarket Online Store',
    createdAt: '2026-10-15 11:30',
  },
  {
    id: 'log-2',
    userId: 'u-worker-1',
    userName: 'Rahul Sharma',
    action: 'STATUS_UPDATE',
    entityType: 'Task',
    entityId: 't-2',
    description: 'Completed task: Design Mobile Responsive Product Card',
    createdAt: '2026-11-09 16:45',
  },
  {
    id: 'log-3',
    userId: 'u-client-1',
    userName: 'Vikram Malhotra',
    action: 'PAYMENT_RECEIVED',
    entityType: 'Invoice',
    entityId: 'inv-1',
    description: 'Paid ₹40,120 for Invoice INV-2026-001 (Apollo Store Advance)',
    createdAt: '2026-10-24 14:15',
  },
  {
    id: 'log-4',
    userId: 'u-worker-3',
    userName: 'Amit Verma',
    action: 'SUBMIT_FOR_REVIEW',
    entityType: 'Task',
    entityId: 't-3',
    description: 'Submitted task for Admin review: Build Live WebSocket Telemetry Route',
    createdAt: '2026-11-13 18:20',
  },
];

const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: '🚀 Staging Sandbox Environment v2.4 Live for Apollo Retail & Nexa Fleet',
    content: 'We have deployed the high-fidelity interactive staging sandboxes! Clients and developers can now test complete checkout journeys, responsive mobile views, and live telemetry without leaving the platform workspace.',
    category: 'ANNOUNCEMENT',
    audience: 'ALL',
    author: 'UP Web Tech Engineering Desk',
    authorRole: 'Super Admin',
    isPinned: true,
    priority: 'HIGH',
    createdAt: '2026-11-14 09:30',
    tags: ['Staging', 'Apollo Retail', 'Nexa Fleet', 'Live Sandbox'],
  },
  {
    id: 'not-2',
    title: '⚠️ Scheduled Cloud Infrastructure & Database Performance Maintenance',
    content: 'Routine security patching and PostgreSQL connection pooling tuning scheduled for Sunday at 02:00 AM IST. Expected maintenance window: under 15 minutes. No data loss will occur.',
    category: 'MAINTENANCE',
    audience: 'ALL',
    author: 'DevOps & Reliability Team',
    authorRole: 'System Ops',
    isPinned: true,
    priority: 'MEDIUM',
    createdAt: '2026-11-13 14:00',
    tags: ['DevOps', 'PostgreSQL', 'Maintenance'],
  },
  {
    id: 'not-3',
    title: '💼 Client Review & 3-Cycle Revision Framework (Guidelines for Clients)',
    content: 'To maintain our high engineering delivery pace, every milestone includes 3 complimentary comprehensive revision cycles. Feedback submitted via the Live Staging Sandbox is instantly queued to the assigned lead developer.',
    category: 'POLICY',
    audience: 'CLIENT',
    author: 'Client Success & Delivery Head',
    authorRole: 'Project Manager',
    isPinned: true,
    priority: 'HIGH',
    createdAt: '2026-11-12 11:15',
    tags: ['Client SLA', 'Revisions', 'Deliverables'],
  },
  {
    id: 'not-4',
    title: '⚡ Developer Sprint Deliverables: Diwali & End-of-Month Deadlines',
    content: 'All frontend and backend team members must log active sprint hours using the Sprint Tracker. PRs must pass ESLint and TypeScript checks before moving tasks to "IN_REVIEW" status.',
    category: 'SPRINT',
    audience: 'WORKER',
    author: 'Lead Architect',
    authorRole: 'Technical Lead',
    isPinned: true,
    priority: 'URGENT',
    createdAt: '2026-11-11 10:00',
    tags: ['Sprints', 'Code Review', 'Deadlines'],
  },
  {
    id: 'not-5',
    title: '💳 Razorpay Webhook v2 & Automated Payment Reconciliation Active',
    content: 'Invoicing now supports automated instant bank reconciliation via Razorpay webhooks. Clients can pay milestone invoices directly via UPI, NetBanking, and Corporate Cards with automated GST receipt generation.',
    category: 'PAYMENT',
    audience: 'ALL',
    author: 'Finance & Compliance',
    authorRole: 'Admin',
    isPinned: false,
    priority: 'MEDIUM',
    createdAt: '2026-11-10 16:20',
    tags: ['Razorpay', 'GST Invoicing', 'UPI'],
  },
];

const INITIAL_SPRINT_LOGS: SprintLog[] = [
  {
    id: 'spl-1',
    workerId: 'w-1',
    workerName: 'Rahul Sharma',
    taskId: 't-1',
    taskTitle: 'Integrate Razorpay Payment Gateway',
    projectId: 'p-1',
    projectName: 'Apollo Supermarket Online Store',
    durationMinutes: 180,
    notes: 'Configured webhook verification, UPI QR code modal, and test order state updates.',
    date: '2026-11-13',
    createdAt: '2026-11-13 17:30',
  },
  {
    id: 'spl-2',
    workerId: 'w-3',
    workerName: 'Amit Verma',
    taskId: 't-3',
    taskTitle: 'Build Live WebSocket Telemetry Route',
    projectId: 'p-2',
    projectName: 'Nexa Fleet Tracking Dashboard',
    durationMinutes: 240,
    notes: 'Implemented heartbeat ping, Redis pub/sub queue, and simulated driver coordinates.',
    date: '2026-11-13',
    createdAt: '2026-11-13 18:00',
  },
];

const STORAGE_KEY = 'up_web_tech_platform_store_v2';

export class PlatformStore {
  private static instance: PlatformStore;
  
  users: User[] = INITIAL_USERS;
  clients: Client[] = INITIAL_CLIENTS;
  workers: Worker[] = INITIAL_WORKERS;
  services: Service[] = INITIAL_SERVICES;
  projects: Project[] = INITIAL_PROJECTS;
  tasks: Task[] = INITIAL_TASKS;
  invoices: Invoice[] = INITIAL_INVOICES;
  expenses: Expense[] = INITIAL_EXPENSES;
  activityLogs: ActivityLog[] = INITIAL_LOGS;
  notices: Notice[] = INITIAL_NOTICES;
  sprintLogs: SprintLog[] = INITIAL_SPRINT_LOGS;
  
  private listeners: (() => void)[] = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.clients = parsed.clients || INITIAL_CLIENTS;
          this.workers = parsed.workers || INITIAL_WORKERS;
          this.services = parsed.services || INITIAL_SERVICES;
          this.projects = parsed.projects || INITIAL_PROJECTS;
          this.tasks = parsed.tasks || INITIAL_TASKS;
          this.invoices = parsed.invoices || INITIAL_INVOICES;
          this.expenses = parsed.expenses || INITIAL_EXPENSES;
          this.activityLogs = parsed.activityLogs || INITIAL_LOGS;
          this.notices = parsed.notices || INITIAL_NOTICES;
          this.sprintLogs = parsed.sprintLogs || INITIAL_SPRINT_LOGS;
        } catch (e) {
          console.error('Failed to parse stored store data', e);
        }
      }
    }
  }

  public static getInstance(): PlatformStore {
    if (!PlatformStore.instance) {
      PlatformStore.instance = new PlatformStore();
    }
    return PlatformStore.instance;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          clients: this.clients,
          workers: this.workers,
          services: this.services,
          projects: this.projects,
          tasks: this.tasks,
          invoices: this.invoices,
          expenses: this.expenses,
          activityLogs: this.activityLogs,
          notices: this.notices,
          sprintLogs: this.sprintLogs,
        })
      );
    }
    this.listeners.forEach((l) => l());
  }

  // --- CLIENTS ---
  addClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
    const newClient: Client = {
      ...client,
      id: `c-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.clients = [newClient, ...this.clients];
    this.logActivity('Admin', 'CREATE_CLIENT', 'Client', newClient.id, `Created new client: ${newClient.companyName}`);
    this.notify();
    return newClient;
  }

  updateClient(id: string, updates: Partial<Client>) {
    this.clients = this.clients.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : c));
    this.notify();
  }

  deleteClient(id: string) {
    this.clients = this.clients.filter((c) => c.id !== id);
    this.notify();
  }

  // --- WORKERS ---
  addWorker(worker: Omit<Worker, 'id' | 'createdAt' | 'updatedAt'>): Worker {
    const newWorker: Worker = {
      ...worker,
      id: `w-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.workers = [newWorker, ...this.workers];
    this.logActivity('Admin', 'CREATE_WORKER', 'Worker', newWorker.id, `Added new team member: ${newWorker.fullName} (${newWorker.employeeCode})`);
    this.notify();
    return newWorker;
  }

  updateWorker(id: string, updates: Partial<Worker>) {
    this.workers = this.workers.map((w) => (w.id === id ? { ...w, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : w));
    this.notify();
  }

  deleteWorker(id: string) {
    this.workers = this.workers.filter((w) => w.id !== id);
    this.notify();
  }

  // --- PROJECTS ---
  addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'projectCode'>): Project {
    const client = this.clients.find((c) => c.id === project.clientId);
    const worker = this.workers.find((w) => w.id === project.assignedWorkerId);
    const service = this.services.find((s) => s.id === project.serviceId);

    const newProject: Project = {
      ...project,
      id: `p-${Date.now()}`,
      projectCode: `PRJ-2026-${String(this.projects.length + 1).padStart(3, '0')}`,
      clientName: client?.companyName || 'Unknown Client',
      assignedWorkerName: worker?.fullName,
      serviceName: service?.name,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.projects = [newProject, ...this.projects];
    this.logActivity('Admin', 'CREATE_PROJECT', 'Project', newProject.id, `Created project: ${newProject.name} for ${newProject.clientName}`);
    this.notify();
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>) {
    this.projects = this.projects.map((p) => {
      if (p.id === id) {
        const client = updates.clientId ? this.clients.find((c) => c.id === updates.clientId) : null;
        const worker = updates.assignedWorkerId ? this.workers.find((w) => w.id === updates.assignedWorkerId) : null;
        return {
          ...p,
          ...updates,
          clientName: client ? client.companyName : p.clientName,
          assignedWorkerName: worker ? worker.fullName : p.assignedWorkerName,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });
    this.notify();
  }

  deleteProject(id: string) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.notify();
  }

  // --- TASKS ---
  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const project = this.projects.find((p) => p.id === task.projectId);
    const worker = this.workers.find((w) => w.id === task.assignedWorkerId);

    const newTask: Task = {
      ...task,
      id: `t-${Date.now()}`,
      projectTitle: project?.name,
      assignedWorkerName: worker?.fullName,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.tasks = [newTask, ...this.tasks];
    this.logActivity('Admin', 'CREATE_TASK', 'Task', newTask.id, `Assigned task "${newTask.title}" to ${newTask.assignedWorkerName || 'Unassigned'}`);
    this.notify();
    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus, actorName = 'User') {
    this.tasks = this.tasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          status,
          completedAt: status === 'DONE' ? new Date().toISOString().split('T')[0] : t.completedAt,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return t;
    });
    const task = this.tasks.find((t) => t.id === id);
    this.logActivity(actorName, 'TASK_STATUS', 'Task', id, `Changed task "${task?.title}" status to ${status}`);
    this.notify();
  }

  // --- INVOICES & PAYMENTS ---
  addInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Invoice {
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.invoices = [newInvoice, ...this.invoices];
    this.logActivity('Admin', 'CREATE_INVOICE', 'Invoice', newInvoice.id, `Created invoice ${newInvoice.invoiceNumber} for ₹${newInvoice.total.toLocaleString()}`);
    this.notify();
    return newInvoice;
  }

  recordPayment(invoiceId: string, amount: number, paymentMethod: string, reference?: string) {
    this.invoices = this.invoices.map((inv) => {
      if (inv.id === invoiceId) {
        const newPaid = inv.paidAmount + amount;
        return {
          ...inv,
          paidAmount: newPaid,
          status: newPaid >= inv.total ? 'PAID' : 'PARTIALLY_PAID',
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return inv;
    });
    const invoice = this.invoices.find((i) => i.id === invoiceId);
    this.logActivity('Client', 'PAYMENT', 'Invoice', invoiceId, `Recorded payment of ₹${amount.toLocaleString()} for ${invoice?.invoiceNumber} via ${paymentMethod}`);
    this.notify();
  }

  // --- EXPENSES ---
  addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Expense {
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.expenses = [newExpense, ...this.expenses];
    this.logActivity('Admin', 'CREATE_EXPENSE', 'Expense', newExpense.id, `Recorded expense of ₹${newExpense.amount.toLocaleString()} (${newExpense.category})`);
    this.notify();
    return newExpense;
  }

  // --- ACTIVITY LOGS ---
  logActivity(userName: string, action: string, entityType: string, entityId: string, description: string) {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      userId: 'u-current',
      userName,
      action,
      entityType,
      entityId,
      description,
      createdAt: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    this.activityLogs = [newLog, ...this.activityLogs.slice(0, 49)];
  }

  // --- NOTICES & ANNOUNCEMENTS ---
  addNotice(notice: Omit<Notice, 'id' | 'createdAt'>): Notice {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-CA') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    this.notices = [newNotice, ...this.notices];
    this.logActivity(newNotice.author, 'CREATE_NOTICE', 'Notice', newNotice.id, `Published notice: ${newNotice.title}`);
    this.notify();
    return newNotice;
  }

  deleteNotice(id: string) {
    this.notices = this.notices.filter((n) => n.id !== id);
    this.notify();
  }

  togglePinNotice(id: string) {
    this.notices = this.notices.map((n) =>
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    );
    this.notify();
  }

  // --- SPRINT TIME LOGGING ---
  addSprintLog(log: Omit<SprintLog, 'id' | 'createdAt'>): SprintLog {
    const newLog: SprintLog = {
      ...log,
      id: `spl-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-CA') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    this.sprintLogs = [newLog, ...this.sprintLogs];
    this.logActivity(log.workerName, 'LOG_SPRINT_TIME', 'Task', log.taskId, `Logged ${log.durationMinutes}m sprint on ${log.taskTitle}`);
    this.notify();
    return newLog;
  }

  // --- RESET TO FACTORY SEED DATA ---
  resetToSeed() {
    this.clients = INITIAL_CLIENTS;
    this.workers = INITIAL_WORKERS;
    this.services = INITIAL_SERVICES;
    this.projects = INITIAL_PROJECTS;
    this.tasks = INITIAL_TASKS;
    this.invoices = INITIAL_INVOICES;
    this.expenses = INITIAL_EXPENSES;
    this.activityLogs = INITIAL_LOGS;
    this.notices = INITIAL_NOTICES;
    this.sprintLogs = INITIAL_SPRINT_LOGS;
    this.notify();
  }
}

export const store = PlatformStore.getInstance();
