import useResponsive from "@hooks/useResponsive";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid, Hidden, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { ReactElement } from "react";
import { DAYS_IN_WEEK } from "./constants";

interface Props {
  month: dayjs.Dayjs;
  onChangeMonth: (months: number) => void;
  children?: ReactElement | ReactElement[];
}

const CalendarTable: React.FC<Props> = ({ month, onChangeMonth, children }) => {
  const isMobile = useResponsive({ query: "down", key: "md" });
  return (
    <Stack spacing={2} width={1}>
      <Grid container alignItems="center" justifyContent={isMobile ? "space-between" : "center"}>
        <Hidden mdUp>
          <IconButton onClick={() => onChangeMonth(-1)} size="large">
            <NavigateBefore />
          </IconButton>
        </Hidden>
        <Typography variant="h6" textTransform="capitalize" align="center">{`${month.format("MMMM")} ${month.format(
          "YYYY"
        )}`}</Typography>
        <Hidden mdUp>
          <IconButton onClick={() => onChangeMonth(1)} size="large">
            <NavigateNext />
          </IconButton>
        </Hidden>
      </Grid>
      <Grid component="table" sx={{ width: 1 }}>
        <Grid container component="thead">
          <Grid item container xs component="tr">
            {DAYS_IN_WEEK.map((dow: string) => (
              <Grid
                item
                xs
                component="th"
                key={dow}
                sx={{
                  textTransform: "uppercase",
                  fontSize: 12,
                  color: (thm) => (thm.palette.mode === "dark" ? "grey.200" : "grey.800"),
                }}
              >
                {dow}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container component="tbody" direction="column">
          {children}
        </Grid>
      </Grid>
    </Stack>
  );
};
export default CalendarTable;
