import { useQuery } from "@apollo/client";
import Layout, { RootStyle } from "@components/layouts";
import PayWithVipps from "@components/pages/ecommerce/PayWithVipps";
import SalesTermsDialog from "@components/pages/ecommerce/SalesTermsDialog";
import { UserInfoDocument } from "@generated/graphql";
import { GET_PRODUCT } from "@graphql/ecommerce/queries";
import { Product } from "@interfaces/ecommerce";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";

const CheckoutPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const router = useRouter();
  const { productId, quantityStr, redirect } = router.query;
  const quantity = typeof quantityStr == "string" ? parseInt(quantityStr) : 1;

  const [product, setProduct] = useState<Product>();
  const [orderError, setOrderError] = useState<string>("");
  const [isConsentingTerms, setIsConsentingTerms] = useState(false);
  const [openSalesTerms, setOpenSalesTerms] = useState(false);

  const { loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { productId: productId },
    onCompleted: (data) => setProduct(data.product),
  });

  return (
    <Container>
      <Box mt={2}>
        <Button startIcon={<KeyboardArrowLeft />} onClick={() => router.back()}>
          Tilbake
        </Button>
      </Box>
      <Box mb={2}>
        <Card>
          <CardHeader title="Betaling"></CardHeader>
          <CardContent>
            <Grid container alignItems="center" direction="column" spacing={3}>
              <Grid item xs={12}>
                <Alert variant="filled" severity="info">
                  Betalingsløsningen er under utvikling. Dersom du opplever problemer, kontakt{" "}
                  <a style={{ color: "blue" }} href="mailto:kontakt@rubberdok.no">
                    kontakt@rubberdok.no
                  </a>
                </Alert>
              </Grid>
              {!(productId && quantity) ? (
                <>
                  <Typography variant="h3">Feil</Typography>
                  <Alert severity="error" variant="filled">
                    ProduktID og antall mangler
                  </Alert>
                </>
              ) : error ? (
                <>
                  <Typography variant="h3">Feil</Typography>
                  <Alert severity="error" variant="filled">
                    {error.message}
                  </Alert>
                </>
              ) : loading ? (
                <CircularProgress />
              ) : (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h3">Bekreft ordredetaljer</Typography>
                    {product && quantity ? (
                      <List>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ListItemText primary={product.name} secondary={product.description} />
                        </ListItem>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ListItemText primary={`${product.price} kr`} secondary="Pris per enhet" />
                        </ListItem>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ListItemText
                            primary={`${quantity} stk`}
                            secondary={`Maksimalt antall tillatt: ${product.maxBuyableQuantity}`}
                          />
                        </ListItem>
                        <Divider variant="middle" component="li" />
                        <ListItem sx={{ textAlign: "center" }}>
                          <ListItemText primary={`${product.price * quantity} kr`} secondary="Totalbeløp" />
                        </ListItem>
                      </List>
                    ) : (
                      <Typography>Ingen produkt funnet</Typography>
                    )}
                  </Grid>

                  {product && quantity && typeof productId == "string" && (
                    <Grid item xs={12}>
                      <Box alignItems={"center"} display={"inline-flex"}>
                        <FormControlLabel
                          style={{ marginRight: "5px" }}
                          control={
                            <Checkbox
                              checked={isConsentingTerms}
                              onChange={(event) => setIsConsentingTerms(event.target.checked)}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Jeg godtar </Typography>}
                        />
                        <Link
                          component="button"
                          variant="body2"
                          color="secondary"
                          onClick={() => {
                            setOpenSalesTerms(true);
                          }}
                        >
                          salgsbetingelsene for kjøp
                        </Link>
                      </Box>
                      <PayWithVipps
                        productId={productId}
                        quantity={Number(quantity)}
                        onError={(e) => e && setOrderError(e.message)}
                        disabled={!isConsentingTerms}
                        fallbackRedirect={typeof redirect === "string" ? redirect : undefined}
                      />
                      <SalesTermsDialog open={openSalesTerms} onClose={() => setOpenSalesTerms(false)} />
                    </Grid>
                  )}
                  {orderError && (
                    <Grid item xs={12}>
                      <Alert severity="error" variant="filled">
                        {orderError}
                      </Alert>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CheckoutPage;

CheckoutPage.getLayout = (page: React.ReactElement) => (
  <Layout>
    <RootStyle>{page}</RootStyle>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo({}, ctx);
  const { data, error } = await client.query({
    query: UserInfoDocument,
  });

  if (error) return { notFound: true };
  if (!data.user) {
    return { notFound: true };
  }
  return addApolloState(client, { props: { user: data.user } });
};
