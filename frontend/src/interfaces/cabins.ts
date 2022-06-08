import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

export interface BasicBooking {
  firstName: string;
  lastName: string;
  phone: string;
  receiverEmail: string;
}

export interface PublicBooking {
  id: string;
  checkIn: string;
  checkOut: string;
  cabins: Cabin[];
}

export interface Participants {
  internalParticipants: number;
  externalParticipants: number;
}

export interface Booking extends BasicBooking, PublicBooking, Participants {
  price: number;
  isTentative: boolean;
  isDeclined: boolean;
}
export interface BookingFromQuery extends Booking {
  timestamp: Date;
  extraInfo: string;
  declineReason: string;
  __typename: string;
}

export type InputFieldsEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  | SelectChangeEvent<number>
  | SelectChangeEvent<string>;

export interface Cabin {
  id: string;
  name: string;
  maxGuests: number;
  internalPrice: number;
  externalPrice: number;
}

export type ContactInfo = BasicBooking & Participants;
export type ContactInfoValidations = Record<keyof ContactInfo, boolean>;

export interface DatePick {
  checkInDate?: string;
  checkOutDate?: string;
  isValid?: boolean;
}

export interface ModalData {
  contractViewed: boolean;
  displayPopUp: boolean;
}

export interface EmailAndBookingInput extends ContactInfo {
  cabins: number[];
  checkIn?: string;
  checkOut?: string;
  extraInfo: string;
}

export interface BookingResponsible {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  active: boolean;
}
