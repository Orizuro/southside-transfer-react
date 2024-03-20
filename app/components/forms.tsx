
interface Props {
  label: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  inputValue: string;
  showError?: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}
const FormElement: React.FC<Props> = ({ label, type, placeholder, autoComplete, required, onInputChange, onSubmit, errorMessage, showError = false }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const requiredClass = required ? required : true;

  return <div className={"sm:col-span-4"}>
    <label
      className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        autoFocus={!showError}
        required={requiredClass}
        onChange={handleInputChange}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      <span className="text-xs" hidden={!showError}>{errorMessage}</span>
    </div>
  </div>

}

export default FormElement;
