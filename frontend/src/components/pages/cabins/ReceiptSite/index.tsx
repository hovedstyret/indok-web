import { NextPage } from "next";
import { Grid, Typography, Divider, Hidden } from "@material-ui/core";
import { Cabin, ContactInfo } from "@interfaces/cabins";
import { DatePick } from "src/pages/cabins/book";
import CabinBookingStatus from "../CabinBookingStatus";

interface Props {
  chosenCabins: Cabin[];
  datePick: DatePick;
  contactInfo: ContactInfo;
  mailSent?: boolean;
}

const ReceiptSite: NextPage<Props> = (props) => {
  return (
    <Grid container alignItems="center" direction="column">
      <Hidden mdDown>
        <Grid item>
          <Typography variant="h4">Takk for din bestilling</Typography>
          <Divider />
        </Grid>
      </Hidden>

      <Grid item container justify="space-evenly" alignItems="stretch">
        <Grid item>
          <CabinBookingStatus cabinText="Du har nå søkt om å booke" {...props} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReceiptSite;
