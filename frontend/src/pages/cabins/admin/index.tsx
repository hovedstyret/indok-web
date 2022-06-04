import { useQuery } from "@apollo/client";
import Layout from "@components/Layout";
import TabPanel from "@components/pages/about/TabPanel";
import AdminCabinTable from "@components/pages/cabins/Admin/AdminCabinTable";
import PermissionRequired from "@components/permissions/PermissionRequired";
import { QUERY_ADMIN_ALL_BOOKINGS } from "@graphql/cabins/queries";
import useResponsive from "@hooks/useResponsive";
import { BookingFromQuery } from "@interfaces/cabins";
import Settings from "@mui/icons-material/Settings";
import { Box, Button, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

/*
Page for booking admininistration showing all upcoming bookings and buttons for actions on these bookings.
*/
const AdminPage: NextPage = () => {
  const { data, refetch } = useQuery<{
    adminAllBookings: BookingFromQuery[];
  }>(QUERY_ADMIN_ALL_BOOKINGS, { variables: { after: dayjs().subtract(1, "day").format("YYYY-MM-DD") } });

  const [tabValue, setTabValue] = useState<number>(0);
  const router = useRouter();

  const handleTabChange = (newTabValue: number) => setTabValue(newTabValue);

  const isMobile = useResponsive({ query: "down", key: "md" });
  const accepted = data?.adminAllBookings.filter((booking) => !booking.isTentative && !booking.isDeclined);
  const declined = data?.adminAllBookings.filter((booking) => !booking.isTentative && booking.isDeclined);
  const tentative = data?.adminAllBookings.filter((booking) => booking.isTentative);

  return (
    <Layout>
      <Container>
        <PermissionRequired permission="cabins.manage_booking">
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Box p={3}>
                <Typography variant={isMobile ? "h3" : "h1"} align="center">
                  Booking adminside
                </Typography>
                <Button startIcon={<Settings />} onClick={() => router.push("admin/settings")}>
                  Innstillinger
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={(theme) => ({ width: "100%", overflowX: "auto", mb: theme.spacing(4) })} component="div">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  onChange={(_e, newValue) => handleTabChange(newValue)}
                  value={tabValue}
                  indicatorColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Nye søknader" />
                  <Tab label="Godkjente søknader" />
                  <Tab label="Underkjente søknader" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <AdminCabinTable bookings={tentative} refetch={refetch} currentTab="tentative" />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <AdminCabinTable bookings={accepted} refetch={refetch} currentTab="accepted" />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <AdminCabinTable bookings={declined} refetch={refetch} currentTab="declined" />
              </TabPanel>
            </Box>
          </Box>
        </PermissionRequired>
      </Container>
    </Layout>
  );
};

export default AdminPage;
