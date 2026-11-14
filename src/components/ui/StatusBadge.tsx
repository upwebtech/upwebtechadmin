'use client';

import React from 'react';
import { ProjectStatus, TaskStatus, InvoiceStatus, TaskPriority } from '@/types';

interface StatusBadgeProps {
  status: ProjectStatus | TaskStatus | InvoiceStatus | TaskPriority | string;
  type?: 'project' | 'task' | 'invoice' | 'priority';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'project' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      // Completed / Paid / Done
      case 'COMPLETED':
      case 'DONE':
      case 'PAID':
      case 'APPROVED':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

      // In Progress / Active / Development
      case 'DEVELOPMENT':
      case 'IN_PROGRESS':
      case 'DESIGN':
      case 'PARTIALLY_PAID':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';

      // Reviews / Verification
      case 'CLIENT_REVIEW':
      case 'IN_REVIEW':
      case 'TESTING':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';

      // Warnings / Changes Required
      case 'CHANGES_REQUIRED':
      case 'REVISION':
      case 'BLOCKED':
      case 'OVERDUE':
      case 'URGENT':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';

      // Todo / Pending / Planning
      case 'TODO':
      case 'PLANNING':
      case 'REQUIREMENTS':
      case 'SENT':
      case 'HIGH':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';

      case 'LEAD':
      case 'DRAFT':
      case 'MEDIUM':
      case 'LOW':
      default:
        return 'bg-slate-700/30 text-slate-400 border-slate-700';
    }
  };

  const formatText = (text: string) => {
    return text.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${getBadgeStyle()}`}
    >
      {formatText(status)}
    </span>
  );
};
