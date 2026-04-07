import React from "react";
import { cn } from "../../utils/helpers";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const Table = ({
  headers,
  children,
  className,
  isLoading,
  isEmpty,
}: TableProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-slate-200",
        className
      )}
    >
      <table className="w-full text-left text-sm">
        
        {/* HEADER */}
        <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-3 border-b border-slate-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-200 bg-white">
          {isLoading ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-slate-500"
              >
                Loading...
              </td>
            </tr>
          ) : isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-6 text-slate-500"
              >
                No data found
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>

      </table>
    </div>
  );
};


// ===============================
// ROW
// ===============================
export const TableRow = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) => {
  return (
    <tr
      className={cn(
        "hover:bg-slate-50 transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
};


// ===============================
// CELL
// ===============================
export const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td
      className={cn(
        "px-6 py-4 whitespace-nowrap text-slate-700",
        className
      )}
    >
      {children}
    </td>
  );
};


// ===============================
// ACTION CELL
// ===============================
export const TableActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <td className="px-6 py-4 text-right space-x-2">
      {children}
    </td>
  );
};