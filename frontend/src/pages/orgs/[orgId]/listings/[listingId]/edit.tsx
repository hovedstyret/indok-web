import { useMutation, useQuery } from "@apollo/client";
import { Container, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { useState } from "react";

import { ListingForm } from "@/components/pages/listings/organization/ListingForm";
import { ListingDocument, UpdateListingDocument } from "@/generated/graphql";
import { Layout, RootStyle } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { ListingInput } from "@/types/listings";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Oslo");

const EditListingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { listingId } = router.query;

  const [listing, setListing] = useState<ListingInput | undefined>(undefined);

  // Load the listing and set the state on completion
  const { loading, error } = useQuery(ListingDocument, {
    variables: { id: listingId as string },
    onCompleted: (data) => {
      if (data.listing) {
        setListing({
          ...(data.listing as ListingInput),
          startDatetime: dayjs(data.listing.startDatetime).utc().local().format("YYYY-MM-DDTHH:mm"),
          deadline: dayjs(data.listing.deadline).utc().local().format("YYYY-MM-DDTHH:mm"),
          application: data.listing.chips.includes("application"),
          interview: data.listing.chips.includes("interview"),
          case: data.listing.chips.includes("case"),
        });
      }
    },
  });

  // Return to the previous page after updating.
  const [updateListing] = useMutation(UpdateListingDocument, { onCompleted: () => router.back() });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Container>
      <Stack spacing={3}>
        <Typography variant="h3" gutterBottom>
          Oppdater vervutlysningen
        </Typography>
        {listing && (
          <ListingForm
            listing={listing}
            setListing={setListing}
            organizations={[listing.organization]}
            onSubmit={(e) => {
              e.preventDefault();
              updateListing({
                variables: {
                  id: listing.id,
                  input: {
                    title: listing.title || undefined,
                    description: listing.description || undefined,
                    applicationUrl: listing.applicationUrl || undefined,
                    startDatetime: listing.startDatetime || undefined,
                    deadline: listing.deadline || undefined,
                    application: listing.application || undefined,
                    interview: listing.interview || undefined,
                    case: listing.case || undefined,
                    readMoreUrl: listing.readMoreUrl || undefined,
                  },
                },
              });
            }}
            onCancel={() => router.back()}
          />
        )}
      </Stack>
    </Container>
  );
};

EditListingPage.getLayout = (page) => (
  <Layout>
    <RootStyle>{page}</RootStyle>
  </Layout>
);

export default EditListingPage;
