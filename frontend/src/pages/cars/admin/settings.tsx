import { Container, Divider, Stack, Typography } from "@mui/material";

import { PermissionRequired } from "@/components/Auth";
import { BookingSemesterPicker } from "@/components/pages/cars/Admin/BookingSemesterPicker";
import { CarInfoPicker } from "@/components/pages/cars/Admin/CarInfoPicker";
import { Title } from "@/components/Title";
import { NextPageWithLayout } from "@/lib/next";

const SettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <Title
        title="Innstillinger"
        overline="Bookinger"
        variant="dark"
        breadcrumbs={[
          {
            name: "Hjem",
            href: "/",
          },
          {
            name: "Hytter",
            href: "/cars",
          },
          {
            name: "Adminside",
            href: "/cars/admin",
          },
          {
            name: "Innstillinger",
            href: "/cars/admin/settings",
          },
        ]}
      />
      <Container>
        <PermissionRequired permission="cars.change_bookingsemester">
          <Stack direction="column" spacing={4}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" component="h2">
                Start- og sluttdato for høst- og vårsemester
              </Typography>
              <Typography>Det vil kun være mulig for brukere å søke om bookinger i disse periodene.</Typography>
              <BookingSemesterPicker />
            </Stack>
            <Divider />
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" component="h2">
                Administrer hytteinformasjon
              </Typography>
              <Typography>Her kan dere oppdatere informasjonen som skal vises om Oksen og Bjørnen.</Typography>
              <CarInfoPicker />
            </Stack>
          </Stack>
        </PermissionRequired>
      </Container>
    </>
  );
};

export default SettingsPage;
