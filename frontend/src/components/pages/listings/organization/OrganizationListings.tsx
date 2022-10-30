import { Add, Create, Delete } from "@mui/icons-material";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

import { DeleteListing } from "@/components/pages/listings/organization/DeleteListing";
import { AdminOrganizationFragment, OrgAdminListingFragment } from "@/generated/graphql";

type Props = { organization: AdminOrganizationFragment };

/** Component to show a list of listings connected to an organization for its administrators. */
export const OrganizationListings: React.FC<Props> = ({ organization }) => {
  // state for whether to show the DeleteListing confirmation dialog
  // if not undefined, contains the listing to be deleted for use by the dialog
  const [listingToDelete, setListingToDelete] = useState<OrgAdminListingFragment | undefined>();

  return (
    <>
      <DeleteListing listing={listingToDelete} onClose={() => setListingToDelete(undefined)} />
      <Stack spacing={5}>
        <Typography variant="h3">Søknader</Typography>
        {organization.listings && organization.listings.length !== 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tittel</TableCell>
                  <TableCell>Søknadsfrist</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {organization.listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>{listing.title}</TableCell>
                    <TableCell>{dayjs(listing.deadline).format("LLL")}</TableCell>
                    <TableCell size="small" align="right">
                      <Stack spacing={1} direction="row" justifyContent="flex-end">
                        <Link href={`${organization.id}/listings/${listing.id}`} passHref>
                          <Button variant="contained" color="secondary" startIcon={<Create />}>
                            Administrer
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Delete />}
                          onClick={(e) => {
                            e.preventDefault();
                            setListingToDelete(listing);
                          }}
                        >
                          Slett
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div>
          <Link passHref href={`${organization.id}/listings/new`}>
            <Button variant="outlined" color="contrast" startIcon={<Add />}>
              Opprett nytt verv
            </Button>
          </Link>
        </div>
      </Stack>
    </>
  );
};
