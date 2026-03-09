import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, className, children }: FormFieldProps) {
  const combined = ["form-field", className].filter(Boolean).join(" ");
  return (
    <div className={combined}>
      <label className="form-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
