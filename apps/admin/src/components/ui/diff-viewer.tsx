import React from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

interface DiffViewerProps {
  currentData: Record<string, any>;
  proposedData: Record<string, any>;
  labels?: Record<string, string>;
}

export function DiffViewer({ currentData, proposedData, labels = {} }: DiffViewerProps) {
  // Combine all keys from both datasets
  const allKeys = Array.from(new Set([...Object.keys(currentData), ...Object.keys(proposedData)]));

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white text-xs">
      <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200 font-semibold text-slate-700 py-3 px-4">
        <div className="col-span-3">Trường thông tin</div>
        <div className="col-span-4 text-slate-600">Dữ liệu hiện tại (Public)</div>
        <div className="col-span-1 text-center"></div>
        <div className="col-span-4 text-[#5932EA]">Dữ liệu đề xuất mới</div>
      </div>

      <div className="divide-y divide-slate-100">
        {allKeys.map((key) => {
          const currentVal = currentData[key];
          const proposedVal = proposedData[key];
          const isChanged = JSON.stringify(currentVal) !== JSON.stringify(proposedVal);
          const fieldLabel = labels[key] || key;

          return (
            <div
              key={key}
              className={`grid grid-cols-12 items-center py-3.5 px-4 transition-colors ${
                isChanged ? "bg-amber-50/40" : "hover:bg-slate-50/50"
              }`}
            >
              <div className="col-span-3 font-medium text-slate-700">
                <span>{fieldLabel}</span>
                {isChanged && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    Thay đổi
                  </span>
                )}
              </div>

              <div className="col-span-4 text-slate-600 pr-2">
                <span className="break-words">
                  {currentVal != null ? String(currentVal) : <span className="italic text-slate-400">Trống</span>}
                </span>
              </div>

              <div className="col-span-1 flex items-center justify-center text-slate-400">
                {isChanged ? <ArrowRight className="size-4 text-[#5932EA]" /> : <Check className="size-3.5 text-slate-300" />}
              </div>

              <div className="col-span-4 font-medium">
                {isChanged ? (
                  <span className="text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded border border-emerald-200 break-words block">
                    {proposedVal != null ? String(proposedVal) : <span className="italic text-rose-400">Xóa bỏ</span>}
                  </span>
                ) : (
                  <span className="text-slate-500 break-words">
                    {proposedVal != null ? String(proposedVal) : "—"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
