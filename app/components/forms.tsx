import { ReactNode } from "react";

interface Props {
  htmlFor: string;
  label: string;
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  colSpan: string;
  placeholder?: string;
  required?: boolean;
}
export default function FormElement({ htmlFor, label, type, name, id, autoComplete, colSpan, placeholder, required }: Props) {
  const colSpanClass = 'sm:col-span-4';
  const requiredClass = required ? required : true;
  return <div className={colSpanClass}>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        required={requiredClass}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        autoComplete={autoComplete}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
  </div>

}
