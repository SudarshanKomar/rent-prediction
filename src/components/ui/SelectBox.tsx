import React, { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder?: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  options,
  placeholder = 'Select an option',
  className,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-900 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          className={cn(
            "appearance-none w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};