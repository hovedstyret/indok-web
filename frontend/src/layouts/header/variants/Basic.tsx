import { AppBar, Box, Container, useScrollTrigger } from "@mui/material";
import React from "react";
import { Logo } from "../../../components";
import { HEADER_DESKTOP_HEIGHT } from "../../../theme/constants";
import Navigation from "../../navigation";
import { ToolbarStyle } from "../styles";

type Props = {
  transparent?: boolean;
};

const ElevationScroll: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Header: React.FC<Props> = ({ transparent }) => {
  const scrolling = useScrollTrigger({ threshold: HEADER_DESKTOP_HEIGHT });

  return (
    <ElevationScroll>
      <AppBar sx={{ bgcolor: "transparent" }}>
        <ToolbarStyle disableGutters transparent={transparent} scrolling={scrolling}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ position: "relative", mr: 2 }}>
              <Logo />
            </Box>

            <Navigation />
          </Container>
        </ToolbarStyle>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
