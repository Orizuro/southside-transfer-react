import {string} from "valibot";
import { useForm, Path, ValidationRule, UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl, Controller } from "react-hook-form";
import {ChangeEventHandler} from "react";

interface tripInfo {
  destination: string,
  origin: string,
  price: number,
  nPassenger: number,
  time: string
}

interface costumerDetails {
  firstName: string
  lastName: string
  emailAddress: string
  dateOfPickup: string
  timeOfPickup: string
  TotalLuggage: number
  Payment: string
  PhoneNumber: string
}

