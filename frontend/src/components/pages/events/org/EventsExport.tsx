import { useLazyQuery } from "@apollo/client";
import { GetApp } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, TextField, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";

import { AttendeeReportOrgDocument, AttendeeReportsDocument, AdminOrganizationFragment } from "@/generated/graphql";
import { promptDownloadFromPayload } from "@/utils/exports";

type Props = { organization: AdminOrganizationFragment };

export const EventsExport: React.FC<React.PropsWithChildren<Props>> = ({ organization }) => {
  const [selectedEvents, setSelectedEvents] = useState(["1", "2", "3"]);

  const [getAttendeeReportOrg, { loading: loadingReport }] = useLazyQuery(AttendeeReportOrgDocument, {
    onCompleted: (data) => {
      if (data.attendeeReportOrg) promptDownloadFromPayload(JSON.parse(data.attendeeReportOrg));
    },
  });

  const [getAttendeeReports, { loading: loadingReports }] = useLazyQuery(AttendeeReportsDocument, {
    onCompleted: (data) => {
      if (data.attendeeReports) promptDownloadFromPayload(JSON.parse(data.attendeeReports));
    },
  });

  const wrapDownloadButtonReportOrg = (orgId: string, filetype: string) => {
    return (
      <Button
        startIcon={<GetApp fontSize="small" />}
        onClick={() => getAttendeeReportOrg({ variables: { orgId: orgId, filetype: filetype } })}
      >
        {filetype}
      </Button>
    );
  };

  if (loadingReport || loadingReports) {
    return <CircularProgress />;
  }

  const wrapDownloadButtonReports = (filetype: string) => {
    return (
      <Button
        startIcon={<GetApp fontSize="small" />}
        disabled
        onClick={() => {
          return getAttendeeReports({ variables: { eventIds: selectedEvents, filetype: filetype } });
        }}
      >
        {filetype}
      </Button>
    );
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <Typography variant="overline" display="block">
            Eksportér for alle mine arrangementer
          </Typography>
        </Grid>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Grid item>{wrapDownloadButtonReportOrg(organization.id, "csv")}</Grid>
          <Grid item>{wrapDownloadButtonReportOrg(organization.id, "xlsx")}</Grid>
          <Grid item>{wrapDownloadButtonReportOrg(organization.id, "html")}</Grid>
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <Typography variant="overline" display="block">
            Eksportér for utvalgte arrangementer
          </Typography>
          <TextField
            value={selectedEvents.join(",")}
            onChange={(e) => setSelectedEvents(e.target.value.replace(/ /g, "").split(","))}
            label="Selected event ID's"
            size="small"
            helperText="Comma-separated list of event ID's"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Grid item>{wrapDownloadButtonReports("csv")}</Grid>
            <Grid item>{wrapDownloadButtonReports("xlsx")}</Grid>
            <Grid item>{wrapDownloadButtonReports("html")}</Grid>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};
