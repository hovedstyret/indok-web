import { Grid, TextField } from "@mui/material";
import React from "react";

import { FilterQuery } from "@/components/pages/events/AllEvents";

type Props = {
  /** The currently applied filters */
  filters: FilterQuery;
  /** Function called when filters are updated */
  onFiltersChange: (query: FilterQuery) => void;
};

/** Component for the date filter in the filter menu. */
export const DateTimeFilter: React.FC<Props> = ({ filters, onFiltersChange }) => {
  return (
    <>
      <Grid container item direction="column">
        <Grid item>
          <TextField
            id="date"
            label="Starttid"
            type="date"
            fullWidth
            margin="normal"
            value={filters?.startTime?.split("T")[0] ?? ""}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => onFiltersChange({ ...filters, startTime: `${e.currentTarget.value}T00:00` })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label="Sluttid"
            type="date"
            fullWidth
            value={filters?.endTime?.split("T")[0] ?? ""}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => onFiltersChange({ ...filters, endTime: `${e.currentTarget.value}T00:00` })}
          />
        </Grid>
      </Grid>
    </>
  );
};
