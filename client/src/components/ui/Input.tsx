import { 
  forwardRef, 
  type InputHTMLAttributes, 
  type TextareaHTMLAttributes 
} from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

// 1. Витягуємо чисті атрибути, прибираючи ті, що конфліктують
type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

// 2. Створюємо тип для нашого компонента через Omit, щоб уникнути конфлікту autoComplete та інших
type InputProps = Omit<BaseInputProps, 'autoComplete'> & {
  label: string;
  error?: string;
  isTextArea?: boolean;
  autoComplete?: string; // Оголошуємо заново як універсальний рядок
};

const Input = forwardRef<any, InputProps>(
  ({ label, error, isTextArea, className, ...props }, ref) => {
    const Component = isTextArea ? "textarea" : "input";
    
    return (
      <div className="w-full space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <Component
            // @ts-ignore
            ref={ref}
            className={cn(
              "w-full px-4 py-2 border rounded-lg outline-none transition-all disabled:bg-gray-50",
              error 
                ? "border-red-500 bg-red-50 focus:ring-red-100" 
                : "border-gray-200 focus:ring-2 focus:ring-orange-500",
              className
            )}
            // Використовуємо any для пропсів, бо TypeScript не може автоматично
            // розподілити атрибути між двома різними HTML-тегами
            {...(props as any)}
          />
          {error && !isTextArea && (
            <AlertCircle className="absolute right-3 top-2.5 text-red-500" size={18} />
          )}
        </div>
        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;