"use client";
import React, {ChangeEventHandler, useCallback, useEffect, useState} from 'react';
import ProductQuantity from '../components/numberselector';
import {tripInfo} from "@/app/module";
import No_ssr from "@/app/components/no_ssr";
import * as v from 'valibot';
import {minLength, object, string} from 'valibot';
import {FieldError, FieldErrorsImpl, Merge, useForm, UseFormRegisterReturn, ValidationRule} from "react-hook-form";
import {valibotResolver} from "@hookform/resolvers/valibot";
import {redirect, useRouter} from 'next/navigation'
import {IoIosInformationCircleOutline} from "react-icons/io";
import Link from "next/link";

interface MapComponentProps {
}

const MapComponent: React.FC<MapComponentProps> = () => {


    let data: tripInfo;
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem("tripInfo");
        data = item ? JSON.parse(item) : {destination: "", nPassenger: 0, origin: "", time: "", price: 0}
    } else {
        data = {
            destination: "",
            nPassenger: 0,
            origin: "",
            travelTime: "",
            price: 0,
            timeOfPickup: "",
            dateOfPickup: "",
            child: 0,
            additionInfo: "",
            adult: 0,
            infant: 0,
            olddata: "",
            totalLuggage: 0,
            flightNumber: "",
            displayedName: "",
        }
    }

    const [adult, setAdultN] = useState<number>(0);
    const [child, setChildN] = useState<number>(0);
    const [infant, setInfantN] = useState<number>(0);
    const [passagerSum, setPassagerSum] = useState<number>(0);
    const [meetAndGreet, setMeet] = useState<boolean>(false);
    const [showPassagerError, setShowPassagerError] = useState(false);

    useEffect(() => {
        setPassagerSum(adult + child + infant);

        if (data.nPassenger == 0) redirect("/");

    }, [adult, child, infant, data.nPassenger]);

    const [dateTime, setDateTime] = useState("");
    const [totalSuicases, setTotalSuicases] = useState(0);

    const today = new Date().toISOString().slice(0, 10)

    const formSchema = object({
        numSuitcases: v.coerce(
            v.number([v.toMinValue(0)]),
            Number,
        ),
        pickupDate: v.string([
            v.minValue(today + 1, " Select a date that is at least one day in advance"),
            minLength(1, "Please enter the pickup Time")
        ]),

        pickupTime: string([
            minLength(1, "Please enter the pickup Time")
        ]),
        additionalInformation: v.optional(v.string()),

        flightNumber: v.optional(v.string()),

        displayedName: v.optional(v.string()),
    })

    type FormSchemaType = v.Output<typeof formSchema>
    const router = useRouter();
    const cancel = useCallback(() => {
        router.push("/");
    }, [router]);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormSchemaType>({
        resolver: valibotResolver(formSchema),
    });

    const luggageOptions = [<option key={0} defaultValue={"--"}>--</option>];
    for (var i = 0; i <= 16; i++)
        luggageOptions.push(<option key={i}>{i}</option>);

    //TODO make sure that the passagetSum == data.nPassenger before passing to the next page
    const onSubmit = (newData: FormSchemaType) => {
        if (passagerSum < data.nPassenger) return null;

        data.additionInfo = newData.additionalInformation;
        data.dateOfPickup = newData.pickupDate;
        data.timeOfPickup = newData.pickupTime;
        data.totalLuggage = newData.numSuitcases;
        data.infant = infant;
        data.child = child;
        data.adult = adult;
        data.flightNumber = newData.flightNumber;
        data.displayedName = newData.displayedName;

        localStorage.setItem("tripInfo", JSON.stringify(data));
        router.push('/checkout')
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

        var options = [<option key={0} defaultValue={"--"}>--</option>];
        for (var i = 1; i <= Number(maxPassengers); i++)
            options.push(<option key={i}>{i}</option>);


        return options
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='justify-center justify-items-center  grid grid-flow-row auto-rows-max '>
                <div className=' '>
                    <div className='text-3xl p-5 text-center font-medium'> We just need some more details about your
                        tripe
                    </div>
                </div>
                <No_ssr>
                    <div className='border rounded-xl w-3/5 p-3 '>
                        <div className={' font-light text-center pb-1 '}> Your trip will cost</div>
                        <div className='text-4xl text-center font-bold'> {data.price} €</div>
                    </div>
                </No_ssr>

                <div className={'p-5 w-full'}>
                    <div className={''}> Please select date and time of pick up</div>
                    <div className=" mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        {tripDetailsInfo.map(input => input)}

                    </div>
                </div>
                <div>
                    <div className='p-5 bg-blueLight'>
                        <div className=' text-lg font-light '> Included in the price are all of the options below so
                            feel free to select what you need
                        </div>
                    </div>
                </div>
                <div className='p-5 w-full'>
                    <div className="form-group grid-rows-2 py-5">
                        <div className=''>
                            <label>Number of flight</label>
                            <input
                                {...register("flightNumber")}
                                type="text" name="flightNumber"
                                className="block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div>
                            <div className=''>
                                <label>Name to be displayed</label>
                                <input
                                    {...register("displayedName")}
                                    type="text" name="displayedName"
                                    className="block w-full rounded-md border-0 px-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"px-5"}>
                        <div className='text-xl text-center '> Please specify the passenger so we can bring the proper
                            seats.
                        </div>
                    </div>
                    <div className=' justify-center flex py-5'>
                        <button
                            className='  text-gray-600 transition hover:opacity-75 px-4 ml-5 border rounded-lg shadow-xl'
                            onClick={() => {
                                setAdultN(data.nPassenger), setChildN(0), setInfantN(0)
                            }}> All adults
                        </button>
                    </div>
                    {(showPassagerError && passagerSum != data.nPassenger) &&
                        <div className='flex gap-2 py-4 place-items-center justify-center'>
                            <IoIosInformationCircleOutline className='text-lg'/>
                            <p className=" text-[#C70039]"> Not all people are selected, there&apos;s still {data.nPassenger - passagerSum} to select</p>
                        </div>
                    }
                    <div className='carousel w-full  gap-2 pb-10 justify-center '>
                        <div className='carousel-item pl-2 '>
                            <ProductQuantity
                                productQuantity={adult}
                                setProductQuantity={setAdultN}
                                age={"older then 13 years"}
                                title={'Adults'} max={data.nPassenger}
                                total={passagerSum}
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
                                total={passagerSum}
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
                                total={passagerSum}
                                image="/icons/infante.png"
                                scale={'75'}>
                            </ProductQuantity>
                        </div>
                    </div>
                </div>
                <div className=' p-5 w-full '>
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
                            className="block text-sm font-medium leading-6 text-gray-900"> Any additional
                            information </label>
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
                <div className="flex items-center justify-end gap-x-6 p-5">
                    <button type="button" className="btn btn-error text-sm font-semibold leading-6 text-whiteBg"
                            onClick={cancelForm}>
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (passagerSum < data.nPassenger)
                                setShowPassagerError(true);

                            else
                                setShowPassagerError(false);
                        }}
                        type="submit"
                        className="btn btn-success rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-whiteBg shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Continue
                    </button>

                </div>
            </div>
        </form>
    )
}
export default MapComponent;
