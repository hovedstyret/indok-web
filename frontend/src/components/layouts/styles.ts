import { styled } from "@mui/styles";
import { HEADER_DESKTOP_HEIGHT, HEADER_MOBILE_HEIGHT } from "src/theme/constants";

export const RootStyle = styled("div")(({ theme }) => ({
  marginTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up("md")]: {
    marginTop: HEADER_DESKTOP_HEIGHT,
  },
}));
