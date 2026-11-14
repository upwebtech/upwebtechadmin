import * as XLSX from 'xlsx';
import { Client, Project, Task, Invoice, Expense } from '@/types';

export interface ImportValidationResult<T> {
  valid: T[];
  errors: { row: number; error: string }[];
  totalRows: number;
}

export const exportToExcel = (data: Record<string, unknown>[], fileName: string, sheetName = 'Sheet1') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportToCSV = (data: Record<string, unknown>[], fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export Clients
export const exportClients = (clients: Client[]) => {
  const formatted = clients.map((c) => ({
    'Company Name': c.companyName,
    'Contact Person': c.contactName,
    'Email Address': c.email,
    'Phone Number': c.phone,
    'City': c.city || '',
    'State': c.state || '',
    'Country': c.country || 'India',
    'Status': c.status,
    'Notes': c.notes || '',
  }));
  exportToExcel(formatted, 'UP_Web_Tech_Clients');
};

// Export Projects
export const exportProjects = (projects: Project[]) => {
  const formatted = projects.map((p) => ({
    'Project Code': p.projectCode,
    'Project Name': p.name,
    'Client': p.clientName || '',
    'Service': p.serviceName || '',
    'Assigned Worker': p.assignedWorkerName || 'Unassigned',
    'Status': p.status,
    'Priority': p.priority,
    'Start Date': p.startDate || '',
    'Deadline': p.deadline || '',
    'Budget (INR)': p.estimatedBudget,
    'Final Price (INR)': p.finalPrice,
    'Website': p.websiteUrl || '',
  }));
  exportToExcel(formatted, 'UP_Web_Tech_Projects');
};

// Export Tasks
export const exportTasks = (tasks: Task[]) => {
  const formatted = tasks.map((t) => ({
    'Task Title': t.title,
    'Project': t.projectTitle || '',
    'Assigned To': t.assignedWorkerName || 'Unassigned',
    'Priority': t.priority,
    'Status': t.status,
    'Deadline': t.deadline || '',
    'Completed At': t.completedAt || '',
    'Description': t.description || '',
  }));
  exportToExcel(formatted, 'UP_Web_Tech_Tasks');
};

// Export Monthly Financial Report
export const exportFinancialReport = (invoices: Invoice[], expenses: Expense[]) => {
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.total, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const netProfit = totalCollected - totalExpenses;

  const summary = [
    { 'Metric': 'Total Invoiced (INR)', 'Amount': `₹${totalInvoiced.toLocaleString()}` },
    { 'Metric': 'Total Revenue Collected (INR)', 'Amount': `₹${totalCollected.toLocaleString()}` },
    { 'Metric': 'Total Expenses (INR)', 'Amount': `₹${totalExpenses.toLocaleString()}` },
    { 'Metric': 'Net Operating Profit (INR)', 'Amount': `₹${netProfit.toLocaleString()}` },
  ];

  const invoiceSheet = invoices.map((i) => ({
    'Invoice Number': i.invoiceNumber,
    'Client': i.clientName,
    'Project': i.projectName,
    'Total (INR)': i.total,
    'Paid (INR)': i.paidAmount,
    'Due Date': i.dueDate,
    'Status': i.status,
  }));

  const expenseSheet = expenses.map((e) => ({
    'Category': e.category,
    'Description': e.description,
    'Project': e.projectName || 'General',
    'Amount (INR)': e.amount,
    'Date': e.expenseDate,
  }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summary), 'Financial Summary');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(invoiceSheet), 'Invoices');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(expenseSheet), 'Expenses');
  XLSX.writeFile(wb, 'UP_Web_Tech_Monthly_Financial_Report.xlsx');
};

// Import Clients from Excel File with validation
export const parseClientsExcel = async (file: File): Promise<ImportValidationResult<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>> => {
  const arrayBuffer = await file.arrayBuffer();
  const wb = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

  const valid: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>[] = [];
  const errors: { row: number; error: string }[] = [];

  rows.forEach((row, idx) => {
    const rowNum = idx + 2;
    const companyName = String(row['Company Name'] || row['company_name'] || row['Company'] || '').trim();
    const contactName = String(row['Contact Person'] || row['contact_name'] || row['Name'] || '').trim();
    const email = String(row['Email Address'] || row['email'] || row['Email'] || '').trim();
    const phone = String(row['Phone Number'] || row['phone'] || row['Phone'] || '').trim();

    if (!companyName) {
      errors.push({ row: rowNum, error: 'Missing Company Name' });
      return;
    }
    if (!email || !email.includes('@')) {
      errors.push({ row: rowNum, error: `Invalid email address: "${email}"` });
      return;
    }

    valid.push({
      companyName,
      contactName: contactName || companyName,
      email,
      phone: phone || '+91 0000000000',
      city: String(row['City'] || row['city'] || 'Lucknow'),
      state: String(row['State'] || row['state'] || 'Uttar Pradesh'),
      country: 'India',
      status: 'ACTIVE',
      notes: String(row['Notes'] || 'Imported via Excel'),
    });
  });

  return { valid, errors, totalRows: rows.length };
};
