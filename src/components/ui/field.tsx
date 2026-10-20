import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import { Check, Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-soft focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 disabled:opacity-60";

export function Label({
  htmlFor,
  children,
  className,
}: {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("text-sm font-medium text-ink", className)}>
      {children}
    </label>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldClass, "min-h-28 resize-y py-2 leading-6", className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldClass, className)} {...props}>
      {children}
    </select>
  );
}

export function PasswordInput({
  id,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        className={cn(fieldClass, "pr-12", className)}
        type={visible ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        className="absolute top-1/2 right-1 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-ink-soft hover:text-ink"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  id,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: ReactNode;
  id?: string;
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <label htmlFor={fieldId} className="flex items-start gap-3 text-sm leading-6">
      <CheckboxPrimitive.Root
        id={fieldId}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border border-line bg-surface data-[state=checked]:border-brand data-[state=checked]:bg-brand"
      >
        <CheckboxPrimitive.Indicator>
          <Check className="size-3.5 text-brand-foreground" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

export function RadioCards({
  value,
  onValueChange,
  name,
  options,
}: {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  options: Array<{ value: string; title: string; body: string }>;
}) {
  return (
    <RadioPrimitive.Root
      name={name}
      value={value}
      onValueChange={onValueChange}
      className="grid gap-3"
      aria-label={name}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex cursor-pointer gap-3 rounded-lg border bg-surface p-4",
            value === option.value ? "border-brand ring-2 ring-brand/20" : "border-line",
          )}
        >
          <RadioPrimitive.Item
            value={option.value}
            className="mt-1 size-4 shrink-0 rounded-full border border-line bg-surface data-[state=checked]:border-accent data-[state=checked]:bg-accent"
          />
          <span>
            <span className="block font-medium">{option.title}</span>
            <span className="mt-1 block text-sm text-ink-soft">{option.body}</span>
          </span>
        </label>
      ))}
    </RadioPrimitive.Root>
  );
}
