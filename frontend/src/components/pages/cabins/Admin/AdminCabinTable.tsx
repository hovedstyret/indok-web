import { useMutation } from "@apollo/client";
import { Check, Clear } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

import {
  AdminAllBookingsDocument,
  AdminBookingFragment,
  ConfirmBookingDocument,
  SendEmailDocument,
} from "@/generated/graphql";

import { DeclineBookingDialog } from "./DeclineBookingDialog";
import { getDecisionEmailInput } from "./getDecisionEmailInput";
import { InlineTableCell } from "./InlineTableCell";

type Props = {
  bookings?: AdminBookingFragment[];
  refetchBookings: () => void;
  currentTab: string;
};

export const AdminCabinTable: React.FC<Props> = ({ bookings, refetchBookings, currentTab }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [bookingToBeDeclined, setBookingToBeDeclined] = useState<AdminBookingFragment | undefined>();
  const [confirmBooking] = useMutation(ConfirmBookingDocument, {
    refetchQueries: [{ query: AdminAllBookingsDocument }],
  });
  const [sendEmail] = useMutation(SendEmailDocument);

  const isExpired = (booking: AdminBookingFragment) => dayjs().isAfter(booking.checkIn);
  const isDeclinedTab = currentTab === "declined";

  return (
    <TableContainer component={Paper}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
      <DeclineBookingDialog
        bookingToBeDeclined={bookingToBeDeclined}
        setBookingToBeDeclined={setBookingToBeDeclined}
        setSnackbarMessage={setSnackbarMessage}
        setOpenSnackbar={setOpenSnackbar}
        refetchBookings={refetchBookings}
      />
      <Table size="small" style={{ display: "table" }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Navn</TableCell>
            <TableCell align="right">Epost</TableCell>
            <TableCell align="right">Telefonnummer</TableCell>
            <TableCell align="right">Innsjekk</TableCell>
            <TableCell align="right">Utsjekk</TableCell>
            <TableCell align="right">Hytte</TableCell>
            <TableCell align="right">Handlinger</TableCell>
            <TableCell align="right">Tidspunkt</TableCell>
            <TableCell align="right">Antall indøkere</TableCell>
            <TableCell align="right">Antall eksterne</TableCell>
            <TableCell align="right">Info fra bruker</TableCell>
            {isDeclinedTab ? <TableCell align="right">Grunn til avslag</TableCell> : <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <InlineTableCell>{`${booking.firstName} ${booking.lastName}`}</InlineTableCell>
              <InlineTableCell>{booking.receiverEmail}</InlineTableCell>
              <InlineTableCell>{booking.phone}</InlineTableCell>
              <InlineTableCell>{booking.checkIn}</InlineTableCell>
              <InlineTableCell>{booking.checkOut}</InlineTableCell>
              <InlineTableCell>{booking.cabins.map((cabin) => cabin.name).join(" og ")}</InlineTableCell>
              <InlineTableCell>
                <Tooltip title="Godkjenn">
                  <Box display="inline" component="span">
                    <IconButton
                      disabled={(!booking.isTentative && !booking.isDeclined) || isExpired(booking)}
                      onClick={() => {
                        confirmBooking({ variables: { id: booking.id } }).then(() => {
                          setSnackbarMessage(
                            `Booking bekreftet. Bekreftelsesmail er sendt til ${booking.receiverEmail}.`
                          );
                          setOpenSnackbar(true);
                          refetchBookings();
                        });
                        sendEmail({ variables: getDecisionEmailInput(booking, true) });
                      }}
                      color="success"
                      size="large"
                    >
                      <Check />
                    </IconButton>
                  </Box>
                </Tooltip>
                <Tooltip title="Avkreft">
                  <Box display="inline" component="span">
                    <IconButton
                      disabled={(!booking.isTentative && booking.isDeclined) || isExpired(booking)}
                      onClick={() => setBookingToBeDeclined && setBookingToBeDeclined(booking)}
                      color="error"
                      size="large"
                    >
                      <Clear />
                    </IconButton>
                  </Box>
                </Tooltip>
              </InlineTableCell>
              <InlineTableCell>{dayjs(booking.timestamp).format("HH:mm DD-MM-YYYY")}</InlineTableCell>
              <InlineTableCell>{booking.internalParticipants}</InlineTableCell>
              <InlineTableCell>{booking.externalParticipants}</InlineTableCell>
              <InlineTableCell>{booking.extraInfo}</InlineTableCell>
              {isDeclinedTab ? <InlineTableCell>{booking.declineReason}</InlineTableCell> : <></>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
