"use client";
import React, {ChangeEventHandler, useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import ProductQuantity from '../components/numberselector';
import { tripInfo } from "@/app/module";
import No_ssr from "@/app/components/no_ssr";
import { nameInputClassName } from '../components/input';
import * as v from 'valibot';
import {minLength, string, object, number, minValue, any} from 'valibot';
import { useForm, Path, ValidationRule, UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl, Controller } from "react-hook-form";
import {valibotResolver} from "@hookform/resolvers/valibot";
import { redirect, useRouter } from 'next/navigation'

interface MapComponentProps { }

const MapComponent: React.FC<MapComponentProps> = () => {


  let data: tripInfo;
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem("tripInfo");
    data = item ? JSON.parse(item) : { destination: "", nPassenger: 0, origin: "", time: "", price: 0 }
  } else {
    data = { destination: "", nPassenger: 0, origin: "", time: "", price: 0 }
  }

  const [adult, setAdultN] = useState<number>(0);
  const [child, setChildN] = useState<number>(0);
  const [infant, setInfantN] = useState<number>(0);
  const [passagetSum, setPassagetSum] = useState<number>(0);
  const [meetAndGreet, setMeet] = useState<boolean>(false);
  useEffect(() => { setPassagetSum(adult + child + infant) }, [adult, child, infant]);

  const [dateTime, setDateTime] = useState("");
  const [totalSuicases, setTotalSuicases] = useState(0);

  const today = new Date().toISOString().slice(0, 10)
  const formSchema = object({
      numSuitcases: v.coerce(
          v.number([v.toMinValue(0)]),
          Number,
      ),
      pickupDate: v.string([
          v.minValue(today),
          minLength(1, "Please enter the pickup Time")
      ]),

      pickupTime: string([
          minLength(1, "Please enter the pickup Time")
      ]),
      additionalInformation: v.optional(v.string()),
      /*
      greatAndMeet: string([
          minLength(1)
      ]),
       */
  })
    type FormSchemaType = v.Output<typeof formSchema>
    const router = useRouter();
    const cancel = useCallback(() => {
        router.push("/");
    }, [router]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: valibotResolver(formSchema),
    });

    const luggageOptions = [<option key={0} defaultValue={"--"} >--</option>];
    for (var i = 0; i <= 16; i++)
        luggageOptions.push(<option key={i}>{i}</option>);


    const onSubmit = (newdata: FormSchemaType) => {
        data.additionInfo = newdata.additionalInformation;
        data.dateOfPickup = newdata.pickupDate;
        data.timeOfPickup = newdata.pickupTime;
        data.TotalLuggage = newdata.numSuitcases;
        data.infant = infant;
        data.child = child;
        data.adult = adult;
        localStorage.setItem("tripInfo", JSON.stringify(data))
    }
    function cancelForm() {
        cancel();
        localStorage.clear();
    }
    type InputProps = {
        label: string;
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
    var _nameInputClassName = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

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
                            className={_nameInputClassName}
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
    const tripDetailsInfo = [
        Input({
            register: register("pickupDate"),
            label: "Date Of Pickup",
            type: "date",
            name: "pickupDate",
            error: errors.pickupDate,
            // onChange: (e) => setLastName(e.target.value)
        }),

        Input({
            register: register("pickupTime"),
            label: "Time Of Pickup",
            type: "time",
            name: "pickupTime",
            error: errors.pickupTime,
            // onChange: (e) => set(e.target.value)
        })

    ]
  function OptionsWithNumbers(maxPassengers: any) {

    var options = [<option key={0} defaultValue={"--"} >--</option>];
    for (var i = 1; i <= Number(maxPassengers); i++)
      options.push(<option key={i}>{i}</option>);


    return options
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className='justify-center justify-items-center  grid grid-flow-row auto-rows-max '>

              <div className=' '>
                  <div className='text-3xl p-5 text-center font-medium'> We just need some more details about your tripe
                  </div>
              </div>
              <No_ssr>
                  <div className='border rounded-xl w-3/5 p-5 '>
                      <div className='text-4xl text-center font-bold'> {data.price} €</div>
                  </div>
              </No_ssr>
              <div className='mt-6'>
                  <div className='text-xl text-center '> Select the options bellow, all of them are free of charge</div>
              </div>


              <div className='my-6'>
                  <div className='text-xl'> Would you like a meet and great service?</div>
                  <div className='grid grid-cols-2 justify-items-center my-2'>
                      <div className="flex">
                          <div>
                              <label
                                  className=" border-2 border-[#ECF0F1] flex items-center justify-between rounded-lg bg-white py-2 px-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 "
                                  htmlFor="DeliveryStandard"
                              >
                                  <div>
                                      <p className="text-gray-700">Yes</p>
                                  </div>
                                  <input className='sr-only'
                                         type="radio"
                                         id="DeliveryStandard"
                                         value="DeliveryStandard"
                                         checked={meetAndGreet}
                                         onChange={() => setMeet(true)}
                                  >
                                  </input>
                              </label>
                          </div>

                      </div>
                      <div className="flex ">
                          <div>
                              <label
                                  className=" border-2 border-[#ECF0F1] flex items-center justify-between rounded-lg bg-white py-2 px-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 "
                                  htmlFor="option1"
                              >
                                  <div>
                                      <p className="text-gray-700">No</p>
                                  </div>
                                  <input className='sr-only'
                                         type="radio"
                                         id="option1"
                                         value="option1"
                                         checked={!meetAndGreet}
                                         onChange={() => setMeet(false)}>
                                  </input>
                              </label>
                          </div>

                      </div>

                  </div>

                  {meetAndGreet && // if it's true return the actual JSX
                      <div className="form-group grid-rows-2 ">
                          <div className=''>
                              <label>Number of flight</label>
                              <input type="text" name=""
                                     className="block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                          </div>
                          <div>
                              <div className=''>
                                  <label>Name to be displayed</label>
                                  <input type="text" name=""
                                         className="block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                              </div>
                          </div>
                      </div>

                  }

              </div>

              <div> Date and time of pick up</div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  {tripDetailsInfo.map(input => input)}

              </div>
              <div>

                  <div className='text-xl '> Select the passenger so we can bring the right seats</div>

              </div>
              <button className='  text-gray-600 transition hover:opacity-75 px-4 ml-5 border rounded-lg shadow-xl'
                      onClick={() => {
                          setAdultN(data.nPassenger), setChildN(0), setInfantN(0)
                      }}> All adults
              </button>

              <div className='carousel  w-full lg:w-3/4 gap-2 py-5  '>
                  <div className='carousel-item pl-2 '>
                      <ProductQuantity

                          productQuantity={adult}
                          setProductQuantity={setAdultN}
                          age={"older then 13 years"}
                          title={'Adults'} max={data.nPassenger}
                          total={passagetSum}
                          image="/icons/man.png"
                          scale={'100'}>
                      </ProductQuantity>
                  </div>
                  <div className='carousel-item'>
                      <ProductQuantity
                          productQuantity={child}
                          setProductQuantity={setChildN}
                          age={"less then 13 years"}
                          title={'Children'}
                          max={data.nPassenger}
                          total={passagetSum}
                          image="/icons/child.png"
                          scale={'75'}>
                      </ProductQuantity>
                  </div>
                  <div className='carousel-item pr-2'>
                      <ProductQuantity
                          productQuantity={infant}
                          setProductQuantity={setInfantN}
                          age={"less then 3 years"}
                          title={'Infants'}
                          max={data.nPassenger}
                          total={passagetSum}
                          image="/icons/infante.png"
                          scale={'75'}>
                      </ProductQuantity>
                  </div>

              </div>

              <div className="sm:col-span-1">
                  <label
                      htmlFor="number"
                      className="block text-sm font-medium leading-6 text-gray-900">Number of Suitcases</label>
                  <div className="mt-2">
                      <select
                          {...register("numSuitcases")}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                          {luggageOptions}
                      </select>
                  </div>
              </div>
              <div className="col-span-full">
                  <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"> Any additional information </label>
                  <div className="mt-2">
                  <textarea
                      {...register("additionalInformation")}
                      id="aboutLuggage"
                      name="aboutLuggage"
                      rows={2}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
              </div>

              <div className=' flex justify-between'>

                  <Link
                      onClick={() => {
                          data.time = dateTime
                          // Adicionar o total de suitcases
                          localStorage.setItem("tripInfo", JSON.stringify(data))
                      }
                      }
                      className='font-bold bg-gradient-to-tr from-blue to-green hover:bg-gradient-radial rounded-full px-8 py-4'
                      href={{
                          pathname: '/checkout',
                      }}
                  >
                      Next
                  </Link>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="btn btn-error text-sm font-semibold leading-6 text-whiteBg"
                          onClick={cancelForm}>
                      Cancel
                  </button>
                  <button
                      type="submit"
                      className="btn btn-success rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-whiteBg shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                      Continue
                  </button>

              </div>
        </div>
      </form>


)

}

export default MapComponent;
