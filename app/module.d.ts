import {string} from "valibot";
import { useForm, Path, ValidationRule, UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl, Controller } from "react-hook-form";
import {ChangeEventHandler} from "react";

interface tripInfo {
    destination: string,
    origin: string,olddata
    price: number,
    nPassenger: number,
    adult: number
    child: number,
    infant: number,
    time: string
    dateOfPickup: string
    timeOfPickup: string
    TotalLuggage: number
    additionInfo: string | undefined
}

interface costumerDetails {
    firstName: string
    lastName: string
    emailAddress: string
    Payment: string
    PhoneNumber: string
}

