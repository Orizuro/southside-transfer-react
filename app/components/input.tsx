import { ChangeEventHandler } from "react";
import { Path, ValidationRule, UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface IFormValues {
  'First Name': string
  'Last Name': string
  'Email Address': string
  'Date of pickup': string
  'Time of pickup': string
  'Total Luggage': number
  'Payment': string
  'PhoneNumber': string
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegisterReturn;
  name: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  required?: boolean;
  inputValue?: string;
  showError?: boolean;
  pattern?: ValidationRule<RegExp>;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}


export const nameInputClassName = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
const Input = (props: InputProps) => {
  return (
    <>
      <div className={"sm:col-span-4"}>
        <label
          className="block text-sm font-medium leading-6 text-gray-900">
          {props.label}
        </label>

        <div className="mt-2">
          <input
            {...props.register}
            className={""}
            name={props.name}
            type={props.type}
            autoComplete='given-name'
          // onChange={props.onChange}
          />

          {props.error && (<p>{props.error.message?.toString()}</p>)}

        </div>
      </div>

    </>
  )
}

export default function Input2(props: InputProps) {
  return (
    <>
      <div className={"sm:col-span-4"}>
        <label
          className="block text-sm font-medium leading-6 text-gray-900">
          {props.label}
        </label>

        <div className="mt-2">
          <input
            {...props.register}
            className={""}
            name={props.name}
            type={props.type}
            autoComplete='given-name'
          // onChange={props.onChange}
          />

          {props.error && (<p>{props.error.message?.toString()}</p>)}

        </div>
      </div>

    </>
  )
}
