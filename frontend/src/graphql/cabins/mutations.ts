import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($bookingData: BookingInput) {
    createBooking(bookingData: $bookingData) {
      ok
    }
  }
`;

export const SEND_EMAIL = gql`
  mutation SendEmail($emailInput: EmailInput) {
    sendEmail(emailInput: $emailInput) {
      ok
    }
  }
`;

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($id: ID!) {
    updateBooking(bookingData: { id: $id, isTentative: false, isDeclined: false }) {
      ok
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      ok
    }
  }
`;

export const UPDATE_BOOKING_SEMESTER = gql`
  mutation UpdateBookingSemester($semesterData: UpdateBookingSemesterInput) {
    updateBookingSemester(semesterData: $semesterData) {
      bookingSemester {
        id
      }
    }
  }
`;

export const DECLINE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $declineReason: String) {
    updateBooking(bookingData: { id: $id, isTentative: false, isDeclined: true, declineReason: $declineReason }) {
      ok
    }
  }
`;

export const UPDATE_CABIN = gql`
  mutation UpdateCabin($cabinData: UpdateCabinInput) {
    updateCabin(cabinData: $cabinData) {
      cabin {
        id
      }
    }
  }
`;
