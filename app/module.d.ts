import { string } from "valibot";

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
