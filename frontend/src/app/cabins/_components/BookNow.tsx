import { ArrowForward } from "@mui/icons-material";
import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import React from "react";

import { NextLinkComposed } from "@/components/Link";
import { FragmentType, getFragmentData, graphql } from "@/gql/app";

type Props = {
  query: FragmentType<typeof QueryFragment>;
};

const QueryFragment = graphql(`
  fragment BookNow_Query on Query {
    cabins {
      cabins {
        id
        name
        internalPrice
        externalPrice
      }
    }
  }
`);

export const BookNow: React.FC<Props> = ({ query }) => {
  const data = getFragmentData(QueryFragment, query);
  return (
    <Card sx={{ height: "100%" }} elevation={0} data-color-scheme="dark">
      <CardContent sx={{ height: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: "100%" }}>
          <Stack direction="column">
            <Typography variant="h4" gutterBottom>
              Priser
            </Typography>
            <Typography variant="subtitle1">Hel hytte</Typography>
            <Divider />
            <Typography variant="subtitle2">Intern: {data?.cabins?.cabins?.[0]?.internalPrice} kr</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Ekstern Ukedag: {data?.cabins?.cabins?.[0]?.externalPrice} kr
            </Typography>
            <Typography variant="subtitle1">Sengeplass</Typography>
            <Divider />
            <Typography variant="subtitle2">Intern: 110 kr</Typography>
            <Typography variant="subtitle2">Ekstern Ukedag: 395 kr</Typography>
            <Typography variant="subtitle2">Ekstern Helg: 540 kr</Typography>
          </Stack>
          <Button
            component={NextLinkComposed}
            to="/cabins/book"
            variant="contained"
            size="large"
            color="primary"
            endIcon={<ArrowForward />}
          >
            Book nå
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};