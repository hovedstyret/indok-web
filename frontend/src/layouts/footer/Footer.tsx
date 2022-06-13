import DarkModeToggle from "@components/DarkModeToggle";
import Logo from "@components/Logo";
import useResponsive from "@hooks/useResponsive";
import { Box, Button, Container, Divider, Grid, Link, Paper, Stack, SxProps, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import rubberdokLogo from "@public/img/rubberdok_logo_black.svg";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink, { LinkProps } from "next/link";
import { ReactNode, useState } from "react";

const HallOfFame = dynamic(() => import("./HallOfFame"));

const Watermark = styled("div")(({ theme }) => ({
  background: "url('/nth.svg')",
  backgroundSize: 500,
  backgroundPosition: "right center",
  backgroundRepeat: "no-repeat",
  opacity: theme.palette.mode === "light" ? 0.1 : 0.3,
  position: "absolute",
  width: "600px",
  height: "100%",
  top: 0,
  right: 0,

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    left: 0,
  },
}));

const Footer: React.FC = () => {
  const isDesktop = useResponsive({ query: "up", key: "md" });
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const footerTextColor = theme.palette.mode === "light" ? "grey.700" : "grey.500";

  return (
    <>
      <Divider />
      <Paper sx={{ bgcolor: "background.neutral" }}>
        <Container sx={{ position: "relative", py: { xs: 6, md: 10 } }}>
          <Grid container spacing={3} justifyContent={{ md: "space-between" }}>
            <Grid item xs={12} md={3}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />
                <Typography variant="body3" sx={{ color: footerTextColor }}>
                  Foreningen for Studentene ved Industriell Økonomi og Teknologiledelse, NTNU Kolbjørn Hejes vei 1E,
                  7034 Trondheim Org.nr. 994 778 463
                </Typography>
                <Typography variant="body3" sx={{ color: "grey.700" }}>
                  {`© ${dayjs().format("YYYY")} Foreningen for Studentene ved Indøk`}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack alignItems="flex-start">
                <Typography variant="h6" mb={1}>
                  Lenker
                </Typography>
                <NextLinkItem href="/report" sx={{ color: footerTextColor }}>
                  Baksida
                </NextLinkItem>
                <NextLinkItem href="/about" sx={{ color: footerTextColor }}>
                  Om oss
                </NextLinkItem>
                <NextLinkItem href="https://www.indøk.no" sx={{ color: footerTextColor }}>
                  Studieside
                </NextLinkItem>
                <NextLinkItem
                  href="https://github.com/rubberdok/indok-web/issues/new/choose"
                  sx={{ color: "grey.700" }}
                >
                  Oppdaget en feil?
                </NextLinkItem>
              </Stack>
            </Grid>
            {isDesktop && <Watermark />}
          </Grid>
        </Container>
      </Paper>

      <Divider />

      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 3, textAlign: { xs: "left", md: "center" } }}
        >
          <DarkModeToggle variant="toggle" />
          <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
            <Button
              variant="text"
              onClick={() => setOpen(!open)}
              disableFocusRipple
              sx={{ color: "text.secondary", typography: (theme) => theme.typography.body3 }}
            >
              Hall of Fame
            </Button>
            <Link href="https://github.com/rubberdok/indok-web" rel="noreferrer noopener">
              <Box sx={{ ...(theme.palette.mode === "dark" && { filter: "invert(1)", opacity: 0.8 }) }}>
                <Image src={rubberdokLogo} alt="Rubberdøk" width="64px" height="32px" layout="fixed" />
              </Box>
            </Link>
          </Stack>
        </Stack>
      </Container>
      {open && <HallOfFame open={open} setOpen={setOpen} />}
    </>
  );
};

type NextLinkItemProps = LinkProps & {
  children: ReactNode;
  sx?: SxProps;
};

const NextLinkItem: React.FC<NextLinkItemProps> = ({ children, sx, ...other }) => {
  return (
    <NextLink passHref {...other}>
      <Link
        variant="body3"
        sx={{
          mt: 1,
          color: "text.secondary",
          "&:hover": {
            color: "text.primary",
          },
          ...sx,
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default Footer;
