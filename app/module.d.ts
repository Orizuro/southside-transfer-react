import { string } from "valibot";
import { useForm, Path, ValidationRule, UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl, Controller } from "react-hook-form";
import { ChangeEventHandler } from "react";

interface tripInfo {
  destination: string,
  origin: string, olddata
  price: number,
  nPassenger: number,
  adult: number
  child: number,
  infant: number,
  travelTime: string
  dateOfPickup: string
  timeOfPickup: string
  totalLuggage: number
  additionInfo: string | undefined
  flightNumber: string | undefined
  displayedName: string | undefined
}

interface costumerDetails {
  firstName: string
  lastName: string
  emailAddress: string
  Payment: string
  PhoneNumber: string
}

