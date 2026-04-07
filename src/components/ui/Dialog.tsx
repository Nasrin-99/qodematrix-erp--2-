import React from "react";

export const Dialog = ({ open, onClose, children }: any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-[90%] max-w-4xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export const DialogTitle = ({ children }: any) => (
  <div className="text-lg font-bold p-4 border-b">{children}</div>
);

export const DialogDescription = ({ children }: any) => (
  <div className="text-sm text-gray-500 px-4 pb-2">{children}</div>
);

export const DialogBody = ({ children }: any) => (
  <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
);

export const DialogActions = ({ children }: any) => (
  <div className="p-4 border-t flex justify-end gap-2">{children}</div>
);