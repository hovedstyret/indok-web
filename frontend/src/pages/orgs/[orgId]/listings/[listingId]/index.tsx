import { useMutation, useQuery } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { EditForm } from "@/components/pages/forms/formAdmin/EditForm";
import { FormResponse } from "@/components/pages/forms/formAdmin/FormResponse";
import { OrganizationListing } from "@/components/pages/listings/organization/OrganizationListing";
import {
  CreateFormDocument,
  FormWithAllResponsesFragmentDoc,
  ListingWithResponsesDocument,
  ResponseFragment,
} from "@/generated/graphql";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { HEADER_DESKTOP_HEIGHT, HEADER_MOBILE_HEIGHT } from "@/theme/constants";

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  margin: theme.spacing(4, 0),
  [theme.breakpoints.up("md")]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

/** Page for organization admins to administer a listing, edit its application form, and review applicants. */
const ListingAdminPage: NextPageWithLayout = () => {
  const { orgId, listingId } = useRouter().query;

  // state to determine whether to show the response or the listing/form view
  const [selectedView, selectView] = useState<ResponseFragment | "listing">("listing");

  // fetches the listing along with all users who have applied to it, using URL parameter as argument
  const { loading, error, data } = useQuery(ListingWithResponsesDocument, { variables: { id: listingId as string } });
  console.log({ loading, data, error, listingId });

  // mutation to create a new form
  const [createForm] = useMutation(CreateFormDocument, {
    // updates the cache so the new form can show instantly
    update: (cache, { data }) => {
      const newForm = data?.createForm?.form;
      if (newForm) {
        cache.modify({
          id: `ListingType:${listingId}`,
          fields: {
            form() {
              return cache.writeFragment({
                data: newForm,
                fragment: FormWithAllResponsesFragmentDoc,
                fragmentName: "FormWithAllResponses",
              });
            },
          },
        });
      }
    },
  });

  const onCreateFormClick = () => {
    const listing = data?.listing;
    if (listing) {
      createForm({
        variables: {
          formData: { name: `Søknad: ${listing.title}`, description: "", organizationId: orgId as string },
          listingId: listing.id,
        },
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  // renders an overview of applicants, and either an applicant's application or the listing itself
  // (along with its form, or a button to create one)
  return (
    <RootStyle>
      <Container>
        <Grid container direction="row" justifyContent="center" spacing={1}>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Link href={`/orgs/${orgId}`} passHref>
                  <Button fullWidth variant="contained" startIcon={<ArrowBack />}>
                    Tilbake
                  </Button>
                </Link>
              </Grid>
              {data?.listing?.form?.responses && (
                <Grid item>
                  <Card>
                    {data.listing.form.responses.length > 0 ? (
                      <Tabs
                        color="primary"
                        orientation="vertical"
                        variant="scrollable"
                        value={selectedView}
                        onChange={(_, view) => {
                          selectView(view);
                        }}
                      >
                        <Tab value={"listing"} label="Verv & søknad" />
                        <Box textAlign="center">
                          <Typography variant="h5">Søkere</Typography>
                        </Box>
                        {data.listing.form.responses.map((response, index) => (
                          <Tab
                            key={index}
                            value={response}
                            label={`${response.respondent.firstName} ${response.respondent.lastName}`}
                          />
                        ))}
                      </Tabs>
                    ) : (
                      <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={selectedView}
                        onChange={(_, view) => {
                          selectView(view);
                        }}
                      >
                        <Tab value={"listing"} label="Verv & søknad" />
                        <Box textAlign="center">
                          <Typography variant="h5">Søkere</Typography>
                        </Box>
                        <CardContent>
                          <Typography>Ingen søkere enda.</Typography>
                        </CardContent>
                      </Tabs>
                    )}
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>
          {data?.listing && (
            <Grid item xs={8}>
              {selectedView === "listing" ? (
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <OrganizationListing listing={data.listing} />
                  </Grid>
                  <Grid item>
                    {data.listing.form ? (
                      <EditForm form={data.listing.form} />
                    ) : (
                      <Button fullWidth variant="contained" color="primary" onClick={onCreateFormClick}>
                        Lag søknad
                      </Button>
                    )}
                  </Grid>
                </Grid>
              ) : (
                <>{data.listing.form && <FormResponse response={selectedView} form={data.listing.form} />}</>
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </RootStyle>
  );
};

ListingAdminPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ListingAdminPage;
