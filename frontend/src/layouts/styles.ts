import { styled } from "@mui/material/styles";

import { HEADER_DESKTOP_HEIGHT, HEADER_MOBILE_HEIGHT } from "@/theme/constants";

export const RootStyle = styled("div")(({ theme }) => ({
  marginTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up("md")]: {
    marginTop: HEADER_DESKTOP_HEIGHT,
  },
}));
