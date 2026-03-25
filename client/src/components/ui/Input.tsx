import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>,
  "autoComplete"
> {
  label: string;
  error?: string;
  isTextArea?: boolean;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, isTextArea, className, ...props }, ref) => {
    const baseStyles = cn(
      "w-full px-4 py-2 border rounded-lg outline-none transition-all disabled:bg-gray-50",
      error
        ? "border-red-500 bg-red-50 focus:ring-red-100"
        : "border-gray-200 focus:ring-2 focus:ring-orange-500",
      className,
    );

    return (
      <div className="w-full space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <div className="relative">
          {isTextArea ? (
            <textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              className={cn(baseStyles, "min-h-25 resize-y")}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              className={cn(baseStyles, "h-11")}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {error && !isTextArea && (
            <AlertCircle
              className="absolute right-3 top-2.5 text-red-500"
              size={18}
            />
          )}
        </div>

        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
