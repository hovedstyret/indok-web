import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Hovedbygget from "@public/static/landing/hovedbygget.jpeg";
import Image from "next/image";
import Link from "next/link";

const LandingSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.grey[900],
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 4,
        position: "relative",
      }}
    >
      <Container sx={{ alignSelf: "center", gridColumn: "1 / -1", gridRow: "1" }}>
        <Grid container direction="row" justifyContent={{ xs: "center", md: "flex-end" }}>
          <Grid item md={5} sm={8} xs={10}>
            <Grid
              container
              my={8}
              direction="column"
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{ color: (theme) => theme.palette.common.white }}
            >
              <Grid item>
                <Typography variant="overline" sx={{ color: "primary.light", mb: 3 }}>
                  Samarbeid og kommunikasjon
                </Typography>
                <Typography variant="h2">Hovedstyret i Foreningen</Typography>
                <Typography sx={{ mt: 3, mb: 5, opacity: 0.72 }}>
                  Hovedstyrets fremste oppgave er å sørge for god kommunikasjon og samarbeid mellom de ulike
                  studentinitiativene, og forvalte og disponere Indøks midler på en forsvarlig måte.
                </Typography>

                <Link href="/about/board" passHref>
                  <Button variant="contained" size="medium">
                    Les mer
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          position: "relative",
          gridColumn: "1 / 7",
          gridRow: "1",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Image src={Hovedbygget} layout="fill" objectFit="cover" objectPosition="center" placeholder="blur" />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingSection;
