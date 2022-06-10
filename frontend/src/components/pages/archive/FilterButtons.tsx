import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

interface FilterButtonProps {
  typeFilters: { [key: string]: { active: boolean; title: string } };
  updateTypeFilters: (key: string) => void;
}

const FilterButtons: React.FC<FilterButtonProps> = ({ typeFilters, updateTypeFilters }) => {
  return (
    <>
      {Object.entries(typeFilters).map(([key, val]) => (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              color="primary"
              icon={<CheckBoxOutlineBlankOutlined fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              checked={val.active}
              onChange={() => updateTypeFilters(key)}
              name={val.title}
            />
          }
          label={<Typography variant="body2">{val.title}</Typography>}
        />
      ))}
    </>
  );
};

export default FilterButtons;
