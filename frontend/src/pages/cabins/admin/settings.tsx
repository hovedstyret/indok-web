import { PermissionRequired } from "@components/authz";
import Layout, { RootStyle } from "@components/layouts";
import BookingSemesterPicker from "@components/pages/cabins/Admin/BookingSemesterPicker";
import CabinInfoPicker from "@components/pages/cabins/Admin/CabinInfoPicker";
import useResponsive from "@hooks/useResponsive";
import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import router from "next/router";
import { NextPageWithLayout } from "src/pages/_app";

const SettingsPage: NextPageWithLayout = () => {
  const isMobile = useResponsive({ query: "down", key: "md" });

  return (
    <Container>
      <PermissionRequired permission="cabins.change_bookingsemester">
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Box p={3}>
              <Typography variant={isMobile ? "h3" : "h1"} align="center">
                Booking adminside
              </Typography>
              <Button startIcon={<ArrowBackIos />} onClick={() => router.back()}>
                Gå tilbake
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box marginBottom={5}>
          <Paper>
            <Box p={4}>
              <Typography variant={isMobile ? "h4" : "h3"}>Instillinger</Typography>
            </Box>
            <Divider />
            <Box p={4}>
              <Typography variant="h5">Velg start og slutt-dato for booking for høst- og vårsemestrene</Typography>
              <Typography>Det vil kun være mulig for brukere å søke om bookinger i disse periodene.</Typography>
            </Box>
            <Box p={4}>
              <BookingSemesterPicker />
            </Box>
            <Divider />
            <Box p={4}>
              <Typography variant="h5">Administrer hytteinformasjon</Typography>
              <Typography>Her kan dere oppdatere informasjonen som skal vises om Oksen og Bjørnen.</Typography>
              <CabinInfoPicker />
            </Box>
          </Paper>
        </Box>
      </PermissionRequired>
    </Container>
  );
};

SettingsPage.getLayout = (page) => (
  <Layout>
    <RootStyle>{page}</RootStyle>
  </Layout>
);

export default SettingsPage;
