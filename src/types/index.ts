export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'WORKER' | 'CLIENT';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export type ProjectStatus =
  | 'LEAD'
  | 'PLANNING'
  | 'REQUIREMENTS'
  | 'DESIGN'
  | 'DEVELOPMENT'
  | 'TESTING'
  | 'CLIENT_REVIEW'
  | 'REVISION'
  | 'APPROVED'
  | 'DEPLOYED'
  | 'COMPLETED'
  | 'ON_HOLD'
  | 'CANCELLED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'IN_REVIEW'
  | 'CHANGES_REQUIRED'
  | 'DONE';

export type RequirementStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
export type FileVisibility = 'INTERNAL' | 'CLIENT_VISIBLE' | 'WORKER_VISIBLE' | 'PUBLIC';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type RevisionStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface Client {
  id: string;
  userId?: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  notes?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Worker {
  id: string;
  userId?: string;
  fullName: string;
  employeeCode: string;
  designation: string;
  skills: string[];
  phone: string;
  email: string;
  status: UserStatus;
  joiningDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  estimatedDays: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  projectCode: string;
  clientId: string;
  clientName?: string;
  serviceId?: string;
  serviceName?: string;
  name: string;
  description: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  status: ProjectStatus;
  priority: TaskPriority;
  startDate?: string;
  deadline?: string;
  estimatedBudget: number;
  finalPrice: number;
  websiteUrl?: string;
  stagingUrl?: string;
  repositoryUrl?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  projectTitle?: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate?: string;
  deadline?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Requirement {
  id: string;
  projectId: string;
  title: string;
  description: string;
  source: 'CLIENT' | 'ADMIN';
  status: RequirementStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Revision {
  id: string;
  projectId: string;
  requestedBy: string;
  requestedByName?: string;
  description: string;
  attachmentUrl?: string;
  status: RevisionStatus;
  createdAt: string;
  completedAt?: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  uploadedBy: string;
  uploaderName?: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  visibility: FileVisibility;
  createdAt: string;
}

export interface Invoice {
  id: string;
  projectId?: string;
  projectName?: string;
  clientId: string;
  clientName?: string;
  invoiceNumber: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paidAmount: number;
  dueDate: string;
  status: InvoiceStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber?: string;
  amount: number;
  paymentMethod: string;
  transactionReference?: string;
  paymentDate: string;
  status: PaymentStatus;
  notes?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  projectId?: string;
  projectName?: string;
  category: string;
  description: string;
  amount: number;
  expenseDate: string;
  createdBy: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'PROJECT' | 'TASK' | 'INVOICE' | 'FEEDBACK' | 'SYSTEM';
  relatedProjectId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId?: string;
  description: string;
  createdAt: string;
}

export type NoticeCategory =
  | 'ANNOUNCEMENT'
  | 'SPRINT'
  | 'MAINTENANCE'
  | 'PAYMENT'
  | 'POLICY'
  | 'URGENT';

export type NoticeAudience = 'ALL' | 'WORKER' | 'CLIENT';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  audience: NoticeAudience;
  author: string;
  authorRole: string;
  isPinned?: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'URGENT';
  createdAt: string;
  tags?: string[];
  readCount?: number;
}

export interface SprintLog {
  id: string;
  workerId: string;
  workerName: string;
  taskId: string;
  taskTitle: string;
  projectId: string;
  projectName: string;
  durationMinutes: number;
  notes: string;
  date: string;
  createdAt: string;
}

