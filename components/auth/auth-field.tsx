import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: string;
  control: Control<T>;
  iconBefore?: React.ElementType; // Keep as ElementType for simple icons
  iconAfter?: React.ReactNode; // Change to ReactNode for buttons/elements
  disabled?: boolean;
}

export function AuthField<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  control,
  iconBefore: IconBefore,
  iconAfter, // Destructure as lowercase
  disabled,
  autoComplete,
}: FieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={name}>{label}</Label>
          <div className="relative">
            {IconBefore && (
              <IconBefore className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            )}
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              className={cn(
                "h-11",
                IconBefore && "pl-10",
                iconAfter && "pr-10", // Add this to prevent text overlap
                fieldState.error && "border-destructive",
              )}
            />
            {iconAfter && (
              <div className="absolute right-0 top-0 h-full flex items-center justify-center">
                {iconAfter}
              </div>
            )}
          </div>
          {fieldState.error && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
