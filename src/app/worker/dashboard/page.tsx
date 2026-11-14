'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  CheckSquare,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Bell,
  Code,
  GitBranch,
  Sparkles,
  X,
  FileCheck,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TaskStatus } from '@/types';

export default function WorkerDashboardPage() {
  const { user } = useAuth();
  const [, setTick] = useState(0);

  // Sprint Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeTimerTaskId, setActiveTimerTaskId] = useState<string>('');
  const [sprintNotes, setSprintNotes] = useState('');
  const [sprintLoggedSuccess, setSprintLoggedSuccess] = useState(false);

  // Deliverable Submission Modal State
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState<string | null>(null);
  const [gitBranch, setGitBranch] = useState('feature/razorpay-checkout-flow');
  const [prUrl, setPrUrl] = useState('https://github.com/upwebtech/apollo-store/pull/14');
  const [deliverableNotes, setDeliverableNotes] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  // Timer Tick Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((sec) => sec + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const currentWorker =
    store.workers.find((w) => w.email === user?.email) || store.workers[0];

  const myProjects = store.projects.filter(
    (p) => p.assignedWorkerId === currentWorker?.id
  );
  const myTasks = store.tasks.filter(
    (t) => t.assignedWorkerId === currentWorker?.id
  );

  const pendingTasks = myTasks.filter((t) => t.status !== 'DONE');
  const reviewTasks = myTasks.filter((t) => t.status === 'IN_REVIEW');
  const completedTasks = myTasks.filter((t) => t.status === 'DONE');
  const mySprintLogs = store.sprintLogs.filter(
    (l) => l.workerId === currentWorker?.id
  );

  const latestNotice = store.notices.find(
    (n) => n.audience === 'ALL' || n.audience === 'WORKER'
  );

  // Timer format
  const formatTimer = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogSprintSession = () => {
    const activeTask = myTasks.find((t) => t.id === activeTimerTaskId) || myTasks[0];
    if (!activeTask) return;

    const durationMins = Math.max(1, Math.round(timerSeconds / 60));
    store.addSprintLog({
      workerId: currentWorker.id,
      workerName: currentWorker.fullName,
      taskId: activeTask.id,
      taskTitle: activeTask.title,
      projectId: activeTask.projectId,
      projectName: activeTask.projectTitle || 'General Project',
      durationMinutes: durationMins,
      notes: sprintNotes || 'Sprint implementation & code testing',
      date: new Date().toISOString().split('T')[0],
    });

    setIsTimerRunning(false);
    setTimerSeconds(0);
    setSprintNotes('');
    setSprintLoggedSuccess(true);
    setTimeout(() => setSprintLoggedSuccess(false), 3000);
  };

  const handleConfirmSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForSubmission) return;

    store.updateTaskStatus(
      selectedTaskForSubmission,
      'IN_REVIEW',
      currentWorker.fullName
    );

    const task = myTasks.find((t) => t.id === selectedTaskForSubmission);
    store.logActivity(
      currentWorker.fullName,
      'SUBMIT_DELIVERABLE',
      'Task',
      selectedTaskForSubmission,
      `Submitted for QA: ${task?.title} [Branch: ${gitBranch}, PR: ${prUrl}]`
    );

    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSelectedTaskForSubmission(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Developer Workspace
          </span>
          <h1 className="text-2xl font-black text-white mt-2">
            Welcome, {currentWorker?.fullName || 'Developer'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {currentWorker?.designation} • {currentWorker?.employeeCode} • UP Web Tech Engineering Desk
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/worker/notices"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Notice Board</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </Link>

          <div className="text-right pl-3 border-l border-slate-800">
            <div className="text-xs text-slate-400">Completed Sprints</div>
            <div className="text-xl font-black text-emerald-400">
              {completedTasks.length} / {myTasks.length}
            </div>
          </div>
        </div>
      </div>

      {/* Notice Banner Highlight */}
      {latestNotice && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{latestNotice.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {latestNotice.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                {latestNotice.content}
              </p>
            </div>
          </div>

          <Link
            href="/worker/notices"
            className="text-xs text-cyan-400 hover:underline font-semibold shrink-0"
          >
            View All &rarr;
          </Link>
        </div>
      )}

      {/* Interactive Sprint Time Logger & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Live Sprint Tracker */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Live Sprint Time Tracker</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Status: {isTimerRunning ? '● TRACKING ACTIVE SPRINT' : 'IDLE'}
            </span>
          </div>

          {sprintLoggedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sprint time logged successfully to project work records!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
            {/* Timer Counter */}
            <div className="text-center sm:text-left space-y-2">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Session Stopwatch
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-wider">
                {formatTimer(timerSeconds)}
              </div>
              <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
                {!isTimerRunning ? (
                  <button
                    onClick={() => setIsTimerRunning(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Timer</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTimerRunning(false)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition"
                  title="Reset Stopwatch"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Task & Notes assignment */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Assign Session to Task
                </label>
                <select
                  value={activeTimerTaskId || (myTasks[0]?.id ?? '')}
                  onChange={(e) => setActiveTimerTaskId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {myTasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.projectTitle})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Sprint Summary / Git Commits
                </label>
                <input
                  type="text"
                  value={sprintNotes}
                  onChange={(e) => setSprintNotes(e.target.value)}
                  placeholder="e.g. Built Razorpay webhook listener, tested UPI payload"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                disabled={timerSeconds === 0}
                onClick={handleLogSprintSession}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Log Sprint Record ({Math.max(1, Math.round(timerSeconds / 60))} mins)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sprint History Summary */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Sprint Logs &amp; Hours</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Recent engineering activity logs</p>

            <div className="space-y-3 mt-4 overflow-y-auto max-h-56 pr-1">
              {mySprintLogs.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-6">
                  No sprint records logged yet today.
                </div>
              ) : (
                mySprintLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span className="line-clamp-1">{log.taskTitle}</span>
                      <span className="text-emerald-400 font-mono shrink-0 ml-2">
                        {log.durationMinutes}m
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {log.notes}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>{log.projectName}</span>
                      <span>{log.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Logged Time:</span>
            <strong className="text-emerald-400 font-mono text-sm">
              {mySprintLogs.reduce((acc, l) => acc + l.durationMinutes, 0)} Minutes
            </strong>
          </div>
        </div>
      </div>

      {/* Assigned Tasks Workstation */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">My Active Sprint Tasks</h2>
            <p className="text-xs text-slate-400">Update development status and submit deliverables for review</p>
          </div>

          <Link
            href="/worker/tasks"
            className="text-xs text-cyan-400 hover:underline font-semibold"
          >
            Open Tasks Kanban &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Task Description</th>
                <th className="p-3.5">Project</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Deadline</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5 text-right">Work Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {myTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white">
                    <div>{task.title}</div>
                    <div className="text-[11px] text-slate-400 font-normal mt-0.5">{task.description}</div>
                  </td>
                  <td className="p-3.5 text-cyan-400 font-medium">
                    <div>{task.projectTitle}</div>
                    {/* Link to staging preview if available */}
                    <Link
                      href="/staging/apollo-retail"
                      className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline mt-0.5"
                    >
                      <span>Staging Sandbox</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={task.priority} type="priority" />
                  </td>
                  <td className="p-3.5 text-slate-400">{task.deadline || 'No deadline'}</td>
                  <td className="p-3.5">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        store.updateTaskStatus(task.id, e.target.value as TaskStatus, currentWorker.fullName)
                      }
                      className="bg-slate-950 border border-slate-800 text-[11px] font-semibold text-cyan-400 rounded-lg px-2.5 py-1 focus:outline-none"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="BLOCKED">BLOCKED</option>
                      <option value="IN_REVIEW">IN REVIEW</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right">
                    {task.status !== 'IN_REVIEW' && task.status !== 'DONE' && (
                      <button
                        onClick={() => setSelectedTaskForSubmission(task.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold ml-auto transition shadow-md shadow-cyan-500/20"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit for QA</span>
                      </button>
                    )}
                    {task.status === 'IN_REVIEW' && (
                      <span className="text-[11px] text-amber-400 font-semibold">Under Admin Review</span>
                    )}
                    {task.status === 'DONE' && (
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deliverable Submission Modal */}
      {selectedTaskForSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedTaskForSubmission(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Submit Code Deliverable for QA</h3>
                <p className="text-xs text-slate-400">
                  Deliverable for:{' '}
                  <strong className="text-cyan-400">
                    {myTasks.find((t) => t.id === selectedTaskForSubmission)?.title}
                  </strong>
                </p>
              </div>
            </div>

            {submissionSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-5 h-5" />
                <span>Task moved to IN_REVIEW. Admin QA notified!</span>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubmitDeliverable} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Git Branch Name
                  </label>
                  <div className="relative">
                    <GitBranch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={gitBranch}
                      onChange={(e) => setGitBranch(e.target.value)}
                      placeholder="e.g. feature/razorpay-checkout"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pull Request / Commit URL
                  </label>
                  <input
                    type="url"
                    value={prUrl}
                    onChange={(e) => setPrUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    QA Verification Notes
                  </label>
                  <textarea
                    rows={3}
                    value={deliverableNotes}
                    onChange={(e) => setDeliverableNotes(e.target.value)}
                    placeholder="Describe test steps, verified edge cases, and staging preview state..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTaskForSubmission(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Admin Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
