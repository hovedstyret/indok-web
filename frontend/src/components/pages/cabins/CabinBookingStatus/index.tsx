import { NextPage, NextComponentType } from "next";
import { makeStyles, Theme, Typography, Box, Divider, Tooltip, useMediaQuery } from "@material-ui/core";
import { Cabin, ContactInfo } from "@interfaces/cabins";
import { DatePick } from "src/pages/cabins/book";
import { ReactNode } from "react";
import { TypographyProps } from "@material-ui/core/Typography";
import { calculatePrice, convertDateFormat, toStringChosenCabins } from "@utils/cabins";
import theme from "@styles/theme";

interface Props {
  chosenCabins: Cabin[];
  datePick: DatePick;
  contactInfo: ContactInfo;
  cabinText?: string;
  mailSent?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  bold: {
    fontWeight: theme.typography.fontWeightBold,
    display: "inline",
  },
}));

const InfoText: NextComponentType<TypographyProps> = (props) => (
  <Typography variant="body2" align="center" component="span" display="block" {...props}>
    {props.children}
  </Typography>
);

/*
Statusbox with information about the current cabin booking.
Renders fields based on the props given.
*/
const CabinBookingStatus: NextPage<Props> = ({ chosenCabins, datePick, contactInfo, cabinText, mailSent }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const infos: { info: Cabin[] | DatePick | ContactInfo; renderComponent: ReactNode }[] = [
    {
      info: chosenCabins,
      renderComponent: (
        <InfoText>
          {cabinText ?? "Du søker nå om å booke"}{" "}
          <Box className={classes.bold}>{toStringChosenCabins(chosenCabins)}</Box>
        </InfoText>
      ),
    },
    {
      info: datePick,
      renderComponent: (
        <>
          <InfoText>
            <Box className={classes.bold}>Innsjekk: </Box>
            {datePick.checkInDate !== undefined && convertDateFormat(datePick.checkInDate)}
          </InfoText>
          <InfoText>
            <Box className={classes.bold}>Utsjekk: </Box>
            {datePick.checkOutDate !== undefined && convertDateFormat(datePick.checkOutDate)}
          </InfoText>
        </>
      ),
    },
    {
      info: contactInfo,
      renderComponent: (
        <>
          <InfoText>
            <Box className={classes.bold}>Gjester: </Box>
            {contactInfo.internalParticipants > 0 ? `${contactInfo.internalParticipants} indøkere` : null}
            {contactInfo.internalParticipants > 0 && contactInfo.externalParticipants > 0 ? ", " : null}
            {contactInfo.externalParticipants > 0 ? `${contactInfo.externalParticipants} eksterne` : null}
          </InfoText>
          <InfoText>
            <Box className={classes.bold}>Pris: </Box>
            <Tooltip
              title={
                contactInfo.internalParticipants >= contactInfo.externalParticipants
                  ? "Du har fått internpris da det er flest indøkere med"
                  : "Du har fått eksternpris da det er for få indøkere med"
              }
              placement="right"
            >
              <Box display="inline">{calculatePrice(chosenCabins, contactInfo, datePick)} kr</Box>
            </Tooltip>
          </InfoText>
        </>
      ),
    },
    {
      info: contactInfo,
      renderComponent: (
        <>
          <InfoText>
            <Box>
              <Typography variant={isMobile ? "body2" : "body1"}>
                Vi har sendt en mail til {contactInfo.receiverEmail} med informasjon om søknaden.
              </Typography>
            </Box>
          </InfoText>
        </>
      ),
    },
  ];
  return (
    <Box p={isMobile ? 0 : 3} border={3} borderColor="primary.main">
      {infos
        .filter((info, index) => (info.info !== undefined && index != 3 && !mailSent) || mailSent)
        .map((info, index) => (
          <Box key={index}>
            <Box m={3}>{info.renderComponent}</Box>
            <Divider />
          </Box>
        ))}
    </Box>
  );
};

export default CabinBookingStatus;
