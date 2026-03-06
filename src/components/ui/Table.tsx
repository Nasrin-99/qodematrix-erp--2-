import React from 'react';
import { cn } from '../../utils/helpers';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ headers, children, className }: TableProps) => {
  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-slate-200', className)}>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-3 border-b border-slate-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ children, className, onClick, ...props }: { children: React.ReactNode; className?: string; onClick?: () => void; [key: string]: any }) => (
  <tr 
    className={cn('hover:bg-slate-50 transition-colors', onClick && 'cursor-pointer', className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={cn('px-6 py-4 whitespace-nowrap text-slate-700', className)}>
    {children}
  </td>
);
