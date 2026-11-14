'use client';

import React from 'react';
import Link from 'next/link';
import { FolderKanban, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function WorkerProjectsPage() {
  const { user } = useAuth();
  const currentWorker =
    store.workers.find((w) => w.email === user?.email) || store.workers[0];

  const myProjects = store.projects.filter(
    (p) => p.assignedWorkerId === currentWorker?.id
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          My Assigned Projects
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            {myProjects.length} Active
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Projects where you are assigned as lead developer, designer, or specialist
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myProjects.map((p) => {
          const projectTasks = store.tasks.filter((t) => t.projectId === p.id && t.assignedWorkerId === currentWorker?.id);
          const doneTasks = projectTasks.filter((t) => t.status === 'DONE');

          return (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400">{p.projectCode}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Task Completion</span>
                  <strong className="text-white">
                    {doneTasks.length} / {projectTasks.length} Done
                  </strong>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                    style={{
                      width: `${projectTasks.length > 0 ? (doneTasks.length / projectTasks.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Deadline: {p.deadline || 'Flexible'}</span>
                </div>
                {p.stagingUrl && (
                  <Link
                    href={p.stagingUrl}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    Staging Sandbox <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
