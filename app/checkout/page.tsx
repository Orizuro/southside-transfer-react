"use client";

// import '.././styles.css'
import { useCallback } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { useForm, UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl, Controller } from "react-hook-form";
import { valibotResolver } from '@hookform/resolvers/valibot';

import { minLength, string, object } from 'valibot';
import * as v from 'valibot';

import { TbInfoTriangleFilled } from "react-icons/tb";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import { costumerDetails, tripInfo } from "@/app/module";
import No_ssr from "@/app/components/no_ssr";



/**
 * TODO add a better error for date, and make so it is impossible to book on the same day
 * TODO add a link to terms & conditions page
 */


const PaymentPage = () => {
  let dataTripInfo: {
    travelTime: string;
    timeOfPickup: string;
    dateOfPickup: string;
    origin: string;
    destination: string;
    totalLuggage: number;
    infant: number;
    additionInfo: string;
    price: number;
    nPassenger: number;
    adult: number;
    olddata: string;
    child: number
  };
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem("tripInfo")
    dataTripInfo = item ? JSON.parse(item) : { destination: "", nPassenger: 0, origin: "", time: "", price: 0 }
  } else {
    dataTripInfo = { destination: "", nPassenger: 0, origin: "", travelTime: "", price: 0, timeOfPickup: "", dateOfPickup: "", child: 0, additionInfo: "", adult: 0, infant: 0, olddata: "", totalLuggage: 0 }
  }

  const formSchema = object({
    firstName: string([
      minLength(1, 'Please enter your first name')
    ]),

    lastName: string([
      minLength(1, 'Please enter your last name')
    ]),

    email: string([
      minLength(1, 'Please enter your email.'),
      v.email('The email address is badly formatted.'),
    ]),

    phoneNumber: string([
      minLength(1, "Number is invalid")
    ]),

    payment: string([
      minLength(1, "Please enter the payment method")
    ]),

    additionalInformation: v.optional(v.string()),

    terms: v.literal(true, "Please accept our terms."),
  });

  // const [phoneNumber, setPhoneNumber] = useState("");

  type FormSchemaType = v.Output<typeof formSchema>

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: valibotResolver(formSchema),
  });

  const router = useRouter();
  const cancel = useCallback(() => {
    router.push("/pay");
  }, [router]);

  const origin = dataTripInfo.origin; // searchParams.get("origin");
  const destination = dataTripInfo.destination //searchParams.get("destination");
  // const searchParams = useSearchParams()


  const luggageOptions = [<option key={0} defaultValue={"--"} >--</option>];
  for (var i = 0; i <= 16; i++)
    luggageOptions.push(<option key={i}>{i}</option>);


  const onSubmit = (data: FormSchemaType) => {

    let cD: costumerDetails;
    cD = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.email,
      Payment: data.payment,
      PhoneNumber: data.phoneNumber,
    }
    localStorage.setItem("costumerDetails", JSON.stringify(cD))
    checkout(data);
  }

  async function checkout(dataform: FormSchemaType) {

    console.log("On checkout");

    if (dataform.payment == "Pay online") {
      console.log(dataTripInfo);
      const { data } = await axios.post(
        "/api",
        dataTripInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.assign(data);
    } else {
      router.push("/sucess");
    }



    // const data = await fetch('/stripe/api', {
    // 

    //     method: "POST",
    //     headers: {
    //     },
    //     body: JSON.stringify({ item: "some" })
    // }
    // ).then((data) => data.json());
  }

  function cancelForm() {
    cancel();
    localStorage.clear();
  }

  // if (!origin || !destination) {
  //   // Redirect to payment page
  //   return redirect("/pay");
  // }

  type InputProps = {
    label: string;
    register: UseFormRegisterReturn;
    name: string;
    type: string;
    autoComplete?: string;
    placeholder?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    className?: string;
    value?: string;
  }

  const nameInputClassName = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

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
              className={props.error ? nameInputClassName + " ring-error" : nameInputClassName}
              name={props.name}
              type={props.type}
              autoComplete='given-name'
            // onChange={props.onChange}
            />

            {props.error && (
              <div className='text-error font-bold  flex gap-2 py-1'>
                <TbInfoTriangleFilled className='text-lg' />
                <p className='text-sm'> {props.error.message?.toString()}</p>
              </div>
            )}

          </div>
        </div>

      </>
    )
  }

  type RadioProps = {
    value: string
  }

  const RadioInput = ({ value }: RadioProps) => (
    <>
      <input
        {...register("payment")}
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        type="radio"
        value={value}
      // aria-invalid={errors["Payment"] ? "true" : "false"}
      />
    </>
  )

  const personalInfoInputs = [
    Input({
      register: register('firstName'),
      name: "firstName",
      label: "First Name",
      type: "text",
      error: errors["firstName"],
      // showError: errors.firstName ? true : false,
    }),

    Input({
      register: register('lastName'),
      name: "lastName",
      label: "Last Name",
      type: "text",
      error: errors.lastName,
    }),

    Input({
      register: register("email"),
      name: "email",
      label: "Email Address",
      type: "email",
      error: errors.email
    })
  ];

  const phoneInputClassName = "block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

  return (
    <>
      <div className=' mx-4 my-4 lg:mx-48 lg:my-16'>
        <h1 className=' font-semibold text-2xl'> Final steps</h1>
        <br />
        <p className=' border-b border-gray-900/10 pb-4'> We just need some more information to finish the reservation.</p>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              {personalInfoInputs.map(input => input)}

              <div className="sm:col-span-4">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <PhoneInput
                      // {...register("")}
                      inputProps={{
                        // className: 'block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                        className: errors?.phoneNumber ? phoneInputClassName + " ring-error" : phoneInputClassName,
                        required: true,
                      }}
                      country={'pt'}
                      onChange={onChange}
                      enableSearch={true}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
                {
                  errors.phoneNumber &&
                  <small className="text-error font-bold flex gap-2 py-1">
                    <TbInfoTriangleFilled className='text-lg' />
                    {errors.phoneNumber?.message}
                  </small>
                }
              </div>

            </div>
          </div>
          <No_ssr>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Trip details</h2>
              <br />
              <div>
                <h1> From:</h1>
                <p> {origin}</p>
              </div>
              <br />
              <div>
                <h1> To: </h1>
                <p> {destination}</p>
              </div>
            </div>
          </No_ssr>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Additional information </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"> </label>
                <div className="mt-2">
                  <textarea
                    {...register("additionalInformation")}
                    id="aboutLuggage"
                    name="aboutLuggage"
                    rows={2}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Payment method</h2>
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <RadioInput value="Pay to the driver" />
                  <label
                    htmlFor="driver"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Pay to the driver
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <RadioInput value="Pay online" />
                  <label
                    htmlFor="online"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Pay online
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                {...register("terms")}
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            </div>

            <div className="text-sm leading-6">
              <label htmlFor="candidates"
                className="font-medium text-gray-900">
                I agree with <a href="/termsandconditions">&quot;Terms and Conditions&quot;</a>
              </label>

            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="btn btn-error text-sm font-semibold leading-6 text-whiteBg" onClick={cancelForm}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-whiteBg shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue
            </button>

          </div>
        </form >

      </div>

    </>
  )
}
//Misas10 wtf ??? <Sucess /> line 420
export default PaymentPage;
// function SafeParse(LoginSchema: v.ObjectSchema<{ firstName: v.StringSchema<string>; lastName: v.StringSchema<string>; email: v.StringSchema<string>; password: v.StringSchema<string>; }, undefined, { firstName: string; lastName: string; email: string; password: string; }>, arg1: { firstName: string; lastName: string; email: string; password: string; }) {
//   throw new Error('Function not implemented.');
// }

