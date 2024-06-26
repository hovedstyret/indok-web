import type { Metadata } from "next";

import { Container } from "@mui/material";
import { Title } from "@/components/Title";
import { HEADER_DESKTOP_HEIGHT, HEADER_MOBILE_HEIGHT } from "@/lib/mui/theme/constants";

export const metadata: Metadata = {
  title: "Nytt dokument",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Title
        title="Dokumenter"
        breadcrumbs={[
          { name: "Hjem", href: "/" },
          { name: "Dokumenter", href: "/documents" },
          { name: "Ny", href: "/documents/new" },
        ]}
        sx={{ mt: { xs: `-${HEADER_MOBILE_HEIGHT}px`, md: `-${HEADER_DESKTOP_HEIGHT}px` } }}
      />
      <Container maxWidth="sm">{children}</Container>;
    </>
  );
}