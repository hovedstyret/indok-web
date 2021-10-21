import { useMutation, useQuery } from "@apollo/client";
import Layout from "@components/Layout";
import { QUERY_ADMIN_ALL_BOOKINGS } from "@graphql/cabins/queries";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Typography,
  Grid,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
} from "@material-ui/core";
import { getDecisionEmailProps, toStringChosenCabins } from "@utils/cabins";
import dayjs from "dayjs";
import { NextPage } from "next";
import { CONFIRM_BOOKING, DELETE_BOOKING, SEND_EMAIL } from "@graphql/cabins/mutations";
import { useState } from "react";
import { useRouter } from "next/router";
import theme from "@styles/theme";
import { BookingFromQuery } from "@interfaces/cabins";

/*
Page for booking admininistration showing all upcoming bookings and buttons for actions on these bookings.
*/
const AdminPage: NextPage = () => {
  const { data, error, refetch } = useQuery<{
    adminAllBookings: BookingFromQuery[];
  }>(QUERY_ADMIN_ALL_BOOKINGS, { variables: { after: dayjs().format("YYYY-MM-DD") } });
  const [confirmBooking] = useMutation(CONFIRM_BOOKING, { refetchQueries: [{ query: QUERY_ADMIN_ALL_BOOKINGS }] });
  const [deleteBooking] = useMutation(DELETE_BOOKING, { refetchQueries: [{ query: QUERY_ADMIN_ALL_BOOKINGS }] });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [bookingToBeDeleted, setBookingToBeDeleted] = useState<BookingFromQuery | undefined>();
  const [send_email] = useMutation(SEND_EMAIL);
  const router = useRouter();

  const handleDeleteBookingOnClose = () => setBookingToBeDeleted(undefined);

  const ErrorMessageDialog: React.VFC = () => (
    <Dialog open={error != undefined} onClose={handleErrorDialogClose}>
      <DialogTitle>{`Det har oppstått en feilmelding: ${error?.name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{error?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleErrorDialogClose} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  const DeleteBookingDialog: React.VFC = () => (
    <Dialog open={bookingToBeDeleted != undefined} onClose={handleDeleteBookingOnClose}>
      <DialogTitle>Du er nå i ferd med å gjøre en irreversibel handling</DialogTitle>
      <DialogContent>
        <DialogContentText>Er du sikker på at du vil slette denne bookingen?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteBookingOnClose} variant="contained">
          Avbryt
        </Button>
        <Button
          onClick={() => {
            if (bookingToBeDeleted) {
              deleteBooking({ variables: { id: bookingToBeDeleted.id } }).then(() => {
                setSnackbarMessage("Bookingen ble slettet");
                setOpenSnackbar(true);
                refetch();
              });
              send_email(getDecisionEmailProps(bookingToBeDeleted, false));
            }
            handleDeleteBookingOnClose();
          }}
          color="primary"
          variant="contained"
        >
          Slett booking
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleErrorDialogClose = () => router.push("/");
  return (
    <Layout>
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      />
      <ErrorMessageDialog />
      <DeleteBookingDialog />
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Box p={3}>
            <Typography variant="h1" align="center">
              Booking adminside
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box m={5}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bookings</TableCell>
                    <TableCell align="right">Epost</TableCell>
                    <TableCell align="right">Telefonnummer</TableCell>
                    <TableCell align="right">Innsjekk</TableCell>
                    <TableCell align="right">Utsjekk</TableCell>
                    <TableCell align="right">Hytte</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Handlinger</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.adminAllBookings.map((booking: BookingFromQuery) => (
                    <TableRow key={booking.id}>
                      <TableCell component="th" scope="row">
                        {booking.firstName + " " + booking.lastName}
                      </TableCell>
                      <TableCell align="right">{booking.receiverEmail}</TableCell>
                      <TableCell align="right">{booking.phone}</TableCell>
                      <TableCell align="right">{booking.checkIn}</TableCell>
                      <TableCell align="right">{booking.checkOut}</TableCell>
                      <TableCell align="right">{toStringChosenCabins(booking.cabins)}</TableCell>
                      <TableCell align="right">{booking.isTentative ? "Ikke godkjent" : "Godkjent"}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Godkjenn">
                          <Box display="inline" component="span">
                            <IconButton
                              disabled={!booking.isTentative}
                              onClick={() => {
                                confirmBooking({ variables: { id: booking.id } }).then(() => {
                                  setSnackbarMessage("Booking bekreftet. Bekreftelsesmail sendt.");
                                  setOpenSnackbar(true);
                                  refetch();
                                });
                                send_email(getDecisionEmailProps(booking, true));
                              }}
                              color="secondary"
                            >
                              <CheckIcon />
                            </IconButton>
                          </Box>
                        </Tooltip>
                        <Tooltip title="Avkreft">
                          <Box color={theme.palette.error.main} display="inline" component="span">
                            <IconButton
                              disabled={!booking.isTentative}
                              onClick={() => setBookingToBeDeleted(booking)}
                              color="inherit"
                            >
                              <ClearIcon />
                            </IconButton>
                          </Box>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminPage;
