import { Box, Divider, Tooltip, Typography } from "@mui/material";
import { TypographyProps } from "@mui/material/Typography";

import { calculatePrice } from "./calculatePrice";
import { ContactInfo } from "./ContactInfo";

import { BookingProductFragment } from "@/generated/graphql";
import dayjs from "@/lib/date";

const InfoText: React.FC<React.PropsWithChildren<TypographyProps>> = (props) => (
  <Typography variant="body2" align="center" component="span" display="block" {...props}>
    {props.children}
  </Typography>
);

type Props = {
  chosenCars: BookingProductFragment[];
  contactInfo: ContactInfo | undefined;
  carText?: string;
  mailSent?: boolean;
  startDate: dayjs.Dayjs | undefined;
  endDate: dayjs.Dayjs | undefined;
};

/**
 * Statusbox with information about the current car booking.
 * Renders fields based on the props given.
 */
export const CarBookingStatus: React.FC<Props> = ({
  chosenCars,
  startDate,
  endDate,
  contactInfo,
  carText,
  mailSent,
}) => {
  return (
    <Box p={{ xs: 0, md: 3 }} border={3} borderColor="primary.main">
      {chosenCars && (
        <Box m={3}>
          <InfoText>
            {carText ?? "Du søker nå om å booke"}{" "}
            <Typography variant="body1" fontWeight={(theme) => theme.typography.fontWeightBold}>
              {chosenCars.map((car) => car.name).join(", ")}
            </Typography>
          </InfoText>
        </Box>
      )}

      <Divider />

      <Box m={3}>
        <InfoText>
          <strong>Innsjekk:</strong> {startDate?.format("LL") ?? "Ikke valgt"}
        </InfoText>
        <InfoText>
          <strong>Utsjekk:</strong> {endDate?.format("LL") ?? "Ikke valgt"}
        </InfoText>
      </Box>

      <Divider />

      {contactInfo && (
        <Box m={3}>
          <InfoText>
            <Typography variant="body1" fontWeight={(theme) => theme.typography.fontWeightBold}>
              Gjester:{" "}
            </Typography>
            {contactInfo.internalParticipants > 0 ? `${contactInfo.internalParticipants} indøkere` : null}
            {contactInfo.internalParticipants > 0 && contactInfo.externalParticipants > 0 ? ", " : null}
            {contactInfo.externalParticipants > 0 ? `${contactInfo.externalParticipants} eksterne` : null}
          </InfoText>
          <InfoText>
            <Typography variant="body1" fontWeight={(theme) => theme.typography.fontWeightBold}>
              Pris:{" "}
            </Typography>
            <Tooltip
              title={
                contactInfo.internalParticipants >= contactInfo.externalParticipants
                  ? "Du har fått internpris da det er flest indøkere med"
                  : "Du har fått eksternpris da det er for få indøkere med"
              }
              placement="right"
            >
              <Box display="inline">{calculatePrice(chosenCars, contactInfo, startDate, endDate)} kr</Box>
            </Tooltip>
          </InfoText>
        </Box>
      )}

      <Divider />

      {mailSent && (
        <InfoText>
          <Box>
            <Typography variant="body1">
              Vi har sendt en mail til {contactInfo?.receiverEmail} med informasjon om søknaden.
            </Typography>
          </Box>
        </InfoText>
      )}
    </Box>
  );
};
