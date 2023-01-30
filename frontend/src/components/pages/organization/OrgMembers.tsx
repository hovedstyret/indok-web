import { useMutation, useQuery } from "@apollo/client";
import { Delete, GroupAdd, AdminPanelSettings } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { PermissionRequired } from "@/components/Auth";
import {
  AdminOrganizationFragment,
  MembershipsDocument,
  MembershipType,
  AssignMembershipDocument,
  DeleteMembershipDocument,
} from "@/generated/graphql";

type Props = {
  organization: AdminOrganizationFragment;
};

export const OrgMembers: React.FC<Props> = ({ organization }) => {
  const { data, loading, error } = useQuery(MembershipsDocument, { variables: { organizationId: organization.id } });
  const [AssignMembership] = useMutation(AssignMembershipDocument);
  const [DeleteMembership] = useMutation(DeleteMembershipDocument);

  const [userInput, setUserInput] = useState<string>("");

  if (error) return <p>Error</p>;
  if (!data?.memberships || loading) return <CircularProgress />;

  //Sorterer medlemmer alfabetisk
  [...data?.memberships].sort((a, b) => a.user.firstName.localeCompare(b.user.firstName));

  const handleAddMembership = () => {
    //Legg til funksjonalitet for å legge til bruker ved brukernavn
    console.log("Legger til " + userInput);
    setUserInput("");
  };

  const handleGroupChange = (membership: MembershipType | any) => {
    if (!membership) return;
    const role = membership?.group?.uuid == organization.adminGroup?.uuid ? "ADMIN" : "MEMBER";
    if (role == "ADMIN") console.log("Demoterer " + membership.user.firstName + " " + membership.user.lastName);
    if (role == "MEMBER") console.log("Promoterer " + membership.user.firstName + " " + membership.user.lastName);

    if (role == "ADMIN") {
      //Legg til funksjonalitet for å demote bruker
      AssignMembership({
        variables: {
          membershipData: {
            organizationId: organization.id,
            userId: membership.user.id,
            groupId: organization?.memberGroup?.uuid,
          },
        },
      });
    }

    if (role == "MEMBER") {
      //Legg til funksjonalitet for å promote bruker
      AssignMembership({
        variables: {
          membershipData: {
            organizationId: organization.id,
            userId: membership.user.id,
            groupId: organization?.adminGroup?.uuid,
          },
        },
      });
    }
  };

  const handleRemoveMembership = (membership: MembershipType | any) => {
    if (!membership) return;

    DeleteMembership({
      variables: {
        membershipId: membership.id,
      },
    });

    console.log("Fjerner " + membership.user.firstName + " " + membership.user.lastName);
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h3">Oversikt over medlemmer</Typography>
      <PermissionRequired permission="organizations.change_organization">
        <Grid container spacing={1}>
          <Grid item xs={6} md={4} lg={2}>
            <TextField
              variant="standard"
              placeholder="Skriv inn brukernavn"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <Button startIcon={<GroupAdd />} onClick={() => handleAddMembership()}>
              Legg til
            </Button>
          </Grid>
        </Grid>
      </PermissionRequired>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Navn</TableCell>
              <TableCell>Gruppe</TableCell>
              <PermissionRequired permission="organizations.change_organization">
                <TableCell>Rediger</TableCell>
              </PermissionRequired>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.memberships.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell>
                  {membership.user.firstName} {membership.user.lastName}
                </TableCell>
                <TableCell>
                  {membership?.group?.uuid == organization.adminGroup?.uuid ? "Administrator" : "Medlem"}
                </TableCell>
                <PermissionRequired permission="organizations.change_organization">
                  <TableCell>
                    <Button
                      onClick={() => handleGroupChange(membership)}
                      variant="contained"
                      color="warning"
                      startIcon={<AdminPanelSettings />}
                      sx={{ mr: 1 }}
                    >
                      {membership?.group?.uuid == organization.adminGroup?.uuid ? "Demoter" : "Promoter"}
                    </Button>
                    <Button
                      onClick={() => handleRemoveMembership(membership)}
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                    >
                      Fjern
                    </Button>
                  </TableCell>
                </PermissionRequired>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
