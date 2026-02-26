import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative">{children}</div>
    </div>
  );
};

const DialogContent = ({ className, children, ...props }) => (
  <div
    className={cn(
      "bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
);

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex justify-end space-x-2 mt-4", className)} {...props} />
);

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props} />
);

const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-gray-600 mt-2", className)} {...props} />
);

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};