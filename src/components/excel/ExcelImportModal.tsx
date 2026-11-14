'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, FileSpreadsheet, X } from 'lucide-react';
import { parseClientsExcel } from '@/lib/excel/excelService';
import { store } from '@/lib/db/store';
import { Client } from '@/types';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>[]>([]);
  const [errors, setErrors] = useState<{ row: number; error: string }[]>([]);
  const [importSummary, setImportSummary] = useState<{ imported: number; failed: number } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setImportSummary(null);

    try {
      const result = await parseClientsExcel(selectedFile);
      setPreviewData(result.valid);
      setErrors(result.errors);
    } catch (err) {
      console.error(err);
      setErrors([{ row: 0, error: 'Could not parse Excel spreadsheet. Please ensure it is a valid .xlsx or .csv file.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmImport = () => {
    if (previewData.length === 0) return;

    let importedCount = 0;
    previewData.forEach((clientData) => {
      store.addClient(clientData);
      importedCount++;
    });

    setImportSummary({
      imported: importedCount,
      failed: errors.length,
    });

    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Import Data from Excel (.xlsx)</h3>
              <p className="text-xs text-slate-400">Upload clients or business contacts with column validation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          {/* File Upload Box */}
          {!importSummary && (
            <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/60 transition group">
              <Upload className="w-10 h-10 text-slate-400 group-hover:text-cyan-400 mb-2 transition" />
              <span className="text-sm font-semibold text-slate-200">
                {file ? file.name : 'Click to select or drag and drop Excel (.xlsx / .csv)'}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Accepted columns: Company Name, Contact Person, Email Address, Phone Number, City, State
              </span>
              <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} className="hidden" />
            </label>
          )}

          {loading && (
            <div className="py-8 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Parsing and validating spreadsheet rows...
            </div>
          )}

          {/* Errors list */}
          {errors.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <AlertCircle className="w-4 h-4" />
                Validation Warnings ({errors.length})
              </div>
              <ul className="text-xs list-disc pl-5 space-y-0.5 text-rose-400">
                {errors.slice(0, 5).map((err, i) => (
                  <li key={i}>
                    {err.row > 0 ? `Row ${err.row}: ` : ''}{err.error}
                  </li>
                ))}
                {errors.length > 5 && <li>...and {errors.length - 5} more issues</li>}
              </ul>
            </div>
          )}

          {/* Preview Table */}
          {previewData.length > 0 && !importSummary && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-300">
                  Preview Valid Records ({previewData.length})
                </h4>
                <span className="text-xs text-emerald-400">✓ Ready for Database Insertion</span>
              </div>
              <div className="overflow-x-auto border border-slate-800 rounded-xl max-h-52">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-2.5">Company</th>
                      <th className="p-2.5">Contact</th>
                      <th className="p-2.5">Email</th>
                      <th className="p-2.5">Phone</th>
                      <th className="p-2.5">City</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {previewData.slice(0, 10).map((row, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="p-2.5 font-medium text-white">{row.companyName}</td>
                        <td className="p-2.5">{row.contactName}</td>
                        <td className="p-2.5 text-cyan-400">{row.email}</td>
                        <td className="p-2.5">{row.phone}</td>
                        <td className="p-2.5">{row.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Import Summary */}
          {importSummary && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Import Complete!</h4>
              <p className="text-sm text-slate-300">
                Successfully imported <span className="font-bold text-emerald-400">{importSummary.imported}</span> records
                into PostgreSQL database.
              </p>
              {importSummary.failed > 0 && (
                <p className="text-xs text-rose-400">Skipped {importSummary.failed} rows due to validation errors.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            {importSummary ? 'Close' : 'Cancel'}
          </button>
          {!importSummary && (
            <button
              onClick={handleConfirmImport}
              disabled={previewData.length === 0}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-lg shadow-cyan-500/20"
            >
              Confirm Import ({previewData.length} Records)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
