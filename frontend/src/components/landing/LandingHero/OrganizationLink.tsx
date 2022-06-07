import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Link as LinkIcon } from "phosphor-react";

type External = {
  externalUrl: string;
  internalUrl?: never;
};

type Internal = {
  internalUrl: string;
  externalUrl?: never;
};

export type Organization = {
  name: string;
} & (External | Internal);

type Props = {
  organization: Organization;
};

const OrganizationLink: React.FC<Props> = ({ organization }) => {
  return (
    <Card sx={{ boxShadow: (theme) => theme.customShadows.z24 }}>
      <Link passHref href={organization.externalUrl ?? organization.internalUrl}>
        <CardActionArea sx={{ px: 4, py: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                opacity: organization.externalUrl ? 1 : 0.44,
                bgcolor: "primary.main",
              }}
            />
            <Typography variant="h6">{organization.name}</Typography>
            {organization.externalUrl && <LinkIcon width={20} height={20} />}
          </Stack>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default OrganizationLink;
