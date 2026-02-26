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

/**
 * Renders a labeled, controlled input connected to react-hook-form with optional left and right adornments and inline error display.
 *
 * @param name - The form field path used as the input id and controller name
 * @param label - Text shown in the associated Label component
 * @param placeholder - Placeholder text for the input
 * @param type - Input type attribute (defaults to `"text"`)
 * @param control - react-hook-form Control object that manages the field
 * @param iconBefore - Optional icon component rendered inside the input at the left
 * @param iconAfter - Optional element rendered inside the input at the right
 * @param disabled - Whether the input is disabled
 * @param autoComplete - Value for the input's autocomplete attribute
 * @returns The JSX element for a controlled auth form field with validation error rendering
 */
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
                "h-11 pl-10",
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
