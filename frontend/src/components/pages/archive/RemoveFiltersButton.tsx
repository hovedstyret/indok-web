import Close from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import React from "react";

interface RemoveFiltersButtonProps {
  handleRemoveFilterChanged: () => void;
}

export const RemoveFiltersButton: React.FC<RemoveFiltersButtonProps> = ({ handleRemoveFilterChanged }) => {
  return (
    <Box pb={3}>
      <Button variant="contained" startIcon={<Close />} onClick={handleRemoveFilterChanged}>
        Fjern filtrering
      </Button>
    </Box>
  );
};
