import { useMutation, useQuery } from "@apollo/client";
import Layout from "@components/Layout";
import { QUERY_ADMIN_ALL_BOOKINGS } from "@graphql/cabins/queries";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Typography,
  Grid,
  Box,
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
  Container,
  useMediaQuery,
  makeStyles,
  TableContainer,
  TextField,
} from "@material-ui/core";
import { getDecisionEmailProps, toStringChosenCabins } from "@utils/cabins";
import dayjs from "dayjs";
import { NextPage } from "next";
import { CONFIRM_BOOKING, DELETE_BOOKING, SEND_EMAIL } from "@graphql/cabins/mutations";
import { useState } from "react";
import theme from "@styles/theme";
import { BookingFromQuery } from "@interfaces/cabins";
import PermissionRequired from "@components/permissions/PermissionRequired";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(4),
  },
}));

/*
Page for booking admininistration showing all upcoming bookings and buttons for actions on these bookings.
*/
const AdminPage: NextPage = () => {
  const { data, refetch } = useQuery<{
    adminAllBookings: BookingFromQuery[];
  }>(QUERY_ADMIN_ALL_BOOKINGS, { variables: { after: dayjs().subtract(1, "day").format("YYYY-MM-DD") } });
  const [confirmBooking] = useMutation(CONFIRM_BOOKING, { refetchQueries: [{ query: QUERY_ADMIN_ALL_BOOKINGS }] });
  const [deleteBooking] = useMutation(DELETE_BOOKING, { refetchQueries: [{ query: QUERY_ADMIN_ALL_BOOKINGS }] });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [bookingToBeDeleted, setBookingToBeDeleted] = useState<BookingFromQuery | undefined>();
  const [send_email] = useMutation(SEND_EMAIL);

  const handleDeleteBookingOnClose = () => setBookingToBeDeleted(undefined);

  const DeleteBookingDialog: React.VFC = () => {
    const [declineMessage, setDeclineMessage] = useState("");

    return (
      <Dialog open={bookingToBeDeleted != undefined} onClose={handleDeleteBookingOnClose}>
        <DialogTitle>Du er nå i ferd med å gjøre en irreversibel handling</DialogTitle>
        <DialogContent>
          <DialogContentText>Er du sikker på at du vil slette denne bookingen?</DialogContentText>
          <DialogContentText>
            Det kan være nyttig for brukeren å få vite hvorfor dere avslår søknaden om booking. Hvis dere vil oppgi
            grunnen til avslag, kan dere gjøre det nedenfor.
          </DialogContentText>
          <TextField
            placeholder="Grunn til avslag..."
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            onChange={(e) => setDeclineMessage(e.target.value)}
          />
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
                send_email(getDecisionEmailProps(bookingToBeDeleted, false, declineMessage));
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
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <PermissionRequired permission="cabins.manage_booking">
          <Snackbar
            open={openSnackbar}
            message={snackbarMessage}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          />
          <DeleteBookingDialog />
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Box p={3}>
                <Typography variant={isMobile ? "h3" : "h1"} align="center">
                  Booking adminside
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className={classes.root} marginBottom={5}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Navn</TableCell>
                    <TableCell>Epost</TableCell>
                    <TableCell>Telefonnummer</TableCell>
                    <TableCell>Innsjekk</TableCell>
                    <TableCell>Utsjekk</TableCell>
                    <TableCell>Hytte</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Handlinger</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.adminAllBookings.map((booking: BookingFromQuery) => (
                    <TableRow key={booking.id}>
                      <TableCell>{`${booking.firstName} ${booking.lastName}`}</TableCell>
                      <TableCell>{booking.receiverEmail}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.checkIn}</TableCell>
                      <TableCell>{booking.checkOut}</TableCell>
                      <TableCell>{toStringChosenCabins(booking.cabins)}</TableCell>
                      <TableCell>{booking.isTentative ? "Ikke godkjent" : "Godkjent"}</TableCell>
                      <TableCell>
                        <Tooltip title="Godkjenn">
                          <Box display="inline" component="span">
                            <IconButton
                              disabled={!booking.isTentative}
                              onClick={() => {
                                confirmBooking({ variables: { id: booking.id } }).then(() => {
                                  setSnackbarMessage(
                                    `Booking bekreftet. Bekreftelsesmail sendt er sendt til ${booking.receiverEmail}.`
                                  );
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
        </PermissionRequired>
      </Container>
    </Layout>
  );
};

export default AdminPage;
