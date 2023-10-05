import { useMutation } from "@apollo/client";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import { useState } from "react";

import {
  AdminAllBookingsDocument,
  AdminBookingFragment,
  DeclineBookingDocument,
  SendEmailDocument,
} from "@/generated/graphql";
import { convertDateFormat, getDecisionEmailInput, toStringChosenCabins } from "@/utils/cabins";

type DialogProps = {
  bookingToBeDeclined?: AdminBookingFragment;
  setBookingToBeDeclined: React.Dispatch<React.SetStateAction<AdminBookingFragment | undefined>>;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  refetchBookings: () => void;
};

export const DeclineBookingDialog: React.VFC<DialogProps> = ({
  bookingToBeDeclined: bookingToBeDeclined,
  setBookingToBeDeclined,
  setOpenSnackbar,
  setSnackbarMessage,
  refetchBookings,
}) => {
  const [declineMessage, setDeclineMessage] = useState("");
  const [declineBooking] = useMutation(DeclineBookingDocument, {
    refetchQueries: [{ query: AdminAllBookingsDocument }],
  });
  const handleDeclineBookingOnClose = () => setBookingToBeDeclined(undefined);
  const [sendEmail] = useMutation(SendEmailDocument);

  return (
    <Dialog open={bookingToBeDeclined != undefined} onClose={handleDeclineBookingOnClose}>
      <DialogTitle>
        Underkjenning av booking fra {bookingToBeDeclined?.firstName} {bookingToBeDeclined?.lastName} fra{" "}
        {convertDateFormat(bookingToBeDeclined?.checkIn)} til {convertDateFormat(bookingToBeDeclined?.checkOut)} av{" "}
        {toStringChosenCabins(bookingToBeDeclined ? bookingToBeDeclined.cabins : [])}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Er du sikker på at du vil underkjenne denne bookingen?</DialogContentText>
        <DialogContentText>
          Det kan være nyttig for {bookingToBeDeclined?.firstName} å få vite hvorfor dere avslår søknaden om booking.
          Hvis dere vil oppgi grunnen til avslag, kan dere gjøre det nedenfor.
        </DialogContentText>
        <TextField
          placeholder="Grunn til avslag..."
          multiline
          rows={6}
          fullWidth
          onChange={(e) => setDeclineMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeclineBookingOnClose} variant="contained">
          Avbryt
        </Button>
        <Button
          onClick={() => {
            if (bookingToBeDeclined) {
              sendEmail({ variables: getDecisionEmailInput(bookingToBeDeclined, false, declineMessage) });
              declineBooking({ variables: { id: bookingToBeDeclined.id, declineReason: declineMessage } }).then(() => {
                setSnackbarMessage(`Bookingen er underkjent. Mail er sendt til ${bookingToBeDeclined.receiverEmail}.`);
                setOpenSnackbar(true);
                refetchBookings();
              });
            }
            handleDeclineBookingOnClose();
          }}
          color="primary"
          variant="contained"
        >
          Underkjenn booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};