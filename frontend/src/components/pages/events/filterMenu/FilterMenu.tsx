import { FilterQuery } from "@components/pages/events/AllEvents";
import { Card, CardContent, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StarIcon, RefreshIcon } from "@heroicons/react/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/solid";
import React from "react";
import CategoryFilter from "./CategoryFilter";
import DateTimeFilter from "./DateTimeFilter";
import OrganizationFilter from "./OrganizationFilter";
import { HandleChecked } from "./types";

type Props = {
  filters: FilterQuery;
  onFiltersChange: (query: FilterQuery) => void;
  showDefaultEvents: boolean;
  onShowDefaultChange: (show: boolean) => void;
};

/**
 * Component for the filter menu on the event list page
 *
 * Props:
 * - filters: the currently applied filters
 * - onFiltersChange: method called when filters are updated
 * - showDefaultEvents: whether to show the default event or all (possibly filtered) events
 * - onShowDefaultChange: method called when whether to show default events or not changes
 */

const FilterMenu: React.FC<Props> = ({ filters, onFiltersChange, showDefaultEvents, onShowDefaultChange }) => {
  const theme = useTheme();

  const handleChecked: HandleChecked = (e, field, filter) => {
    if (e.target.checked) {
      onFiltersChange({ ...filters, [field]: filter });
    } else {
      onFiltersChange({ ...filters, [field]: undefined });
    }
  };
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" spacing={3}>
          <Grid container item direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="subtitle1">Filter</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Nullstill filter" arrow>
                <IconButton onClick={() => onFiltersChange({})} aria-label="delete">
                  <RefreshIcon width={24} height={24} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid container item direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body1">Fremhevet</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => onShowDefaultChange(!showDefaultEvents)} aria-label="delete">
                {showDefaultEvents ? (
                  <SolidStarIcon color={theme.palette.secondary.main} width={24} height={24} />
                ) : (
                  <StarIcon width={24} height={24} />
                )}
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Arrangør</Typography>
          </Grid>
          <OrganizationFilter filters={filters} handleChecked={handleChecked} />

          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Kategori</Typography>
          </Grid>
          <CategoryFilter filters={filters} handleChecked={handleChecked} />

          <Grid item>
            <Divider />
          </Grid>
          <DateTimeFilter filters={filters} onFiltersChange={onFiltersChange} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FilterMenu;
